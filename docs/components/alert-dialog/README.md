# AlertDialog

AlertDialog interrupts the current workflow for a brief, important decision
that requires an explicit response. Atom owns alert-dialog semantics, modal
state, focus, portals, isolation, stacking, presence, and scroll containment;
Brick supplies the finished visual anatomy.

## When and where to use

Use AlertDialog to confirm irreversible work, prevent meaningful unsaved
changes from being lost, or require acknowledgement of an urgent consequence.
Keep the decision short and give each response a clear outcome.

## When not to use

Use Dialog for forms, settings, previews, multi-step work, and non-urgent
information. Use Drawer for side-attached content. Do not use AlertDialog as an
imperative `confirm()` API or as an owner of requests, loading state, routing,
or generated action copy.

## Installation and imports

```tsx
import { AlertDialog } from "@flowstack-ui/brick/alert-dialog";
import "@flowstack-ui/brick/styles.css";
```

The namespace is also available from `@flowstack-ui/brick`. Advanced consumers
may import the canonical direct parts from the AlertDialog subpath.

## Quick start

```tsx
import { AlertDialog } from "@flowstack-ui/brick/alert-dialog";
import { Button } from "@flowstack-ui/brick/button";

export function RemoveProject() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button tone="danger" variant="outline">Remove project</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Remove project?</AlertDialog.Title>
            <AlertDialog.Description>
              This permanently removes the project and cannot be undone.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel asChild>
              <Button tone="neutral" variant="outline">Keep project</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button tone="danger">Remove project</Button>
            </AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
```

Overlay and Content must remain siblings. Every AlertDialog needs a visible
Title and a Description or explicit native `aria-describedby` relationship.
Destructive confirmation should retain an enabled Cancel response.

## Anatomy and DOM ownership

| Part | Default output | Responsibility |
| --- | --- | --- |
| `Root` | no element | Open state, Escape policy, modal layer ownership |
| `Trigger` | `button` | Opens AlertDialog; supports Atom composition |
| `Portal` | no wrapper | Renders into `body`, a container, or inline |
| `Overlay` | `div` | Non-dismissible scrim |
| `Content` | `div[role="alertdialog"]` | Modal surface, focus scope, ARIA owner, and size |
| `Header` | `div` | Title and required alert message region |
| `Title` | `h2` | Visible accessible name; supports `h1`–`h6` |
| `Description` | `p` | Required alert message and accessible description |
| `Body` | `div` | Optional bounded supplemental-detail region |
| `Footer` | `div` | Wrapping response region in source order |
| `Cancel` | `button` | Least-destructive response and initial-focus default |
| `Action` | `button` | Affirmative response |

All DOM-rendering parts accept their relevant native props, refs, `className`,
`style`, and overridable `data-slot`. Brick merges its stable class with the
consumer class.

## API

### Root

Forwards Atom's `open`, `defaultOpen`, `onOpenChange`, `closeOnEscape`,
`disabled`, and `keepMounted` contract. Backdrop dismissal is permanently
blocked and no `closeOnBackdropClick` prop is exposed. Root renders no DOM.

### Content

`size` accepts `"sm"` or `"md"` and defaults to `"md"`. It changes only the
preferred maximum inline measure. Content also forwards supported native ARIA,
`role`, `initialFocus`, and `finalFocus` properties.

### Portal and Overlay

Portal forwards `container` and `disabled`. A container must be a same-document
`HTMLElement`. Overlay has no dismissal-control prop because scrim interaction
never closes AlertDialog.

### Trigger, Cancel, and Action

These parts forward Atom's `asChild` and `render` composition. Cancel and Action
produce distinct close reasons. They do not generate Button presentation,
application callbacks, or async state; compose Button and select its tone.

Prevent automatic Action closure when application work must finish first:

```tsx
<AlertDialog.Action
  onClick={(event) => {
    event.preventDefault();
    void beginRemoval();
  }}
>
  Remove project
</AlertDialog.Action>
```

### Title and Description

Title defaults to `h2`; `as` accepts `h1` through `h6`. Description supplies
the alert message. If the Description part is intentionally omitted, Content
must point `aria-describedby` at equivalent visible text.

## Visual recipes and states

Content supports `sm` and `md`; `md` is the default. Atom's public
`data-state`, `data-positioned`, and disabled outputs drive state styling.
AlertDialog intentionally has no tone, variant, placement, fullscreen, or
arbitrary-width prop. Apply destructive presentation to the composed Action
Button, normally with `tone="danger"`.

## Tokens and CSS hooks

| Part | Class | Slot |
| --- | --- | --- |
| Trigger | `.brick-alert-dialog-trigger` | `alert-dialog-trigger` |
| Overlay | `.brick-alert-dialog-overlay` | `alert-dialog-overlay` |
| Content | `.brick-alert-dialog-content` | `alert-dialog-content` |
| Header | `.brick-alert-dialog-header` | `alert-dialog-header` |
| Title | `.brick-alert-dialog-title` | `alert-dialog-title` |
| Description | `.brick-alert-dialog-description` | `alert-dialog-description` |
| Body | `.brick-alert-dialog-body` | `alert-dialog-body` |
| Footer | `.brick-alert-dialog-footer` | `alert-dialog-footer` |
| Cancel | `.brick-alert-dialog-cancel` | `alert-dialog-cancel` |
| Action | `.brick-alert-dialog-action` | `alert-dialog-action` |

Content exposes:

- `--brick-alert-dialog-max-inline-size`
- `--brick-alert-dialog-max-block-size`
- `--brick-alert-dialog-space`
- `--brick-alert-dialog-radius`
- `--brick-alert-dialog-shadow`

Brick honors reduced motion and forced colors. Consumers must reverify layout
and accessibility after arbitrary class, style, or token overrides.

## Responsive behavior

Content remains centered and bounded by safe-area-aware viewport gaps and
dynamic viewport height. Body scrolls independently so the message and
responses remain reachable. The Footer wraps in source order and its responses
fill the available width on narrow screens. Logical properties support RTL.
At extreme zoom or unusually short viewports where fixed regions cannot fit,
the bounded Content becomes the scroll fallback so no response is clipped.

## Accessibility

Title supplies the accessible name and Description supplies the alert message.
Keep both concise, retain a visible enabled Cancel for destructive work, and
do not encode the consequence through color alone.

### Keyboard and focus

| Input | Result |
| --- | --- |
| Enter or Space on Trigger | Opens through native/composed control behavior |
| Tab / Shift+Tab | Moves within the active modal |
| Escape | Closes the top AlertDialog when enabled |
| Pointer on Overlay | Does not dismiss |

Cancel receives initial focus by default. Consumers may use Content
`initialFocus` only when another target is demonstrably safer. Focus restores
to explicit `finalFocus`, the prior connected target, or the mounted Trigger.

## Composition, native props, and refs

Trigger, Cancel, and Action preserve Atom's `asChild` and `render` composition.
The composed element must accept merged props and a ref and retain valid
semantics. Root and Portal render no element and therefore expose no DOM ref.

## Examples

### Nested destructive decision

AlertDialog may open above a Dialog to confirm loss of unsaved work. Close or
Cancel only the alert layer first; Atom then returns focus and control to the
parent Dialog. Complex composite or third-party portalled content belongs in
Dialog rather than AlertDialog.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
