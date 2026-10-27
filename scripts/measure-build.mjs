import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import { performance } from 'node:perf_hooks';

// Measures emitted bytes, not browser transfer or Core Web Vitals.
const output = process.argv[2];
if (!output) throw new Error('Usage: node scripts/measure-build.mjs <report.json>');
const started = performance.now();
const build = spawnSync(process.execPath, ['node_modules/next/dist/bin/next', 'build'], { stdio: 'inherit' });
if (build.status !== 0) process.exit(build.status ?? 1);
const buildSeconds = (performance.now() - started) / 1000;
function walk(dir) {
  return fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  }) : [];
}
function measure(files) {
  return files.reduce((result, file) => {
    const content = fs.readFileSync(file);
    result.files++;
    result.rawBytes += content.length;
    result.gzipBytes += gzipSync(content).length;
    return result;
  }, { files: 0, rawBytes: 0, gzipBytes: 0 });
}
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const lock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const staticFiles = walk('.next/static');
const publicFiles = walk('public');
const routes = {};
for (const [route, file] of [['/', '.next/server/app/index.html'], ['/projects', '.next/server/app/projects.html']]) {
  const html = fs.readFileSync(file, 'utf8');
  const scriptPaths = [...new Set([...html.matchAll(/<script\b[^>]*\bsrc="([^"?]+\.js)(?:\?[^\"]*)?"/g)].map(match => match[1]))];
  const scripts = scriptPaths.map(src => path.join('.next', src.replace(/^\/_next\//, '')));
  routes[route] = { htmlBytes: Buffer.byteLength(html), htmlGzipBytes: gzipSync(html).length, referencedScripts: measure(scripts), scriptPaths,
    fontPreloads: [...html.matchAll(/<link\b[^>]*rel="preload"[^>]*as="font"[^>]*>/g)].map(match => match[0]) };
}
const report = {
  measuredAt: new Date().toISOString(), node: process.version, platform: process.platform,
  framework: lock.packages['node_modules/next'].version, buildSeconds,
  method: 'Same local warm-cache next build; emitted files measured raw and independently gzip-compressed. These are not observed network transfer sizes.',
  trackedIndexFiles: tracked.length, trackedFilesPresent: tracked.filter(file => fs.existsSync(file)).length,
  productionDependencies: Object.keys(pkg.dependencies ?? {}).length,
  developmentDependencies: Object.keys(pkg.devDependencies ?? {}).length,
  lockPackages: Object.keys(lock.packages).length - 1,
  javascript: measure(staticFiles.filter(file => file.endsWith('.js'))),
  css: measure(staticFiles.filter(file => file.endsWith('.css'))),
  fonts: measure(staticFiles.filter(file => /\.woff2?$/.test(file))),
  publicAssets: { files: publicFiles.length, bytes: publicFiles.reduce((total, file) => total + fs.statSync(file).size, 0) },
  publicImages: { files: publicFiles.filter(file => /\.(png|jpe?g|webp|svg|gif|avif)$/i.test(file)).length,
    bytes: publicFiles.filter(file => /\.(png|jpe?g|webp|svg|gif|avif)$/i.test(file)).reduce((total, file) => total + fs.statSync(file).size, 0) },
  largestPublicAssets: publicFiles.map(file => ({ file: file.replaceAll('\\', '/'), bytes: fs.statSync(file).size })).sort((a,b) => b.bytes-a.bytes).slice(0,15),
  routes,
  browserMetrics: 'Not measured: no connected browser. Initial network JS, Lighthouse, LCP, INP, CLS, FCP and TBT are unavailable.',
};
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ output, buildSeconds, javascript: report.javascript, css: report.css, routes: Object.fromEntries(Object.entries(routes).map(([route, result]) => [route, result.referencedScripts])) }, null, 2));
