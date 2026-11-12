# Plan 005: Add direct route-handler unit tests for robots.txt, sitemap.xml, and .well-known discovery endpoints

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report -- do not improvise. When done, update the status row for this plan
> in `plans/README.md` -- unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 0ff2148..HEAD -- lib/categories.test.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: 004
- **Category**: tests
- **Planned at**: commit `0ff2148`, 2026-11-12

## Why this matters

`tests/e2e/helpers/http-simulator.mjs` tests simulated string responses rather than importing and executing the actual Astro `APIRoute` handlers (`src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts`, `src/pages/.well-known/agent-card.json.ts`, `src/pages/.well-known/api-catalog.ts`, `src/pages/.well-known/dns-aid.ts`, `src/pages/.well-known/mcp/server-card.json.ts`). Calling the real `GET` handlers in `lib/categories.test.ts` guarantees that regressions in headers, status codes, JSON schemas, or AI crawler directives are caught directly by `npm test`.

## Current state

- `lib/categories.test.ts` currently imports and tests `GET as getLlmsTxt` from `../src/pages/llms.txt` and `GET as getPricingMd` from `../src/pages/pricing.md`, but does not directly invoke `robots.txt.ts`, `sitemap.xml.ts`, or the 4 `.well-known` route handlers.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Sloplint | `node scripts/sloplint.mjs .` | `sloplint: clean. 0 FAIL, 0 REFLEX, 0 WARN` |
| Unit tests | `npx tsx --test lib/*.test.ts` | exit 0, all pass |

## Scope

**In scope** (the only files you should modify):
- `lib/categories.test.ts`

**Out of scope** (do NOT touch):
- `tests/e2e/helpers/http-simulator.mjs`
- `src/pages/robots.txt.ts`
- `src/pages/sitemap.xml.ts`

## Git workflow

- Branch: `advisor/005-route-handler-integration-tests`
- Commit message style: conventional commits (`test(routes): add direct unit tests for real Astro route handlers`)
- Do NOT push or merge to `main`.

## Steps

### Step 1: Import and test real `GET` handlers in `lib/categories.test.ts`

In `lib/categories.test.ts`:
1. Import `GET as getRobotsTxt` from `../src/pages/robots.txt`, `GET as getSitemapXml` from `../src/pages/sitemap.xml`, `GET as getAgentCard` from `../src/pages/.well-known/agent-card.json`, `GET as getApiCatalog` from `../src/pages/.well-known/api-catalog`, `GET as getDnsAid` from `../src/pages/.well-known/dns-aid`, and `GET as getMcpServerCard` from `../src/pages/.well-known/mcp/server-card.json`.
2. Add a test verifying:
   - `getRobotsTxt` returns status `200`, header `Content-Signal: ai-train=no, search=yes, ai-input=yes`, and body containing `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Applebot`, and `Sitemap: https://growthindonesia.my.id/sitemap.xml`.
   - `getSitemapXml` returns status `200`, `application/xml; charset=utf-8`, and deterministic `<lastmod>2026-11-12T00:00:00.000Z</lastmod>`.
   - `getAgentCard`, `getApiCatalog`, `getDnsAid`, and `getMcpServerCard` all return status `200` and valid JSON payloads.

**Verify**: `npx tsx --test lib/*.test.ts && node scripts/sloplint.mjs .` -> exit 0.

## Test plan

- Add 1 comprehensive integration test in `lib/categories.test.ts` executing all 6 real Astro `GET` route handlers.
- Verification: `npx tsx --test lib/*.test.ts` -> all pass.

## Done criteria

- [ ] `npx tsx --test lib/*.test.ts` exits 0
- [ ] `node scripts/sloplint.mjs .` exits 0
- [ ] `grep -c "getRobotsTxt" lib/categories.test.ts` returns at least `2`
- [ ] No files outside the in-scope list are modified

## STOP conditions

- Any imported route handler throws at import time under `tsx`.
- Any unit test or `sloplint` check fails.

## Maintenance notes

- Whenever a new `.ts` route handler is added under `src/pages/`, add its `GET`/`POST` handler to `lib/categories.test.ts`.
