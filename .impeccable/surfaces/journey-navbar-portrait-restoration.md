# Journey, navbar, portrait and circle restoration

User correction: restore the old navbar design while fixing centering/background color; restore the archive circle; increase left outro text; remove Journey subtitle and university joining card; improve Journey cards and add matching animated endpoints; replace the bright portrait stage.

Skills: senior-frontend ? epic-design for the Journey branch only. Main thread handled navbar, portrait and archive circle. No framework, rendering architecture, dependencies, or physics behavior changed.

Navbar: transparent outer row with equal desktop side columns, separate original rounded navigation pill, name and labeled GitHub/LinkedIn. A light-surface crossing at navbar height switches local color tokens; a soft fading guard keeps text readable. Mobile menu and scroll-driven selection remain.

Journey: three factual milestones (Matric, FSC, Graduation), original images and dates, larger readable body/labels/titles and icons. Matching graduation-cap connectors align with the rail at x32 and measured y0/height?40. Transform-based branch reveal, fading endpoint tip and one scroll-linked ring respect reduced motion. Removed duplicate university joining card and visible subtitle.

Projects: restore 180px/164px circular archive action, upward arrow, live project count, bottom-up accent fill with no tilt. Outro lead-in/body enlarged. Portrait: dark blue radial stage and local lanyard wrapper transparency preserve original image, drag behavior, dimensions and physics inside the lighter section.

Validation: lint and five performance/navigation tests passed; the navigation test now verifies light/dark switching as well as scroll selection and mobile dismissal. Served-HTML/source checks confirm three Journey cards, both endpoints, no removed text, original pill composition, dark portrait backdrop and upright circular action. Production build result is in the task response. Rendered visual review remains unavailable due to the existing browser-host blocker. No Lighthouse or field performance scores are claimed.
