---
version: alpha
name: Growth Indonesia
description: B2B corporate experiential learning, outbound training, and event management portal.
colors:
  brand: "#EF4444"
  brand-dark: "#DC2626"
  navy: "#0A1628"
  whatsapp: "#25D366"
typography:
  sans:
    fontFamily: Plus Jakarta Sans
  display:
    fontFamily: Outfit
---

# Growth Indonesia

## Overview

Growth Indonesia is a B2B corporate web portal for experiential learning, outbound training, student leadership programs, and institutional event management across East Java. The interface pairs an authoritative dark navy foundation with high-contrast light editorial surfaces and decisive red action accents tailored for enterprise, government, and educational procurement committees.

## Colors

- **Navy (`navy`):** Primary dark canvas used for hero stages, tabbed capability showcases, and high-impact B2B conversion banners.
- **Brand Red (`brand` and `brand-dark`):** Primary interactive accent derived from the official identity. Use `brand-dark` for filled primary buttons and normal-weight text on light surfaces to satisfy WCAG AA contrast; reserve `brand` for large display accents, badges, and dark-surface highlights.
- **WhatsApp (`whatsapp`):** Dedicated conversational conversion accent for floating consultation triggers and direct messaging entry points. Pair with dark foreground text or darkened emerald surfaces when rendering light text.
- **Alternating Light Surfaces:** Alternate dark navy sections with pure white and soft slate surfaces so dense procurement details, pricing tiers, budget calculators, and regional venue directories remain scannable.

## Typography

- **Display (`display`):** Used for section headings, hero statements, and numeric impact metrics. Apply bold to black weights with tight letter spacing and balanced line wrapping.
- **Sans (`sans`):** Used for body copy, form controls, navigation links, and structured tables. Maintain relaxed line heights for long-form reading and constrain prose columns to comfortable reading measure.
- **Numeric Discipline:** Apply tabular numerals to all dynamic counters, pricing displays, budget calculator outputs, and step indicators so layout width never shifts when values change.
- **Input Scaling:** Keep mobile form inputs at base body text scale or larger to prevent forced browser viewport zooming on focus.

## Layout

- **Alternating Section Rhythm:** Structure pages as a vertical progression of centered max-width containers that alternate between dark navy storytelling sections and high-clarity light utility sections.
- **Viewport and Safe Areas:** Use dynamic viewport height for full-screen hero stages and drawers so mobile browser address bars do not clip content. Respect device safe-area insets on fixed headers, full-screen mobile navigation dialogs, lightbox controls, and floating action buttons.
- **Responsive Reflow:** Collapse multi-column bento grids, pricing tiers, and split forms into single-column stacks on compact viewports without horizontal overflow. Maintain generous scroll padding below the fixed top navigation bar so anchored sections and focused elements are never obscured.

## Elevation & Depth

- **Surface Hierarchy:** Separate cards and interactive containers using subtle hairline borders paired with restrained ambient shadows on light surfaces, and translucent white borders with backdrop blur on dark navy surfaces.
- **Interactive Feedback:** Restrict hover elevation shifts to fine-pointer devices with true hover capability so touch screens never experience sticky hover states, and pair press interactions with subtle scale-down feedback.

## Shapes

- **Rounded Architecture:** Apply generous rounded corners across buttons, form inputs, cards, and modal sheets to balance institutional authority with approachable hospitality. Use pill geometry for status badges, category tags, and floating action triggers.

## Components

- **Buttons:** Provide primary filled (`brand-dark`), bordered outline, and ghost variants across small, default, and large touch sizes. Enforce uppercase tracking, single-line label discipline, visible keyboard focus rings, and cross-platform minimum touch target heights.
- **Segmented Controls and Tabs:** Group service categories inside a pill-shaped tablist container with an animated active indicator, roving tabindex, and arrow-key navigation.
- **Dialogs and Overlays:** Full-screen mobile navigation menus and media lightboxes must declare modal dialog semantics, lock background page scrolling while open, trap keyboard tab focus within the active overlay, support escape-key dismissal, and restore focus to the triggering control upon closure.
- **Form Fields and Calculators:** Pair every input, select menu, and range slider with an explicit visible label, native autocomplete hints, semantic error alerts, and enlarged slider thumb touch targets.

## Do's and Don'ts

- Do maintain WCAG AA contrast ratios across both dark navy and light slate surfaces, using `brand-dark` for standard-size red buttons and text on light backgrounds.
- Do provide `prefers-reduced-motion` fallbacks that disable continuous marquees, decorative glare, and entrance translations while preserving instant state feedback.
- Do write all user-facing interface copy in formal, specific B2B Indonesian while keeping code identifiers and component logic in English.
- Don't invent unapproved accent colors outside the established navy, brand red, neutral slate, and WhatsApp conversion palette.
- Don't use `outline-none` on interactive elements without pairing it with a high-contrast `focus-visible` ring.
- Don't animate layout-triggering CSS properties; restrict motion transitions to compositor-friendly `transform` and `opacity` properties.
