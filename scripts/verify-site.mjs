import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const base = process.argv[2] ?? 'http://127.0.0.1:3001';
const report = { base, routes: {}, assets: 0, imageOptimizer: [], checks: [], externalLinks: [] };
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&nbsp;', ' ');
const stripScripts = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
const links = html => [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => decode(match[1])).sort();
const publicFiles = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? publicFiles(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const pages = new Map();
for (const route of ['/', '/projects']) {
  const response = await fetch(new URL(route, base)); assert.equal(response.status, 200, route);
  const html = stripScripts(await response.text()); pages.set(route, html);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, 'one primary heading: ' + route);
  assert.match(html, /name="viewport"[^>]+width=device-width/);
  assert.match(html, /aria-label="Interface sounds"/);
  assert.ok(!html.includes('user-scalable=no'));
  const beforeFile = '.impeccable/runtime/cleanup-before-' + (route === '/' ? 'index' : 'projects') + '.html';
  if (fs.existsSync(beforeFile)) {
    const before = stripScripts(fs.readFileSync(beforeFile, 'utf8'));
    assert.deepEqual(links(html), links(before), 'all existing visible navigation, social, contact, source and download URLs preserved');
    const images = value => [...value.matchAll(/<img\b[^>]*alt="([^"]*)"/g)].map(match => decode(match[1])).sort();
    assert.deepEqual(images(html), images(before), 'all rendered images/alt text preserved');
    const headingText = value => [...value.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/g)].map(match => decode(match[1].replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim());
    assert.deepEqual(headingText(html), headingText(before), 'visible headings unchanged');
    report.checks.push(route + ': baseline links, images and heading text match');
  }
  report.routes[route] = { status: response.status, anchors: links(html).length, h1: 1 };
  for (const src of [...html.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map(match => decode(match[1])).slice(0, 2)) {
    const image = await fetch(new URL(src, base)); assert.equal(image.status, 200, src); assert.match(image.headers.get('content-type'), /^image\//); await image.arrayBuffer(); report.imageOptimizer.push({ src, status: image.status });
  }
}
const home = pages.get('/'), archive = pages.get('/projects');
for (const id of ['home', 'about', 'projects', 'stack', 'journey', 'certificates', 'contact']) assert.ok(home.includes('id="' + id + '"'), id);
assert.equal((home.match(/data-project-row=/g) ?? []).length, 4);
assert.equal((archive.match(/<article\b/g) ?? []).length, 10);
assert.equal((home.match(/class="orbit-logo-card\b/g) ?? []).length, 22);
const skillList = home.match(/<ul\b[^>]*aria-label="Skills and technologies"[^>]*>([\s\S]*?)<\/ul>/)?.[1];
assert.ok(skillList); assert.equal((skillList.match(/<li\b/g) ?? []).length, 42);
assert.ok(archive.includes('Falcon Trading'));
assert.equal((home.match(/role="tab"/g) ?? []).length, 12, 'eight code and four certificate tabs');
assert.equal((home.match(/role="tabpanel"/g) ?? []).length, 2);
assert.ok(!home.includes('Pause certificate slideshow'));
assert.match(home, /autoComplete="name"|autocomplete="name"/);
assert.match(home, /autoComplete="email"|autocomplete="email"/);
for (const field of ['name', 'email', 'subject', 'message']) assert.ok(home.includes('name="' + field + '"'), field);
assert.match(home, /aria-label="Toggle navigation"/);
assert.match(home, /aria-controls="mobile-navigation"/);
const homeIds = new Set([...home.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
for (const html of pages.values()) for (const href of links(html)) {
  if (/^https?:/.test(href)) report.externalLinks.push(href);
  if (href.startsWith('#')) assert.ok(homeIds.has(href.slice(1)), href);
  if (href.startsWith('/#')) assert.ok(homeIds.has(href.slice(2)), href);
}
for (const file of publicFiles('public').filter(file => path.basename(file) !== '.gitkeep')) {
  const relative = file.replaceAll('\\', '/').slice('public'.length);
  const response = await fetch(new URL(relative, base), { method: 'HEAD' }); assert.equal(response.status, 200, file); report.assets++;
  if (file.endsWith('.pdf')) assert.equal(fs.readFileSync(file).subarray(0,4).toString(), '%PDF', file);
}
const notFound = await fetch(new URL('/this-page-does-not-exist', base)); assert.equal(notFound.status, 404);
report.externalLinks = [...new Set(report.externalLinks)];
report.checks.push('both production routes, all seven home sections, four featured projects, ten archive projects, two tab panels, form fields and autocomplete, mobile navigation semantics, local anchors, all public assets, PDF signatures, image optimization and 404 response');
report.limitations = 'HTTP/source checks only. No browser hydration, responsive screenshots, real keyboard/touch/WebGL, accessibility-engine scores or remote service availability asserted.';
fs.mkdirSync('docs/performance', { recursive: true });
fs.writeFileSync('docs/performance/regression.json', JSON.stringify(report, null, 2) + '\n');
console.log('PASS: production routes, preserved content/URLs, controls, all ' + report.assets + ' public assets, PDFs, image optimizer and 404.');
