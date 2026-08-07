# Drawer

Drawer is a modal task surface that enters from a logical or physical edge.

## When and where to use

Use it for focused navigation, details, or editing that benefits from retaining
page context.

## When not to use

Use Dialog for a centered modal task and nonmodal layout for persistent page
content. Drawer does not own application navigation or responsive shell policy.

## Installation and imports

```tsx
import * as Drawer from "@flowstack-ui/brick/drawer";
import "@flowstack-ui/brick/styles.css";
```

The module-namespace form above is safe in React Server Components and keeps
the containing page server-rendered. Inside an already client-owned module,
the legacy `import { Drawer }` runtime object remains supported.

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/drawer.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Drawer.Root>
  <Drawer.Trigger>Open</Drawer.Trigger>
  <Drawer.Portal>
    <Drawer.Overlay />
    <Drawer.Content>
      <Drawer.Header><Drawer.Title>Settings</Drawer.Title></Drawer.Header>
      <Drawer.Body>Settings content</Drawer.Body>
      <Drawer.Footer><Drawer.Close>Done</Drawer.Close></Drawer.Footer>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>
```

## Anatomy and DOM ownership

Atom owns `Root`, `Trigger`, `Portal`, `Overlay`, `Content`, `Title`,
`Description`, `Close`, and modal `Branch`. Brick adds structural `Header`,
`Body`, and `Footer` divs. Overlay/Content/structure refs are
`HTMLDivElement`; Title is `HTMLHeadingElement`, Description
`HTMLParagraphElement`, and composed Trigger/Close/Branch `HTMLElement`.

## API

Public exports are the `Drawer` namespace; named `DrawerRoot`,
`DrawerTrigger`, `DrawerPortal`, `DrawerOverlay`, `DrawerContent`,
`DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerBody`,
`DrawerFooter`, `DrawerClose`, and `DrawerBranch` parts; their corresponding
prop types; and `DrawerPlacement`, `DrawerSize`, plus `DrawerFooterJustify`.

The component subpath additionally exports `Root`, `Trigger`, `Portal`,
`Overlay`, `Content`, `Header`, `Title`, `Description`, `Body`, `Footer`,
`Close`, and `Branch` as short aliases for the recommended RSC-safe
module-namespace composition.

```ts
DrawerRootProps
DrawerTriggerProps
DrawerPortalProps
DrawerOverlayProps
DrawerContentProps
DrawerHeaderProps
DrawerTitleProps
DrawerDescriptionProps
DrawerBodyProps
DrawerFooterProps
DrawerCloseProps
DrawerBranchProps
```

| Content prop | Values | Default |
| --- | --- | --- |
| `placement` | `start`, `end`, `top`, `bottom` | `end` |
| `size` | `sm`, `md`, `lg`, `xl`, `full` | `md` |

| Footer prop | Values | Default |
| --- | --- | --- |
| `justify` | `start`, `center`, `end`, `between` | `end` |

Root and all behavior parts
inherit Atom modal/drawer props. Header, Body, and Footer accept native div
attributes and `data-slot`. Footer `justify` controls simple logical action
distribution; use layout components inside Footer for more complex grouping,
and use `Button fullWidth` when an action itself should fill the row. Footer
reflects the selected value through `data-justify`.

## Visual recipes and states

Placement selects the entering edge; start/end are logical. Size selects fixed
inline dimensions for side drawers and content-responsive block-size caps for
top/bottom drawers. `xl` may grow to the available viewport but still shrinks
around shorter content; `full` always uses the viewport. A top/bottom Drawer
grows with its authored content until the selected cap, then Body becomes the
scroll owner. Atom owns state, focus trap/return, dismissal, presence, portal,
and placement state.

## Tokens and CSS hooks

Stable classes and overridable `data-slot` values cover Trigger, Overlay,
Content, Header, Title, Description, Body, Footer, Close, and Branch. Content
reflects `data-size`; Atom reflects placement. Public tokens are
`--brick-drawer-inline-size-sm`, `--brick-drawer-inline-size-md`,
`--brick-drawer-inline-size-lg`, `--brick-drawer-inline-size-xl`,
`--brick-drawer-block-size-sm`, `--brick-drawer-block-size-md`,
`--brick-drawer-block-size-lg`, `--brick-drawer-block-size-xl`,
`--brick-drawer-background`, `--brick-drawer-radius`,
`--brick-drawer-shadow`, `--brick-drawer-space`,
`--brick-drawer-safe-top`, `--brick-drawer-safe-right`,
`--brick-drawer-safe-bottom`, and `--brick-drawer-safe-left`.

`--brick-drawer-background` and `--brick-drawer-radius` may be set on a theme
ancestor to change every Drawer in that scope, or on one Content instance for
a local exception. When unset, they fall back to
`--brick-color-surface-overlay` and `--brick-radius-overlay`, respectively.

## Customization

Use placement/size and Atom modal props first, then public tokens and compound
parts. Apply `className`/`style` to the owning part for scoped exceptions.

## Responsive behavior

Drawer constrains its dimensions to the viewport and uses safe-area tokens.
The application chooses breakpoints and whether a Drawer becomes another
pattern. Logical placement supports RTL.

## Accessibility

Atom owns modal semantics, focus containment/return, Escape and outside
dismissal. Supply a Title and, when useful, Description. Keep an accessible
Close action and use Branch only for externally portalled content that belongs
to the same modal interaction.

## Composition, native props, and refs

Atom behavior parts inherit Atom composition/native props. Brick structure
parts are native divs. Refs target the elements listed under anatomy.

## Examples

```tsx
<Drawer.Content placement="start" size="lg">
  <Drawer.Title>Navigation</Drawer.Title>
  <Drawer.Body>…</Drawer.Body>
</Drawer.Content>
```

## Evidence

- [Playground](../../../playground/src/components/drawer/DrawerPage.tsx)
- [Unit test](../../../test/components/drawer/drawer.test.tsx)
- [Type owner](../../../test/types/components/drawer.test.ts)
- [Browser spec](../../../playground/tests/components/drawer/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/drawer/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/drawer.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
