---
name: Mohammad Bilal Portfolio
description: The user-approved light gray, navy, and blue portfolio, with established Poppins typography and authentic software media.
colors:
  background: "#eceef2"
  foreground: "#10172f"
  surface: "#ffffff"
  surface-soft: "#e3e7ee"
  muted: "#44516b"
  edge: "#c7ceda"
  accent: "#254cdb"
  accent-hover: "#183aa8"
  accent-soft: "#dfe7ff"
  on-accent: "#ffffff"
typography:
  display:
    fontFamily: "var(--font-poppins), Poppins, Arial, Helvetica, sans-serif"
    fontSize: "clamp(1.85rem, 11vw, 7.15rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
  headline:
    fontFamily: "var(--font-poppins), Poppins, Arial, Helvetica, sans-serif"
    fontSize: "clamp(1.55rem, 7.5vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.05em"
  title:
    fontFamily: "var(--font-poppins), Poppins, Arial, Helvetica, sans-serif"
    fontSize: "clamp(25px, 2.65vw, 38px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  body:
    fontFamily: "var(--font-poppins), Poppins, Arial, Helvetica, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "28px"
  project-body:
    fontFamily: "var(--font-poppins), Poppins, Arial, Helvetica, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.8
  action-label:
    fontFamily: "var(--font-poppins), Poppins, Arial, Helvetica, sans-serif"
    fontSize: "13px"
    fontWeight: 500
  skill-label:
    fontFamily: "var(--font-poppins), Poppins, Arial, Helvetica, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  thumbnail: "6px"
  control: "8px"
  field: "12px"
  media: "14px"
  container: "16px"
  circle: "50%"
spacing:
  tight: "4px"
  compact: "8px"
  small: "12px"
  regular: "16px"
  separated: "24px"
  section-compact: "32px"
  generous: "48px"
components:
  button-demo:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.action-label}"
    rounded: "{rounded.control}"
    padding: "0 18px"
  button-demo-hover:
    backgroundColor: "{colors.accent-hover}"
  project-media:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.media}"
    height: "300px"
  project-thumbnail:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.thumbnail}"
    height: "53px"
  skill-control:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.container}"
    padding: "16px 10px"
    width: "138px"
    height: "138px"
  input-field:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
---

# Design System: Mohammad Bilal Portfolio

## Overview

**Creative North Star: "The engineer's own work"**

This records the portfolio after the user's October 8, 2026 colors-only directive, which supersedes the earlier black/mint palette across the codebase. Light gray provides the canvas, navy carries primary text, and vivid blue identifies important words and actions. Established Poppins typography, layout, content, animations, and interactions remain intact. The engineer's software and authentic technology marks supply visual variety.

The scoped extension is compact: media has a restrained frame, explanation sits on the page, and Skills now uses two moving rows of technology cards. The later Skills instruction replaces its earlier open-band treatment without replacing the portfolio identity or other sections.

**Key Characteristics:**

- Light gray page, white surfaces, navy text, and vivid blue emphasis.
- Uppercase Poppins section headings in the About Me format.
- Open compositions with subtle edges around controls and media.
- Authentic application footage and recognizable technology artwork.
- Short interaction feedback with keyboard, touch, and reduced-motion equivalents.

## Colors

One vivid blue portfolio accent sits against light gray and white surfaces with navy text; local technology and application colors retain their own identity.

### Primary

- **Vivid blue accent:** important heading words, section icons and lines, selected project edges, selected skill names, and primary demo actions.
- **Deep blue hover:** the demo action's darker hover state.
- **Soft blue accent:** pale selected and supporting accent surfaces where used by the existing components.

### Neutral

- **Light gray background:** page.
- **Navy foreground:** primary headings and active skill labels.
- **White surface:** project media, thumbnails, navigation, and the contact container.
- **Soft gray surface:** settled contact fields and supporting surfaces.
- **Gray edge:** media borders and Skills card edges.
- **Muted slate:** project descriptions, media notes, and resting skill labels.
- **White on-accent:** text on filled blue actions and the active navigation item.

**The Identity Accent Rule.** Blue belongs to the portfolio interface. Preserve authentic colors inside application media and multicolor technology artwork rather than recoloring them to extend the theme. Monochrome technology marks use navy for legibility on the light canvas. XGBoost's original white wordmark lettering keeps a navy backing rather than altering the PNG artwork.

## Typography

**Display Font:** Poppins, loaded through next/font; Arial, Helvetica, and sans-serif are the body fallbacks.

**Body Font:** the same Poppins family. JetBrains Mono is installed for existing data-oriented uses; the Projects and Skills extension does not introduce a separate mono text role.

The large type is bold and geometric. Supporting copy is quieter and factual; tight heading tracking is not applied to reading text.

### Hierarchy

- **Display:** the hero name uses the display token. At the small breakpoint its tracking becomes (0.05em).
- **Headline:** section headings use the headline token on mobile, (60px) at the small breakpoint and (72px) at the large breakpoint. They retain the same weight, tight tracking, and line height.
- **Title:** the selected project uses the title token, with a mobile override of (28px).
- **Body:** About copy uses the body token and becomes (20px) with a (36px) line height at the small breakpoint.
- **Project body:** uses its compact reading token, a (48ch) maximum measure, and a mobile size of (14px).
- **Action label:** demo and source actions use the action label size; the demo action carries medium weight.
- **Skill label:** names remain visible under each mark using the skill-label token, becoming (10px) on mobile. Category labels use (10px) and appear on hover, keyboard focus, or touch selection.

**The About Heading Rule.** Section headings begin with a blue line and a relevant SVG icon, followed by bold uppercase Poppins with the final word in blue. The line grows from (32px) to (64px); icons grow from (32px) to (56px), then (64px).

## Layout

The main content uses a centered maximum width of (80rem), with horizontal gutters of (20px), (32px) at the small breakpoint, and (48px) at the large breakpoint. Existing full-width hero and footer compositions remain part of the incumbent page.

Projects uses an open two-column grid of (1.3fr / 1fr), vertically centered, with a gap of (clamp(24px, 4vw, 56px)). The media is (300px) tall at desktop and (290px) at widths up to (1000px). At widths up to (760px), it becomes a single column in media-first order with a (16 / 10) media aspect ratio, followed by summary and the horizontally scrollable project strip. Video content is contained, preserving application controls rather than cropping them. Projects has (32px) vertical padding; its section heading has a (32px) bottom gap.

Skills splits all 42 entries into two rows of 21, duplicated for seamless loops. The top moves right and the bottom moves left. Cards are 138px square with 22px gaps, becoming 110px square with 16px gaps on mobile. The backdrop stays plain; only the rows fade across 18px at desktop edges and 10px on mobile. There are no scrollbars, pause button, or footer labels. See `.impeccable/surfaces/skills-marquee.md`.

The spacing tokens describe recurring steps, not a requirement to replace source values such as the project strip's (10px) gap or the video caption's (10px) top padding.

## Elevation & Depth

Depth uses a hybrid of gray/white surfaces, fine gray borders, blue hover rings, blur, and localized blue glow. Skills cards add an offset backing, pointer-following spotlight, with upright hover states, scoped to that section. Existing hero, navigation, and contact components retain their ambient depth and motion; the approved refresh changes their colors without changing their structure.

### Shadow Vocabulary

- **Resting elevation ring:** `var(--shadow-border)` defines a gray surface edge.
- **Hover elevation ring:** `var(--shadow-border-hover)` changes that edge to blue.
- **Heading line glow:** localized blue light around the short accent line.
- **Play control depth:** a soft navy shadow at rest, becoming a blue halo on hover or focus.

Exact shadow values and motion timings live in the sidecar; they extend the frontmatter rather than creating a second palette or type source.

## Shapes

The extension uses gently rounded media, small thumbnail corners, and modestly rounded rectangular actions. Circular arrow and play controls remain distinct from the rectangular demo action. Existing navigation and hero controls use full pill silhouettes; contact fields and their enclosing form use the field and container radii. Skills uses rounded square cards with (16px) corners, becoming (14px) on mobile, and an offset backing inspired by the user's reference.

## Components

### Buttons and links

The demo action uses blue fill, white on-accent text, the control radius, horizontal padding, and a minimum interactive height of (44px). Hover deepens its fill; its arrow moves (2px) right and up on hover or focus. Source links remain unfilled, with blue hover text. Project controls have a blue focus outline of (2px), offset by (4px); skill controls use the same outline width with a (2px) offset. Pressed project buttons scale to (0.97).

### Navigation

The original navbar composition is restored: brand at left, an independent centered rounded navigation pill, and labeled social icons at right. Equal side columns keep the pill centered; the outer row has no enclosing panel, border, or rounded frame. The pill, brand, social labels, and mobile menu adapt to the actual light content surface at navbar height. A soft fading background protects readability without a solid full-width wall.

### Inputs / Fields

Existing contact inputs begin in rounded light gray shells with gray elevation rings and navy input text; settled empty fields use the soft gray surface. Focus activates a white surface, blue underline, tint, and diffuse ambient depth through the component's existing GSAP behavior. Their functional labels are uppercase; this field pattern is separate from section-heading grammar. Only their colors changed in this refresh.

With reduced motion enabled, contact fields retain static focus feedback independently of GSAP: a white surface, a blue (1px) outer ring, and a blue field label. The normal-motion underline, label movement, and ambient focus animation are not required to identify the focused field.

The contact submit action retains its blue fill, white label, and existing hover motion. Its moving decorative shine uses translucent white at (35%) opacity; an opaque white sweep would obscure the white label.

### Projects media and named strip

One selected article coordinates footage, title, factual summary, stack, and links. Eye Blink Morse leads. Each project has an actual video and poster; only the selected video is mounted, with preload disabled. Play is explicit. Once started, native controls expose pause, seeking, replay, and fullscreen. Playback pauses on selection change, document hiding, or leaving the observed video area. Failed footage retains the genuine poster and offers a live-app recovery link.

The named poster strip is the only project picker and reaches all nine entries. Selected thumbnails gain blue borders and labels; hover lifts a selector (3px) and restores poster opacity. Previous and next controls cycle through the same collection. Short transitions exchange the complete article together, avoiding mismatched footage and text. The media failure overlay uses navy and white, with a locally lighter blue recovery link for contrast.

Media captions distinguish recorded demonstrations, prediction, gameplay, public site tours, and interface tours. They disclose unavailable sign-in, database, SDXL, or retention dependencies where applicable. Source provenance stays in `public/demos/sources.json`; a tour is never promoted to evidence of an unavailable workflow.

### Technology marks and Skills marquee

All 42 skills retain genuine brand marks. The marquee opts into 15 locally stored Devicon v2.16.0 original SVG logos, retaining their original colors. Other shared TechnologyMark consumers retain their existing rendering. Marquee marks are 54px square (42px on mobile), with wordmark widths of 76px (62px mobile). Asset provenance and MIT license are stored in public/icons/skills.

The top row loops right over 76s and the bottom loops left over 83s; mobile durations are 58s and 64s. Hover lifts cards, scales marks, reveals categories, and applies a pointer-following spotlight without tilt. Hover, clicks, and focus never interrupt or reset the track animation. Cards are informational list content, without button semantics or selection state. Hidden clone lists are excluded from accessibility.

Only offscreen and hidden-document states suspend activity. Reduced motion removes animation and interactive transforms and wraps all original skills into a static grid, with no scroller. The user explicitly removed the motion control, hover pause, click selection, scrollbar, grid backdrop, and bottom copy in the latest correction.

## Do's and Don'ts

### Do:

- **Do** preserve the user-approved light gray, navy, and blue palette with existing Poppins typography and the About Me section-heading grammar.
- **Do** limit the color refresh to color assignments while retaining existing layout, content, animations, and interactions.
- **Do** retain genuine application footage, honest media labels, original technology artwork, and equivalent hover, focus, and tap information.
- **Do** keep compact Projects and the two-row Skills marquee scoped to these sections, with every project and skill reachable.
- **Do** keep visible focus and reduced-motion selection feedback when extending the interaction patterns.

### Don't:

- **Don't** replace authentic software footage with abstract stand-in illustrations in Projects.
- **Don't** add a second full project collection or return Skills to orbiting content. Keep its user-authorized continuous rows and keep all original skill names accessible.
- **Don't** recolor original multicolor technology artwork as a blue substitute or imply unavailable backend output.

Not canonized: the pre-existing hero greeting eyebrow was not promoted into house rules. The existing navigation's social-link text is hidden on small screens while its SVGs are aria-hidden, leaving those links without accessible names; this source finding was not repaired within the colors-only boundary. Historical black/mint palette statements are superseded by the user's color directive. The plan's 340px media cap and approximate section-height target are directional; the implemented media values above are the source of truth.


### White About and credential folio

The November 1 refinement scopes the white palette to About and Certifications through LightSection. A full-width white background preserves the existing content gutters and does not alter the surrounding dark page. Local tokens: white #ffffff, navy #14213d, muted slate #52627a, blue #245cdb, soft blue #eef4ff, cool border #dce4ef. Keep Poppins for headings/body and use the existing JetBrains Mono only for PDF metadata and slide position.

About retains its original grid, spacing, four bullets, photo, and 3D lanyard settings. Its frame uses a cool light surface with a subtle shadow. Certifications reverses the previous emphasis: genuine certificate artwork appears first in a pale-blue folio with straight stacked-paper edges, while the issuer, title, completion date, topics, and PDF actions occupy the adjacent column. Mobile stacks the document above its details. There is no hover tilt, visible selector strip, pause button, verification claim, or fabricated credential. Five-second visibility-aware rotation and keyboard navigation remain.

All new styling uses Tailwind utilities. Light-theme body, muted, accent, and chip-label pairings were checked for at least 4.5:1 contrast. Source, served-HTML, slideshow, and build checks do not substitute for rendered visual review; the browser host remained unavailable.


### Softer section transitions and matching project connectors

The latest November 1 correction supersedes the pure-white section treatment: About and Certifications use cool slate-blue #dbe2f0, surface #e6ecf6, navy #14213d, muted #40526c, and deeper blue #1f50c6 for readable accent labels. Full-bleed 80px/112px/144px gradient bands connect the dark canvas to the tinted content surface and back. Text remains on the solid light surface. This follows the cool blue-gray transition direction of the user-supplied Huly reference, whose styles were inspected at https://huly.io/. Certificate artwork retains its original white paper.

Projects open and close with the same code-bracket terminal and outward-drawing branches; the rejected sparkle is removed. The rail measures its start from the introductory connector and its end from the outro connector, with both markers aligned to the measured desktop/mobile rail position. Reduced motion renders both connectors completed.


### Latest restoration: navbar, Journey, archive circle, and portrait

Preserve the original navbar design; future navigation changes should address alignment and surface-aware colors only. The archive link is once again a 180px circle (164px mobile) with an upward arrow, readable label/count, and a bottom-up color fill on hover, never rotation. The outro lead-in is 26?36px, main line 40?64px, and supporting copy 16?17px.

Journey removes the subtitle and university joining entry, retaining Matric, FSC, and June 2026 Graduation. Cards use 14?16px labels, 15?17px body copy, a restrained semibold title, and 48?56px icon tiles. Matching graduation-cap junctions open and close the measured rail; branches draw outward and the ring follows scroll progress. Reduced motion shows completed junctions and visible cards. The About portrait retains its original image, dimensions, and physics but uses a dark blue radial backdrop within the surrounding lighter section.


Latest navbar screenshot refinement: restore the original wide pill proportions (630px by 58px on large desktops), bold uppercase 14px name with generous tracking, 24px outlined GitHub/LinkedIn icons, and labeled social links. The outer alignment row returns to its original 1600px maximum width and has no surrounding frame; symmetric columns still center the navigation. The header is transparent at the top, with a soft readability fade only after scrolling. Existing light-surface detection adapts pill, text, border, active state, and mobile-menu colors.


Latest certificate replacement: remove the MY CERTIFICATIONS heading, credential-count badge, sidebar details, and stacked-paper folio. Use a Credentials heading and a full-width midnight-blue display with the genuine document centered at up to 700px. Issuer/slide position sit above the document; title, type, date, and PDF open/download actions sit in a horizontal footer, stacked responsively. Topics appear below the display. Five-second rotation and keyboard/reduced-motion behavior remain. Navbar maximum row width is reduced from 1600px to 1440px to bring the name and social links inward while keeping the original centered pill dimensions.


Latest certificate simplification supersedes the centered dark display: retain the standard line/icon/accent-word heading as MY CERTIFICATES, with the new optional compact SectionHeading variant used only here. Cap the document at 600px, keep title/issuer/date and PDF actions beneath, and remove all promotional copy, topics, visible counters, dark framing, and decorative borders. Keep five-second rotation, keyboard navigation, reduced motion and preview failure recovery. Other section headings retain their existing sizes.


Latest certificate interaction: keep only each certificate image and its name. Remove organization/issuer/date metadata and all visible open/download buttons. A single link wraps the preview and name, opens the corresponding PDF with target=_blank and noopener noreferrer, and has no download attribute. Four persistent preview/name layers crossfade over 700ms at each five-second advance, preserving layout and avoiding image-remount flashes; reduced motion removes transitions. Inactive layers are aria-hidden and only one link is focusable.


Certificate transition refinement: use a 900ms soft morph with gentle displacement (0?12?0), blur, opacity, and 0.98?1 scale. Names blur/fade in sync. The SVG noise field is static and only its displacement strength animates during changes; reduced motion and first render skip the warp, and cleanup restores zero displacement. Five-second rotation, name-only presentation, and single new-tab PDF link remain.
