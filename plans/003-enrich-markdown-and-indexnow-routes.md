# Plan 003: Enrich /api/markdown with corridor and category variations and complete /api/indexnow batch URLs

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report -- do not improvise. When done, update the status row for this plan
> in `plans/README.md` -- unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 0ff2148..HEAD -- src/pages/api/markdown.ts lib/categories.test.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: 002
- **Category**: bug
- **Planned at**: commit `0ff2148`, 2026-11-12

## Why this matters

When an AI agent requests `/layanan/[kota]/[kategori]` with `Accept: text/markdown` (rewritten by middleware to `/api/markdown?path=/layanan/[kota]/[kategori]`), `src/pages/api/markdown.ts` currently returns a 1-sentence placeholder (`Program disesuaikan khusus untuk modul ${categorySlug} di ${city.name}.`) instead of the rich corridor operational profile (`getCityOperationalProfile`) and category-specific deliverables (`getContentVariations`) served on the HTML page. Enriching `/api/markdown` ensures parity between HTML and Markdown representations for AI agents.

## Current state

- `src/pages/api/markdown.ts:46-72`:
  ```ts
    } else if (targetPath.startsWith('/layanan')) {
      const parts = targetPath.split('/').filter(Boolean);
      const citySlug = parts[1]?.toLowerCase();
      const categorySlug = parts[2]?.toLowerCase();

      if (citySlug && CITIES[citySlug]) {
        const city = CITIES[citySlug];
        markdownContent = `# Layanan Outbound & Team Building di ${city.name} - Growth Indonesia

  ## Overview
  ${city.description}

  ## Keunggulan Utama di ${city.name}
  ${city.uniqueSellingPoint}

  ## Rekomendasi Venue Popular
  ${city.popularVenues.map((v) => `- ${v}`).join('\n')}

  ${categorySlug ? `## Kategori Spesifik: ${categorySlug.toUpperCase()}\nProgram disesuaikan khusus untuk modul ${categorySlug} di ${city.name}.\n` : ''}

  ## Paket Program Tersedia
  ${PACKAGES.map((p) => `- **${p.title}** (${p.price}): ${p.description}`).join('\n')}

  ## Hubungi Kami
  Siap mengadakan outbound di ${city.name}? Hubungi kami melalui WhatsApp untuk penawaran kustom.
  `;
  ```

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Sloplint | `node scripts/sloplint.mjs .` | `sloplint: clean. 0 FAIL, 0 REFLEX, 0 WARN` |
| Unit tests | `npx tsx --test lib/*.test.ts` | exit 0, all pass |

## Scope

**In scope** (the only files you should modify):
- `src/pages/api/markdown.ts`
- `lib/categories.test.ts`

**Out of scope** (do NOT touch):
- `lib/cities.ts`
- `lib/content-variations.tsx`

## Git workflow

- Branch: `advisor/003-enrich-markdown-route`
- Commit message style: conventional commits (`feat(markdown): enrich /api/markdown pSEO output with corridor profile and category deliverables`)
- Do NOT push or merge to `main`.

## Steps

### Step 1: Import `getCityOperationalProfile` and `getContentVariations` in `src/pages/api/markdown.ts`

In `src/pages/api/markdown.ts`:
1. Update line 2 from `import { CITIES } from '@/lib/cities';` to:
   ```ts
   import { CITIES, getCityOperationalProfile } from '@/lib/cities';
   import { getContentVariations } from '@/lib/content-variations';
   ```
2. Inside `if (citySlug && CITIES[citySlug])`, compute:
   ```ts
   const profile = getCityOperationalProfile(citySlug);
   const variation = categorySlug ? getContentVariations(categorySlug, city.name) : null;
   ```
3. Include `profile.corridorName`, `profile.mobilizationSla`, `profile.planBContingency`, and (when `variation` is present) `variation.bodyIntro` and `variation.deliverables.map((d) => `- ${d}`).join('\n')` in `markdownContent`. Ensure zero en-dashes (`\u2013`), zero em-dashes (`\u2014`), and zero forbidden acronyms.

**Verify**: `npx tsx --test lib/*.test.ts && node scripts/sloplint.mjs .` -> exit 0.

### Step 2: Add unit test for `/api/markdown` pSEO enrichment in `lib/categories.test.ts`

In `lib/categories.test.ts`, import `GET as getMarkdown` from `../src/pages/api/markdown` and assert that calling `getMarkdown({ url: new URL('https://growthindonesia.my.id/api/markdown?path=/layanan/madiun/outbound') } as any)` returns status `200`, `Content-Type: text/markdown; charset=utf-8`, and body containing `Koridor Mataraman`, `Zero Accident`, and `Ndalem Prabu` or `Wana Wisata Graha`.

**Verify**: `npx tsx --test lib/*.test.ts` -> exit 0.

## Test plan

- Add 1 new unit test in `lib/categories.test.ts` calling `GET` from `src/pages/api/markdown.ts` for `/layanan/madiun/outbound`.
- Verification: `npx tsx --test lib/*.test.ts` -> all pass.

## Done criteria

- [ ] `npx tsx --test lib/*.test.ts` exits 0
- [ ] `node scripts/sloplint.mjs .` exits 0
- [ ] `grep -c "getCityOperationalProfile" src/pages/api/markdown.ts` returns at least `2`
- [ ] No files outside the in-scope list are modified

## STOP conditions

- `src/pages/api/markdown.ts` does not match the "Current state" excerpt.
- Any guardrail or unit test fails.

## Maintenance notes

- Keep the response headers (`Content-Type`, `Vary`, `x-markdown-tokens`, `Access-Control-Allow-Origin`, `Cache-Control`, `Link`) on `/api/markdown` unchanged as E2E tests assert on them.
