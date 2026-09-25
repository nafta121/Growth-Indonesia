## 2025-01-20 - MDX Path Traversal Vulnerability
**Vulnerability:** The `getArticleBySlug` function in `lib/mdx.ts` used the `slug` parameter directly in `fs.readFileSync` without sanitization. A malicious user could potentially provide a slug containing directory traversal sequences (e.g., `../../../etc/passwd`) to read arbitrary files on the filesystem.
**Learning:** Relying solely on Next.js `[slug]` router validation is insufficient for security, as functions like `getArticleBySlug` might be called from other contexts or APIs.
**Prevention:** Always forcefully sanitize user-provided file paths or slugs before using them in filesystem operations. Use regex to strip out invalid characters and directory traversal sequences (e.g., `replace(/[^a-zA-Z0-9-_.]/g, '').replace(/\.\./g, '')`).

## 2024-05-18 - X402 Premium Authorization Bypass
**Vulnerability:** The x402 premium API endpoint (`app/api/x402/premium/route.ts`) only checked for the existence of an authorization header/token (`!paymentProof`) without validating its format or content. This allowed a malicious user to bypass the payment requirement simply by providing an empty string or dummy text in the header.
**Learning:** Existence checks are insufficient for authorization headers, especially when handling micropayments or restricted content access. Untrusted input must always be validated against expected formats.
**Prevention:** Always enforce strict format validation (e.g., regex matching for EVM transaction hashes like `/^0x[a-fA-F0-9]{64}$/`) or cryptographic validation (JWT, signatures) for any token or proof used for authorization.
