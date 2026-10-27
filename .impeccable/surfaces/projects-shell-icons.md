# Projects page shell and icon presentation — October 27, 2026

Mode: Experience. User requests a fast direct redesign of /projects header/footer/back-link placement, plus project technology icons matching the portfolio reference: large colored marks, circular hover highlight and name tooltip. Preserve the existing Poppins/dark/accent palette, all project content, equal-card layout, contact data, social URLs and CV download.

Header: compact shared-width navigation with a left-aligned plain back arrow/label, centered identity and right-hand GitHub/LinkedIn icons; mobile keeps back/socials and moves identity responsibility to page/footer. No isolated circle on the right or sticky overlay.

Footer: connected two-line contact heading, clear email CTA with arrow well, compact CV download and a restrained bottom row of identity, role, email and social icons. Existing resume href and download filename preserved. Home portfolio Footer.tsx and ResumeDownloadButton behavior elsewhere are untouched.

Technology reference: remove outlined text chips. Shared list uses genuine colored 30px brand marks in 44px spaces; circular brand-color outline/light and short name tooltip appear on hover/focus. Icons are focusable named images for keyboard inspection. Touch shows names below icons; reduced motion retains color/state without spatial movement. Same shared component reaches home featured cards and /projects, while orbit implementation remains untouched.

Quality bar: back action starts the header reading order, balanced responsive shell width matches cards, no huge footer void, original email/social/download targets stay reachable, icon names remain available to assistive technology and touch. No generated assets or global visual-system changes. Prior root design-doc drift is retained.
