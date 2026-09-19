## 2024-03-24 - Avoiding React Re-renders in Fast Animations
**Learning:** Using React `useState` to drive fast, frame-by-frame animations (like `requestAnimationFrame` counters) causes excessive component re-renders, impacting main thread performance.
**Action:** When implementing continuous animations that update frequently (e.g., number counters), use a `ref` to directly target and mutate the DOM node (`ref.current.textContent`) to bypass the React render cycle entirely.
## 2024-03-24 - Environment Variables for Third-Party IDs
**Learning:** Hardcoding third-party IDs (like Google Tag Manager) in source code creates code health and security issues, making it harder to change across environments.
**Action:** When adding or maintaining third-party scripts/tags, always extract IDs to environment variables (e.g., `NEXT_PUBLIC_GTM_ID`), conditionally render the component based on the variable's presence, and document the variable in `.env.example`.
