# Bottom Navigation

Bottom Navigation presents three to five stable, equal-priority top-level destinations in a compact navigation surface.

## When and where to use

Use it near the logical bottom edge of a narrow application layout. Prefer links for URL destinations and buttons for application-controlled top-level views.

## When not to use

Do not use it for commands, local content panels, nested navigation, long destination trees, arbitrary footers, or generated overflow. Use Button, Tabs, Nav List, Sidebar, or Navigation Menu when those patterns match the task.

## Installation and imports

```tsx
import { BottomNavigation } from "@flowstack-ui/brick/bottom-navigation";
import { Icon } from "@flowstack-ui/brick/icon";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<BottomNavigation.Root ariaLabel="Primary destinations" defaultValue="home">
  <BottomNavigation.Item href="/home" value="home">
    <BottomNavigation.Icon><Icon><HomeIcon /></Icon></BottomNavigation.Icon>
    <BottomNavigation.Label>Home</BottomNavigation.Label>
  </BottomNavigation.Item>
  <BottomNavigation.Item href="/search" value="search">
    <BottomNavigation.Icon><Icon><SearchIcon /></Icon></BottomNavigation.Icon>
    <BottomNavigation.Label>Search</BottomNavigation.Label>
  </BottomNavigation.Item>
</BottomNavigation.Root>
```

## Anatomy and DOM ownership

`Root` delegates to Atom's native `nav`. `Item` is an anchor when `href` is supplied and a button otherwise. `Icon` and `Label` are consumer-authored spans. No list, generated Indicator, Badge, or icon artwork is inserted.

Atom owns current value, native destination behavior, disabled behavior, composition, label visibility, and position intent. Brick owns visual recipes, geometry, selected paint, safe areas, blur, elevation, and position CSS.

## API

Public exports are `BottomNavigation`, `BottomNavigationRoot`, `BottomNavigationItem`, `BottomNavigationIcon`, `BottomNavigationLabel`, `BottomNavigationRootProps`, `BottomNavigationItemProps`, `BottomNavigationIconProps`, `BottomNavigationLabelProps`, `BottomNavigationVariant`, `BottomNavigationTone`, `BottomNavigationLayout`, `BottomNavigationArrangement`, `BottomNavigationSize`, `BottomNavigationPosition`, and `BottomNavigationLabelVisibility`.

| Part/property | Values | Default |
| --- | --- | --- |
| `variant` | `solid`, `soft`, `outline`, `ghost` | `outline` |
| `tone` | `accent`, `neutral` | `accent` |
| `layout` | `full`, `floating` | `full` |
| `arrangement` | `equal`, `centered` | `equal` |
| `size` | `sm`, `md`, `lg` | `md` |
| `position` | `static`, `sticky`, `absolute`, `fixed` | `static` |
| `labelVisibility` | `always`, `active`, `hidden` | `always` |
| `blurred` | boolean | `false` |
| `elevated` | boolean | `false` |
| `safeArea` | boolean | `true` |
| `selection` | `indicator`, `item` | `indicator` |
| `selectionShape` | `circle`, `square`, `rounded`, `pill` constrained by `selection` | `pill` |
| Root `selection="indicator"` | `selectionShape="circle"`, `selectionShape="rounded"`, `selectionShape="pill"` | `pill` |
| Root `selection="item"` | `selectionShape="square"`, `selectionShape="rounded"`, `selectionShape="pill"` | `pill` |
| Root effects | `elevated`, `blurred`, `safeArea` | `false`, `false`, `true` |
| Item | `value`, `href`, `disabled`, native props, `render`, `asChild` | button without `href`; anchor with `href` |
| Icon, Label | native span props, `render`, `asChild` | span |

Deprecated `showLabels={false}` maps to `labelVisibility="active"` only when `labelVisibility` is absent.

## Visual recipes and states

Variant controls the bar surface: solid is strong, soft is quiet, outline has a boundary, and ghost is transparent. Tone is either accent or fully neutral. Layout controls full-width versus inset floating geometry; arrangement controls equal versus centered closed tracks. Size coordinates Root padding, Item targets, Icon, indicator, and label typography.

`selection="indicator"` paints Icon only; `selection="item"` paints the full target. Their discriminated shapes prevent a circular whole Item. Elevation and blur are independent and never imply position or layout. Hover, pressed, current, focus-visible, disabled, reduced motion/transparency, forced colors, light/dark, and RTL are styled.

## Tokens and CSS hooks

Stable Root data hooks are `data-variant`, `data-tone`, `data-layout`, `data-arrangement`, `data-size`, `data-position`, `data-label-visibility`, `data-selection`, `data-selection-shape`, `data-elevated`, `data-blurred`, and `data-safe-area`. Parts use `data-slot="bottom-navigation|bottom-navigation-item|bottom-navigation-icon|bottom-navigation-label"`; Atom also supplies current, disabled, value, and label-visible state.

Public variables are `--brick-bottom-navigation-background`, `--brick-bottom-navigation-foreground`, `--brick-bottom-navigation-border-color`, `--brick-bottom-navigation-shadow`, `--brick-bottom-navigation-gap`, `--brick-bottom-navigation-outer-gutter`, `--brick-bottom-navigation-padding-inline`, `--brick-bottom-navigation-padding-block`, `--brick-bottom-navigation-item-min-inline-size`, `--brick-bottom-navigation-item-max-inline-size`, `--brick-bottom-navigation-item-min-block-size`, `--brick-bottom-navigation-item-radius`, `--brick-bottom-navigation-item-foreground`, `--brick-bottom-navigation-item-foreground-hover`, `--brick-bottom-navigation-item-foreground-active`, `--brick-bottom-navigation-item-foreground-disabled`, `--brick-bottom-navigation-item-background-hover`, `--brick-bottom-navigation-item-background-pressed`, `--brick-bottom-navigation-selection-background`, `--brick-bottom-navigation-selection-border`, `--brick-bottom-navigation-focus-ring`, `--brick-bottom-navigation-icon-size`, `--brick-bottom-navigation-icon-indicator-inline-size`, `--brick-bottom-navigation-icon-indicator-block-size`, `--brick-bottom-navigation-label-gap`, `--brick-bottom-navigation-label-font-family`, `--brick-bottom-navigation-label-font-size`, `--brick-bottom-navigation-label-font-weight`, `--brick-bottom-navigation-label-font-weight-active`, `--brick-bottom-navigation-label-line-height`, `--brick-bottom-navigation-label-letter-spacing`, `--brick-bottom-navigation-blurred-background`, `--brick-bottom-navigation-reduced-transparency-background`, `--brick-bottom-navigation-z-index`, and `--brick-bottom-navigation-resolved-block-size` for application-owned content compensation.

## Customization

Set documented variables on Root for local customization. Keep every coordinated value together and verify contrast in both appearances. Compose NotificationBadge inside `BottomNavigation.Icon` around the Brick Icon child when a destination needs a count; Bottom Navigation does not duplicate badge behavior.

## Responsive behavior

Full layout fills its containing width. Floating layout remains centered, capped to the available width, and keeps an outer gutter. Equal arrangement divides available space; centered arrangement keeps closed target widths. Each size keeps a stable base height across widths and label policies. Visible labels remain one line and truncate visually when necessary while their complete authored text remains the accessible name.

Static remains in flow and does not consume viewport safe area. Sticky remains in flow at the logical bottom; absolute and fixed overlay their containing block or viewport. The application must reserve content space for overlays using the resolved block-size variable. Full positioned bars use only the stable `safe-area-max-inset-*` values so mobile browser chrome cannot move their contents while scrolling; positioned floating bars use the maximum bottom inset as an outer offset. Browsers without maximum-inset support resolve this automatic reserve to zero, so an application targeting those browsers should supply its known inset through its own shell spacing.

## Accessibility

Give Root a concise unique `ariaLabel` when multiple navigation landmarks exist. Keep visible labels when possible. `always`, `active`, and `hidden` change only visual presentation; authored Label text remains available to assistive technology. `aria-current="page"` identifies the current destination. Focus paint covers the complete Item, and selected state has a non-color boundary.

## Composition, native props, and refs

Root and Item preserve Atom native props, handlers, refs, custom slots, and `render`/`asChild`. Icon and Label preserve span props, refs, classes, styles, and composition. Place NotificationBadge inside `BottomNavigation.Icon` around its Brick Icon child so the badge anchors to the glyph instead of the wider selection slot. Router adapters belong on Item. Bottom Navigation does not own route matching, page padding, keyboard avoidance, scroll-driven hiding, or responsive replacement with Sidebar.

## Examples

See the [component playground](../../../playground/src/components/bottom-navigation/) for defaults, variants, tones, layouts, arrangements, sizes, positions, label policies, selection targets/shapes, destination models, states, composition, safe areas, effects, customization, mobile, RTL, and preference evidence.

## Evidence

- [Unit tests](../../../test/components/bottom-navigation/)
- [Type tests](../../../test/types/components/bottom-navigation.test.ts)
- [Browser behavior](../../../playground/tests/components/bottom-navigation/behavior.spec.ts)
- [Visual evidence](../../../playground/tests/components/bottom-navigation/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/bottom-navigation.md)

## Changelog

See [Bottom Navigation changelog](CHANGELOG.md).
