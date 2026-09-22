## 2024-03-24 - Avoiding React Re-renders in Fast Animations
**Learning:** Using React `useState` to drive fast, frame-by-frame animations (like `requestAnimationFrame` counters) causes excessive component re-renders, impacting main thread performance.
**Action:** When implementing continuous animations that update frequently (e.g., number counters), use a `ref` to directly target and mutate the DOM node (`ref.current.textContent`) to bypass the React render cycle entirely.
## 2024-03-24 - Explicit Next.js Image Sizes
**Learning:** In Next.js, using the `fill` property on `<Image>` without explicitly defining `sizes` causes the browser to default to `100vw`. This results in the client downloading unnecessarily large, full-resolution images, negatively impacting bandwidth, initial page load time, and the Largest Contentful Paint (LCP) metric.
**Action:** Always provide explicit `sizes` props for any `<Image>` component that uses the `fill` property, tailoring the sizes to the expected layout breakpoints.
