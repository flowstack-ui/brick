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
<Menubar.Root>
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Portal>
      <Menubar.Content><Menubar.Item>New</Menubar.Item></Menubar.Content>
    </Menubar.Portal>
  </Menubar.Menu>
</Menubar.Root>
```

## Anatomy and DOM ownership

Root is the persistent menubar and owns size. Each Menu pairs a Trigger with popup Content. Portal, action and choice rows, groups, separators, submenus, artwork, supporting text, and Arrow preserve Atom semantics.

## API

Public exports are `Menubar`, `MenubarRoot`, `MenubarMenu`, `MenubarTrigger`, `MenubarPortal`, `MenubarContent`, `MenubarArrow`, `MenubarGroup`, `MenubarLabel`, `MenubarItem`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarItemIndicator`, `MenubarLeading`, `MenubarItemLabel`, `MenubarDescription`, `MenubarShortcut`, `MenubarSeparator`, `MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent`, `MenubarRootProps`, `MenubarMenuProps`, `MenubarTriggerProps`, `MenubarPortalProps`, `MenubarContentProps`, `MenubarArrowProps`, `MenubarGroupProps`, `MenubarLabelProps`, `MenubarItemProps`, `MenubarCheckboxItemProps`, `MenubarRadioGroupProps`, `MenubarRadioItemProps`, `MenubarItemIndicatorProps`, `MenubarLeadingProps`, `MenubarItemLabelProps`, `MenubarDescriptionProps`, `MenubarShortcutProps`, `MenubarSeparatorProps`, `MenubarSubProps`, `MenubarSubTriggerProps`, `MenubarSubContentProps`, `MenubarSize`, `MenubarItemTone`.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |

Action-like rows accept the `neutral` or `danger` tone when exposed; `neutral` is the default. Behavioral props come from the matching Atom parts.

## Visual recipes and states

The persistent root has a subtle bounded rail. Its triggers and popup rows use
32/44/48px `sm`/`md`/`lg` minimums. Open triggers use accent-soft state; popup
rows retain visible focus, disabled, danger, and selected states.

## Tokens and CSS hooks

Persistent-root variables use `--brick-menubar-*` for its surface and trigger geometry. The same namespace exposes popup surface, row, supporting text, state, focus, and motion hooks.

Popup entry motion travels from the actual Atom `data-side`: bottom moves
downward, top upward, right rightward, and left leftward. This includes a top
or bottom side selected when a submenu cannot fit inline. Entry uses opacity
and single-axis translation without scale motion.

Documented tokens are `--brick-menubar-background`, `--brick-menubar-border`, `--brick-menubar-radius`, `--brick-menubar-padding`, `--brick-menubar-gap`, `--brick-menubar-trigger-min-block-size`, `--brick-menubar-trigger-padding-inline`, `--brick-menubar-trigger-radius`, `--brick-menubar-trigger-foreground`, `--brick-menubar-trigger-interaction-background`, `--brick-menubar-trigger-open-background`, `--brick-menubar-trigger-open-foreground`, `--brick-menubar-trigger-focus-ring`.

Stable output includes `data-size`, component `data-slot` hooks, and Atom state attributes.

## Customization

Set documented variables on Root or Content as applicable. Use `className` and `style` for local layout without replacing semantic state, focus, or positioning attributes.

## Responsive behavior

Popup geometry stays collision-aware and constrained to available space. Narrow layouts preserve usable targets, logical alignment, zoom, and writing direction; applications decide whether the pattern belongs in their mobile information architecture.

## Accessibility

Name icon-only triggers and label every command or destination clearly. Preserve Atom roles, keyboard behavior, focus return, disabled and selection states, dismissal, and forced-colors affordances.

## Composition, native props, and refs

Root and Content preserve Atom `render` and `asChild`, native attributes, custom slots, handlers, and refs. Other Atom-backed parts preserve their matching composition contracts; static parts also compose.

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
