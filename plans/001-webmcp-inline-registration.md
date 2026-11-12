# Plan 001: Register navigator.modelContext WebMCP tools in BaseLayout without adding hydration islands

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report -- do not improvise. When done, update the status row for this plan
> in `plans/README.md` -- unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 0ff2148..HEAD -- src/layouts/BaseLayout.astro lib/categories.test.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `0ff2148`, 2026-11-12

## Why this matters

`src/pages/.well-known/mcp/server-card.json.ts` publicly advertises a `"browser-webmcp"` transport at `"endpoint": "navigator.modelContext"`. Although `components/webmcp-provider.tsx` defines the 4 WebMCP tools (`calculate_outbound_budget`, `search_services`, `get_city_coverage`, `contact_consultant`), it is never mounted in `src/layouts/BaseLayout.astro`. Worse, mounting `<WebMCPProvider client:load />` as a React island is forbidden by the repository's strict 6-island hydration guardrail (`tests/e2e/guardrails.test.mjs`, Audit 3). Injecting a lightweight `<script is:inline>` in `src/layouts/BaseLayout.astro` fulfills the `/.well-known/mcp/server-card.json` contract on every page with zero React hydration overhead while keeping `components/webmcp-provider.tsx` intact in `STATIC_COMPONENTS`.

## Current state

- `src/pages/.well-known/mcp/server-card.json.ts:13-22` advertises `navigator.modelContext`:
  ```ts
    transports: [
      {
        type: 'browser-webmcp',
        endpoint: 'navigator.modelContext',
      },
      {
        type: 'http-markdown',
        endpoint: 'https://growthindonesia.my.id/api/markdown',
      },
    ],
  ```
- `src/layouts/BaseLayout.astro:123-135` currently ends `<head>` with Cloudflare Web Analytics Beacon and `<style is:global>`:
  ```astro
    <!-- Cloudflare Web Analytics Beacon -->
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon='{"token": "c16a501011484d829b65425d7d7743f9"}'
    ></script>

    <style is:global>
      html, body {
        overflow-x: clip;
      }
    </style>
  </head>
  ```
- Repo conventions & guardrails:
  - Do NOT add any `client:*` directive to `BaseLayout.astro` (Audit 3 in `tests/e2e/guardrails.test.mjs` enforces strictly 6 interactive islands).
  - Do NOT delete `components/webmcp-provider.tsx` (`tests/e2e/helpers/constants.mjs` lists `webmcp-provider.tsx` in `STATIC_COMPONENTS`).
  - Zero en-dash (`\u2013`), zero em-dash (`\u2014`), and zero occurrences of the forbidden 4-letter certification acronym across the repository.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Sloplint | `node scripts/sloplint.mjs .` | `sloplint: clean. 0 FAIL, 0 REFLEX, 0 WARN` |
| Unit tests | `npx tsx --test lib/*.test.ts` | exit 0, all tests pass |
| E2E Tier 1-4 | `node --test tests/e2e/tier1-features.test.mjs tests/e2e/tier2-boundary.test.mjs tests/e2e/tier3-interactions.test.mjs tests/e2e/tier4-scenarios.test.mjs` | exit 0 |

## Scope

**In scope** (the only files you should modify):
- `src/layouts/BaseLayout.astro`
- `lib/categories.test.ts`

**Out of scope** (do NOT touch):
- `components/webmcp-provider.tsx` -- keep untouched so `STATIC_COMPONENTS` inventory in `tests/e2e/helpers/constants.mjs` stays valid.
- `tests/e2e/*` -- do not alter guardrail definitions.

## Git workflow

- Branch: `advisor/001-webmcp-inline-registration`
- Commit message style: conventional commits (`feat(webmcp): register navigator.modelContext tools via inline script in BaseLayout`)
- Do NOT push or merge to `main`.

## Steps

### Step 1: Add inline WebMCP tool registration script in `src/layouts/BaseLayout.astro`

In `src/layouts/BaseLayout.astro`, right after the Cloudflare Web Analytics Beacon `<script>` (around line 129) and before `<style is:global>`, insert an inline `<script is:inline>` block that registers `navigator.modelContext` and `window.__WEBMCP_TOOLS__` with the 4 tools (`calculate_outbound_budget`, `search_services`, `get_city_coverage`, `contact_consultant`):

```astro
    <!-- WebMCP Browser Discovery Registration (navigator.modelContext) -->
    <script is:inline>
      (function () {
        if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
        var tools = [
          {
            name: 'calculate_outbound_budget',
            description: 'Calculate estimated budget and package recommendations for outbound training, team building, or LDK OSIS in East Java.',
            inputSchema: {
              type: 'object',
              properties: {
                participants: { type: 'integer', description: 'Number of participants (min 30)' },
                durationDays: { type: 'integer', description: 'Duration in days (1, 2, or 3)' },
                tier: { type: 'string', enum: ['standard', 'premium', 'exclusive'] },
                city: { type: 'string', description: 'Target city in East Java' }
              },
              required: ['participants', 'durationDays']
            },
            execute: function (args) {
              var pax = Math.max(30, Number(args && args.participants) || 30);
              var days = Number(args && args.durationDays) || 1;
              var tier = (args && args.tier) || 'standard';
              var city = (args && args.city) || 'Madiun';
              var rate = tier === 'exclusive' ? 250000 : tier === 'premium' ? 200000 : 150000;
              var mult = days === 3 ? 2.8 : days === 2 ? 1.8 : 1;
              var total = Math.round(pax * rate * mult);
              return {
                status: 'success',
                estimatedCostIDR: total,
                formattedCost: 'Rp ' + total.toLocaleString('id-ID'),
                city: city,
                pricingReference: 'https://growthindonesia.my.id/pricing.md'
              };
            }
          },
          {
            name: 'search_services',
            description: 'Search outbound, training, fun-games, ldk-osis, and gathering programs.',
            inputSchema: {
              type: 'object',
              properties: { query: { type: 'string' } },
              required: ['query']
            },
            execute: function (args) {
              var q = String((args && args.query) || '').toLowerCase();
              var catalog = ['outbound', 'training', 'fun-games', 'ldk-osis', 'gathering'];
              var matched = catalog.filter(function (c) { return c.indexOf(q) !== -1; });
              return { status: 'success', matchedCategories: matched.length ? matched : catalog };
            }
          },
          {
            name: 'get_city_coverage',
            description: 'Get service URL for any of the 31 East Java cities.',
            inputSchema: {
              type: 'object',
              properties: { cityName: { type: 'string' } },
              required: ['cityName']
            },
            execute: function (args) {
              var slug = String((args && args.cityName) || 'madiun').toLowerCase().trim().replace(/\s+/g, '-');
              return {
                status: 'success',
                citySlug: slug,
                hubUrl: 'https://growthindonesia.my.id/layanan/' + slug,
                outboundUrl: 'https://growthindonesia.my.id/layanan/' + slug + '/outbound'
              };
            }
          },
          {
            name: 'contact_consultant',
            description: 'Generate direct WhatsApp consultation link for Growth Indonesia.',
            inputSchema: {
              type: 'object',
              properties: {
                clientName: { type: 'string' },
                organization: { type: 'string' },
                message: { type: 'string' }
              }
            },
            execute: function (args) {
              var name = String((args && args.clientName) || 'PIC');
              var org = String((args && args.organization) || 'Instansi');
              var msg = String((args && args.message) || 'Mohon info proposal dan RAB.');
              var text = encodeURIComponent('Halo Growth Indonesia, saya ' + name + ' dari ' + org + '. ' + msg);
              return {
                status: 'success',
                whatsappUrl: 'https://wa.me/6285848715836?text=' + text
              };
            }
          }
        ];
        if (!navigator.modelContext) {
          navigator.modelContext = {
            tools: tools,
            getTools: function () { return tools; },
            provideContext: function (ctx) {
              if (ctx && Array.isArray(ctx.tools)) navigator.modelContext.tools = ctx.tools;
            },
            registerTool: function (t) {
              if (navigator.modelContext && Array.isArray(navigator.modelContext.tools)) {
                navigator.modelContext.tools.push(t);
              }
            }
          };
        } else if (typeof navigator.modelContext.provideContext === 'function') {
          try { navigator.modelContext.provideContext({ tools: tools }); } catch (e) {}
        }
        window.__WEBMCP_TOOLS__ = tools;
      })();
    </script>
```

**Verify**: `node scripts/sloplint.mjs .` -> `sloplint: clean. 0 FAIL, 0 REFLEX, 0 WARN across 45 file(s).`

### Step 2: Add unit regression check in `lib/categories.test.ts`

In `lib/categories.test.ts`, inside the `describe('SEO Audit & Programmatic SEO regression checks', ...)` suite, add a test verifying that `src/layouts/BaseLayout.astro` registers `navigator.modelContext` and all 4 tool names advertised by WebMCP (`calculate_outbound_budget`, `search_services`, `get_city_coverage`, `contact_consultant`) without introducing a 7th `client:` directive.

**Verify**: `npx tsx --test lib/*.test.ts` -> exit 0, all tests pass.

## Test plan

- Add 1 new test in `lib/categories.test.ts` (`registers navigator.modelContext and 4 WebMCP tools inline in BaseLayout.astro`) modeled after existing tests in `lib/categories.test.ts`.
- Verification: `npx tsx --test lib/*.test.ts` -> all pass.

## Done criteria

- [ ] `node scripts/sloplint.mjs .` exits 0 with `0 FAIL, 0 REFLEX, 0 WARN`
- [ ] `npx tsx --test lib/*.test.ts` exits 0
- [ ] `grep -c "navigator.modelContext" src/layouts/BaseLayout.astro` returns at least `2`
- [ ] No files outside the in-scope list are modified (`git status -s`)

## STOP conditions

- The code in `src/layouts/BaseLayout.astro` around lines 120-136 does not match the "Current state" excerpt.
- Adding the inline script triggers any `sloplint` warning or guardrail failure.
- Any file outside `src/layouts/BaseLayout.astro` and `lib/categories.test.ts` needs modification.

## Maintenance notes

- Keep `components/webmcp-provider.tsx` in the repository because `tests/e2e/helpers/constants.mjs` validates the 26 static components list.
- If new WebMCP tools are added in the future, update both `src/layouts/BaseLayout.astro` and `components/webmcp-provider.tsx`.
