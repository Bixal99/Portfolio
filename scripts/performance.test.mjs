import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';
import { CatmullRomCurve3, Vector3 } from 'three';

function load(file, imports, globals = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, { exports, require: id => imports[id], ...globals });
  return exports;
}

test('decorative activity follows viewport and document visibility and cleans up', () => {
  let effect, notify, cleanup, active = false, disconnected = false;
  const handlers = new Map();
  const document = { hidden: false, addEventListener: (name, fn) => handlers.set(name, fn), removeEventListener: name => handlers.delete(name) };
  const element = {};
  const hooks = load('src/components/useVisibleActivity.ts', {
    react: { useState: () => [false, next => { active = next; }], useEffect: fn => { effect = fn; } },
  }, { document, IntersectionObserver: class {
    constructor(fn) { notify = fn; }
    observe(target) { assert.equal(target, element); }
    disconnect() { disconnected = true; }
  } });
  hooks.useVisibleActivity({ current: element });
  cleanup = effect();
  assert.equal(active, false);
  notify([{ isIntersecting: true }]); assert.equal(active, true);
  document.hidden = true; handlers.get('visibilitychange')(); assert.equal(active, false);
  document.hidden = false; handlers.get('visibilitychange')(); assert.equal(active, true);
  notify([{ isIntersecting: false }]); assert.equal(active, false);
  cleanup(); assert.equal(handlers.size, 0); assert.equal(disconnected, true);
});

test('pointer updates coalesce to one frame, retain the tip position and cancel on native targets', () => {
  const windowEvents = new Map(), documentEvents = new Map(), htmlEvents = new Map(), frames = new Map(), classes = new Set();
  let cleanup, refIndex = 0, frameId = 0;
  class Element {
    constructor(kind = 'normal') { this.kind = kind; this.dataset = {}; this.style = {}; this.textContent = ''; }
    closest(selector) {
      if (selector.includes('data-about-lanyard')) return this.kind === 'native' ? this : null;
      if (selector.includes('data-cursor-label') || selector.includes('data-no-cursor-change')) return null;
      return this.kind === 'button' ? this : null;
    }
  }
  const root = new Element(), pointer = new Element(), caption = new Element(), refs = [root, pointer, caption];
  const document = { hidden: false, documentElement: {
    classList: { add: key => classes.add(key), remove: key => classes.delete(key) },
    addEventListener: (n, f) => htmlEvents.set(n, f), removeEventListener: n => htmlEvents.delete(n),
  }, addEventListener: (n, f) => documentEvents.set(n, f), removeEventListener: n => documentEvents.delete(n) };
  const window = { innerWidth: 1200, innerHeight: 800, addEventListener: (n, f) => windowEvents.set(n, f), removeEventListener: n => windowEvents.delete(n) };
  const component = load('src/components/CustomCursor.tsx', {
    react: { useRef: () => ({ current: refs[refIndex++] }), useEffect: fn => { cleanup = fn(); }, useSyncExternalStore: () => true },
    'react/jsx-runtime': { jsx() {}, jsxs() {} }, './CustomCursor.module.css': { default: {} },
    './customCursor/shouldEnableCustomCursor': { shouldEnableCustomCursor: () => true },
  }, { window, document, Element, requestAnimationFrame: fn => { frames.set(++frameId, fn); return frameId; }, cancelAnimationFrame: id => frames.delete(id) });
  component.CustomCursor();
  const move = (x, y) => windowEvents.get('pointermove')({ pointerType: 'mouse', target: new Element('button'), clientX: x, clientY: y });
  for (let index = 0; index < 100; index++) move(index, 150);
  assert.equal(frames.size, 1);
  const frame = [...frames.values()][0]; frames.clear(); frame();
  assert.equal(pointer.style.transform, 'translate3d(99px, 150px, 0)');
  assert.ok(classes.has('has-custom-cursor')); assert.equal(root.dataset.hover, 'true');
  windowEvents.get('pointerdown')({ pointerType: 'mouse', button: 0 }); assert.equal(root.dataset.down, 'true');
  windowEvents.get('pointerup')(); assert.equal(root.dataset.down, 'false');
  move(200, 300); documentEvents.get('pointerover')({ target: new Element('native') });
  assert.equal(frames.size, 0); assert.equal(root.dataset.visible, 'false'); assert.equal(classes.size, 0);
  cleanup(); assert.equal(windowEvents.size + documentEvents.size + htmlEvents.size + frames.size, 0);
});

function effectsIn(file) {
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const callbacks = [];
  function visit(node) {
    if (ts.isCallExpression(node) && node.expression.getText(source) === 'useEffect') callbacks.push(node.arguments[0].getText(source));
    ts.forEachChild(node, visit);
  }
  visit(source);
  return callbacks;
}

test('code editor does no offscreen/reduced-motion timer work and resumes its character position', () => {
  const callback = effectsIn('src/components/CreativeCodeWindow.tsx').at(-1);
  const source = ts.transpileModule(`(${callback})();`, { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;
  const timers = new Map(); let timerId = 0, typed;
  const context = {
    active: false, reduced: false, progressRef: { current: 5 }, fullText: 'abcdefghij', files: [{}, {}],
    TYPE_DELAY_MS: 50, LOOP_DELAY_MS: 3000, setTypedChars: next => { typed = next; }, setActiveFile() {},
    window: { setTimeout: (fn, delay) => { timers.set(++timerId, { fn, delay }); return timerId; }, clearTimeout: id => timers.delete(id) },
  };
  vm.runInNewContext(source, context); assert.equal(timers.size, 0);
  context.active = true; context.reduced = true;
  vm.runInNewContext(source, context); assert.equal(timers.size, 0);
  context.reduced = false; const cleanup = vm.runInNewContext(source, context);
  const [id, timer] = [...timers][0]; timers.delete(id); assert.equal(timer.delay, 50); timer.fn();
  assert.equal(typed, 6); assert.equal(context.progressRef.current, 6);
  cleanup(); assert.equal(timers.size, 0);
});

test('reused rope samples exactly match the previous curve geometry on phone and desktop', () => {
  const source = fs.readFileSync('src/components/Lanyard/Lanyard.tsx', 'utf8');
  const sample = source.match(/const points = curvePoints;[\s\S]*?for \(let i = 0;[^\n]+/)[0];
  for (const divisions of [16, 32]) {
    const curve = new CatmullRomCurve3([new Vector3(2, 0, 1), new Vector3(1, 2, 0), new Vector3(-1, 2, 0), new Vector3(-2, 3, 1)], false, 'chordal');
    const curvePoints = Array.from({ length: divisions + 1 }, () => new Vector3());
    const expected = curve.getPoints(divisions);
    vm.runInNewContext(sample, { curve, curvePoints });
    curvePoints.forEach((point, index) => assert.equal(point.distanceTo(expected[index]), 0));
  }
});

test('navigation keeps scroll-only selection, avoids repeated updates and preserves the mobile menu', () => {
  const values = [], effects = [], handlers = new Map(), frames = new Map();
  let stateIndex = 0, updates = 0, frameId = 0;
  const navItems = ['home', 'about', 'projects', 'stack', 'certificates'].map(id => ({ label: id, href: '#' + id }));
  const window = { scrollY: 0, innerHeight: 900, addEventListener: (n, f) => handlers.set(n, f), removeEventListener: n => handlers.delete(n) };
  const document = { querySelector: href => ({ getBoundingClientRect: () => ({ top: navItems.findIndex(item => item.href === href) * 1000 - window.scrollY }) }) };
  const { Navbar } = load('src/components/Navbar.tsx', {
    react: {
      useState: initial => { const index = stateIndex++; if (!(index in values)) values[index] = initial; return [values[index], next => { values[index] = typeof next === 'function' ? next(values[index]) : next; updates++; }]; },
      useEffect: fn => effects.push(fn),
    }, 'react/jsx-runtime': { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) },
    '@/data/portfolio': { navItems, profile: { name: 'Mohammad Bilal' }, socialLinks: [] },
    'lucide-react': {}, './Navbar.module.css': { default: new Proxy({}, { get: (_, property) => property }) },
  }, { window, document, requestAnimationFrame: fn => { frames.set(++frameId, fn); return frameId; }, cancelAnimationFrame: id => frames.delete(id) });
  const all = (node, predicate) => Array.isArray(node) ? node.flatMap(child => all(child, predicate)) : node?.props ? [...(predicate(node) ? [node] : []), ...all(node.props.children, predicate)] : [];
  const render = () => { stateIndex = 0; effects.length = 0; return Navbar(); };
  let tree = render(); const cleanups = effects.map(fn => fn());
  assert.equal(updates, 0);
  for (let index = 0; index < 100; index++) handlers.get('scroll')();
  assert.equal(frames.size, 1); [...frames.values()][0](); frames.clear(); assert.equal(updates, 0);
  window.scrollY = 2100; handlers.get('scroll')(); [...frames.values()][0](); frames.clear();
  assert.equal(values[1], 'projects'); assert.equal(values[2], true); const count = updates;
  handlers.get('scroll')(); [...frames.values()][0](); frames.clear(); assert.equal(updates, count);
  tree = render(); const nav = all(tree, node => node.props['aria-label'] === 'Main navigation')[0];
  const links = all(nav, node => node.type === 'a');
  assert.equal(links.length, 5); assert.ok(links.every(link => !link.props.onPointerEnter));
  all(tree, node => node.props['aria-label'] === 'Toggle navigation')[0].props.onClick();
  tree = render(); assert.equal(all(tree, node => node.props.id === 'mobile-navigation').length, 1);
  const escapeCleanup = effects[0](); handlers.get('keydown')({ key: 'Escape' });
  assert.equal(values[0], false); escapeCleanup(); cleanups.filter(Boolean).forEach(fn => fn()); assert.equal(handlers.size, 0);
});
