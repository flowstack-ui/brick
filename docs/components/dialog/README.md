# Dialog

Dialog presents a focused modal task or information surface above the current
page. Atom owns modal state, focus, dismissal, portals, background isolation,
scroll containment, and presence; Brick supplies the finished visual anatomy.

## When to use

Use Dialog for short forms, settings, details, previews, and multi-control tasks
that temporarily block interaction with the page. Use a future AlertDialog for
urgent destructive confirmation, Drawer for side-attached modal content, and
Popover or Menu when the page must remain interactive.

Dialog is modal-only. It does not own application workflow, submission, data
loading, routing, or generated action copy.

## Import

```tsx
import { Dialog } from "@flowstack-ui/brick/dialog";
import "@flowstack-ui/brick/styles.css";
```

The namespace is also available from `@flowstack-ui/brick`. Advanced consumers
may import the canonical direct parts from the Dialog subpath.

## Example

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
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

Overlay and Content must remain siblings. Nesting Content inside Overlay places
the dialog inside an accessibility-hidden subtree and is rejected by Atom.

## Anatomy

| Part | Default output | Responsibility |
| --- | --- | --- |
| `Root` | no element | Open state, dismissal policy, modal layer ownership |
| `Trigger` | `button` | Opens Dialog; supports Atom `asChild` and `render` |
| `Portal` | no wrapper | Renders into `body`, a container, or inline |
| `Overlay` | `div` | Scrim and exact-target backdrop dismissal |
| `Content` | `div[role="dialog"]` | Modal surface, focus scope, ARIA owner, and size |
| `Header` | `div` | Title and optional description region |
| `Title` | `h2` | Visible accessible name; supports `h1`–`h6` |
| `Description` | `p` | Optional accessible description |
| `Body` | `div` | Primary bounded scroll region |
| `Footer` | `div` | Wrapping action region in source order |
| `Close` | `button` | Closes with Atom's `closeClick` reason |
| `Branch` | `div` | Registers a third-party portalled subtree |

All DOM-rendering parts accept their relevant native props, refs, `className`,
`style`, and overridable `data-slot`. Brick merges its stable class with the
consumer class.

## API

### Root

Forwards Atom's `open`, `defaultOpen`, `onOpenChange`, `closeOnEscape`,
`closeOnBackdropClick`, `disabled`, and `keepMounted` contract. Root renders no
DOM element and has no ref.

### Content

`size` accepts `"sm"`, `"md"`, or `"lg"` and defaults to `"md"`. Size changes
the preferred maximum inline measure only. Content also forwards native ARIA,
`role`, `initialFocus`, and `finalFocus` supported by Atom.

### Portal and Overlay

Portal forwards `container` and `disabled`. A container must be a same-document
`HTMLElement`. Overlay forwards its independent `disabled` dismissal control.

### Trigger, Close, and Branch

These parts forward Atom's `asChild` and `render` composition. The composed
element must accept the merged props and ref and retain valid semantics.

### Title

Title defaults to `h2`; `as` accepts `h1` through `h6`. A visible Title supplies
the generated accessible name. Consumers that intentionally omit it must add
an explicit native `aria-label` or `aria-labelledby` to Content.

## Keyboard and focus

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

## Scrolling and responsive behavior

Content is centered and bounded by safe-area-aware viewport gaps and dynamic
viewport height. Body uses contained scrolling so Header and Footer remain
reachable with long content. All sizes shrink to available width. Footer wraps
without reversing action or focus order, and logical properties support RTL.

## Portals, scopes, and Branch

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

## Customization

Stable classes and default slots are:

| Part | Class | Slot |
| --- | --- | --- |
| Trigger | `.brick-dialog-trigger` | `dialog-trigger` |
| Overlay | `.brick-dialog-overlay` | `dialog-overlay` |
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

Atom owns `data-state` and `data-positioned`; Content adds `data-size`. Brick
honors reduced motion and forced colors. Consumers own accessibility and layout
verification after arbitrary class, style, or token overrides.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
