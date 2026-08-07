# Drawer agent guide

## Purpose

Present a finished modal side sheet while Atom owns focus, dismissal, portal, scroll-lock, and labeling behavior.

## Use when

- A temporary modal task or navigation panel should enter from a screen edge.

## Choose something else when

- The side region is persistent layout or the overlay has no edge meaning. Use Sidebar or Dialog.

## Required composition

- Compose Trigger and Portal with Overlay and Content; put a header containing Title, Description when useful, and Close inside Content, then use Stack/NavList for its body.

## Rules

- **MUST:** Use Drawer parts rather than hand-building overlay, focus trap, Escape, outside interaction, or portal behavior.
- **MUST:** Choose size, placement, and full-screen mobile presentation from content needs without duplicating mounted dialog trees.
- **MUST:** Load styles.css or core.css plus drawer.css.

## Common mistakes

- **Avoid:** Building a mobile menu as an absolutely positioned div or placing Close outside the labeled content hierarchy. **Instead:** Use Drawer anatomy and compose the menu content with Brick navigation and layout components.

## Validation checklist

- Test labeling, initial focus, focus containment/return, Escape, overlay, Close, scroll lock, touch, reduced motion, narrow screens, and nested portals.
- Confirm CSS and every composed child component stylesheet are loaded.

## Related guidance

- `sidebar`
- `dialog`
- `nav-list`
- `stack`
- `show`
- `hide`
