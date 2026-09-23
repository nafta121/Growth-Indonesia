## 2024-03-24 - Avoiding React Re-renders in Fast Animations
**Learning:** Using React `useState` to drive fast, frame-by-frame animations (like `requestAnimationFrame` counters) causes excessive component re-renders, impacting main thread performance.
**Action:** When implementing continuous animations that update frequently (e.g., number counters), use a `ref` to directly target and mutate the DOM node (`ref.current.textContent`) to bypass the React render cycle entirely.
## 2024-03-24 - Missing Responsive Sizes on Full-Width Images
**Learning:** Using Next.js `<Image fill />` without explicit `sizes` attributes inside CSS Grid structures causes browsers to download full-resolution (`100vw`) versions, severely impacting LCP on mobile and desktop.
**Action:** When finding `fill` attributes on Next.js `<Image>` components, immediately inspect parent grid layouts (e.g., `lg:grid-cols-2`) and inject corresponding viewport-based `sizes` attributes (e.g., `sizes="(max-width: 1024px) 100vw, 50vw"`).
