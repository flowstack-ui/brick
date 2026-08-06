# NavigationMenu agent guide

## Purpose

Present polished disclosure navigation while Atom owns trigger geometry, viewport positioning, focus, keyboard, pointer, and dismissal behavior.

## Use when

- A top-level site or product navigation combines direct links with disclosure panels of related destinations.

## Choose something else when

- The content is an action menu, persistent route rail, mobile drawer, or tab switcher. Use DropdownMenu, NavList, Drawer, or Tabs.

## Required composition

- Compose Root > List > Item containing Link or Trigger plus Content, with Viewport and optional Indicator/Arrow according to the documented anatomy; lay out content with Brick components.

## Rules

- **MUST:** Use the component's align, side, sideOffset, alignOffset, viewport, and arrow geometry instead of manual page-relative positioning.
- **MUST:** Keep contents focused on navigation destinations rather than commands or unrelated marketing panels.
- **MUST:** Load styles.css or core.css plus navigation-menu.css and every child component stylesheet.

## Common mistakes

- **Avoid:** Anchoring the panel or arrow to the logo/page while the trigger is elsewhere, or adding custom hover state that fights Atom. **Instead:** Let NavigationMenu own geometry and open state, then style through public recipes and tokens.

## Validation checklist

- Test hover, click, focus, arrow keys, Escape, outside interaction, links, viewport transitions, offsets, arrow alignment, zoom, narrow widths, and RTL.
- Confirm destination semantics and CSS delivery.

## Related guidance

- `app-bar`
- `nav-list`
- `drawer`
- `dropdown-menu`
- `link`
