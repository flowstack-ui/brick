# OverlayManager

A CSS-free utility for keyed authored overlays, typed results and exit promises.
Behavior is provided by Atom; the authored Brick overlay provides its visuals.

## When and where to use

Use when several application locations open or update an overlay, or when an
application workflow awaits a confirmation result.

## When not to use

Use ordinary controlled Dialog state for a single local disclosure. The manager
does not implement routing, modal behavior, focus policy or stored application state.

## Installation and imports

Import `createOverlay` from `@flowstack-ui/brick/overlay-manager` or the package
root. No manager stylesheet exists. Load `@flowstack-ui/brick/styles.css`, or
`@flowstack-ui/brick/styles/core.css` plus the actual overlay and child styles.

## Quick start

```tsx
import { createOverlay, type OverlayLifecycleProps } from "@flowstack-ui/brick/overlay-manager";
import { Dialog } from "@flowstack-ui/brick/dialog";

const notice = createOverlay<{ title: string }, void>(
  ({ title, ...lifecycle }: { title: string } & OverlayLifecycleProps) => (
    <Dialog.Root {...lifecycle}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header><Dialog.Title>{title}</Dialog.Title></Dialog.Header>
            <Dialog.Footer><Dialog.Close>Close</Dialog.Close></Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Portal>
    </Dialog.Root>
  ),
);
// Render <notice.Viewport /> beneath application providers before calling:
// void notice.open("notice", { title: "Changes saved" });
```

## Anatomy and DOM ownership

Viewport renders keyed authored components without a wrapper. There is no
manager DOM, ref target, slot or visual recipe. All overlay anatomy remains owned
by Dialog, Drawer, ActionBar or FloatingPanel.

## API

Exports: `createOverlay`, `OverlayManager`, `OverlayLifecycleProps`,
`OverlaySnapshotEntry`. `createOverlay<P, R>(Component)` returns:

| Member | Contract |
| --- | --- |
| `Viewport` | Mount exactly one host below required providers. |
| `open(id, props)` | Returns `Promise<R \| undefined>`; same open ID updates props and shares the promise. |
| `close(id, result?)` | Settles the result when closure is requested and returns `Promise<void>` for exit. |
| `update(id, partialProps)` | Merges authored props; missing ID throws. |
| `remove(id)`, `removeAll()` | Remove immediately and settle pending result/exit work. |
| `has(id)`, `get(id)` | Query existence or a readonly snapshot entry; missing get throws. |
| `getSnapshot()` | Stable readonly array until the store changes. |
| `waitForExit(id)` | Wait even before close; a missing ID resolves immediately. |

Lifecycle props `open`, `onOpenChange(boolean)` and `onExitComplete()` are injected
and reserved. Forward all three to the authored overlay Root. A same-ID reopen
during exit creates a new generation; old callbacks cannot remove it. Permanent
host disposal settles pending work; StrictMode replay does not dispose instances.
Opening before a host rejects; duplicate Viewports are diagnosed.

Closing before an instance first commits open needs no animation: the manager
removes it and settles exit after the current commit opportunity. Once an open
instance commits, its authored overlay must report exit completion. Suspended
content that never appeared cannot leave a pending exit.

`get` and `getSnapshot` are imperative reads, not reactive hooks. Use application
state for reactive activity displays. Define authored prop defaults in the
overlay component; the factory has no options/default-props argument.

## Visual recipes and states

None. An entry is open or exiting, independently of its result promise. Brick
overlay recipes retain their existing appearance and interaction states.

## Tokens and CSS hooks

None. This utility must not be given a blank stylesheet or invented surface tokens.

## Customization

Customize the authored overlay through its public props, composition and tokens.
Keep workflow-specific content separate from injected lifecycle fields.

## Responsive behavior

The authored overlay and application layout own responsiveness. Viewport adds
no sizing or breakpoint behavior.

## Accessibility

The overlay owns naming, focus, Escape, modality and restoration. Use an explicit
final-focus target if a menu item that opened the overlay disappears. No extra
focus trap is introduced. Preserve locale/theme context at Viewport; portalled
appearance still follows Brick's explicit scope contract.

## Composition, native props, and refs

Viewport is nonvisual and accepts no native DOM props/ref. Authored parts retain
their native props, asChild/render and refs. Construct request-scoped managers
for SSR and never mutate a shared server instance while rendering.

## Examples

The playground covers confirmation results, updates, removal, exit sequencing,
provider inheritance, menu handoff, multiple instances and managed panels.
The normal route pairs focused examples with their exact source. Use
`?qualification=1` for the retained exhaustive scenarios.

## Evidence

- [Playground](../../../playground/src/components/overlay-manager/OverlayManagerPage.tsx)
- [Unit](../../../test/components/overlay-manager/overlay-manager.test.tsx)
- [Types](../../../test/types/components/overlay-manager.test.ts)
- [Browser](../../../playground/tests/components/overlay-manager/behavior.spec.ts)
- [Visual](../../../playground/tests/components/overlay-manager/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/overlay-manager.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
