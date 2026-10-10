# Menubar

Menubar provides persistent desktop-style command categories through Atom-owned semantics and behavior.

## When and where to use

Use it for a persistent application command strip such as File, Edit, and View, where adjacent menus share keyboard navigation.

## When not to use

Do not use it for site navigation, a mobile overflow, one dropdown, or ordinary page tabs.

## Installation and imports

```tsx
import { Menubar } from "@flowstack-ui/brick/menubar";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/menubar.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Menubar.Root aria-label="Editor commands">
  <Menubar.Menu value="file">
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Portal>
      <Menubar.Content><Menubar.Item value="new">New</Menubar.Item></Menubar.Content>
    </Menubar.Portal>
  </Menubar.Menu>
</Menubar.Root>
```

## Anatomy and DOM ownership

Root is the persistent menubar and owns size. Each Menu pairs a Trigger with popup Content. Portal, action and choice rows, groups, separators, submenus, artwork, supporting text, and Arrow preserve Atom semantics.

## API

Public exports are `Menubar`, `MenubarRoot`, `MenubarMenu`, `MenubarTrigger`, `MenubarPortal`, `MenubarContent`, `MenubarArrow`, `MenubarGroup`, `MenubarLabel`, `MenubarItem`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarItemIndicator`, `MenubarLeading`, `MenubarItemLabel`, `MenubarDescription`, `MenubarShortcut`, `MenubarSeparator`, `MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent`, `MenubarRootProps`, `MenubarMenuProps`, `MenubarTriggerProps`, `MenubarPortalProps`, `MenubarContentProps`, `MenubarArrowProps`, `MenubarGroupProps`, `MenubarLabelProps`, `MenubarItemProps`, `MenubarCheckboxItemProps`, `MenubarRadioGroupProps`, `MenubarRadioItemProps`, `MenubarItemIndicatorProps`, `MenubarLeadingProps`, `MenubarItemLabelProps`, `MenubarDescriptionProps`, `MenubarShortcutProps`, `MenubarSeparatorProps`, `MenubarSubProps`, `MenubarSubTriggerProps`, `MenubarSubContentProps`, `MenubarSize`, `MenubarItemTone`, `MenubarVariant`, `MenubarInset`.

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

### Independent strip presentation

Root size selects Button-aligned trigger geometry. menuSize overrides popup density independently, defaulting to size. barVariant=plain (default) leaves the rail unpainted; surface restores its bounded surface. triggerVariant=subtle (default) supplies neutral hover/open paint; plain leaves the background unchanged while keeping focus visible. Root and Trigger accept shared radius independently from popup radius. Popup tone does not recolor the strip.

Default popup rows are 24/32/44px minima with 12/14/16px regular text. This intentionally differs from the strip's control sizing. The new plain rail, neutral highlight and compact popup defaults are visible changes; use barVariant=surface and menuSize=lg when migrating a roomier bounded strip.

### External controller and state

`useMenubar` creates the Atom-owned controller. Pass the unchanged result to
`Menubar.RootProvider` instead of `Root`; these are alternative state owners.
RootProvider accepts the same Brick visual settings, preserving popup recipes
through portals. `Menubar.Context` renders a function with the public state.
The bar controller exposes the open menu value and setValue; per-menu behavior options remain on Menu.

`Menubar.TriggerIndicator` is an optional decorative slot with a default
chevron. Author it inside Trigger when an arrow is wanted; no arrow is injected
into a composed Button. Custom children replace the default artwork.

Behavior options remain Atom-owned: positioning, lifecycle/presence,
controlled highlight, cancellable selection, outside interaction callbacks,
and normal-link navigation preserve the same public contract as Root/Menu.
Use uniquely valued items; scoped repeated radio values require a stable
RadioGroup id. Keep ordinary links native and preserve modified-click behavior.

## Visual recipes and states

The persistent root is plain by default, with an opt-in bounded surface rail.
Triggers use Button-aligned control sizes independently from popup density.
Open triggers are neutral; popup rows retain visible focus, disabled, danger,
and selected states.

Neutral subtle highlights are the default; solid uses paired foreground/background colors. Plain removes decorative highlight fill but retains keyboard-visible focus. Checked state is represented independently by ItemIndicator. Disabled rows never gain actionable hover paint.

Panel inset is 0/4/6/8px for none/sm/md/lg; omission follows effective size. SubContent inherits the nearest explicit recipe, including popup inset and leading policy. itemInset=none removes inline row padding only, not vertical spacing, minimum size or focus. leadingSpace=auto avoids phantom icon tracks; reserve aligns command/choice artwork in one column. Plain string Item content is supported.

SubTrigger indicator omission supplies the chevron, null suppresses it, and a node replaces it. Custom indicator content must be decorative. ItemIndicator custom children replace selection artwork. Do not add nested interactive controls or inspect child trees to control indicators.

## Tokens and CSS hooks

Persistent-root variables use `--brick-menubar-*` for its surface and trigger geometry. The same namespace exposes popup surface, row, supporting text, state, focus, and motion hooks.

Popup entry motion travels from the actual Atom `data-side`: bottom moves
downward, top upward, right rightward, and left leftward. This includes a top
or bottom side selected when a submenu cannot fit inline. Entry uses opacity
and single-axis translation without scale motion.

Documented tokens are `--brick-menubar-background`, `--brick-menubar-border`, `--brick-menubar-radius`, `--brick-menubar-padding`, `--brick-menubar-gap`, `--brick-menubar-trigger-min-block-size`, `--brick-menubar-trigger-padding-inline`, `--brick-menubar-trigger-radius`, `--brick-menubar-trigger-foreground`, `--brick-menubar-trigger-interaction-background`, `--brick-menubar-trigger-open-background`, `--brick-menubar-trigger-open-foreground`, `--brick-menubar-trigger-focus-ring`.

Popup and row hooks are `--brick-menubar-content-background`, `--brick-menubar-content-foreground`, `--brick-menubar-content-border`, `--brick-menubar-content-radius`, `--brick-menubar-content-shadow`, `--brick-menubar-content-padding`, `--brick-menubar-content-max-block-size`, `--brick-menubar-row-min-block-size`, `--brick-menubar-row-padding-inline`, `--brick-menubar-row-gap`, `--brick-menubar-row-radius`, `--brick-menubar-row-foreground`, `--brick-menubar-row-highlighted-background`, `--brick-menubar-row-highlighted-foreground`, `--brick-menubar-description-foreground`, `--brick-menubar-shortcut-foreground`, `--brick-menubar-label-foreground`, `--brick-menubar-disabled-foreground`, `--brick-menubar-danger-foreground`, `--brick-menubar-danger-background`, `--brick-menubar-separator-color`, `--brick-menubar-indicator-size`, `--brick-menubar-focus-ring`, `--brick-menubar-motion-duration`.

Stable output includes `data-size`, component `data-slot` hooks, and Atom state attributes.

### Overlay arrow contract

Overlay arrows share a 12px square-equivalent seed (--brick-overlay-arrow-size), exposed-edge artwork and owner surface/border paint. Prefer the shipped Arrow; do not add directional filters or translations. SVG Arrow width/height remain supported; positioning gutter measures the empty gap to the tip. Explicit positioning.offset remains raw. ToggleTip inherits Popover; Select/MultiSelect retain span hosts. NavigationMenu Indicator remains separately positioned.

## Customization

Apply supported recipes first, then semantic Theme values, then documented local variables on Content/SubContent or the actual Item/part. DropdownMenu and ContextMenu Root have no host for popup CSS. Recipe context crosses portals; CSS variable inheritance does not. Preserve semantic state, focus and positioning attributes.

## Responsive behavior

Popup geometry stays collision-aware and constrained to available space. Narrow layouts preserve usable targets, logical alignment, zoom, and writing direction; applications decide whether the pattern belongs in their mobile information architecture.

## Accessibility

Name icon-only triggers and label every command or destination clearly. Preserve Atom roles, keyboard behavior, focus return, disabled and selection states, dismissal, and forced-colors affordances.

## Composition, native props, and refs

Root and Content preserve Atom `render` and `asChild`, native attributes, custom slots, handlers, and refs. Other Atom-backed parts preserve their matching composition contracts; static parts also compose.

### Composed command presentation

Use `Link variant="plain" tone="inherit"` inside `Item asChild` for native
destinations without typography underlines. Leading artwork uses
`Icon size="inherit" tone="inherit"` to follow row geometry and state colors.
For mixed icon commands, give Content an appropriate measure with Frame rather
than forcing labels into a narrow popup or overriding menu CSS.

Ordinary pointer highlights clear on departure; the top-level trigger still
represents its open menu. Use `triggerVariant="plain"` to remove that decorative
fill without removing keyboard focus. Popup `variant` and `tone` are independent.
Do not replace coordinated Menubar triggers with separate DropdownMenu roots.

## Examples

See the [component playground](../../../playground/src/components/menubar/) for defaults, sizes, anatomy, state, composition, customization, responsive, RTL, and preference evidence.

## Evidence

- [Unit tests](../../../test/components/menubar/)
- [Type tests](../../../test/types/components/menubar.test.ts)
- [Browser behavior](../../../playground/tests/components/menubar/behavior.spec.ts)
- [Visual evidence](../../../playground/tests/components/menubar/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/menubar.md)

## Changelog

See [Menubar changelog](CHANGELOG.md).
