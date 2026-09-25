## 2024-03-24 - Avoiding React Re-renders in Fast Animations
**Learning:** Using React `useState` to drive fast, frame-by-frame animations (like `requestAnimationFrame` counters) causes excessive component re-renders, impacting main thread performance.
**Action:** When implementing continuous animations that update frequently (e.g., number counters), use a `ref` to directly target and mutate the DOM node (`ref.current.textContent`) to bypass the React render cycle entirely.

## 2024-03-24 - Missing sizes attribute on Next.js Image components
**Learning:** Using the Next.js `<Image fill />` component without defining the `sizes` attribute defaults to downloading unnecessarily large full-resolution images (100vw), negatively impacting bandwidth and LCP.
**Action:** When using `<Image fill />` in constrained layouts (e.g., grids, carousels, or specific flex containers), always explicitly define the `sizes` attribute based on the layout context (e.g., `sizes="(max-width: 768px) 100vw, 50vw"`).
