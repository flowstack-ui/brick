# Dropdown Menu

Dropdown Menu provides button-triggered commands, persistent choices, and nested actions through Atom-owned semantics and behavior.

For an avatar trigger, place Avatar directly inside an accessible named
`DropdownMenu.Trigger`. Its native button is unpadded. Use `Trigger asChild`
with Button or IconButton when their finished control styling is wanted;
never nest a button inside the default native Trigger.

Mouse departure clears row highlight without closing the menu. Keyboard focus
remains visible; checkbox and radio selection is independent from highlight.
Portalled menu content participates in the containing dialog's overlay ordering.

## When and where to use

Use it for compact command sets opened from an explicit button.

## When not to use

Do not use it for primary navigation, right-click-only discovery, a persistent desktop command bar, or a select field.

## Installation and imports

```tsx
import { DropdownMenu } from "@flowstack-ui/brick/dropdown-menu";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/dropdown-menu.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
import { Button, DropdownMenu } from "@flowstack-ui/brick";

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild><Button>Actions</Button></DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content>
      <DropdownMenu.Item value="duplicate">Duplicate</DropdownMenu.Item>
      <DropdownMenu.Item value="delete" tone="danger">Delete</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
```

## Anatomy and DOM ownership

Root owns open state and size. Trigger opens the menu. Portal and Content own the positioned popup. Group, Label, Item, CheckboxItem, RadioGroup, RadioItem, ItemIndicator, Separator, Sub, SubTrigger, SubContent, and Arrow preserve Atom semantics. Leading, ItemLabel, Description, and Shortcut provide optional static row anatomy.

## API

### External controller and state

`useDropdownMenu` creates the Atom-owned controller. Pass the unchanged result to
`DropdownMenu.RootProvider` instead of `Root`; these are alternative state owners.
RootProvider accepts the same Brick visual settings, preserving popup recipes
through portals. `DropdownMenu.Context` renders a function with the public state.
The controller exposes open, highlightedValue, triggerValue and their setters, reposition, and setAnchorPoint. Context exposes the current menu state and supported state actions.

`DropdownMenu.TriggerIndicator` is an optional decorative slot with a default
chevron. Author it inside Trigger when an arrow is wanted; no arrow is injected
into a composed Button. Custom children replace the default artwork.

Behavior options remain Atom-owned: positioning, lifecycle/presence,
controlled highlight, cancellable selection, outside interaction callbacks,
and normal-link navigation preserve the same public contract as Root/Menu.
Use uniquely valued items; scoped repeated radio values require a stable
RadioGroup id. Keep ordinary links native and preserve modified-click behavior.

For menu destinations use `Item asChild` with `Link variant="plain"`; the menu
row supplies its interaction styling without a prose-link underline.

`DropdownMenu.Arrow` is optional popup artwork, not the trigger chevron. Author
it inside Content and allow clearance in `positioning.gutter` (for example,
12px for the default approximately 8.49px-tall arrow). The default base is
approximately 16.97px, matching the exposed half of a rotated 12px square.
Existing numeric `width` and `height` props customize the artwork dimensions.
Its paint follows the popup, masks the border across its base, and stays above the
popup shadow. Use Frame to constrain popup height and Stack alignment to keep
ordinary triggers intrinsic; width matching is opt-in.


Public exports are `DropdownMenu`, `DropdownMenuRoot`, `DropdownMenuTrigger`, `DropdownMenuPortal`, `DropdownMenuContent`, `DropdownMenuArrow`, `DropdownMenuGroup`, `DropdownMenuLabel`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuItemIndicator`, `DropdownMenuLeading`, `DropdownMenuItemLabel`, `DropdownMenuDescription`, `DropdownMenuShortcut`, `DropdownMenuSeparator`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`, `DropdownMenuRootProps`, `DropdownMenuTriggerProps`, `DropdownMenuPortalProps`, `DropdownMenuContentProps`, `DropdownMenuArrowProps`, `DropdownMenuGroupProps`, `DropdownMenuLabelProps`, `DropdownMenuItemProps`, `DropdownMenuCheckboxItemProps`, `DropdownMenuRadioGroupProps`, `DropdownMenuRadioItemProps`, `DropdownMenuItemIndicatorProps`, `DropdownMenuLeadingProps`, `DropdownMenuItemLabelProps`, `DropdownMenuDescriptionProps`, `DropdownMenuShortcutProps`, `DropdownMenuSeparatorProps`, `DropdownMenuSubProps`, `DropdownMenuSubTriggerProps`, `DropdownMenuSubContentProps`, `DropdownMenuSize`, `DropdownMenuItemTone`, `DropdownMenuVariant`, `DropdownMenuInset`.

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

## Visual recipes and states

### Overlay arrow contract

Overlay arrows share a 12px square-equivalent seed (--brick-overlay-arrow-size), exposed-edge artwork and owner surface/border paint. Prefer the shipped Arrow; do not add directional filters or translations. SVG Arrow width/height remain supported; positioning gutter measures the empty gap to the tip. Explicit positioning.offset remains raw. ToggleTip inherits Popover; Select/MultiSelect retain span hosts. NavigationMenu Indicator remains separately positioned.


The overlay uses the shared surface and compact regular typography: sm 24px/12px text, md 32px/14px text, lg 44px/16px text. Heights are minima; long content grows. Use lg for touch-oriented menus rather than assuming every compact row has a 44px target.

`Leading` owns the density-aware icon slot. A direct Brick `Icon`, SVG, or
image is centered and normalized to that slot, so consumers choose artwork
and tone without manually sizing it for each menu density.

Neutral subtle highlights are the default; solid uses paired foreground/background colors. Plain removes decorative highlight fill but retains keyboard-visible focus. Checked state is represented independently by ItemIndicator. Disabled rows never gain actionable hover paint.

Panel inset is 0/4/6/8px for none/sm/md/lg; omission follows effective size. SubContent inherits the nearest explicit recipe, including popup inset and leading policy. itemInset=none removes inline row padding only, not vertical spacing, minimum size or focus. leadingSpace=auto avoids phantom icon tracks; reserve aligns command/choice artwork in one column. Plain string Item content is supported.

SubTrigger indicator omission supplies the chevron, null suppresses it, and a node replaces it. Custom indicator content must be decorative. ItemIndicator custom children replace selection artwork. Do not add nested interactive controls or inspect child trees to control indicators.

## Tokens and CSS hooks

Public variables use the `--brick-dropdown-menu-*` namespace for content surface, row geometry, supporting text, disabled and danger states, separators, indicators, focus, and motion.

Popup entry motion travels from the actual Atom `data-side`: bottom moves
downward, top upward, right rightward, and left leftward. This includes a top
or bottom side selected when a submenu cannot fit inline. Entry uses opacity
and single-axis translation without scale motion.

Documented tokens are `--brick-dropdown-menu-content-background`, `--brick-dropdown-menu-content-foreground`, `--brick-dropdown-menu-content-border`, `--brick-dropdown-menu-content-radius`, `--brick-dropdown-menu-content-shadow`, `--brick-dropdown-menu-content-padding`, `--brick-dropdown-menu-content-max-block-size`, `--brick-dropdown-menu-row-min-block-size`, `--brick-dropdown-menu-row-padding-inline`, `--brick-dropdown-menu-row-gap`, `--brick-dropdown-menu-row-radius`, `--brick-dropdown-menu-row-foreground`, `--brick-dropdown-menu-row-highlighted-background`, `--brick-dropdown-menu-row-highlighted-foreground`, `--brick-dropdown-menu-description-foreground`, `--brick-dropdown-menu-shortcut-foreground`, `--brick-dropdown-menu-label-foreground`, `--brick-dropdown-menu-disabled-foreground`, `--brick-dropdown-menu-danger-foreground`, `--brick-dropdown-menu-danger-background`, `--brick-dropdown-menu-separator-color`, `--brick-dropdown-menu-indicator-size`, `--brick-dropdown-menu-focus-ring`, `--brick-dropdown-menu-motion-duration`.

Stable output includes `data-size`, component `data-slot` hooks, and Atom state attributes.

## Customization

Apply supported recipes first, then semantic Theme values, then documented local variables on Content/SubContent or the actual Item/part. DropdownMenu and ContextMenu Root have no host for popup CSS. Recipe context crosses portals; CSS variable inheritance does not. Preserve semantic state, focus and positioning attributes.

## Responsive behavior

Popup geometry stays collision-aware and constrained to available space. Narrow layouts preserve usable targets, logical alignment, zoom, and writing direction; applications decide whether the pattern belongs in their mobile information architecture.

## Accessibility

Name icon-only triggers and label every command or destination clearly. Preserve Atom roles, keyboard behavior, focus return, disabled and selection states, dismissal, and forced-colors affordances.

## Composition, native props, and refs

Root provides size context. Interactive and structural parts preserve Atom native props, refs, custom slots, `render`, and `asChild` where supported. Static content parts also support `render` and `asChild`.

For a destination row, compose `Item asChild` around a real Brick `Link`. Brick preserves the menu-row presentation across that composition, including `Leading`, `ItemLabel`, `Description`, and `Shortcut`; command rows remain `Item` elements with `onSelect`.

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
