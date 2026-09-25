# ActionBar

Contextual actions in a detached, theme-styled viewport bar. Import `ActionBar`
from `@flowstack-ui/brick/action-bar`.

## When and where to use

Use for temporary contextual actions on selected records.

## When not to use

Use Popover for anchored content, Toolbar for a persistent keyboard composite.

## Installation and imports

```tsx
import { ActionBar } from "@flowstack-ui/brick/action-bar";
import "@flowstack-ui/brick/styles.css";
```

For modular delivery, load core plus action-bar and every composed control:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/action-bar.css";
```

## Quick start

```tsx
<ActionBar.Root open={selected.size > 0} closeOnInteractOutside={false}>
  <ActionBar.Portal>
    <ActionBar.Positioner placement="bottom">
      <ActionBar.Content aria-label="Selected files">
        <ActionBar.SelectionTrigger onPress={showSelection}>
          <FormatNumber value={selected.size} /> selected
        </ActionBar.SelectionTrigger>
        <ActionBar.Separator />
        <Button size="sm" variant="outline" onPress={archiveSelection}>Archive</Button>
        <ActionBar.CloseTrigger asChild><CloseButton size="sm" /></ActionBar.CloseTrigger>
      </ActionBar.Content>
    </ActionBar.Positioner>
  </ActionBar.Portal>
</ActionBar.Root>
```

The application owns selected records and messages. The controlled parent must
handle close requests if closing should alter open state; closing does not clear
selection automatically. Translate the whole count message in the application;
FormatNumber formats the numeric value, not plural grammar.

## Anatomy and DOM ownership

Root and Context add no host. Positioner is a div; Content is a dialog div.
SelectionTrigger and CloseTrigger own native buttons. Separator uses Divider.

## API

ActionBarRoot / ActionBarRootProps: open, defaultOpen=false, onOpenChange,
modal=false, disabled=false, closeOnEscape=true, closeOnInteractOutside=true,
lazyMount=true, unmountOnExit=true, onExitComplete, onEscapeKeyDown and
persistentElements. These delegate to Atom. ActionBarRootProvider accepts the
same legacy props or a value returned by useActionBar. Pass the unchanged controller
to RootProvider value for external state access. ActionBarContext children receive
ActionBarContextValue `{open, setOpen}`. ActionBarPortal accepts container/disabled.

ActionBarPositioner / ActionBarPositionerProps forwards div props/ref; placement
defaults to `bottom`. ActionBarPlacement accepts `bottom`, `bottom-start`, and `bottom-end`.
Positioner supports asChild/render and registers the resulting host in the shared overlay layer.

| Prop | Default |
| --- | --- |
| `placement` | `bottom` |

Start/end follow direction. It carries `data-placement` and stays fixed with a
safe-area-aware gutter. Root adds no positioning wrapper.
Atom registers Positioner and Content as one layer, so the fixed wrapper does
not introduce an independent z-index order.

ActionBarContent / ActionBarContentProps forwards native div props/ref and owns
the dialog role. It accepts initialFocus=false, finalFocus, onInteractOutside and
onFocusOutside. Supply native aria-label/aria-labelledby or ActionBarTitle.
ActionBarDescription optionally establishes descriptive text. There is no side,
align, size, variant or tone recipe on Content. `data-state` is open/closed.

ActionBarSelectionTrigger / ActionBarSelectionTriggerProps is an actionable
count button with native props, ref, asChild/render. It never manages selection.
ActionBarCloseTrigger / ActionBarCloseTriggerProps requests dismissal; compose
CloseButton with asChild for the standard icon. Both default to non-submit buttons.
ActionBarSeparator / ActionBarSeparatorProps adapts vertical Divider geometry;
native attributes and ref are forwarded. All parts also belong to ActionBar.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

One theme-owned panel recipe with a compact md radius, inset separator and dashed selection action.
Use small Buttons for the reference density. Loading geometry remains Button-owned.

## Tokens and CSS hooks

Load `styles.css`, or `styles/core.css` plus `styles/action-bar.css` and each
composed control stylesheet. ActionBar's modular CSS includes Divider.
No consumer CSS processor is required.

Public classes: `brick-action-bar`, `brick-action-bar__positioner`,
`brick-action-bar__selection-trigger`, `brick-action-bar__separator`.
Component tokens: `--brick-action-bar-offset`, `--brick-action-bar-background`,
`--brick-action-bar-foreground`, `--brick-action-bar-radius`,
`--brick-action-bar-shadow`. Override locally through public className/style.
Shared semantic tokens own appearance, radius, elevation and motion. The recipe
wraps within viewport gutters; action Button sizes remain independent.

## Customization

Use documented component variables through className/style. Keep behavioral
changes in Atom props, not CSS overrides of internal wrappers.

## Responsive behavior

The bar wraps inside safe viewport gutters and logical placement follows RTL.
Long labels remain visible; no automatic menu replacement is performed.

## Accessibility

Opening preserves focus by default. Nonmodal mode keeps normal Tab navigation;
it is not an automatic roving-focus Toolbar. Escape and outside dismissal are
configurable. Keep a selection region persistent when selecting more records.
Explicit modal mode delegates trapping, isolation and scroll locking to Atom.
Use CloseTrigger inside named Content and preserve nested overlay ownership.
Retained content uses hidden after exit by default. Root hideMode="activity" pauses
hidden effects where React supports Activity, with hidden mounting on React18.
Root present overrides presence; immediate=false defers it to a frame.
skipAnimationOnMount suppresses the initial entrance when initially open.
Root outside focus/pointer callbacks support preventDefault cancellation.
Reduced motion removes transition motion; forced colors retain a visible boundary.

## Composition, native props, and refs

Native div refs resolve to Positioner/Content. Button parts preserve asChild and
render composition. Do not nest buttons or substitute a link for dismissal.

## Examples

The playground includes selection, close, placement, dialog, popover, controlled
context, outside focus, retained state, inline portal, localization and loading.

## Evidence

Playground `/action-bar` provides focused Preview/Code examples and per-part Props.
`/action-bar?qualification=1` retains fourteen exhaustive scenario groups. Component
unit/type tests and browser/visual owners accompany the manual protocol at
`playground/manual-tests/action-bar.md`. Manual checks are not implied by builds.

- [Playground](../../../playground/src/components/action-bar/)
- [Unit tests](../../../test/components/action-bar/)
- [Types](../../../test/types/components/action-bar.test.ts)
- [Browser](../../../playground/tests/components/action-bar/behavior.spec.ts)
- [Visual](../../../playground/tests/components/action-bar/visual.spec.ts)
- [Manual](../../../playground/manual-tests/action-bar.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
