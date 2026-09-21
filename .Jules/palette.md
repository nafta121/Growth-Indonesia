## 2024-05-24 - Accessibility improvements for Mobile Menu
**Learning:** Custom UI overlays like mobile menus often lack crucial keyboard support (Escape key to close) and explicit screen-reader state attributes (`aria-expanded`), making them difficult to use for keyboard and screen-reader users. Localized aria-labels are also necessary for non-English users.
**Action:** Always add `aria-expanded` to menu toggle buttons, implement an Escape key event listener to close overlays, and use `focus-visible` instead of `focus` to improve the experience for both mouse and keyboard users without compromising aesthetics.

## 2024-05-25 - Focus Outline for Mouse Users
**Learning:** Using `focus:outline-none focus:ring-*` causes a permanent, visible focus ring to appear when a mouse user clicks on a button or link, which often results in a poor visual experience.
**Action:** Replace standard `focus:` utilities with `focus-visible:` on all interactive elements (buttons, inputs, links). This provides keyboard accessibility with clear focus states while avoiding unwanted rings on mouse clicks.

## 2024-05-26 - Accessible Floating Action Buttons (FABs)
**Learning:** Floating action buttons, especially icon-only ones linking to external services like WhatsApp, often lack clear focus indicators for keyboard navigation and require localized `aria-label`s. Hardcoded English labels on Indonesian sites create a poor experience for screen reader users.
**Action:** Always add localized `aria-label`s (e.g., "Hubungi Admin..."), and implement `focus-visible` ring styling that matches the brand color (or the service color, like WhatsApp green `#25D366`) and element shape (`rounded-2xl` or `rounded-full`) to ensure keyboard accessibility without affecting mouse users.
