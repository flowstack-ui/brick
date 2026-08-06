# NavList agent guide

## Purpose

Style persistent route navigation with current state, optional section labels, and collapsible grouped content.

## Use when

- A sidebar, drawer, rail, or page region contains a persistent list of destinations, optionally grouped.

## Choose something else when

- Navigation uses top-bar disclosure panels or local tab panels. Use NavigationMenu or Tabs.

## Required composition

- Compose Root > List > Item > Link; use SectionLabel for static groups and add SectionTrigger plus SectionContent only for real collapsible groups.

## Rules

- **MUST:** Set current destination state from the route and keep route items as links.
- **MUST:** Use NavList's section and item anatomy rather than rebuilding rows, badges, icons, and collapse behavior with arbitrary divs.
- **MUST:** Load styles.css or core.css plus nav-list.css.

## Common mistakes

- **Avoid:** Using buttons for routes or adding a collapsible trigger that controls no content. **Instead:** Use Link for destinations and SectionLabel alone for static groups.

## Validation checklist

- Check current, hover, focus, collapsed, expanded, long labels, icons, counts, zoom, narrow widths, and RTL.
- Confirm links and section relationships remain semantic and CSS is loaded.

## Related guidance

- `sidebar`
- `drawer`
- `navigation-menu`
- `link`
