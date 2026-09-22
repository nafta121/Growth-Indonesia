## 2024-03-24 - Avoiding React Re-renders in Fast Animations
**Learning:** Using React `useState` to drive fast, frame-by-frame animations (like `requestAnimationFrame` counters) causes excessive component re-renders, impacting main thread performance.
**Action:** When implementing continuous animations that update frequently (e.g., number counters), use a `ref` to directly target and mutate the DOM node (`ref.current.textContent`) to bypass the React render cycle entirely.
## 2024-03-24 - Explicit Next.js Image Sizes in Grids
**Learning:** Using the Next.js `<Image fill />` component inside grids or constrained layouts without an explicit `sizes` attribute causes the browser to default to `100vw`, downloading unnecessarily large full-resolution images which negatively impacts bandwidth and LCP.
**Action:** When using `<Image fill />` within grids, always explicitly define the `sizes` attribute corresponding to the parent container's responsive layout breakpoints (e.g., `sizes="(max-width: 768px) 100vw, 33vw"`).
