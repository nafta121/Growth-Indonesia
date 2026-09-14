## 2026-09-14 - Refactored Counter to use Ref instead of State
**Learning:** requestAnimationFrame triggering useState updates leads to an excessive number of React renders per second (e.g., 60 renders per second per counter). This can severely degrade performance on lower-end devices or when multiple counters animate simultaneously.
**Action:** Use a ref to target the DOM node directly (`ref.current.textContent`) for fast, frame-by-frame animations instead of driving them through React's state/render lifecycle.
