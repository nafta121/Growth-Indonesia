## 2024-05-18 - X402 Premium Authorization Bypass
**Vulnerability:** The x402 premium API endpoint (`app/api/x402/premium/route.ts`) only checked for the existence of an authorization header/token (`!paymentProof`) without validating its format or content. This allowed a malicious user to bypass the payment requirement simply by providing an empty string or dummy text in the header.
**Learning:** Existence checks are insufficient for authorization headers, especially when handling micropayments or restricted content access. Untrusted input must always be validated against expected formats.
**Prevention:** Always enforce strict format validation (e.g., regex matching for EVM transaction hashes like `/^0x[a-fA-F0-9]{64}$/`) or cryptographic validation (JWT, signatures) for any token or proof used for authorization.

## 2024-05-19 - Path Traversal in MDX Utility
**Vulnerability:** The `getArticleBySlug` function in `lib/mdx.ts` constructed file paths by directly concatenating user-provided `slug` input without sanitization. This could potentially allow path traversal attacks (e.g., passing `../../../etc/passwd`) if the function is exposed to unsanitized external input.
**Learning:** Relying purely on Next.js routing validation (like `[slug]`) is insufficient for utility functions that read files from the filesystem. Any utility function that dynamically reads files must implement its own defense-in-depth sanitization.
**Prevention:** Always forcefully sanitize file paths using `path.basename()` to extract only the filename and strictly prevent directory escapes, rather than relying on regex or upstream validation.
