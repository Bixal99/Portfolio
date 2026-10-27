# Portfolio cleanup and performance report

## 1. Executive summary

Cleaned the existing application without redesigning it. Removed 15 confirmed unused tracked files (74,220 bytes), removed three redundant direct dependency entries, restricted Tailwind to application source, removed an unused Poppins weight, reduced unnecessary font preloads, simplified pointer positioning, paused decorative timers outside the viewport/hidden tabs, reduced repeated scroll state updates and reused 3D rope sample objects. Existing content data, projects, certificates, current resume, posters, colors, typography, layout and default animation parameters remain intact.

The strongest measured reductions are projects-page referenced JavaScript (9.52% raw; 11.95% independently gzipped), CSS (6.78% raw) and emitted fonts (13.81%). Total emitted JavaScript is essentially flat. No Lighthouse or Core Web Vitals improvement is claimed.

## 2. Architecture and discovery

- Next.js 16.2.9 App Router with React 19.2.7 and TypeScript 5.9.3; npm/package-lock.json; Tailwind 4.3.2/PostCSS; CSS modules plus global tokens.
- Static application routes: / and /projects, plus the framework 404/favicon. Root layout owns fonts, metadata, custom cursor and click feedback. No custom API routes, server data fetch, authentication integration or contact-delivery backend is present.
- GSAP/ScrollTrigger handles section reveals and project progress. Motion handles interactive/scroll elements. React Three Fiber, Drei, Rapier, Three.js and MeshLine implement the existing lazy ID card.
- next/image handles posters, journey images, certificate previews and applicable technology marks. Original PDFs and recordings remain public assets. next/font self-hosts the current fonts.
- Application state uses local React hooks, refs, Motion values and GSAP; sound preference persists locally. No new state library or animation replacement was introduced.
- Preserved next.config.ts, PostCSS, TypeScript/ESLint configuration, Vercel project configuration, environment files, package scripts and deployment URLs. No environment values were printed or modified. Read the installed Next.js guides before implementation.
- Traced the import graph from all three route/layout entry files, including dynamic imports and CSS imports. The sole remaining source file without a runtime import is src/types/meshline.d.ts, which TypeScript includes for JSX/module augmentation and must remain.

## 3. Files removed

Only the following 15 tracked files were removed during this cleanup. Each was inspected and searched for direct/indirect consumers. The prior working tree already had 17 absent tracked files; those pre-existing deletions were not attributed to this task or reset. No untracked user file was deleted. Ignored recovery copies retain the removed files' original working-tree bytes.

| Exact relative path | Reason |
| --- | --- |
| `src/components/PageLoader.tsx` | Unrendered legacy loader; only consumer of the obsolete legal-transition helper. |
| `src/components/ProfileVisual.tsx` | Unused previous portrait component; live AboutLanyard retains the real portrait. |
| `src/components/ResumeButton.tsx` | Unused former floating CV button; current ResumeDownloadButton and project-page CV link remain. |
| `src/components/ScrollExperience.tsx` | Unused previous scroll setup; ScrollAnimator and section-specific animation effects remain. |
| `src/components/SideNav.tsx` | Unused former side navigation; current Navbar owns desktop/mobile navigation. |
| `src/components/StaggeredMenu.tsx` | Unused superseded menu; neither route imports it. |
| `src/components/StaggeredMenu.css` | Only imported by the unused StaggeredMenu. |
| `src/components/styles/Landing.css` | Unimported legacy stylesheet; not used by globals or either route. |
| `src/lib/legal-transition.ts` | Only imported by unrendered PageLoader; no remaining legal route or live consumer. |
| `public/file.svg` | Unreferenced Next starter icon; no CSS, metadata, dynamic path, or deployment reference. |
| `public/globe.svg` | Unreferenced Next starter icon; no CSS, metadata, dynamic path, or deployment reference. |
| `public/next.svg` | Unreferenced Next starter logo; no runtime or deployment consumer. |
| `public/vercel.svg` | Unreferenced Next starter logo; Vercel deployment does not depend on this logo. |
| `public/window.svg` | Unreferenced Next starter icon; no runtime or deployment consumer. |
| `public/profile-visual.svg` | Unused geometric placeholder; live portrait uses Me.jpeg. |

Kept the real portrait, journey media, all ten posters, eight recordings, all four certificate PDFs/previews, current CV, icon assets, media provenance, and generated artwork prompts. Two prompt manifests have identical bytes but are intentional provenance mirrors. Kept local Draco compatibility files: the current card model has no Draco extension, but decoder/library compatibility assets were not worth deleting under uncertain future/indirect use. Kept user screenshots, prior review reports, skills, documentation, environment/configuration files and the empty videos directory marker. These are not automatically loaded into the page.

## 4. Dependencies removed

| Package | Decision |
| --- | --- |
| animejs | No source, script, configuration or dynamic import uses it. |
| lenis | No consumer; current smooth anchor behavior uses native scrolling and existing animations. |
| framer-motion (direct entry only) | Application imports use motion/react. The motion package still requires framer-motion transitively, so it remains installed; only the redundant root declaration was removed. |

npm regenerated the lockfile. The dependency diff contains no upgrades of retained package versions. Direct production entries changed from 17 to 14, development entries remain 9, and lockfile package entries changed from 502 to 500. Retained active 3D, animation, icon, class-merging and framework/tooling dependencies. A clean npm ci completed successfully (427 packages installed for this platform). An initial Windows file-lock failure and offline cache miss were resolved by retrying and allowing the exact locked downloads; the unrelated server on port 3000 was left untouched. npm ls still labels five locked optional WASM support packages as extraneous on this Windows installation after clean installation; they were not blindly removed.

## 5. Measurements

Windows, Node v22.15.0, same local Next/Turbopack build command and settings. Both captures are warm builds. Build timings are single observations affected by machine/cache activity and do not establish a repeatable speedup. Full raw records: [before](before.json), [after](after.json).

| Metric | Before | After | Result |
| --- | ---: | ---: | --- |
| Tracked files physically present | 88 | 73 | 15 removed |
| Direct production dependencies | 17 | 14 | 3 direct entries removed |
| Direct development dependencies | 9 | 9 | Unchanged |
| Lockfile package entries (including optional platforms) | 502 | 500 | 2 removed; no version upgrades |
| All emitted JavaScript, raw bytes | 4,434,913 | 4,434,972 | Essentially flat (+59 bytes) |
| All emitted JavaScript, gzip estimate | 1,484,137 | 1,483,599 | 0.04% smaller |
| Home referenced JavaScript, raw bytes | 1,098,289 | 1,097,913 | 0.03% smaller |
| Projects referenced JavaScript, raw bytes | 734,938 | 665,006 | 9.52% smaller |
| Projects referenced JavaScript, gzip estimate | 226,606 | 199,530 | 11.95% smaller |
| Emitted CSS, raw bytes | 146,043 | 136,141 | 6.78% smaller |
| Emitted CSS, gzip estimate | 24,199 | 22,838 | 5.62% smaller |
| Emitted font files, bytes | 382,220 | 329,420 | 13.81% smaller |
| Font preload tags per route | 7 | 5 | 2 fewer |
| Public image bytes | 4,787,761 | 4,783,329 | 4,432 bytes of unused SVGs removed |
| Home HTML, raw bytes | 271,811 | 275,015 | 1.18% larger |
| Home HTML, gzip estimate | 56,699 | 57,116 | 0.74% larger |
| Projects HTML, raw bytes | 288,708 | 288,338 | 0.13% smaller |
| Production build, seconds | 13.62 | 11.16 | Single warm runs; timing is noisy |

The Git index still lists 105 paths because this work was neither staged nor committed. The physically present tracked count excludes the pre-existing missing files and the 15 new removals. New implementation/test/report files remain unstaged alongside the user's existing work.

Referenced JavaScript means unique script src files in each generated production HTML file. All-JavaScript totals include deferred 3D/physics chunks. Gzip counts independently compress each emitted file with Node zlib and are synthetic size estimates, not observed browser transfer. Initial JS transferred, Lighthouse Performance/Accessibility/SEO, LCP, INP, CLS, FCP, TBT, actual frame rates, heap use and device/network performance: **Not measured**.

Static/server extraction was evaluated for SVG-heavy sections. It increased compressed HTML by more than it saved in JavaScript, so the incumbent boundaries were retained. The pure hero shell remains a Server Component. This avoids claiming a smaller JS number at the expense of a heavier initial document.

## 6. Refactoring and runtime changes

- CustomCursor: native translate3d positioning replaces its GSAP quick setters. Multiple pointer events coalesce into one animation frame; pending work cancels on native targets, blur, visibility changes and teardown. Cursor shape, tip origin, captions, hover/press styles and device/reduced-motion fallback remain unchanged. This removes a GSAP-driven dependency path from the projects route; GSAP remains on the home route where it is used.
- InteractiveGridBackground: bounds measurement occurs once in the scheduled paint instead of once per raw pointer event. The five-cell plus, intensities, finite fade durations and 25-cell pool remain unchanged.
- useVisibleActivity, TypewriterLine, CreativeCodeWindow, flip-words-demo and FlipWords: pause automatic timer work offscreen/hidden, resume without repeatedly restarting typed text, and stop automatic cycling for reduced motion. The code editor's actual card is observed even when cardOnly is used. Visible default timing and motion parameters remain the same.
- Navbar, BackToTopButton and Timeline: only enqueue React state updates when the active/compact/visible milestone changes. Retain current scroll selection, mobile menu, progress and animation thresholds.
- Lanyard: reuse scratch vectors and 17/33 curve samples; exact sampled geometry matches the previous mobile/desktop calculation. Dispose only the locally composed canvas texture on cleanup, leaving loader-owned caches intact. Existing viewport/hidden pause, lazy loading, physics, DPR and quality settings remain.
- ProjectPreview/ProjectArchive: responsive image sizes match the actual stacked/paired layouts. The server passes only the preview fields used by the interactive demo instead of serializing unused project descriptions/technology/source details into that boundary. Video preload remains none and activation stays explicit.
- Font delivery: remove unused Poppins 300 after checking live weights. Keep 400�800 and current typography. Disable preloading of the optional monospace family; keep its declaration available. Both routes now preload five fonts instead of seven.
- Styling: Tailwind scans src rather than historic reports/scripts; eight byte-identical repeated CSS declarations were removed without changing selector order/meaning. The configured source base follows [Tailwind's documented source detection](https://tailwindcss.com/docs/detecting-classes-in-source-files). Generated component/utility class sets in production markup match the baseline apart from next/font's generated family identifiers. Static selector coverage finds no newly missing selectors. Existing unstyled marker/blur-0 tokens are recorded rather than silently described as new regressions.
- Accessibility/SEO: one primary h1 per route (footer phrase now h2 with the same classes/text); name/email autocomplete added. Existing titles/descriptions, labels, alt text, focus styles, viewport zoom and public URLs preserved. Five sampled core text-token pairs have contrast ratios 8.10�17.40:1; this is not a complete state-by-state accessibility audit.
- README: replace obsolete setup/asset/theme descriptions with the current architecture, real commands, current CV path and integration limitations. Retain author/contact information.

## 7. Preserved functionality and regression evidence

Production HTTP verification on this project's own local server at 127.0.0.1:3001 passes for both routes, all seven home section anchors, four featured projects, ten archive cards including Falcon Trading, all 22 orbit icons and 42 mobile skills, twelve code/certificate selectors and two panels, form controls, sound toggle and mobile-navigation semantics. All visible links, image alt text and heading text match the captured baseline. All 68 non-marker public files return 200, PDF signatures are valid, image-optimizer requests return images, and an unknown page returns 404. The zero-byte .gitkeep is not runtime content and is excluded from the asset assertion.

Certificate checks exercise all four selections, panel/preview/PDF correspondence, keyboard wrap/Home/End, failure recovery, 20-second rotation, manual selection continuity, hidden/offscreen/reduced-motion suppression and cleanup. Sound/plus-grid/timeline checks pass. The five new tests cover viewport visibility cleanup, coalesced cursor position/native fallback, paused/resumed code generation, exact rope geometry and scroll-only navigation/mobile-menu behavior. These execute actual source with controlled browser API mocks; they do not assert a real browser render.

Read-only external availability checks: 21 of 24 URLs returned HTTP 200. Churn/Streamlit and Falcon/Render timed out at eight seconds; LinkedIn returned 999. These may reflect cold starts or bot protection, so URLs were retained. A 200 also does not prove the remote application's authenticated workflows work. [Details](external-links.json).

## 8. Validation results

| Check | Result |
| --- | --- |
| Clean lockfile installation | Pass: npm ci --no-audit --no-fund |
| Full lint | Pass: npm run lint; 0 errors, 0 warnings (baseline: 0 errors, 2 warnings in the removed menu) |
| TypeScript | Pass: npx tsc --noEmit |
| Production build | Pass: both routes statically generated |
| New runtime tests | Pass: node scripts/performance.test.mjs; 5/5 |
| Existing targeted regressions | Pass: certificate exhibition/rotation, plus-grid, single-click sound and timeline containment |
| Production HTTP/content/assets | Pass: node scripts/verify-site.mjs against port 3001 |
| Static class/selector parity | Pass: no newly missing CSS selectors; expected font identifier changes only |
| Browser/mobile/visual/WebGL tests | Not available: CUA reports no connected apps/browsers |
| Lighthouse/Core Web Vitals/full accessibility engine | Not measured |

The newly added VM test harness initially redeclared a lexical test variable; its isolated invocation was corrected and all five tests pass. An initial public-file test included the empty .gitkeep marker; runtime asset coverage now explicitly excludes it. These test corrections did not require changing site behavior. No test was deleted or lint rule weakened.

## 9. Remaining issues and deliberate limits

- Real browser hydration, keyboard/focus order, touch, screenshots at phone/tablet/desktop sizes, reduced-motion rendering and 3D interaction still need verification. Source/HTTP checks cannot establish these results.
- The contact form has no delivery service and remains a local acknowledgement. Existing mailto/tel alternatives remain; no message was sent during testing.
- Canonical origin, sitemap, robots policy, Open Graph/Twitter previews and structured data are not configured. No guessed domain or invented professional claims were added. Existing valid metadata is preserved.
- Remote demo availability and LinkedIn bot blocking need separate browser/manual confirmation. Existing recordings already disclose sign-in/service limits where present.
- The 3D model, physics/WASM and illustrated media dominate deferred asset sizes. They remain intentionally used; recompression/replacement without visual quality evidence was not justified.
- Existing Lanyard code filters known upstream Three/Rapier deprecation warnings; this pre-existing behavior was not changed. No claim of a clean real-browser console is made.
- Full JS emitted size and home referenced JS are essentially unchanged. Runtime scheduling/cleanup is improved by code and deterministic tests, but milliseconds, FPS and heap savings were not measured.

## 10. Production readiness

The optimized existing app passes clean installation, lint, type checking, production build, targeted source/runtime tests and production HTTP/content/asset checks. It is build-ready for the current deployment setup, with the remaining browser/accessibility/CWV and contact-delivery checks explicitly outstanding. This is not unconditional production certification. No production deployment, commit, reset or destructive Git operation was performed.

Artifacts: [removal evidence](removed-files.json), [CSS cleanup](css-cleanup.json), [markup parity](markup-parity.json), [CSS coverage](css-coverage.json), [HTTP regression](regression.json), [contrast sample](token-contrast.json), [retained assets](retained-assets.json).
