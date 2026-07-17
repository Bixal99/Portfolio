# Hero Section Redesign Spec

## Overview
Redesign the portfolio's Hero section to draw inspiration from a reference site's layout while maintaining the current project's unique identity. The goal is to shift from a center-aligned, text-heavy hero to a more impactful, problem-solving focused layout with clear calls to action.

## Architecture & Components

### 1. Background
- **Decision**: Retain the existing `InteractiveGridBackground` component.
- **Reasoning**: The user explicitly requested to keep their current interactive grid background rather than adopting the reference site's constellation/network effect.

### 2. Hero Layout (`HeroSection.tsx`)
- **Headline**: "Building Scalable Solutions for Real-World Problems"
  - Styling: Large, bold white text.
  - Accent: Apply a gradient (using the theme's `--accent` color) to the words "Scalable Solutions" to make them pop.
- **Subtitle**: "Hi, I am Mohammad Bilal, an AI Engineer specializing in [Typewriter]"
  - Styling: Smaller, readable text.
  - Component: Integrate the existing `TypewriterLine` component at the end of the sentence to rotate through skills (e.g., "Computer Vision", "Generative AI", "Machine Learning").
- **Call-to-Action Buttons**:
  - **Primary Button**: "View Projects" (Solid `--accent` background, dark text, hover effect).
  - **Secondary Button**: "Download Resume" (Outline with `--accent` border and text, transparent background, hover effect).
  - Layout: Placed side-by-side below the subtitle.
- **Stats Section**:
  - Layout: A clean horizontal row of stats (e.g., "Solutions Delivered", "Success Rate") placed directly below the CTA buttons.
  - Data: Sourced from `heroStats` in `src/data/portfolio.ts`.

### 3. Navigation (`Navbar.tsx`)
- **Decision**: Retain the current center-aligned navigation links.
- **Reasoning**: The user opted to keep their existing navigation structure rather than switching to the reference site's minimalist social-links-only navigation.

## Data Flow
- `src/data/portfolio.ts` will need to be updated to ensure `heroStats` has the correct data (if not already present or if it needs to match the new design's vibe).
- `profile.intro` and `profile.thesis` might be repurposed or replaced by the new hardcoded/data-driven headline and subtitle.

## Error Handling & Edge Cases
- Ensure the typewriter component handles varying text lengths gracefully without causing layout shifts.
- Ensure the CTA buttons stack vertically on very small mobile screens to prevent overflow.

## Testing
- Verify responsive layout on mobile, tablet, and desktop.
- Verify the gradient text renders correctly across different browsers.
- Ensure the interactive grid background remains fully functional behind the new hero content.
