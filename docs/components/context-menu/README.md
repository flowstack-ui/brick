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
    <ContextMenu.Content ariaLabel="Region actions">
      <ContextMenu.Item value="copy">Copy</ContextMenu.Item>
      <ContextMenu.Item value="remove" tone="danger">Remove</ContextMenu.Item>
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu.Root>
```

## Anatomy and DOM ownership

Root owns open state and size. Trigger remains a paintless interaction region. Portal and Content own the positioned popup. Command, choice, group, submenu, artwork, and static text parts preserve Atom context-menu semantics.

## API

Public exports are `ContextMenu`, `ContextMenuRoot`, `ContextMenuTrigger`, `ContextMenuPortal`, `ContextMenuContent`, `ContextMenuArrow`, `ContextMenuGroup`, `ContextMenuLabel`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuItemIndicator`, `ContextMenuLeading`, `ContextMenuItemLabel`, `ContextMenuDescription`, `ContextMenuShortcut`, `ContextMenuSeparator`, `ContextMenuSub`, `ContextMenuSubTrigger`, `ContextMenuSubContent`, `ContextMenuRootProps`, `ContextMenuTriggerProps`, `ContextMenuPortalProps`, `ContextMenuContentProps`, `ContextMenuArrowProps`, `ContextMenuGroupProps`, `ContextMenuLabelProps`, `ContextMenuItemProps`, `ContextMenuCheckboxItemProps`, `ContextMenuRadioGroupProps`, `ContextMenuRadioItemProps`, `ContextMenuItemIndicatorProps`, `ContextMenuLeadingProps`, `ContextMenuItemLabelProps`, `ContextMenuDescriptionProps`, `ContextMenuShortcutProps`, `ContextMenuSeparatorProps`, `ContextMenuSubProps`, `ContextMenuSubTriggerProps`, `ContextMenuSubContentProps`, `ContextMenuSize`, `ContextMenuItemTone`, `ContextMenuVariant`, `ContextMenuInset`.

| Prop | Values | Default |
| --- | --- | --- |
| `Root.size` | `sm`, `md`, `lg` | `md` |
| `Root.variant` | `subtle`, `solid`, `plain` | `subtle` |
| `Root.tone` | `neutral`, `accent`, `info`, `success`, `warning`, `danger` | `neutral` |
| `Content/SubContent.size/variant/tone` | Same recipe values | Nearest recipe context |
| `Content/SubContent.inset` | `none`, `sm`, `md`, `lg` | Effective size |
| `Content/SubContent.itemInset` | `default`, `none` | `default` |
| `Content/SubContent.leadingSpace` | `auto`, `reserve` | `auto` |
| `Item/CheckboxItem/RadioItem/SubTrigger.tone` | Semantic tones above | Inherit |
| `Item/CheckboxItem/RadioItem/SubTrigger.itemInset` | `default`, `none` | Inherit |
| `Item.layout` | `row`, `stack` | `row` |
| `SubTrigger.indicator` | `ReactNode` or `null` | Default chevron |

Behavioral props come from the matching Atom parts. Root/popup tone selects highlighted colors while resting labels remain primary. Explicit item tone also selects resting foreground; omitted item tone inherits and explicit neutral resets.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

### External controller and state

`useContextMenu` creates the Atom-owned controller. Pass the unchanged result to
`ContextMenu.RootProvider` instead of `Root`; these are alternative state owners.
RootProvider accepts the same Brick visual settings, preserving popup recipes
through portals. `ContextMenu.Context` renders a function with the public state.
The controller exposes open, highlightedValue, triggerValue and their setters, reposition, and setAnchorPoint. Context exposes the current menu state and supported state actions.

`ContextMenu.TriggerIndicator` is an optional decorative slot with a default
chevron. Author it inside Trigger when an arrow is wanted; no arrow is injected
into a composed Button. Custom children replace the default artwork.

Behavior options remain Atom-owned: positioning, lifecycle/presence,
controlled highlight, cancellable selection, outside interaction callbacks,
and normal-link navigation preserve the same public contract as Root/Menu.
Use uniquely valued items; scoped repeated radio values require a stable
RadioGroup id. Keep ordinary links native and preserve modified-click behavior.

## Visual recipes and states

The trigger receives no Brick surface. Popup rows use 24/32/44px minima and 12/14/16px regular text for sm/md/lg. Long content grows; lg offers comfortable touch-oriented density.

Neutral subtle highlights are the default; solid uses paired foreground/background colors. Plain removes decorative highlight fill but retains keyboard-visible focus. Checked state is represented independently by ItemIndicator. Disabled rows never gain actionable hover paint.

Compose navigation items with `Link variant="plain" tone="inherit"` inside
`Item asChild`: the menu supplies row presentation while the anchor retains
native navigation. Leading artwork uses `Icon size="inherit" tone="inherit"`
so it follows the menu's density and state colors. Mouse departure clears
pointer-only highlight; keyboard focus and checked state are separate.

Use Arrow only when that pointer is useful; ordinary context menus do not
require one. Context targets may be full-width regions, unlike ordinary action
buttons. Preserve their native semantics and provide a visible command route.

The documentation route separates controlled highlight, selection cancellation,
retained content, checkbox and radio examples. Environment and exhaustive state
matrices remain on the qualification route instead of the normal examples.

Panel inset is 0/4/6/8px for none/sm/md/lg; omission follows effective size. SubContent inherits the nearest explicit recipe, including popup inset and leading policy. itemInset=none removes inline row padding only, not vertical spacing, minimum size or focus. leadingSpace=auto avoids phantom icon tracks; reserve aligns command/choice artwork in one column. Plain string Item content is supported.

SubTrigger indicator omission supplies the chevron, null suppresses it, and a node replaces it. Custom indicator content must be decorative. ItemIndicator custom children replace selection artwork. Do not add nested interactive controls or inspect child trees to control indicators.

## Tokens and CSS hooks

Public variables use the `--brick-context-menu-*` namespace for content surface, row geometry, supporting text, disabled and danger states, separators, indicators, focus, and motion.

Popup entry motion travels from the actual Atom `data-side`: bottom moves
downward, top upward, right rightward, and left leftward. This includes a top
or bottom side selected when a submenu cannot fit inline. Entry uses opacity
and single-axis translation without scale motion.

Documented tokens are `--brick-context-menu-content-background`, `--brick-context-menu-content-foreground`, `--brick-context-menu-content-border`, `--brick-context-menu-content-radius`, `--brick-context-menu-content-shadow`, `--brick-context-menu-content-padding`, `--brick-context-menu-content-max-block-size`, `--brick-context-menu-row-min-block-size`, `--brick-context-menu-row-padding-inline`, `--brick-context-menu-row-gap`, `--brick-context-menu-row-radius`, `--brick-context-menu-row-foreground`, `--brick-context-menu-row-highlighted-background`, `--brick-context-menu-row-highlighted-foreground`, `--brick-context-menu-description-foreground`, `--brick-context-menu-shortcut-foreground`, `--brick-context-menu-label-foreground`, `--brick-context-menu-disabled-foreground`, `--brick-context-menu-danger-foreground`, `--brick-context-menu-danger-background`, `--brick-context-menu-separator-color`, `--brick-context-menu-indicator-size`, `--brick-context-menu-focus-ring`, `--brick-context-menu-motion-duration`.

Stable output includes `data-size`, component `data-slot` hooks, and Atom state attributes.

### Overlay arrow contract

Overlay arrows share a 12px square-equivalent seed (--brick-overlay-arrow-size), exposed-edge artwork and owner surface/border paint. Prefer the shipped Arrow; do not add directional filters or translations. SVG Arrow width/height remain supported; positioning gutter measures the empty gap to the tip. Explicit positioning.offset remains raw. ToggleTip inherits Popover; Select/MultiSelect retain span hosts. NavigationMenu Indicator remains separately positioned.

## Customization

Apply supported recipes first, then semantic Theme values, then documented local variables on Content/SubContent or the actual Item/part. DropdownMenu and ContextMenu Root have no host for popup CSS. Recipe context crosses portals; CSS variable inheritance does not. Preserve semantic state, focus and positioning attributes.

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
