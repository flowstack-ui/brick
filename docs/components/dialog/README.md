# Dialog

Dialog presents a focused modal task or information surface above the current
page. Atom owns modal state, focus, dismissal, portals, background isolation,
scroll containment, and presence; Brick supplies the finished visual anatomy.

## When and where to use

Use Dialog for short forms, settings, details, previews, and multi-control tasks
that temporarily block interaction with the page.

## When not to use

Use AlertDialog for urgent destructive confirmation, Drawer for
side-attached modal content, and Popover or Menu when the page must remain
interactive.

Dialog is modal-only. It does not own application workflow, submission, data
loading, routing, or generated action copy.

## Installation and imports

```tsx
import { Dialog } from "@flowstack-ui/brick/dialog";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/dialog.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


The namespace is also available from `@flowstack-ui/brick`. Advanced consumers
may import the canonical direct parts from the Dialog subpath.

## Quick start

```tsx
import { Button } from "@flowstack-ui/brick/button";
import { Dialog } from "@flowstack-ui/brick/dialog";

export function ProfileDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Edit profile</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Description>
              Update the information visible to your team.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>{/* form */}</Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button tone="neutral" variant="outline">Cancel</Button>
            </Dialog.Close>
            <Button form="profile-form" type="submit">Save</Button>
          </Dialog.Footer>
        </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

Overlay must remain outside Content ancestry. Render it beside Positioner. Nesting Content inside Overlay places
the dialog inside an accessibility-hidden subtree and is rejected by Atom.

## Anatomy and DOM ownership

| Part | Default output | Responsibility |
| --- | --- | --- |
| `Root` | no element | Open state, dismissal policy, modal layer ownership |
| `Trigger` | `button` | Opens Dialog; supports Atom `asChild` and `render` |
| `Portal` | no wrapper | Renders into `body`, a container, or inline |
| `Overlay` | `div` | Scrim and exact-target backdrop dismissal |
| `Positioner` | `div` | Registered outer scroll boundary, placement and scrolling recipes |
| `Content` | `div[role="dialog"]` | Modal surface, focus scope, ARIA owner, and size |
| `Header` | `div` | Title and optional description region |
| `Title` | `h2` | Visible accessible name; supports `h1`–`h6` |
| `Description` | `p` | Optional accessible description |
| `Body` | `div` | Primary bounded scroll region |
| `Footer` | `div` | Wrapping action region in source order |
| `Close` | `button` | Closes with Atom's `closeClick` reason; optionally anchors an authored control to Content's logical top-end corner |
| `Branch` | `div` | Registers a third-party portalled subtree |

All DOM-rendering parts accept their relevant native props, refs, `className`,
`style`, and overridable `data-slot`. Brick merges its stable class with the
consumer class.

## API

Public exports are the `Dialog` namespace; named `DialogRoot`,
`DialogTrigger`, `DialogPortal`, `DialogOverlay`, `DialogPositioner`, `DialogContent`,
`DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogBody`,
`DialogFooter`, `DialogClose`, and `DialogBranch` parts; and their
corresponding prop types plus `DialogSize`, `DialogFooterJustify`, and
`DialogClosePlacement`, `DialogPlacement`, `DialogScrollBehavior`, and `DialogMotionPreset`.

```ts
DialogRootProps
DialogTriggerProps
DialogPortalProps
DialogPositionerProps
DialogOverlayProps
DialogContentProps
DialogHeaderProps
DialogTitleProps
DialogDescriptionProps
DialogBodyProps
DialogFooterProps
DialogCloseProps
DialogClosePlacement
DialogBranchProps
```

### Root

Forwards Atom's `open`, `defaultOpen`, `onOpenChange`, `closeOnEscape`,
`closeOnBackdropClick`, `disabled`, `keepMounted`, and `onExitComplete` contract. Retained Content preserves child state and is hidden after exit. Root renders no
DOM element and has no ref.

### Content

| Prop | Values | Default |
| --- | --- | --- |
| `size` | ResponsiveValue of `xs`, `sm`, `md`, `lg`, `xl`, `cover`, `full` | `md` |
| `motionPreset` | `scale`, `slide-in-top`, `slide-in-bottom`, `slide-in-left`, `slide-in-right`, `none` | `scale` |
| `radius` | Radius | `control` |

Widths are 24, 28, 32, 42 and 56rem. Cover and full require Positioner and occupy its viewport area. Content also forwards native ARIA,
`role`, `initialFocus`, and `finalFocus` supported by Atom.

### Positioner

`placement`: `top` (default), `center`, or `bottom`.
`scrollBehavior`: `outside` (default) scrolls the whole panel; `inside` scrolls Body.
Positioner owns a registered scrolling boundary, not dialog semantics. Its ref is
HTMLDivElement and native props are forwarded. Use it as a direct Content parent
and sibling of Overlay. Outside clicks honor Root dismissal policy. A native
onClick handler may prevent dismissal. Overlay disabled only controls Overlay;
use Root closeOnBackdropClick=false to disable both dismissal surfaces.

### Portal and Overlay

Portal forwards `container` and `disabled`. A container must be a same-document
`HTMLElement`. Overlay forwards its independent `disabled` dismissal control.

### Footer

| Prop | Values | Default |
| --- | --- | --- |
| `justify` | `start`, `center`, `end`, `between` | `end` |

Use `justify` for simple logical action distribution. Compose a layout
component inside Footer for more complex groups; use `Button fullWidth` when
the action itself should fill the available row. Footer reflects the selected
value through `data-justify`.

### Trigger, Close, and Branch

These parts forward Atom's `asChild` and `render` composition. The composed
element must accept the merged props and ref and retain valid semantics.

Close additionally supports `placement="inline" | "corner"`, defaulting to
`inline`. Use `corner` only as a direct descendant of Content; Brick anchors
the consumer-authored control one space-2 inset from Content's logical
top-end corner. Brick does not generate the icon or accessible name.

### Title

Title defaults to `h2`; `as` accepts `h1` through `h6`. A visible Title supplies
the generated accessible name. Consumers that intentionally omit it must add
an explicit native `aria-label` or `aria-labelledby` to Content.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

Content supports seven sizes; `md` is the default. Atom's public
`data-state`, `data-positioned`, and disabled outputs drive open, closed,
positioned, and unavailable styling. Dialog Content intentionally has no tone,
variant, placement, fullscreen, or arbitrary-width prop. Close has the
independent inline/corner visual placement described above.

## Tokens and CSS hooks

Stable classes and default slots are:

| Part | Class | Slot |
| --- | --- | --- |
| Trigger | `.brick-dialog-trigger` | `dialog-trigger` |
| Overlay | `.brick-dialog-overlay` | `dialog-overlay` |
| Positioner | `.brick-dialog-positioner` | `dialog-positioner` |
| Content | `.brick-dialog-content` | `dialog-content` |
| Header | `.brick-dialog-header` | `dialog-header` |
| Title | `.brick-dialog-title` | `dialog-title` |
| Description | `.brick-dialog-description` | `dialog-description` |
| Body | `.brick-dialog-body` | `dialog-body` |
| Footer | `.brick-dialog-footer` | `dialog-footer` |
| Close | `.brick-dialog-close` | `dialog-close` |
| Branch | `.brick-dialog-branch` | `modal-branch` |

Content exposes these component tokens:

- `--brick-dialog-max-inline-size`
- `--brick-dialog-max-block-size`
- `--brick-dialog-space`
- `--brick-dialog-radius`
- `--brick-dialog-shadow`

Atom owns `data-state` and `data-positioned`; Content adds `data-size`, responsive data-size-sm/md/lg/xl and `data-motion-preset`; Positioner adds `data-placement` and `data-scroll-behavior`, and
Close adds `data-placement`. Brick honors reduced motion and forced colors.
Consumers own accessibility and layout verification after arbitrary class,
style, or token overrides.

## Customization

Prefer the documented size prop and semantic tokens first, then the five
component tokens above. Use part-level classes, slots, `className`, and `style`
only for localized needs that cannot be expressed through those supported
contracts.

## Responsive behavior

Use `size={{ initial: "full", md: "lg" }}` for mobile fullscreen and desktop panel;
`size={{ lg: "xl" }}` uses md below lg. Transitions reset viewport height, radius
and insets as well as width. Positioner supports top/center/bottom with safe-area
gaps. Without Positioner, existing Content retains its centered bounded layout.
Short viewports permit scrolling to footer actions instead of clipping them. Footer wraps
without reversing action or focus order, and logical properties support RTL.

## Accessibility

Title supplies the accessible name and Description supplies the optional
accessible description. If Title is intentionally omitted, Content requires an
explicit native `aria-label` or `aria-labelledby`. Consumers keep action labels
clear and preserve a logical source and focus order.

### Keyboard and focus

| Input | Result |
| --- | --- |
| Enter or Space on Trigger | Opens through native/composed control behavior |
| Tab | Advances within the active modal and owned branches |
| Shift+Tab | Moves backward within the active modal |
| Escape | Closes only the top Dialog when enabled |

Focus enters according to Atom's interaction-aware policy and restores to an
explicit `finalFocus`, the prior connected target, or the mounted Trigger.
Touch opening avoids focusing the first input automatically unless native
`autoFocus` or explicit `initialFocus` requests it.

## Composition, native props, and refs

Trigger, Close, and Branch preserve Atom's `asChild` and `render` composition.
All DOM-rendering parts forward their documented native props and refs. Root
and Portal render no element and therefore expose no DOM ref.

## Examples

### Corner close control

```tsx
<Dialog.Content>
  <Dialog.Header>
    <Dialog.Title>Contact us</Dialog.Title>
    <Dialog.Description>Tell us how we can help.</Dialog.Description>
  </Dialog.Header>
  <Dialog.Body>{/* form */}</Dialog.Body>
  <Dialog.Close placement="corner" asChild>
    <IconButton aria-label="Close dialog" size="sm" variant="ghost">
      <CloseIcon />
    </IconButton>
  </Dialog.Close>
</Dialog.Content>
```

Use the default `inline` placement for a Close-wrapped footer Cancel button.

### Portals, scopes, and Branch

A default body portal uses document-level tokens. To retain a scoped theme,
portal into an element inside that scope or render inline:

```tsx
<Dialog.Portal container={scopedLayerElement}>...</Dialog.Portal>
<Dialog.Portal disabled>...</Dialog.Portal>
```

Register third-party content that must portal outside Content:

```tsx
<ThirdParty.Portal>
  <Dialog.Branch asChild>
    <ThirdParty.Content />
  </Dialog.Branch>
</ThirdParty.Portal>
```

Prefer placing the third-party portal inside Content when its API supports a
container. Branch preserves the third party's keyboard model while keeping it
inside the active modal boundary.

## Evidence

- playground route: `/dialog`
- [playground scenarios](../../../playground/src/components/dialog/DialogPage.tsx)
- [component test](../../../test/components/dialog/dialog.test.tsx)
- [type owner](../../../test/types/components/dialog.test.ts)
- [browser specification](../../../playground/tests/components/dialog/behavior.spec.ts)
- [visual specification](../../../playground/tests/components/dialog/visual.spec.ts)
- [manual-test protocol](../../../playground/manual-tests/dialog.md)
- [consumer integration](../../../apps/consumer/src/App.tsx)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
