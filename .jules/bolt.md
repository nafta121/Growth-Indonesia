## 2024-03-24 - Avoiding React Re-renders in Fast Animations
**Learning:** Using React `useState` to drive fast, frame-by-frame animations (like `requestAnimationFrame` counters) causes excessive component re-renders, impacting main thread performance.
**Action:** When implementing continuous animations that update frequently (e.g., number counters), use a `ref` to directly target and mutate the DOM node (`ref.current.textContent`) to bypass the React render cycle entirely.
## 2024-03-24 - Explicit sizes for Next.js Image fill in Grids
**Learning:** When using `<Image fill>` inside responsive CSS grids (e.g., `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), failing to provide the `sizes` attribute causes browsers to default to `100vw`. This downloads full-resolution images even when the component only occupies a fraction of the screen, severely impacting bandwidth and LCP.
**Action:** Always provide an explicit `sizes` attribute (e.g., `sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"`) to hint the browser about the rendered image width at different breakpoints.
