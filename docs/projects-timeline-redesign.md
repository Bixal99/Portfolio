# Projects timeline and collection

The home page features exactly four projects, in this order: AI Book Assistant,
Eye Blink Morse Detector, Churn Prediction System, and Interview Help.

On desktop, equal-height project previews alternate with vertically centered
descriptions, with 128–176 px between rows. A straight rail follows the Journey section's glowing
fill and moving-tip treatment. Its measured endpoints coincide with the first
and last project nodes. Fill, tip, and active nodes share the same GSAP timeline
progress. Cards reveal with a short depth/position transition when they enter the
viewport, and reset after leaving it. The closing text enters from the right and
leads to `/projects`. Hover and keyboard focus lift the preview cards. Mobile
uses a single column and a left-hand rail. Reduced-motion preferences disable
the scroll and hover transforms.

The project features use Poppins throughout: 600-weight display titles,
400-weight descriptions, and 500-weight category/control labels. The existing
palette remains #080b12 background, #111725 surfaces, #192133 raised surfaces,
#edf1fa foreground, #a8b4cb secondary text, and #8ca5ff accent.

Each preview sits in an inset product-window frame with its actual hostname,
an external link, and a separate playback strip. A slightly offset backing
sheet gives the preview depth. The oversized screenshot overlay and tall
caption footer are removed. Playback controls support play, pause, and resume;
availability notes remain visible. Feature titles use two deliberate lines,
and descriptions, inline technology marks, and actions form one compact group.
No title min-height or bottom-pinned actions create artificial blank space.

The collection page includes all ten projects, category filters, technology/name
search, live links, and available repository links. A compact header leads into
three equal-width card columns on desktop, two on tablets, and one on phones.
Previews share an aspect ratio; each card contains its text, tools, and links.
Featured projects appear first. The collection also reveals cards on scroll.
Existing app recordings are
loaded only after pressing Watch demo and pause when hidden or offscreen.
Interview Help uses an original learning-path graphic, based on the public
repository description, rather than an invented app screenshot.

The supplied CV is served unchanged at `/resume/Mohammad-Bilal-CV.pdf`. Its SHA-256
matches the source in Downloads. All CV controls use the shared resume link and
start a native single-file download immediately. The four previous public PDF
versions were removed. The cover letter was read as reference and was not
published or modified.

Validation: production compilation and TypeScript pass. Source ESLint has no
errors, with two existing image warnings in StaggeredMenu. HTTP checks verify
both routes, featured order/count, ten collection cards, all eighteen existing
media assets, CV content type/hash, and 404 responses for the old CV versions.
Browser visual and interaction checks are unavailable in this session because
neither the in-app browser nor Chrome is connected.
