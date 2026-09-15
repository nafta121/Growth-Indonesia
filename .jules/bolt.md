## 2026-09-14 - Unit Testing TypeScript Utilities with Native Node Test Runner
**Learning:** In Node.js 22+, `--experimental-strip-types` allows running TypeScript unit test files (`lib/__tests__/*.test.ts`) directly via `node --experimental-strip-types --test` without requiring extra heavy runner dependencies or custom build steps, provided module import paths include explicit file extensions (`../utils.ts`).
**Action:** Use `node --experimental-strip-types --test <file>` for fast, dependency-free unit testing of utility modules in TypeScript.
