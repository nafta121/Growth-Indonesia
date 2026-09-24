## 2024-03-24 - Avoiding React Re-renders in Fast Animations
**Learning:** Using React `useState` to drive fast, frame-by-frame animations (like `requestAnimationFrame` counters) causes excessive component re-renders, impacting main thread performance.
**Action:** When implementing continuous animations that update frequently (e.g., number counters), use a `ref` to directly target and mutate the DOM node (`ref.current.textContent`) to bypass the React render cycle entirely.
## 2024-05-18 - Missing Image sizes attribute on Next.js Image fill components
**Learning:** When using the Next.js `<Image fill />` component inside grids or constrained layouts without an explicit `sizes` attribute, Next.js defaults to `100vw`. This causes the browser to download unnecessarily large, full-resolution images, negatively impacting bandwidth and LCP.
**Action:** Always explicitly define the `sizes` attribute (e.g., `sizes="(max-width: 768px) 100vw, 33vw"`) for `<Image fill />` to ensure the optimal image size is served based on the layout context.
