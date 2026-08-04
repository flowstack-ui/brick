# Context Menu

Context Menu provides commands for a pointer or touch context region through Atom-owned semantics and behavior.

## When and where to use

Use it when secondary actions apply to the exact region or object receiving the context-menu gesture. Essential actions need another discoverable route.

## When not to use

Do not use it as the only route to essential actions, for primary navigation, or when an explicit trigger is clearer.

## Installation and imports

```tsx
import { ContextMenu } from "@flowstack-ui/brick/context-menu";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/context-menu.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<ContextMenu.Root>
  <ContextMenu.Trigger>Right-click this region</ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Content>
      <ContextMenu.Item>Copy</ContextMenu.Item>
      <ContextMenu.Item tone="danger">Remove</ContextMenu.Item>
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu.Root>
```

## Anatomy and DOM ownership

Root owns open state and size. Trigger remains a paintless interaction region. Portal and Content own the positioned popup. Command, choice, group, submenu, artwork, and static text parts preserve Atom context-menu semantics.

## API

Public exports are `ContextMenu`, `ContextMenuRoot`, `ContextMenuTrigger`, `ContextMenuPortal`, `ContextMenuContent`, `ContextMenuArrow`, `ContextMenuGroup`, `ContextMenuLabel`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuItemIndicator`, `ContextMenuLeading`, `ContextMenuItemLabel`, `ContextMenuDescription`, `ContextMenuShortcut`, `ContextMenuSeparator`, `ContextMenuSub`, `ContextMenuSubTrigger`, `ContextMenuSubContent`, `ContextMenuRootProps`, `ContextMenuTriggerProps`, `ContextMenuPortalProps`, `ContextMenuContentProps`, `ContextMenuArrowProps`, `ContextMenuGroupProps`, `ContextMenuLabelProps`, `ContextMenuItemProps`, `ContextMenuCheckboxItemProps`, `ContextMenuRadioGroupProps`, `ContextMenuRadioItemProps`, `ContextMenuItemIndicatorProps`, `ContextMenuLeadingProps`, `ContextMenuItemLabelProps`, `ContextMenuDescriptionProps`, `ContextMenuShortcutProps`, `ContextMenuSeparatorProps`, `ContextMenuSubProps`, `ContextMenuSubTriggerProps`, `ContextMenuSubContentProps`, `ContextMenuSize`, `ContextMenuItemTone`.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |

Action-like rows accept the `neutral` or `danger` tone when exposed; `neutral` is the default. Behavioral props come from the matching Atom parts.

## Visual recipes and states

The trigger receives no Brick surface. The overlay uses collision-aware 32/44/48px `sm`/`md`/`lg` minimum rows with accent highlighting and visible disabled, danger, and selection states.

## Tokens and CSS hooks

Public variables use the `--brick-context-menu-*` namespace for content surface, row geometry, supporting text, disabled and danger states, separators, indicators, focus, and motion.

Popup entry motion travels from the actual Atom `data-side`: bottom moves
downward, top upward, right rightward, and left leftward. This includes a top
or bottom side selected when a submenu cannot fit inline. Entry uses opacity
and single-axis translation without scale motion.

Documented tokens are `--brick-context-menu-content-background`, `--brick-context-menu-content-foreground`, `--brick-context-menu-content-border`, `--brick-context-menu-content-radius`, `--brick-context-menu-content-shadow`, `--brick-context-menu-content-padding`, `--brick-context-menu-content-max-block-size`, `--brick-context-menu-row-min-block-size`, `--brick-context-menu-row-padding-inline`, `--brick-context-menu-row-gap`, `--brick-context-menu-row-radius`, `--brick-context-menu-row-foreground`, `--brick-context-menu-row-highlighted-background`, `--brick-context-menu-row-highlighted-foreground`, `--brick-context-menu-description-foreground`, `--brick-context-menu-shortcut-foreground`, `--brick-context-menu-label-foreground`, `--brick-context-menu-disabled-foreground`, `--brick-context-menu-danger-foreground`, `--brick-context-menu-danger-background`, `--brick-context-menu-separator-color`, `--brick-context-menu-indicator-size`, `--brick-context-menu-focus-ring`, `--brick-context-menu-motion-duration`.

Stable output includes `data-size`, component `data-slot` hooks, and Atom state attributes.

## Customization

Set documented variables on Root or Content as applicable. Use `className` and `style` for local layout without replacing semantic state, focus, or positioning attributes.

## Responsive behavior

Popup geometry stays collision-aware and constrained to available space. Narrow layouts preserve usable targets, logical alignment, zoom, and writing direction; applications decide whether the pattern belongs in their mobile information architecture.

Repeated secondary clicks inside the same Trigger keep the custom menu open and
move it to the latest invocation point. Invoking another Context Menu target
closes the previous root and opens the new target without exposing the browser
menu. With a submenu open, activation inside its ancestor menu closes only the
submenu; activation outside every menu surface closes the complete menu tree.

## Accessibility

Name icon-only triggers and label every command or destination clearly. Preserve Atom roles, keyboard behavior, focus return, disabled and selection states, dismissal, and forced-colors affordances.

## Composition, native props, and refs

Trigger preserves the consumer's rendered region and Atom interactions. Popup parts preserve native props, refs, custom slots, and supported composition; static text parts support `render` and `asChild`.

## Examples

See the [component playground](../../../playground/src/components/context-menu/) for defaults, sizes, anatomy, state, composition, customization, responsive, RTL, and preference evidence.

## Evidence

- [Unit tests](../../../test/components/context-menu/)
- [Type tests](../../../test/types/components/context-menu.test.ts)
- [Browser behavior](../../../playground/tests/components/context-menu/behavior.spec.ts)
- [Visual evidence](../../../playground/tests/components/context-menu/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/context-menu.md)

## Changelog

See [Context Menu changelog](CHANGELOG.md).
