# FloatingPanel

A finished movable and resizable nonmodal tool. Atom owns interaction and
geometry; Brick owns surfaces, typography, spacing and visual anatomy.

## When and where to use

Use for inspectors and independent application tools that can move, resize,
minimize, maximize and restore.

## When not to use

Use Popover for anchored content, Dialog for blocking work and Splitter for
adjacent resizable panes. This is not a docking or desktop window manager.

## Installation and imports

Import `FloatingPanel`, `useFloatingPanel` and `useFloatingPanelContext` from
`@flowstack-ui/brick/floating-panel` or the package root. Load
`@flowstack-ui/brick/styles.css`, or `@flowstack-ui/brick/styles/core.css` plus
`@flowstack-ui/brick/styles/floating-panel.css` and authored child styles.

## Quick start

```tsx
<FloatingPanel.Root>
  <FloatingPanel.Trigger asChild><Button>Open inspector</Button></FloatingPanel.Trigger>
  <FloatingPanel.Portal>
    <FloatingPanel.Positioner>
      <FloatingPanel.Content>
        <FloatingPanel.Header>
          <FloatingPanel.DragTrigger><FloatingPanel.Title>Inspector</FloatingPanel.Title></FloatingPanel.DragTrigger>
          <FloatingPanel.Control><FloatingPanel.CloseTrigger asChild><CloseButton size="xs" /></FloatingPanel.CloseTrigger></FloatingPanel.Control>
        </FloatingPanel.Header>
        <FloatingPanel.Body>Tool content</FloatingPanel.Body>
        <FloatingPanel.ResizeTriggers />
      </FloatingPanel.Content>
    </FloatingPanel.Positioner>
  </FloatingPanel.Portal>
</FloatingPanel.Root>
```

Import authored Button and CloseButton from their Brick subpaths. Geometry
settings using NumberInput/controller setters provide a click/tap alternative
to dragging in application use.

## Anatomy and DOM ownership

Root, RootProvider and Context render no host. Portal uses Atom's portal.
Positioner owns runtime geometry; Content is a focusable named nonmodal dialog.
Header contains sibling DragTrigger and Control regions. Title is a div;
Description is a p; Body, Header, Control, DragTrigger and ResizeTrigger are divs.
Trigger, StageTrigger and CloseTrigger are button controls. ResizeTriggers is a
wrapper-free shorthand for all eight handles. Brick adds no extra DOM.

## API

The namespace exposes Root, RootProvider, Context, Portal, Trigger, Positioner,
Content, Header, Body, Title, Description, Control, DragTrigger, StageTrigger,
CloseTrigger, ResizeTrigger and ResizeTriggers. Named exports use the
`FloatingPanel` prefix. `useFloatingPanel` returns a real controller;
RootProvider accepts `{ value: controller }`, not Root options.

The named anatomy exports are `FloatingPanelRoot`, `FloatingPanelRootProvider`,
`FloatingPanelContext`, `FloatingPanelPortal`, `FloatingPanelTrigger`,
`FloatingPanelPositioner`, `FloatingPanelContent`, `FloatingPanelHeader`,
`FloatingPanelBody`, `FloatingPanelTitle`, `FloatingPanelDescription`,
`FloatingPanelControl`, `FloatingPanelDragTrigger`, `FloatingPanelStageTrigger`,
`FloatingPanelCloseTrigger`, `FloatingPanelResizeTrigger`, and
`FloatingPanelResizeTriggers`.

Root and hook share Atom options:

| Option | Default / contract |
| --- | --- |
| `open`, `defaultOpen`, `onOpenChange` | Uncontrolled closed by default; controlled values remain authoritative. |
| `position`, `defaultPosition` | Optional physical `{x,y}` CSS pixels; otherwise initial centering. |
| `size`, `defaultSize` | Numeric `{width:320,height:240}` border-box geometry, not a visual size recipe. |
| `minSize`, `maxSize` | Brick minimum `{width:240,height:100}`; no maximum by default. |
| Position/size change and change-end callbacks | Numeric values plus `{reason}`; completion reports accepted values. |
| `draggable`, `resizable` | Both true. Explicit controller stage commands remain available when resizable is false. |
| `disabled`, `closeOnEscape` | Both false. |
| `gridSize`, `scale`, `lockAspectRatio` | 1, 1, false; positive uniform scale only. |
| `strategy`, `allowOverflow` | `fixed`, true; `absolute` supports containing-block coordinates. |
| `getBoundaryEl`, `getAnchorPosition` | Optional element bounds and initial-position resolver. |
| `persistRect`, `restoreFocus` | false, true. |
| `initialFocus`, `finalFocus` | Ref, resolver or false; fallback Content and opener respectively. |
| `id`, `ids`, `dir`, `translations` | Optional stable identifiers, inherited direction and authored control names. |
| `lazyMount`, `unmountOnExit` | Both true; `onExitComplete` follows completed presentation exit. |
| `present`, `immediate`, `skipAnimationOnMount` | Optional presentation override, false, false. |
| `hideMode` | `display-none`; `activity` requires a runtime exposing React Activity (19.2+). |

StageTrigger requires `stage="default|minimized|maximized"`; ResizeTrigger
requires `axis="n|s|e|w|ne|nw|se|sw"`; ResizeTriggers accepts an axes array.
Controller exposes open, position, size, stage, dragging, resizing, topmost and
setOpen, setPosition, setSize, minimize, maximize, restore, bringToFront.

Public types include FloatingPanelRootProps, FloatingPanelRootProviderProps,
FloatingPanelOptions, FloatingPanelController, FloatingPanelContextProps,
FloatingPanelPartProps, FloatingPanelButtonProps, FloatingPanelStageTriggerProps,
FloatingPanelResizeTriggerProps, FloatingPanelResizeTriggersProps,
FloatingPanelPoint, FloatingPanelSize, FloatingPanelStage, FloatingPanelAxis,
FloatingPanelChangeDetails, FloatingPanelChangeReason and FloatingPanelFocusTarget.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

`FloatingPanelContentProps` describes the finished Content boundary, including `radius`.

## Visual recipes and states

One base visual recipe: overlay surface, subtle header, semantic border, overlay
radius and floating shadow. Body uses body-sm typography; Title adds semibold
weight. No invented tone/size catalog. Use compact ghost IconButton and CloseButton
children for stage controls. Minimized Body is hidden; maximized geometry fills
the boundary; hidden/exiting content cannot receive interaction.

## Tokens and CSS hooks

Public local overrides: `--brick-floating-panel-background`,
`--brick-floating-panel-header-background`, `--brick-floating-panel-border-color`,
`--brick-floating-panel-radius`, `--brick-floating-panel-shadow`.

Stable classes use `brick-floating-panel-` plus positioner, content, header,
body, title, description, control, drag-trigger or resize-trigger. Default slots
use `floating-panel-` plus the part name. Atom reports data-state, data-presence,
data-stage, data-topmost, data-disabled, data-dragging, data-resizing, data-axis and
data-constrained. Runtime geometry/layer variables are not Theme inputs.

## Customization

Use the five local visual variables or authored child composition. Keep spacing,
typography and colors on Brick tokens. Do not override pointer handling or
reimplement state in CSS. Apply Appearance to the portalled visual root or choose
a Portal container inside the desired theme scope.

## Responsive behavior

Geometry is independent of recipe size. Strict containment adapts effective
minimum dimensions when the boundary is smaller. Physical coordinates and arrows
remain physical in RTL. Header controls do not stretch; Body scrolls. There is no
automatic mobile Dialog replacement.

## Accessibility

Give Content a Title or explicit aria-label. No backdrop or focus trap is added.
Arrow keys on the focused Content/DragTrigger move; Shift multiplies by ten;
Control/Command plus arrows resizes. Escape cancels manipulation before optional
dismissal. Provide click/tap settings using NumberInput and Button. Keep controls
outside DragTrigger; data-no-drag excludes interactive regions. Forced-colors
focus/borders and reduced-motion appearance are supported.

## Composition, native props, and refs

Rendered parts preserve Atom native props, refs, asChild/render and consumer event
cancellation. Do not nest buttons; compose IconButton/CloseButton with asChild.
Root/controller geometry must not be confused with native title or control size.
RootProvider created using the Brick hook has the same default minima as Root.

## Examples

The playground covers constraints, controlled rejection, stages, persistence,
scale, RTL, presence, nesting, settings, and managed instances.

## Evidence

- [Playground](../../../playground/src/components/floating-panel/FloatingPanelPage.tsx)
- [Unit](../../../test/components/floating-panel/floating-panel.test.tsx)
- [Types](../../../test/types/components/floating-panel.test.ts)
- [Browser](../../../playground/tests/components/floating-panel/behavior.spec.ts)
- [Visual](../../../playground/tests/components/floating-panel/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/floating-panel.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
