## 2023-11-20 - Adding Accessibility Support to Custom Lightbox Galleries
**Learning:** Custom lightbox galleries in this application were missing aria-labels and keyboard focus indicators, making them difficult for screen reader users and keyboard-only users to navigate. Since Next.js `Image` components are typically placed inside custom wrappers (like `motion.div`), the wrapping component must assume the interactive role (`role="button"`, `tabIndex={0}`, `aria-label`).
**Action:** Always ensure that custom wrappers meant to be clickable in a gallery include keyboard handlers (`onKeyDown`), proper ARIA roles/labels, and `focus-visible` styling to maintain a fully accessible user experience.

## 2024-05-15 - Enhancing Mobile Menu Accessibility
**Learning:** Custom mobile menus often lack `aria-expanded` attributes, proper localized ARIA labels, and `Escape` key support to close them. This can confuse screen readers regarding the menu's state and trap keyboard users in the menu overlay.
**Action:** Always add `aria-expanded` to toggle buttons, ensure `aria-label`s are localized (e.g., "Buka menu" instead of "Toggle menu"), and implement `Escape` key listeners to close custom overlays like mobile menus. Use `focus-visible` instead of `focus` on menu links for better mouse interaction UX.
