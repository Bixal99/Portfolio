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
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.45
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
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "8px 2px"
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

The scoped extension is compact and open: media has a restrained frame, explanation sits on the page, and tools form labeled bands. This is a description of the shipped source, not a replacement brand or a preferred workflow for future tasks.

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

- **Light gray background:** page and mobile skill detail region.
- **Navy foreground:** primary headings and active skill labels.
- **White surface:** project media, thumbnails, navigation, and the contact container.
- **Soft gray surface:** settled contact fields and supporting surfaces.
- **Gray edge:** media borders and skill-band dividers.
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
- **Skill label:** names remain visible under each mark. Category labels use (13px), medium weight; the shared role region uses (12px) and a (1.6) line height.

**The About Heading Rule.** Section headings begin with a blue line and a relevant SVG icon, followed by bold uppercase Poppins with the final word in blue. The line grows from (32px) to (64px); icons grow from (32px) to (56px), then (64px).

## Layout

The main content uses a centered maximum width of (80rem), with horizontal gutters of (20px), (32px) at the small breakpoint, and (48px) at the large breakpoint. Existing full-width hero and footer compositions remain part of the incumbent page.

Projects uses an open two-column grid of (1.3fr / 1fr), vertically centered, with a gap of (clamp(24px, 4vw, 56px)). The media is (300px) tall at desktop and (290px) at widths up to (1000px). At widths up to (760px), it becomes a single column in media-first order with a (16 / 10) media aspect ratio, followed by summary and the horizontally scrollable project strip. Video content is contained, preserving application controls rather than cropping them. Projects has (32px) vertical padding; its section heading has a (32px) bottom gap.

Skills uses five open bands: AI & Data, Frontend, Backend, Languages, and Tools. Desktop bands have a (120px) label column, a flexible mark row, a (16px) gap, and a minimum height of (96px). Marks wrap as needed; their allocations are normally (68px), becoming (66px) at widths of at least (1100px). On mobile up to (760px), category names sit above scrollable rows with (64px) allocations. The shared role region moves above the bands and sticks (68px) below the viewport top, below the compact navigation. The page, body, and section clipping use overflow-x: clip so the region can remain sticky.

The spacing tokens describe recurring steps, not a requirement to replace source values such as the project strip's (10px) gap or the video caption's (10px) top padding.

## Elevation & Depth

Depth uses a hybrid of gray/white surfaces, fine gray borders, blue hover rings, blur, and localized blue glow. The extension's open text and skill bands do not require a raised enclosing panel. Existing hero, navigation, and contact components retain their ambient depth and motion; the approved refresh changes their colors without changing their structure.

### Shadow Vocabulary

- **Resting elevation ring:** `var(--shadow-border)` defines a gray surface edge.
- **Hover elevation ring:** `var(--shadow-border-hover)` changes that edge to blue.
- **Heading line glow:** localized blue light around the short accent line.
- **Play control depth:** a soft navy shadow at rest, becoming a blue halo on hover or focus.

Exact shadow values and motion timings live in the sidecar; they extend the frontmatter rather than creating a second palette or type source.

## Shapes

The extension uses gently rounded media, small thumbnail corners, and modestly rounded rectangular actions. Circular arrow and play controls remain distinct from the rectangular demo action. Existing navigation and hero controls use full pill silhouettes; contact fields and their enclosing form use the field and container radii. Skill controls reserve an interaction area while remaining visually open, without repeated visible tile backgrounds.

## Components

### Buttons and links

The demo action uses blue fill, white on-accent text, the control radius, horizontal padding, and a minimum interactive height of (44px). Hover deepens its fill; its arrow moves (2px) right and up on hover or focus. Source links remain unfilled, with blue hover text. Project controls have a blue focus outline of (2px), offset by (4px); skill controls use the same outline width with a (2px) offset. Pressed project buttons scale to (0.97).

### Navigation

The fixed header is transparent at the top and becomes the light gray page color with blur and a gray bottom edge after (48px) of scrolling. Header height is (64px), increasing to (80px) at the small breakpoint. Desktop navigation appears from (1024px) as a white pill with a blue active indicator and white active text. Smaller widths use a (44px) menu control and a light gray expanded link list.

### Inputs / Fields

Existing contact inputs begin in rounded light gray shells with gray elevation rings and navy input text; settled empty fields use the soft gray surface. Focus activates a white surface, blue underline, tint, and diffuse ambient depth through the component's existing GSAP behavior. Their functional labels are uppercase; this field pattern is separate from section-heading grammar. Only their colors changed in this refresh.

With reduced motion enabled, contact fields retain static focus feedback independently of GSAP: a white surface, a blue (1px) outer ring, and a blue field label. The normal-motion underline, label movement, and ambient focus animation are not required to identify the focused field.

The contact submit action retains its blue fill, white label, and existing hover motion. Its moving decorative shine uses translucent white at (35%) opacity; an opaque white sweep would obscure the white label.

### Projects media and named strip

One selected article coordinates footage, title, factual summary, stack, and links. Eye Blink Morse leads. Each project has an actual video and poster; only the selected video is mounted, with preload disabled. Play is explicit. Once started, native controls expose pause, seeking, replay, and fullscreen. Playback pauses on selection change, document hiding, or leaving the observed video area. Failed footage retains the genuine poster and offers a live-app recovery link.

The named poster strip is the only project picker and reaches all nine entries. Selected thumbnails gain blue borders and labels; hover lifts a selector (3px) and restores poster opacity. Previous and next controls cycle through the same collection. Short transitions exchange the complete article together, avoiding mismatched footage and text. The media failure overlay uses navy and white, with a locally lighter blue recovery link for contrast.

Media captions distinguish recorded demonstrations, prediction, gameplay, public site tours, and interface tours. They disclose unavailable sign-in, database, SDXL, or retention dependencies where applicable. Source provenance stays in `public/demos/sources.json`; a tour is never promoted to evidence of an unavailable workflow.

### Technology marks and Skills bands

Forty-two skills remain in five static bands. Marks are (29px) square by default; XGBoost reserves (64px / 34px), and PyMuPDF reserves (50px / 38px) so their original artwork fits. Those two assets are images, not monochrome masks. XGBoost's image sits on the navy foreground color so its authentic white lettering remains readable against the light page; its PNG colors are preserved. Their resting grayscale and opacity are removed during hover, focus, or selection. Other brand silhouettes use their source icon or mask and reveal their associated brand color on interaction; monochrome marks such as Next.js, OpenAI, and GitHub use navy. Computer Vision and SQL use semantic SVGs because they are concepts.

Hover, focus, and tap select one full name and role in a shared live region. On desktop this region remains beneath the bands; only mobile moves it above the bands and makes it sticky. The selected state persists until another tool is selected. Emphasis lifts a mark (4px) and scales it to (1.1), without moving names or surrounding content. Reduced motion removes transformations and transitions while preserving selection and role information. No orbit or automatic category switching is introduced.

## Do's and Don'ts

### Do:

- **Do** preserve the user-approved light gray, navy, and blue palette with existing Poppins typography and the About Me section-heading grammar.
- **Do** limit the color refresh to color assignments while retaining existing layout, content, animations, and interactions.
- **Do** retain genuine application footage, honest media labels, original technology artwork, and equivalent hover, focus, and tap information.
- **Do** keep compact Projects and static Skills behavior scoped to these sections, with every project and skill reachable.
- **Do** keep visible focus and reduced-motion selection feedback when extending the interaction patterns.

### Don't:

- **Don't** replace authentic software footage with abstract stand-in illustrations in Projects.
- **Don't** add a second full project collection or return Skills to orbiting content, automatic cycling, or a large repeated tile grid.
- **Don't** recolor original multicolor technology artwork as a blue substitute or imply unavailable backend output.

Not canonized: the pre-existing hero greeting eyebrow was not promoted into house rules. The existing navigation's social-link text is hidden on small screens while its SVGs are aria-hidden, leaving those links without accessible names; this source finding was not repaired within the colors-only boundary. Historical black/mint palette statements are superseded by the user's color directive. The plan's 340px media cap and approximate section-height target are directional; the implemented media values above are the source of truth.
