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
import { Drawer } from "@flowstack-ui/brick/drawer";
import "@flowstack-ui/brick/styles.css";
```

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
prop types; and `DrawerPlacement` plus `DrawerSize`.

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
| `size` | `sm`, `md`, `lg`, `full` | `md` |

Root and all behavior parts
inherit Atom modal/drawer props. Header, Body, and Footer accept native div
attributes and `data-slot`.

## Visual recipes and states

Placement selects the entering edge; start/end are logical. Size selects inline
dimensions for side drawers and block dimensions for top/bottom; `full` uses
the viewport. Atom owns state, focus trap/return, dismissal, presence, portal,
and placement state.

## Tokens and CSS hooks

Stable classes and overridable `data-slot` values cover Trigger, Overlay,
Content, Header, Title, Description, Body, Footer, Close, and Branch. Content
reflects `data-size`; Atom reflects placement. Public tokens are
`--brick-drawer-inline-size-sm`, `--brick-drawer-inline-size-md`,
`--brick-drawer-inline-size-lg`, `--brick-drawer-block-size-sm`,
`--brick-drawer-block-size-md`, `--brick-drawer-block-size-lg`,
`--brick-drawer-radius`, `--brick-drawer-shadow`, `--brick-drawer-space`,
`--brick-drawer-safe-top`, `--brick-drawer-safe-right`,
`--brick-drawer-safe-bottom`, and `--brick-drawer-safe-left`.

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
