## 2024-05-18 - X402 Premium Authorization Bypass
**Vulnerability:** The x402 premium API endpoint (`app/api/x402/premium/route.ts`) only checked for the existence of an authorization header/token (`!paymentProof`) without validating its format or content. This allowed a malicious user to bypass the payment requirement simply by providing an empty string or dummy text in the header.
**Learning:** Existence checks are insufficient for authorization headers, especially when handling micropayments or restricted content access. Untrusted input must always be validated against expected formats.
**Prevention:** Always enforce strict format validation (e.g., regex matching for EVM transaction hashes like `/^0x[a-fA-F0-9]{64}$/`) or cryptographic validation (JWT, signatures) for any token or proof used for authorization.

## 2026-09-24 - IndexNow API Missing Authentication
**Vulnerability:** The `/api/indexnow` endpoint allowed unauthenticated URL submissions via both GET (with query parameters) and POST requests.
**Learning:** The endpoint was previously designed to be public, but it allowed any user to trigger external requests to IndexNow APIs, potentially leading to rate limiting, DoS, or quota exhaustion for the application's IndexNow key.
**Prevention:** Always require authentication for internal administrative API routes, even if they only trigger pre-defined background actions, especially when those actions consume external API quotas or perform expensive operations. Added an `INDEXNOW_SUBMIT_SECRET` check via the `Authorization` header.
