import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

function mount({ height = 3000, viewportHeight = 1000 } = {}) {
  const events = new Map(), viewportEvents = new Map(), frames = new Map();
  let cleanup, resize, ref = 0, id = 0, measured = 0, disconnected = false;
  const root = { hidden: false, get clientHeight() { measured++; return 600; }, setAttribute(name, value) { this[name] = value; } };
  const fill = { style: {} }, marker = { style: {} }, label = { textContent: '0' };
  const refs = [root, fill, marker, label];
  const document = { body: {}, documentElement: { scrollHeight: height } };
  const window = { scrollY: 0, innerHeight: viewportHeight, addEventListener: (n, f) => events.set(n, f), removeEventListener: n => events.delete(n), visualViewport: { addEventListener: (n, f) => viewportEvents.set(n, f), removeEventListener: n => viewportEvents.delete(n) } };
  const output = {};
  const source = ts.transpileModule(fs.readFileSync('src/components/PageProgress.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 } }).outputText;
  vm.runInNewContext(source, {
    exports: output,
    require: name => ({ react: { useRef: () => ({ current: refs[ref++] }), useEffect: fn => { cleanup = fn(); } }, 'next/navigation': { usePathname: () => '/' }, 'react/jsx-runtime': { jsx() {}, jsxs() {} }, './PageProgress.module.css': { default: {} } })[name],
    document, window,
    ResizeObserver: class { constructor(fn) { resize = fn; } observe() {} disconnect() { disconnected = true; } },
    requestAnimationFrame: fn => { frames.set(++id, fn); return id; }, cancelAnimationFrame: index => frames.delete(index),
  });
  output.PageProgress();
  return { root, fill, marker, label, document, window, events, frames, viewportEvents, cleanup,
    resize: () => resize(), measured: () => measured, disconnected: () => disconnected,
    flush: () => { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(fn => fn()); },
  };
}

test('page progress tracks top, middle and bottom without measuring on every scroll', () => {
  const s = mount(); s.flush();
  assert.equal(s.label.textContent, '0'); assert.equal(s.root.hidden, false);
  s.window.scrollY = 1000;
  for (let i = 0; i < 100; i++) s.events.get('scroll')();
  assert.equal(s.frames.size, 1); s.flush();
  assert.equal(s.label.textContent, '50'); assert.equal(s.root['aria-valuenow'], '50');
  assert.equal(s.fill.style.transform, 'scaleY(0.5)'); assert.equal(s.marker.style.transform, 'translate3d(0, 300px, 0)');
  assert.equal(s.measured(), 1);
  s.window.scrollY = 5000; s.events.get('scroll')(); s.flush(); assert.equal(s.label.textContent, '100');
  s.window.scrollY = -100; s.events.get('scroll')(); s.flush(); assert.equal(s.label.textContent, '0');
  s.cleanup();
});

test('progress handles non-scrollable pages and recalculates when content or viewport changes', () => {
  const s = mount({ height: 900 }); s.flush(); assert.equal(s.root.hidden, true);
  s.document.documentElement.scrollHeight = 2000; s.window.scrollY = 500; s.resize(); s.flush();
  assert.equal(s.root.hidden, false); assert.equal(s.label.textContent, '50');
  s.window.innerHeight = 500; s.viewportEvents.get('resize')(); s.flush(); assert.equal(s.label.textContent, '33');
  s.cleanup();
});

test('progress removes observers, listeners and pending animation frames on navigation or unmount', () => {
  const s = mount(); assert.equal(s.frames.size, 1); s.cleanup();
  assert.equal(s.events.size + s.viewportEvents.size + s.frames.size, 0); assert.equal(s.disconnected(), true);
});
