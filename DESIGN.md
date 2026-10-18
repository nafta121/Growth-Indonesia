# DESIGN - Growth Indonesia
**Project:** Growth Indonesia Corporate Web Portal  
**Platform:** Next.js 15 (App Router), Tailwind CSS, OpenNext Cloudflare Workers  
**Primary AI Agents:** Google Jules (Code/Logic) & Google Stitch (UI/UX MCP)

---

## 1. AI AGENT DIRECTIVES
- **For Google Stitch:** Use the "Design System & Visual Tokens" section to generate Tailwind utility classes. Do not invent new colors outside the defined palette. Maintain B2B corporate aesthetics (high contrast, trust-inducing).
- **For Google Jules:** Strict adherence to Next.js 15 asynchronous `params` (`await params`). Do not break existing SEO metadata, `dangerouslySetInnerHTML` JSON-LD schemas, or the `open-next.config.ts` deployment pipeline. Write code logic in English, but keep UI text/copywriting in professional Indonesian (Bahasa Indonesia baku).

---

## 2. BRAND IDENTITY & POSITIONING
- **Entity:** Growth Indonesia
- **Tagline:** Let's Grow with us
- **Sub-Brand Focus:** Consultant • Creative • Travel
- **Headquarters:** Jl. Mujair No.3, Nambangan Kidul, Kota Madiun
- **Contact:** +62 857-0474-8186
- **Vision:** "Terbaik dan terpercaya dalam layanan training & development untuk mewujudkan kualitas SDM yang unggul dan bersikap mental positif."
- **Mission:** 
  1. Menyediakan layanan pengembangan SDM yang profesional dan kreatif.
  2. Membangun budaya berkelanjutan dengan sikap positif.
  3. Menciptakan layanan yang saling mendukung untuk pengalaman terbaik bagi pelanggan.
  4. Membangun relasi positif untuk sinergi dan kolaborasi, mengutamakan pelayanan yang melebihi harapan pelanggan.
- **Core Approach:** Client-Centric Focus, Professional Team, Quality, Safety First.

---

## 3. DESIGN SYSTEM & VISUAL TOKENS (For Stitch)

### Color Palette
- **Primary Base (Trust & Corporate):** Deep Navy `#0A1628` (`--color-navy`), Slate 900 `#0F172A`, & Midnight Blue `#1E293B`.
- **Accent/CTA (Action & Energy):** Corporate Red `#EF4444` (`--color-brand` / Red 500) & `#DC2626` (`--color-brand-dark` / Red 600) derived directly from the official logo. Use for main buttons and interactive highlights.
- **Secondary Action (WhatsApp Conversion):** `#25D366` (`--color-whatsapp`). Note: Pair with dark text (`#0A1628`) or darkened emerald surface (`#128C7E` / `#15803D`) when displaying white text to satisfy WCAG 2.2 AA contrast.
- **Neutrals/Backgrounds:** 
  - Dark Canvas Default: `#0A1628` (`bg-navy`)
  - Light Surface / Cards: `#FFFFFF` & `#F8FAFC` (Slate 50)
  - Borders/Dividers: `#E2E8F0` (Slate 200 on light) / `rgba(255, 255, 255, 0.1)` (`border-white/10` on dark)

### Typography
- **Display / Headings (H1-H6):** `--font-display` (`Outfit`) & `--font-sans` (`Plus Jakarta Sans`). Font-weight: Bold/ExtraBold (`700`-`800`). Tight letter spacing (`tracking-tight`).
- **Body:** `--font-sans` (`Plus Jakarta Sans`). Base size 16px (`text-base`, `1rem`). Relaxed line-height (`leading-relaxed`, `1.625`) for readability.

### Component Styling
- **Border Radius:** `rounded-xl` (12px) for buttons, `rounded-2xl` (16px) for large cards/containers.
- **Shadows:** Soft, modern shadows (`shadow-sm`, `shadow-md`, `shadow-lg`) with subtle borders (`border border-slate-200` on light surfaces, `border border-white/10` on dark surfaces).

---

## 4. UI/UX ARCHITECTURE & LAYOUT RULES

1. **Hero Section:** Must feature the tagline "Let's Grow with us !" and a dual CTA linking to WhatsApp consultation and the program packages.
2. **Value Proposition (Bento Grid):** Visually showcase the 4 pillars: Client-Centric Focus, Professional Team, Quality, and Safety First.
3. **Services Categories:**
   - **Training & Development:** Outbound training, indoor training, motivational class, Training of Trainer, Educational training.
   - **Non-Training & Entertaining:** Fun outbound, employee gathering, family gathering, outing, fun adventure, fun trip, event organizer.
4. **Featured Package Pricing Cards:** 
   - **Growth Leaders Training** (Rp. 9.500.000).
   - **Growth Generation** (Rp. 7.000.000).
   - **Fun, Play 'N Grow** (Rp. 5.500.000).
5. **Call to Action (CTA):** Every page must end with a high-contrast B2B consultation banner routing to WhatsApp (+62 857-0474-8186).

---

## 5. SEO & GEO (GENERATIVE ENGINE OPTIMIZATION) ARCHITECTURE
- **JSON-LD Structured Data:** All pages must inject semantic schemas natively (e.g., `WebSite`, `Organization`, `ProfessionalService`).
- **Regional Silos:** UI components built for dynamic routes (`app/layanan/[kota]`) must accept dynamic `kota` props and dynamically render local venue references.
- **AI Grounding:** The codebase exposes `/llms.txt` and `.well-known` endpoints. Any factual changes must be updated in `public/llms.txt`.
- **Core Web Vitals:** Strict adherence to image aspect ratios (`aspect-video`, `aspect-square`), explicit width/height to prevent CLS.

---

## 6. CODE CONVENTIONS
- **Component Pattern:** Use React Server Components (RSC) by default. Add `"use client"` only for interactivity.
- **Tailwind:** Use pure Tailwind utility classes. Merge classes safely using `tailwind-merge` and `clsx`.
- **Icons:** Use `lucide-react`.

---

## 7. CROSS-PLATFORM & ACCESSIBILITY RULES (`platform-design`: Apple HIG, Material Design 3, WCAG 2.2)

### 7.1 Target Sizes & Touch Ergonomics
- **Minimum Touch Targets:**
  - **iOS / Apple HIG:** `44 × 44 pt` minimum hit target (`min-h-11 min-w-11` in Tailwind).
  - **Android / Material Design 3:** `48 × 48 dp` minimum touch target (`min-h-12 min-w-12` recommended for primary mobile CTAs, nav toggles, and floating action buttons).
  - **WCAG 2.2 SC 2.5.8 (Target Size Minimum - AA):** All pointer inputs must be at least `24 × 24 CSS px` or have at least `24 px` spacing offset from adjacent targets.
- **Target Spacing:** Maintain a minimum `8px` (`gap-2`) clearance between interactive buttons, chips, and links to prevent accidental taps on mobile viewports.

### 7.2 Color Contrast & Visual Accessibility (WCAG 2.2 AA/AAA)
- **Text Contrast (SC 1.4.3):**
  - Normal text (`< 18pt` or `< 14pt bold`): Minimum **4.5:1** contrast ratio against its background.
  - Large text (`>= 18pt` / `24px` or `>= 14pt bold` / `18.66px bold`): Minimum **3.0:1** contrast ratio.
  - **Brand Red Guardrail:** `#DC2626` (`bg-brand-dark`) on `#FFFFFF` yields **4.83:1** (passes AA normal text). `#EF4444` (`bg-brand`) on `#FFFFFF` yields **3.76:1** (use only for large bold text `>= 18.66px`, icons, or pair with `#DC2626` for standard button text).
  - **Muted Text on Dark (`#0A1628`):** Use `text-slate-300` (`#CBD5E1`, contrast **12.5:1**) or `text-slate-400` (`#94A3B8`, contrast **6.8:1**). Avoid `text-slate-500` or lower for body copy on dark backgrounds.
- **Non-Text Contrast (SC 1.4.11):** Interactive component boundaries (inputs, cards, buttons, focus rings) and meaningful icons must maintain at least **3.0:1** contrast against adjacent surfaces.

### 7.3 Keyboard Focus & Navigation (WCAG 2.2)
- **Focus Appearance (SC 2.4.7 & 2.4.13):** Never use `outline-none` without a high-contrast `focus-visible:` replacement. Standard focus token: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628]` (or `ring-offset-white` on light cards).
- **Focus Not Obscured (SC 2.4.11):** Fixed headers (`scroll-padding-top: 100px` in `globals.css`) and floating widgets (WhatsApp FAB) must never completely obscure the focused element when tabbing through the page.
- **Consistent Help (SC 3.2.6):** The WhatsApp B2B consultation entry point (`+62 857-0474-8186`) must remain in a consistent relative order across all pages.

### 7.4 Typography, Dynamic Type & Reflow (HIG + M3 + WCAG 2.2)
- **Relative Units:** Define font sizes, line heights, and spacing in `rem`/`em` rather than raw `px` so iOS Dynamic Type, Android font scaling, and browser zoom up to `200%` (SC 1.4.4) scale proportionally without clipping text.
- **Mobile Input Zoom Prevention (iOS Safari):** Form inputs (`<input>`, `<select>`, `<textarea>`) must use a minimum font size of `16px` (`text-base`) on mobile viewports to prevent iOS Safari from auto-zooming on focus.
- **Reflow (SC 1.4.10):** Layouts must reflow cleanly down to `320 CSS px` width without horizontal scrolling (except intentional data tables or carousels with accessible controls).
- **Line Length:** Constrain long-form reading columns (e.g., `/blog/[slug]` and service descriptions) to `60ch-75ch` (`max-w-prose`) for optimal eye tracking.

### 7.5 Safe Areas, Adaptive Layout & Viewport Units
- **Safe Area Insets (iOS Notch / Dynamic Island / Home Indicator & Android Gesture Bar):**
  - Sticky bottom bars and floating buttons (e.g., Floating WhatsApp CTA) must respect `env(safe-area-inset-bottom)` and `env(safe-area-inset-right)` so controls never collide with OS gesture bars.
- **Dynamic Viewport Height:** Prefer `min-h-dvh` over `min-h-screen` (`100vh`) for full-height hero sections and mobile drawers to prevent layout jumps when mobile browser address bars expand or collapse.
- **Material 3 Window Size Classes:**
  - **Compact (`< 600px`):** Single-column stack, collapsible drawer navigation, full-width primary CTAs (`w-full sm:w-auto`).
  - **Medium (`600px-839px`):** 2-column Bento/service grids, tablet-optimized spacing.
  - **Expanded (`>= 840px` / Desktop `>= 1024px`):** Multi-column Bento layouts, inline top navigation bar, generous horizontal padding.

### 7.6 Motion, Gestures & Input Modality
- **Reduced Motion (HIG / M3 / WCAG SC 2.3.3):** All continuous or entrance animations (`animate-marquee`, `animate-glare`, `animate-editorial-bounce`, `animate-fade-in`, `animate-fab-enter`) must be disabled or simplified under `@media (prefers-reduced-motion: reduce)` (enforced in `app/globals.css`).
- **Compositor-Only Animations:** Animate only `transform` and `opacity` to maintain 60/120fps across mobile WebViews and low-power Android devices.
- **Pointer Cancellation & Dragging Alternatives (SC 2.5.1, 2.5.2, 2.5.7):** Any swipeable carousel or gallery must also be operable via single-tap buttons or keyboard arrow keys without requiring multipoint or path-based drag gestures.

