## 2024-05-14 - Third-Party Analytics Script Loading
**Learning:** In Next.js, loading non-critical third-party analytics scripts (like Microsoft Clarity or Cloudflare Insights) using `strategy="afterInteractive"` can unnecessarily block the main thread and degrade Time to Interactive (TTI), as they execute as soon as the page becomes interactive.
**Action:** Always use `strategy="lazyOnload"` for these non-critical scripts to defer their execution until the browser is idle, ensuring critical rendering and interactivity are prioritized.
