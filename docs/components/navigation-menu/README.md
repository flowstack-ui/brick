# Navigation Menu

Navigation Menu provides site destinations with optional rich link panels through Atom-owned semantics and behavior.

## When and where to use

Use it for primary destination links when some categories reveal rich groups of additional destinations.

## When not to use

Do not use it for application commands, form choices, small action lists, or content tabs.

## Installation and imports

```tsx
import * as NavigationMenu from "@flowstack-ui/brick/navigation-menu";
import "@flowstack-ui/brick/styles.css";
```

The module-namespace import is safe to compose from a React Server Component:
each part remains a focused Client Component while the containing page remains
server-rendered. The legacy `import { NavigationMenu }` runtime object remains
available for client-owned modules.

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/navigation-menu.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/docs">Docs</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
  <NavigationMenu.Viewport />
</NavigationMenu.Root>
```

## Anatomy and DOM ownership

Root renders navigation, List a native list, Item a list item, Link a native destination, Trigger a disclosure control, Content a rich destination panel, Indicator the measured active-trigger marker, IndicatorArrow its decorative Viewport connector, Viewport the measured panel surface, and Sub a nested navigation root. An Indicator without children supplies IndicatorArrow automatically; explicit children replace it.

## API

Public exports are `NavigationMenu`, `NavigationMenuRoot`, `NavigationMenuSub`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuIndicator`, `NavigationMenuIndicatorArrow`, `NavigationMenuViewport`, `NavigationMenuRootProps`, `NavigationMenuSubProps`, `NavigationMenuListProps`, `NavigationMenuItemProps`, `NavigationMenuTriggerProps`, `NavigationMenuContentProps`, `NavigationMenuLinkProps`, `NavigationMenuIndicatorProps`, `NavigationMenuIndicatorArrowProps`, `NavigationMenuViewportProps`, `NavigationMenuSize`.

The component subpath additionally exports `Root`, `Sub`, `List`, `Item`,
`Trigger`, `Content`, `Link`, `Indicator`, `IndicatorArrow`, and `Viewport` as
short aliases for the recommended module-namespace composition.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |

Action-like rows accept `tone="neutral"` or `tone="danger"` when exposed; neutral is the default. Behavioral props come from the matching Atom parts.

## Visual recipes and states

Controls are paintless until hover, focus, open, or active. Links and triggers
use 32/44/48px `sm`/`md`/`lg` minimums. Compact chevrons communicate
disclosure, current links use a one-pixel underline, and the measured
IndicatorArrow connects the open trigger to the Viewport without becoming a
second selection bar. The Viewport uses the restrained shared control radius
by default; consumers that need a different brand treatment can set
`--brick-navigation-menu-viewport-radius` without adding a behavioral variant.
In vertical orientation, the Viewport follows Atom's
measured active-trigger offset so the connector stays attached while panels of
different heights replace one another.
In horizontal orientation, Atom centers the Viewport on the active Trigger and
collision-shifts it inside the visible browser boundary. Brick uses the same
physical geometry for the Indicator arrow in LTR and RTL. Set the inherited
`collisionPadding` prop on `Viewport` to change its eight-pixel boundary gap.

## Tokens and CSS hooks

Public variables use the `--brick-navigation-menu-*` namespace for gaps, control geometry and states, focus, chevron, indicator, viewport surface and sizing, and motion.

Documented tokens are `--brick-navigation-menu-gap`, `--brick-navigation-menu-control-min-block-size`, `--brick-navigation-menu-control-padding-inline`, `--brick-navigation-menu-control-radius`, `--brick-navigation-menu-control-foreground`, `--brick-navigation-menu-control-hover-background`, `--brick-navigation-menu-control-open-background`, `--brick-navigation-menu-control-open-foreground`, `--brick-navigation-menu-control-current-foreground`, `--brick-navigation-menu-focus-ring`, `--brick-navigation-menu-chevron-size`, `--brick-navigation-menu-chevron-stroke`, `--brick-navigation-menu-chevron-gap`, `--brick-navigation-menu-current-underline-size`, `--brick-navigation-menu-current-underline-offset`, `--brick-navigation-menu-indicator-size`, `--brick-navigation-menu-indicator-offset`, `--brick-navigation-menu-indicator-color`, `--brick-navigation-menu-indicator-border`, `--brick-navigation-menu-viewport-background`, `--brick-navigation-menu-viewport-foreground`, `--brick-navigation-menu-viewport-border`, `--brick-navigation-menu-viewport-radius`, `--brick-navigation-menu-viewport-shadow`, `--brick-navigation-menu-viewport-padding`, `--brick-navigation-menu-viewport-max-inline-size`, `--brick-navigation-menu-motion-duration`.

Stable output includes `data-size`, component `data-slot` hooks, and Atom state attributes.

## Customization

Set documented variables on Root or Content as applicable. Use `className` and `style` for local layout without replacing semantic state, focus, or positioning attributes.

## Responsive behavior

Popup geometry stays centered on the active Trigger when space permits, then
collision-shifts and constrains itself to the visible boundary. Narrow layouts
preserve usable targets, arrow alignment, zoom, and writing direction;
applications decide whether the pattern belongs in their mobile information
architecture.

## Accessibility

Name icon-only triggers and label every command or destination clearly. Preserve Atom roles, keyboard behavior, focus return, disabled and selection states, dismissal, and forced-colors affordances.

## Composition, native props, and refs

Every part preserves its Atom native attributes, refs, custom slots, handlers, and supported `render` or `asChild` composition. Link remains an anchor unless composed with a router adapter.

## Examples

See the [component playground](../../../playground/src/components/navigation-menu/) for defaults, sizes, anatomy, state, composition, customization, responsive, RTL, and preference evidence.

## Evidence

- [Unit tests](../../../test/components/navigation-menu/)
- [Type tests](../../../test/types/components/navigation-menu.test.ts)
- [Browser behavior](../../../playground/tests/components/navigation-menu/behavior.spec.ts)
- [Visual evidence](../../../playground/tests/components/navigation-menu/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/navigation-menu.md)

## Changelog

See [Navigation Menu changelog](CHANGELOG.md).
