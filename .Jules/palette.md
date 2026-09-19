## 2024-05-24 - Accessibility improvements for Mobile Menu
**Learning:** Custom UI overlays like mobile menus often lack crucial keyboard support (Escape key to close) and explicit screen-reader state attributes (`aria-expanded`), making them difficult to use for keyboard and screen-reader users. Localized aria-labels are also necessary for non-English users.
**Action:** Always add `aria-expanded` to menu toggle buttons, implement an Escape key event listener to close overlays, and use `focus-visible` instead of `focus` to improve the experience for both mouse and keyboard users without compromising aesthetics.

## 2024-05-25 - Focus Outline for Mouse Users
**Learning:** Using `focus:outline-none focus:ring-*` causes a permanent, visible focus ring to appear when a mouse user clicks on a button or link, which often results in a poor visual experience.
**Action:** Replace standard `focus:` utilities with `focus-visible:` on all interactive elements (buttons, inputs, links). This provides keyboard accessibility with clear focus states while avoiding unwanted rings on mouse clicks.
