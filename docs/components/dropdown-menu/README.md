# Dropdown Menu

Dropdown Menu provides button-triggered commands, persistent choices, and nested actions through Atom-owned semantics and behavior.

## When and where to use

Use it for compact command sets opened from an explicit button.

## When not to use

Do not use it for primary navigation, right-click-only discovery, a persistent desktop command bar, or a select field.

## Installation and imports

```tsx
import { DropdownMenu } from "@flowstack-ui/brick/dropdown-menu";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<DropdownMenu.Root>
  <DropdownMenu.Trigger>Actions</DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content>
      <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
      <DropdownMenu.Item tone="danger">Delete</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
```

## Anatomy and DOM ownership

Root owns open state and size. Trigger opens the menu. Portal and Content own the positioned popup. Group, Label, Item, CheckboxItem, RadioGroup, RadioItem, ItemIndicator, Separator, Sub, SubTrigger, SubContent, and Arrow preserve Atom semantics. Leading, ItemLabel, Description, and Shortcut provide optional static row anatomy.

## API

Public exports are `DropdownMenu`, `DropdownMenuRoot`, `DropdownMenuTrigger`, `DropdownMenuPortal`, `DropdownMenuContent`, `DropdownMenuArrow`, `DropdownMenuGroup`, `DropdownMenuLabel`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuItemIndicator`, `DropdownMenuLeading`, `DropdownMenuItemLabel`, `DropdownMenuDescription`, `DropdownMenuShortcut`, `DropdownMenuSeparator`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`, `DropdownMenuRootProps`, `DropdownMenuTriggerProps`, `DropdownMenuPortalProps`, `DropdownMenuContentProps`, `DropdownMenuArrowProps`, `DropdownMenuGroupProps`, `DropdownMenuLabelProps`, `DropdownMenuItemProps`, `DropdownMenuCheckboxItemProps`, `DropdownMenuRadioGroupProps`, `DropdownMenuRadioItemProps`, `DropdownMenuItemIndicatorProps`, `DropdownMenuLeadingProps`, `DropdownMenuItemLabelProps`, `DropdownMenuDescriptionProps`, `DropdownMenuShortcutProps`, `DropdownMenuSeparatorProps`, `DropdownMenuSubProps`, `DropdownMenuSubTriggerProps`, `DropdownMenuSubContentProps`, `DropdownMenuSize`, `DropdownMenuItemTone`.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |

Action-like rows accept the `neutral` or `danger` tone when exposed; `neutral` is the default. Behavioral props come from the matching Atom parts.

## Visual recipes and states

The overlay uses a raised surface, 32/44/48px `sm`/`md`/`lg` minimum rows, accent highlighting, visible disabled and danger states, selection indicators, and collision-aware nested content.

## Tokens and CSS hooks

Public variables use the `--brick-dropdown-menu-*` namespace for content surface, row geometry, supporting text, disabled and danger states, separators, indicators, focus, and motion.

Popup entry motion travels from the actual Atom `data-side`: bottom moves
downward, top upward, right rightward, and left leftward. This includes a top
or bottom side selected when a submenu cannot fit inline. Entry uses opacity
and single-axis translation without scale motion.

Documented tokens are `--brick-dropdown-menu-content-background`, `--brick-dropdown-menu-content-foreground`, `--brick-dropdown-menu-content-border`, `--brick-dropdown-menu-content-radius`, `--brick-dropdown-menu-content-shadow`, `--brick-dropdown-menu-content-padding`, `--brick-dropdown-menu-content-max-block-size`, `--brick-dropdown-menu-row-min-block-size`, `--brick-dropdown-menu-row-padding-inline`, `--brick-dropdown-menu-row-gap`, `--brick-dropdown-menu-row-radius`, `--brick-dropdown-menu-row-foreground`, `--brick-dropdown-menu-row-highlighted-background`, `--brick-dropdown-menu-row-highlighted-foreground`, `--brick-dropdown-menu-description-foreground`, `--brick-dropdown-menu-shortcut-foreground`, `--brick-dropdown-menu-label-foreground`, `--brick-dropdown-menu-disabled-foreground`, `--brick-dropdown-menu-danger-foreground`, `--brick-dropdown-menu-danger-background`, `--brick-dropdown-menu-separator-color`, `--brick-dropdown-menu-indicator-size`, `--brick-dropdown-menu-focus-ring`, `--brick-dropdown-menu-motion-duration`.

Stable output includes `data-size`, component `data-slot` hooks, and Atom state attributes.

## Customization

Set documented variables on Root or Content as applicable. Use `className` and `style` for local layout without replacing semantic state, focus, or positioning attributes.

## Responsive behavior

Popup geometry stays collision-aware and constrained to available space. Narrow layouts preserve usable targets, logical alignment, zoom, and writing direction; applications decide whether the pattern belongs in their mobile information architecture.

## Accessibility

Name icon-only triggers and label every command or destination clearly. Preserve Atom roles, keyboard behavior, focus return, disabled and selection states, dismissal, and forced-colors affordances.

## Composition, native props, and refs

Root provides size context. Interactive and structural parts preserve Atom native props, refs, custom slots, `render`, and `asChild` where supported. Static content parts also support `render` and `asChild`.

## Examples

See the [component playground](../../../playground/src/components/dropdown-menu/) for defaults, sizes, anatomy, state, composition, customization, responsive, RTL, and preference evidence.

## Evidence

- [Unit tests](../../../test/components/dropdown-menu/)
- [Type tests](../../../test/types/components/dropdown-menu.test.ts)
- [Browser behavior](../../../playground/tests/components/dropdown-menu/behavior.spec.ts)
- [Visual evidence](../../../playground/tests/components/dropdown-menu/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/dropdown-menu.md)

## Changelog

See [Dropdown Menu changelog](CHANGELOG.md).
