import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

function effectIn(file) {
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let effect;
  function visit(node) {
    if (!effect && ts.isCallExpression(node) && node.expression.getText(source) === 'useEffect') effect = node.arguments[0].getText(source);
    ts.forEachChild(node, visit);
  }
  visit(source);
  return ts.transpileModule(`(${effect})();`, { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;
}

test('footer scroll effects touch only decorative backgrounds and clean up', () => {
  const footer = {}, calls = []; let reverted = false;
  const cleanup = vm.runInNewContext(effectIn('src/components/Footer.tsx'), {
    footerRef: { current: footer }, ScrollTrigger: {}, window: { matchMedia: () => ({ matches: false }) },
    gsap: { registerPlugin() {}, context(fn, scope) { assert.equal(scope, footer); fn(); return { revert() { reverted = true; } }; },
      to(target, vars) { calls.push({ target, vars }); },
      fromTo() { assert.fail('Footer text must not be hidden behind a scroll reveal'); },
    },
  });
  assert.equal(calls.length, 2);
  for (const { target, vars } of calls) {
    assert.match(target, /^\[data-footer-parallax=/);
    assert.ok(!('autoAlpha' in vars || 'opacity' in vars || 'filter' in vars));
  }
  cleanup(); assert.equal(reverted, true);
});

test('global reveals are scoped to main and headings never receive a hidden state', () => {
  const main = {}, pixel = {}, title = { querySelectorAll: () => [pixel] }, calls = []; let reverted = false;
  const cleanup = vm.runInNewContext(effectIn('src/components/ScrollAnimator.tsx'), {
    ScrollTrigger: {}, document: { querySelector: selector => selector === 'main' ? main : null },
    window: { matchMedia: () => ({ matches: false }) },
    gsap: { registerPlugin() {}, context(fn, scope) { assert.equal(scope, main, 'global reveals must not capture the footer'); fn(); return { revert() { reverted = true; } }; },
      fromTo(target, from, to) { calls.push({ target, from, to }); },
      utils: { toArray: selector => Array.isArray(selector) ? selector : selector === '[data-pixel-title]' ? [title] : [] },
    },
  });
  const heading = calls.find(call => Array.isArray(call.target) && call.target[0] === pixel);
  assert.ok(heading);
  assert.ok(!('autoAlpha' in heading.from || 'opacity' in heading.from || 'visibility' in heading.from));
  assert.equal(heading.to.scrollTrigger.once, true);
  assert.equal(heading.to.scrollTrigger.start, 'clamp(top 88%)');
  cleanup(); assert.equal(reverted, true);
});
