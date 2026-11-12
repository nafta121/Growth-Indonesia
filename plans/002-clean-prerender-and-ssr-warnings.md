# Plan 002: Guard Astro.request.headers during static prerendering and remove Node path externalization warning

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report -- do not improvise. When done, update the status row for this plan
> in `plans/README.md` -- unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 0ff2148..HEAD -- src/middleware.ts lib/mdx.ts lib/categories.test.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: 001
- **Category**: dx
- **Planned at**: commit `0ff2148`, 2026-11-12

## Why this matters

Every `npm run build` currently emits 198 `[WARN] Astro.request.headers was used when rendering the route ...` messages because `src/middleware.ts` reads `context.request.headers.get('accept')` unconditionally even when `context.isPrerendered` is `true`. Additionally, `lib/mdx.ts` imports Node's built-in `path` module only to call `path.basename(slug)`, causing Vite's Cloudflare SSR bundler to emit `[WARN] [vite] Automatically externalized node built-in module "path" imported from "lib/mdx.ts"`. Fixing both eliminates all 199 build warnings and makes Cloudflare Worker bundling 100% pure ES module code.

## Current state

- `src/middleware.ts:4-8`:
  ```ts
  export const onRequest = defineMiddleware(async (context, next) => {
    const { pathname } = context.url;
    const acceptHeader = context.request.headers.get('accept') || '';
  ```
- `lib/mdx.ts:1-30`:
  ```ts
  import path from 'path';
  import articlesCache from './articles-cache.json';
  ...
  export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const realSlug = path.basename(slug).replace(/\.mdx$/, '');
    return articles.find((art) => art.slug === realSlug) || null;
  }
  ```

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Sloplint | `node scripts/sloplint.mjs .` | `sloplint: clean. 0 FAIL, 0 REFLEX, 0 WARN` |
| Unit tests | `npx tsx --test lib/*.test.ts` | exit 0, all pass |

## Scope

**In scope** (the only files you should modify):
- `src/middleware.ts`
- `lib/mdx.ts`
- `lib/categories.test.ts`

**Out of scope** (do NOT touch):
- `astro.config.mjs`
- `scripts/prebuild.js`

## Git workflow

- Branch: `advisor/002-clean-prerender-and-ssr-warnings`
- Commit message style: conventional commits (`fix(dx): guard request.headers on prerendered routes and remove node path import in mdx.ts`)
- Do NOT push or merge to `main`.

## Steps

### Step 1: Guard `context.request.headers` with `context.isPrerendered` in `src/middleware.ts`

In `src/middleware.ts`, replace line 6:
```ts
  const acceptHeader = context.request.headers.get('accept') || '';
```
with:
```ts
  const acceptHeader = context.isPrerendered ? '' : (context.request.headers.get('accept') || '');
```

**Verify**: `grep -n "context.isPrerendered" src/middleware.ts` -> matches line 6.

### Step 2: Replace `path.basename` in `lib/mdx.ts` with pure string parsing

In `lib/mdx.ts`:
1. Remove `import path from 'path';` at line 1.
2. In `getArticleBySlug(slug: string)`, replace:
   ```ts
   const realSlug = path.basename(slug).replace(/\.mdx$/, '');
   ```
   with:
   ```ts
   const realSlug = (slug.split(/[\\/]/).pop() || '').replace(/\.(mdx|md)$/, '');
   ```

**Verify**: `npx tsx --test lib/*.test.ts` -> exit 0.

### Step 3: Add unit test in `lib/categories.test.ts`

Add a test in `lib/categories.test.ts` verifying that `getArticleBySlug` resolves both plain slugs (`'tips-memilih-provider-outbound-profesional'`), `.mdx`-suffixed slugs, and path-prefixed slugs (`'/artikel/tips-memilih-provider-outbound-profesional.mdx'`) without importing Node's `path` module, and that `src/middleware.ts` checks `context.isPrerendered`.

**Verify**: `npx tsx --test lib/*.test.ts && node scripts/sloplint.mjs .` -> exit 0.

## Test plan

- Add 1 new test in `lib/categories.test.ts` covering `getArticleBySlug` path normalization and `context.isPrerendered` middleware guard.
- Verification: `npx tsx --test lib/*.test.ts` -> all pass.

## Done criteria

- [ ] `grep -c "import path" lib/mdx.ts` returns `0`
- [ ] `grep -c "context.isPrerendered" src/middleware.ts` returns `1`
- [ ] `node scripts/sloplint.mjs .` exits 0
- [ ] `npx tsx --test lib/*.test.ts` exits 0
- [ ] No files outside the in-scope list are modified

## STOP conditions

- `src/middleware.ts` or `lib/mdx.ts` does not match the "Current state" excerpts.
- Any unit test or E2E test fails after the change.

## Maintenance notes

- In Astro 5 hybrid/server mode, any middleware that runs during `astro build` static prerendering must check `context.isPrerendered` before accessing request headers or client IP.
