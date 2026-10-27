import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';

// Capture live browser frames; no generated or reenacted application screens.
const [slug, url, seconds = '20'] = process.argv.slice(2);
const root = path.resolve('.impeccable/runtime/recordings', slug);
await fs.mkdir(root, { recursive: true });
const tabs = await (await fetch('http://127.0.0.1:9223/json/list')).json();
const tab = tabs.find(t => t.type === 'page' && t.url.startsWith(url));
if (!tab) throw new Error(`No inspected demo tab: ${url}`);
const socket = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
let id = 0;
const pending = new Map();
const frames = [];
const writes = [];
socket.onmessage = event => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const request = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) request?.reject(new Error(message.error.message));
    else request?.resolve(message.result);
  }
  if (message.method === 'Page.screencastFrame') {
    const { data, metadata, sessionId } = message.params;
    const name = `${String(frames.length).padStart(5, '0')}.jpg`;
    frames.push({ name, timestamp: metadata.timestamp });
    writes.push(fs.writeFile(path.join(root, name), Buffer.from(data, 'base64')));
    socket.send(JSON.stringify({ id: ++id, method: 'Page.screencastFrameAck', params: { sessionId } }));
  }
};
function call(method, params = {}) {
  return new Promise((resolve, reject) => {
    const key = ++id;
    pending.set(key, { resolve, reject });
    socket.send(JSON.stringify({ id: key, method, params }));
  });
}
await call('Page.startScreencast', { format: 'jpeg', quality: 85, maxWidth: 1280, maxHeight: 720, everyNthFrame: 2 });
console.log(`Recording ${slug}`);
await new Promise(resolve => setTimeout(resolve, Number(seconds) * 1000));
const stoppedAt = Date.now() / 1000;
await call('Page.stopScreencast');
socket.close();
await Promise.all(writes);
if (frames.length < 2) throw new Error(`Insufficient live frames: ${slug}`);
const cut = frames.map((frame, i) => `file '${frame.name}'\nduration ${Math.max(0.001, (frames[i + 1]?.timestamp ?? stoppedAt) - frame.timestamp)}`).join('\n');
await fs.writeFile(path.join(root, 'frames.txt'), `${cut}\nfile '${frames.at(-1).name}'\n`);
await fs.writeFile(path.join(root, 'source.json'), JSON.stringify({ source: url, captured: new Date().toISOString(), frames: frames.length, stoppedAt, timestamps: frames.map(frame => frame.timestamp) }, null, 2));
const output = path.resolve('public/demos', `${slug}.mp4`);
await new Promise((resolve, reject) => {
  const ffmpeg = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-i', 'frames.txt', '-vf', 'fps=24,scale=1280:720', '-c:v', 'libx264', '-crf', '24', '-preset', 'fast', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', output], { cwd: root, stdio: 'inherit' });
  ffmpeg.on('error', reject);
  ffmpeg.on('exit', code => code === 0 ? resolve() : reject(new Error(`ffmpeg failed: ${code}`)));
});
console.log(`Saved ${output}: ${frames.length} genuine frames`);
