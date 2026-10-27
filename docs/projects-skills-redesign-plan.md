# Projects and Skills redesign plan

Status: proposed design for review; no UI implementation in this planning pass.

Historical palette note: the user's October 8, 2026 colors-only directive supersedes this plan's black/mint palette. Current source and DESIGN.md use light gray/white surfaces, navy text, and vivid blue accents. The approved composition, typography, content, animations, and interactions remain unchanged; this historical plan and its original verification context are preserved.

## Brief and boundaries

The audience is recruiters and clients evaluating Mohammad Bilal's AI and software engineering work. These sections use Experience mode: the work itself should lead, and the interface should make it easy to inspect. Keep the portfolio's established black/mint identity, Poppins typography, and About Me heading format. Replace the current Projects and Skills compositions while keeping all nine projects and 42 skills accessible.

## What the screenshots tell us

- The project illustration occupies the strongest visual position but does not demonstrate the application.
- Numeric project choices do not tell a visitor what they can explore.
- A large enclosing panel, a repeated tile grid, and uniformly mint icons make the sections feel interchangeable.
- Skill names such as OpenAI and Groq currently use generic symbols instead of actual brand marks.
- Adding more glow or tilt to the current composition would leave these structural problems intact.

## Projects: let the application lead

Use one playable, real walkthrough beside one short project summary. Remove the abstract illustration and the large enclosing card. The video has its own restrained frame; the description sits directly on the page.

```text
  — [section icon] MY PROJECTS

  ┌─────────────────────────────────┐   Generative AI
  │                                 │   Pentagram
  │       REAL APP WALKTHROUGH       │   One concise description.
  │                                 │
  │             ▶ Play              │   Actual stack logos + names
  └─────────────────────────────────┘   Live demo ↗   GitHub ↗

  [HMS poster] [Churn poster] [Blink poster] [Book poster] ...
               Named, selectable project thumbnails
```

- Desktop composition: roughly 60% media and 40% description, with generous separation and a shared vertical center.
- Target around 600px total section height at a typical desktop viewport, including heading and project selection. Cap the video stage near 340px high and contain the entire recording without cropping application controls.
- Keep the summary to the existing factual description. Do not duplicate it with a second highlights list.
- Display authentic stack logos with short labels. Use Lucide icons for navigation and actions, not replacements for technology brands.
- Replace 01–09 navigation with a single horizontal strip of actual app poster thumbnails and recognizable project names. All nine remain accessible; smaller screens can scroll this strip.
- Start with the strongest verified recording, rather than automatically prioritizing the first data-array item.
- Selection updates the video, title, summary, stack, and links together. Transition with a short crossfade and small directional movement; never display a video's title beside a different project's footage.
- Video starts from a genuine poster. Play is explicit, with pause, seeking, replay, and fullscreen controls. Pause when switching projects or leaving the section.
- On mobile, place the media first, the compact summary second, and the thumbnail strip third. Keep the shared heading visible without forcing tiny typography.

### Walkthrough production

The user chose new walkthroughs of the live apps. Record approximately 15–30 seconds per project showing one useful end-to-end interaction: input, action, result. Produce a genuine poster from each recording and optimized MP4/WebM versions. Only load the selected video; other projects initially load small posters.

Verify every application before recording. If a working interaction needs a local backend or access unavailable in the public demo, resolve that dependency or obtain a real existing recording before labeling it a walkthrough. Do not manufacture results or animate screenshots to imitate working video. Pentagram's [repository](https://github.com/Bixal99/Pentagram-Image-Diffusion) describes a local SDXL backend and API-key-dependent console, so a frontend-only visit is not sufficient proof of working image generation.

## Skills: a compact, fixed tool rack

Replace the enclosing board, tabs, and repeated large tiles with five clearly labeled skill bands. All categories are visible at once; each band contains a compact row of genuine technology logos.

```text
  — [section icon] MY SKILLS

  AI & Data    [LangChain] [LangGraph] [Gemini] [OpenAI] [Ollama] ...
  Frontend     [TypeScript] [React] [Next.js] [Tailwind] ...
  Backend      [Node.js] [FastAPI] [Postgres] [Supabase] ...
  Languages    [Python] [JavaScript] [SQL] [C] [C++]
  Tools        [Git] [GitHub] [Docker] [Postman] ...

  Hover/focus: one logo rises gently, reveals its full name and role.
```

- The bands encode real categories rather than arbitrary numbered decoration.
- Use actual brand SVGs from the existing icon package where accurate. Source missing marks from official brand assets and preserve their identity. Use semantic icons only for non-brand concepts such as Computer Vision and SQL.
- Keep logos recognizable. Resting colors are subdued; hover/focus reveals the original brand color rather than applying mint to everything.
- Put short names under marks where space allows. Always provide the full accessible name and full label on hover/focus.
- One hovered logo lifts about 4px, scales subtly, and brightens; neighboring logos may move slightly within reserved space. Names and other content do not jump.
- Focus exposes the same information as hover. Touch reveals the name/role without relying on a pointer. Do not make inert logos look like navigation buttons.
- Desktop: approximately five rows rather than three large rows of tiles inside every category. Mobile: category label above its horizontally scrollable logo band; all 42 skills remain reachable.
- No continuous motion or automatic category switching.

## Shared visual system

| Role | Decision |
| --- | --- |
| Page | Existing black, #000000 |
| Media/control surface | Near-black green, #080e0b |
| Subtle edge | #17231d |
| Primary text | #ffffff |
| Supporting text | #a8b4ad |
| Portfolio accent | Existing mint, #5dd3b6 |
| Headings | Existing Poppins semibold and About Me scale/format |
| Body and labels | Existing Poppins; ordinary body size remains consistent with the page |
| Video timestamps | JetBrains Mono only where useful as data typography |

Brand-logo colors are authentic asset colors, used locally rather than becoming extra theme colors.

## Motion and interaction

- Project thumbnail: small lift, a clearly visible selection edge, and a short title reveal where the name is truncated.
- Main play button: a restrained halo and slight scale on hover; no distortion of the video itself.
- Demo/GitHub links: arrow travels a few pixels on hover/focus, with a crisp pressed state.
- Skills: responsive logo emphasis with spring settling and no repeated spinning.
- Section entrance: one short stagger across meaningful groups, not a separate elaborate effect on all 42 skills.
- Reduced-motion preference removes movement and preserves all content and selection feedback.

## Alternatives considered and critique

1. A grid of nine video cards would make the section long again and divide attention. Rejected.
2. Keeping the illustration carousel and adding a Watch button would hide the strongest evidence and preserve the rejected structure. Rejected.
3. One actual video stage with named poster selection concentrates attention while keeping exploration compact. Proposed.

The distinctive feature is the engineer's own applications in use. The interface's personality comes from the media choreography and the responsive tool rack, while the typography and palette remain part of the existing portfolio.

## Implementation and verification sequence

1. Confirm this composition and the review format: image mockup before code, or implementation from the agreed written plan.
2. Verify live apps, acquire real recordings/posters, and source missing official technology marks.
3. Implement the Projects media stage and named selector, then the fixed Skills bands.
4. Preserve demo/source links, keyboard behavior, native video affordances, and reduced motion.
5. Inspect desktop and mobile together, make one batched correction, and confirm once. Verify playback, switching, loading/failure behavior, reachability of nine projects and 42 skills, and section height.
6. Run the production build, lint, the Impeccable detector, and the prescribed independent design review before completion.

## Approved implementation

The user approved the written composition and chose new live-app recordings. This task proceeds code-led; no lasting workflow preference is recorded. Eye Blink's authentic face-tracking demonstration leads the section. New public site/interface tours are labeled accurately where login or a backend prevents a complete workflow. RetroVerse shows a real Tic-Tac-Toe match. Churn shows a real XGBoost prediction, with its unavailable Gemini retention service disclosed. Recording origins and measurements are in `public/demos/sources.json`.

The implementation uses genuine video/poster media, named selectors, and five fixed skill bands. Only selected footage loads, and playback pauses on selection change, loss of visibility, or leaving the section. Videos preserve native controls. All nine projects and 42 skills remain available.
