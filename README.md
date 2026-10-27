# Mohammad Bilal Nadeem Portfolio

An existing personal portfolio built with Next.js 16.2, React 19.2, TypeScript, Tailwind CSS 4, GSAP and Motion. The current interface uses a dark palette and Poppins. The interactive ID card uses React Three Fiber, Drei, Rapier, Three.js and MeshLine.

## Application

- `/`: hero and typewriter, About with draggable 3D ID card, four featured projects, desktop skill orbits/mobile skill list, journey, certificate gallery, and contact footer.
- `/projects`: ten project cards, illustrated covers, recorded demos where available, live/source links, CV download and portfolio navigation.
- Shared: custom pointer on supported devices, click feedback and persistent sound preference.

The certificate gallery advances every 20 seconds while visible, supports manual and keyboard selection, and respects reduced motion. Recorded demos load only after activation. The 3D card loads when its section is reached and pauses while offscreen or hidden.

## Development

Use the existing npm lockfile and Node.js version supported by Next.js 16.

```sh
npm ci
npm run dev
```

The default development address is `http://localhost:3000`. Production commands:

```sh
npm run lint
npx tsc --noEmit
node scripts/performance.test.mjs
npm run build
npm run start
```

There is no `npm run test` or `npm run typecheck` alias. The commands above invoke the actual tools.

To measure emitted build files and verify a running production server:

```sh
node scripts/measure-build.mjs docs/performance/latest.json
node scripts/verify-site.mjs http://127.0.0.1:3000
```

The measurement script runs a production build. Its raw/gzip byte counts describe emitted files, not observed browser transfer or Core Web Vitals. The HTTP check does not replace browser, keyboard, touch or WebGL testing.

## Code and assets

| Location | Purpose |
| --- | --- |
| `src/app` | Server-rendered routes, global styles, font loading and metadata |
| `src/components` | Portfolio sections and interactive components |
| `src/data/portfolio.ts` | Profile, navigation, skills, journey, project and social content |
| `src/data/projectMedia.ts` | Demo recordings and project slugs; order matches the projects array |
| `src/data/projectCatalog.ts` | Combines project content/media and chooses the featured projects |
| `src/data/certificates.ts` | Certificate facts, skills and identifiers |
| `public/covers/posters` | Project illustrations and generation provenance |
| `public/demos` | Recorded walkthroughs and capture provenance |
| `public/certificates` | Original PDFs and preview images |
| `public/resume/Mohammad-Bilal-CV.pdf` | Current CV download |
| `public/Me.jpeg` | ID card portrait |
| `public/journey` | Journey images |
| `public/lanyard` | 3D card model and strap texture |

Tailwind scans `src` explicitly. Keep complete utility names in source rather than assembling fragments. The current design tokens are in `src/app/globals.css`; component CSS modules own local presentation.

## Integrations and deployment

This app has no custom API routes or server-side contact delivery. The existing form acknowledges input locally; the mail link opens the visitor's email application. Do not treat the local acknowledgement as delivery confirmation.

The current Vercel/Next.js configuration remains in place. Both application routes are statically generated. Environment files are ignored and must remain private; no environment values are required by the current application source. Preserve existing deployment settings. No production deployment is performed by the validation scripts.

A canonical production origin, sitemap, Open Graph/Twitter preview configuration and a real message-delivery integration remain separate configuration decisions. Do not guess the public domain or invent personal claims.

See [the cleanup and performance report](docs/performance/cleanup-report.md) for measured before/after results, removal evidence, validation limits and outstanding checks.

## Author

**Mohammad Bilal Nadeem**

- Location: Doha, Qatar
- Email: `bilalnadeema302003@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/mohammad-bilal-64489827b/`
