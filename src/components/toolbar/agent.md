# Toolbar agent guide

## Purpose

Style one logical group of related commands with Atom toolbar semantics and roving keyboard focus.

## Use when

- Related editor or application controls should behave as one horizontal or vertical keyboard group.

## Choose something else when

- The items are navigation destinations or unrelated standalone actions. Use NavigationMenu/NavList or separate Button and IconButton controls.

## Required composition

- Compose Button, Link, Separator, and ToggleGroup/ToggleItem parts inside a named Root; use Brick icons and concise visible or accessible labels.

## Rules

- **MUST:** Use Toolbar rather than adding manual arrow-key handlers or role=toolbar to an AppBar row.
- **MUST:** Define a deliberate narrow-width wrap, scroll, or alternative composition without breaking roving focus order.
- **MUST:** Load styles.css or core.css plus toolbar.css and any composed Icon stylesheet.

## Common mistakes

- **Avoid:** Using AppBar.Toolbar as the behavior owner or placing unrelated page actions in one roving group. **Instead:** Compose a named Toolbar only around logically related controls.

## Validation checklist

- Test orientation, arrows, disabled items, links, toggles, separators, Tab entry/exit, focus rings, touch targets, overflow, themes, zoom, and RTL.
- Confirm names and CSS delivery.

## Related guidance

- `app-bar`
- `button`
- `icon-button`
- `toggle-group`
- `divider`
