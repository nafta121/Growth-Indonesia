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
- **Primary Base (Trust & Corporate):** Deep Navy `#0F172A` (Slate 900) & Midnight Blue `#1E293B`[span_13](start_span)[span_13](end_span).
- **Accent/CTA (Action & Energy):** Corporate Red `#DC2626` (Red 600) or `#EF4444` (Red 500) derived directly from the official logo. Use for main buttons and interactive highlights.
- **Neutrals/Backgrounds:** 
  - Main Background: `#FFFFFF`
  - Subtle Sections: `#F8FAFC` (Slate 50)
  - Borders/Dividers: `#E2E8F0` (Slate 200)

### Typography
- **Headings (H1-H6):** `font-sans` (Plus Jakarta Sans, Montserrat, or Inter). Font-weight: Bold/ExtraBold. Tight letter spacing (`tracking-tight`).
- **Body:** `font-sans` (Inter). Base size 16px (`text-base`). Relaxed line-height (`leading-relaxed`) for readability.

### Component Styling
- **Border Radius:** `rounded-xl` (12px) for buttons, `rounded-2xl` (16px) for large cards/containers.
- **Shadows:** Soft, modern shadows (`shadow-sm`, `shadow-md`, `shadow-lg`) with subtle borders (`border border-slate-200`).

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
