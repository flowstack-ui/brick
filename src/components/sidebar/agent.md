# Sidebar agent guide

## Purpose

Provide a finished application-shell side region with expanded, rail, and offcanvas visual states built on Atom Sidebar.

## Use when

- An application shell has persistent navigation or tools that collapse to a rail or leave the layout offcanvas.

## Choose something else when

- The side panel is a temporary modal mobile menu or a static content aside. Use Drawer or a semantic page region.

## Required composition

- Compose Root with Trigger, Panel, and Main; place NavList and other Brick content inside Panel and keep one page-level main landmark.

## Rules

- **MUST:** Use Sidebar state and public layout hooks instead of manually translating a generic aside and overlapping its active items.
- **MUST:** Avoid duplicate main landmarks when composing Sidebar.Main into an existing shell.
- **MUST:** Load styles.css or core.css plus sidebar.css and every composed child stylesheet.

## Common mistakes

- **Avoid:** Using Sidebar as a modal drawer or letting highlighted rail items overflow into Main. **Instead:** Use Drawer for modal use and validate Sidebar's expanded, rail, and offcanvas geometry.

## Validation checklist

- Check every state, both sides, current navigation item, long labels, icons, counts, trigger, focus, inert offcanvas state, zoom, narrow widths, and RTL.
- Confirm landmark names and CSS delivery.

## Related guidance

- `nav-list`
- `drawer`
- `app-bar`
- `container`
- `show`
- `hide`
