## 2025-01-28 - Fix Path Traversal in MDX Utility
**Vulnerability:** Path traversal vulnerability in `lib/mdx.ts` via unsanitized slug input.
**Learning:** Even if a utility is mainly used by Next.js dynamic routes (which validate slugs), calling it from API routes with query parameters circumvents this validation, allowing arbitrary file reads (with `.mdx` extension).
**Prevention:** Always forcefully sanitize file path inputs at the utility level (e.g., stripping non-alphanumeric characters) before performing file system operations, regardless of where the input supposedly comes from.
