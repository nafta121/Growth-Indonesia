## 2024-03-24 - Avoiding React Re-renders in Fast Animations
**Learning:** Using React `useState` to drive fast, frame-by-frame animations (like `requestAnimationFrame` counters) causes excessive component re-renders, impacting main thread performance.
**Action:** When implementing continuous animations that update frequently (e.g., number counters), use a `ref` to directly target and mutate the DOM node (`ref.current.textContent`) to bypass the React render cycle entirely.
## 2026-10-11 - Pre-allocated Array vs flatMap for Sitemap Generation
**Learning:** Generating programmatic sitemap entries using nested `flatMap` and `map` calls allocates multiple temporary arrays (one per city plus the outer container), adding GC pressure and loop overhead when generating hundreds of route objects.
**Action:** Replace `flatMap` and `map` in sitemap generation functions with a pre-allocated array (`new Array(cities.length * categories.length)`) and a nested `for...of` loop to eliminate intermediate array allocations.
