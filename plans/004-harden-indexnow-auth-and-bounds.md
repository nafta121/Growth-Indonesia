# Plan 004: Bound IndexNow batch size, deduplicate URLs, and include all canonical pages in batch submission

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report -- do not improvise. When done, update the status row for this plan
> in `plans/README.md` -- unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 0ff2148..HEAD -- src/pages/api/indexnow.ts lib/indexnow.ts lib/categories.test.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: 003
- **Category**: security
- **Planned at**: commit `0ff2148`, 2026-11-12

## Why this matters

`src/pages/api/indexnow.ts` currently accepts unbounded `urls` arrays in `POST /api/indexnow` and forwards them without deduplication to 3 external IndexNow endpoints in `lib/indexnow.ts`. Additionally, `GET /api/indexnow?all=true` omits `/portofolio-dan-sertifikasi`, `/docs/api`, and the 4 `/artikel/[slug]` pages from the batch submission list. Enforcing a `MAX_INDEXNOW_BATCH_SIZE = 250` cap, deduplicating normalized URLs in `lib/indexnow.ts`, and including all canonical pages in `?all=true` prevents request amplification while ensuring complete IndexNow coverage.

## Current state

- `lib/indexnow.ts:18-42`:
  ```ts
  export async function submitToIndexNow(urls: string[]) {
    if (!urls || urls.length === 0) {
      return { success: false, message: 'No URLs provided' };
    }

    // Normalize URLs and restrict to INDEXNOW_HOST
    const formattedUrls = urls
      .map((u) => {
        if (u.startsWith('http://') || u.startsWith('https://')) {
          return u;
        }
        return `https://${INDEXNOW_HOST}${u.startsWith('/') ? '' : '/'}${u}`;
      })
      .filter((u) => {
        try {
          return new URL(u).hostname === INDEXNOW_HOST;
        } catch {
          return false;
        }
      });
  ```
- `src/pages/api/indexnow.ts:28-41`:
  ```ts
    if (submitAll === 'true') {
      const allUrls: string[] = [
        `https://${INDEXNOW_HOST}/`,
        `https://${INDEXNOW_HOST}/layanan`,
        `https://${INDEXNOW_HOST}/artikel`,
      ];

      Object.keys(CITIES).forEach((kota) => {
        allUrls.push(`https://${INDEXNOW_HOST}/layanan/${kota}`);
        KATEGORI.forEach((kat) => {
          allUrls.push(`https://${INDEXNOW_HOST}/layanan/${kota}/${kat}`);
        });
      });
  ```

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Sloplint | `node scripts/sloplint.mjs .` | `sloplint: clean. 0 FAIL, 0 REFLEX, 0 WARN` |
| Unit tests | `npx tsx --test lib/*.test.ts` | exit 0, all pass |

## Scope

**In scope** (the only files you should modify):
- `lib/indexnow.ts`
- `src/pages/api/indexnow.ts`
- `lib/categories.test.ts`

**Out of scope** (do NOT touch):
- `public/2c11486128914291876d43ecd6d55580.txt`

## Git workflow

- Branch: `advisor/004-harden-indexnow-auth-and-bounds`
- Commit message style: conventional commits (`fix(security): bound and deduplicate IndexNow URLs and include all canonical pages`)
- Do NOT push or merge to `main`.

## Steps

### Step 1: Deduplicate and bound URLs in `lib/indexnow.ts`

In `lib/indexnow.ts`:
1. Export `export const MAX_INDEXNOW_BATCH_SIZE = 250;`.
2. In `submitToIndexNow(urls: string[])`, filter out non-string items, deduplicate `formattedUrls` with `Array.from(new Set(...))`, and slice to `MAX_INDEXNOW_BATCH_SIZE`:
   ```ts
   const uniqueUrls = Array.from(new Set(formattedUrls)).slice(0, MAX_INDEXNOW_BATCH_SIZE);
   ```
   Use `uniqueUrls` in `payload.urlList`, `submittedCount`, and `urls`.

**Verify**: `npx tsx --test lib/*.test.ts` -> exit 0.

### Step 2: Complete canonical batch list and reject oversized POST payloads in `src/pages/api/indexnow.ts`

In `src/pages/api/indexnow.ts`:
1. Import `MAX_INDEXNOW_BATCH_SIZE` from `@/lib/indexnow` and `getAllArticles` from `@/lib/mdx`.
2. In `if (submitAll === 'true')`, include `https://${INDEXNOW_HOST}/portofolio-dan-sertifikasi`, `https://${INDEXNOW_HOST}/docs/api`, and all article URLs from `await getAllArticles()` (`https://${INDEXNOW_HOST}/artikel/${a.slug}`).
3. In `POST`, if `urlsToSubmit.length > MAX_INDEXNOW_BATCH_SIZE`, return HTTP `400` with `{ error: 'Batch size exceeds maximum limit of 250 URLs' }`.

**Verify**: `npx tsx --test lib/*.test.ts && node scripts/sloplint.mjs .` -> exit 0.

### Step 3: Add unit test in `lib/categories.test.ts`

Add a test in `lib/categories.test.ts` verifying that `POST /api/indexnow` returns `401` when unauthorized, `400` when `urls` is empty, and `400` when `urls.length > 250`.

**Verify**: `npx tsx --test lib/*.test.ts` -> exit 0.

## Test plan

- Add 1 unit test in `lib/categories.test.ts` testing `POST /api/indexnow` auth (`401`), empty array (`400`), and oversized batch (`400`).
- Verification: `npx tsx --test lib/*.test.ts` -> all pass.

## Done criteria

- [ ] `grep -c "MAX_INDEXNOW_BATCH_SIZE" lib/indexnow.ts` returns at least `2`
- [ ] `npx tsx --test lib/*.test.ts` exits 0
- [ ] `node scripts/sloplint.mjs .` exits 0
- [ ] No files outside the in-scope list are modified

## STOP conditions

- `lib/indexnow.ts` or `src/pages/api/indexnow.ts` does not match the "Current state" excerpts.
- Any existing unit or E2E test fails.

## Maintenance notes

- Keep `INDEXNOW_KEY` in `lib/indexnow.ts` synchronized with `public/2c11486128914291876d43ecd6d55580.txt`.
