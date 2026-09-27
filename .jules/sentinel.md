## 2024-05-18 - X402 Premium Authorization Bypass
**Vulnerability:** The x402 premium API endpoint (`app/api/x402/premium/route.ts`) only checked for the existence of an authorization header/token (`!paymentProof`) without validating its format or content. This allowed a malicious user to bypass the payment requirement simply by providing an empty string or dummy text in the header.
**Learning:** Existence checks are insufficient for authorization headers, especially when handling micropayments or restricted content access. Untrusted input must always be validated against expected formats.
**Prevention:** Always enforce strict format validation (e.g., regex matching for EVM transaction hashes like `/^0x[a-fA-F0-9]{64}$/`) or cryptographic validation (JWT, signatures) for any token or proof used for authorization.

## 2024-05-18 - Path Traversal Vulnerability in `lib/mdx.ts`
**Vulnerability:** The function `getArticleBySlug` takes user input `slug` and directly concatenates it into a file path using string replacement `slug.replace(/\.mdx$/, '')`. Next.js `[slug]` route parameters do not fully prevent users from passing directory traversal sequences like `../../../etc/passwd`.
**Learning:** Relying on Next.js router validation for dynamic file reading is insufficient. All file paths dynamically constructed using user input must explicitly sanitize the filename to strictly prevent directory escapes.
**Prevention:** Use `path.basename()` to safely extract just the filename from any unsanitized path or input before appending it to a trusted directory base path.
