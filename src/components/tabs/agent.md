# Tabs agent guide

## Purpose

Style related in-page panel switching while Atom owns tab semantics, selection, roving focus, and indicator geometry.

## Use when

- A small set of related panels shares one page and one panel is normally active.

## Choose something else when

- Choices navigate to routes or multiple sections should remain open. Use Link/NavList or Accordion.

## Required composition

- Compose Trigger and optional Indicator inside List with matching Content values inside Root; lay out panel content with Brick components.

## Rules

- **MUST:** Use Tabs only for related in-page panels, not to imitate a site navigation underline.
- **MUST:** Define a deliberate narrow-width overflow or wrapping policy without clipping triggers or indicator focus.
- **MUST:** Load styles.css or core.css plus tabs.css.

## Common mistakes

- **Avoid:** Using Tabs for routes, clipping focus/indicator edges, or mismatching Trigger and Content values. **Instead:** Use navigation links for routes and keep complete paired tab anatomy.

## Validation checklist

- Check automatic/manual activation, arrows, Home/End, Enter/Space, disabled, controlled, keep-mounted, overflow, focus rings, themes, zoom, and RTL.
- Confirm CSS is loaded.

## Related guidance

- `accordion`
- `navigation-menu`
- `bottom-navigation`
- `scroll-area`
