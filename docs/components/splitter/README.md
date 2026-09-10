# Splitter

Resize adjacent regions through Atom behavior with Brick's neutral divider and
centered grip. Import `{ Splitter }` from `@flowstack-ui/brick/splitter` or the
root. Load `styles.css`, or `styles/core.css` plus `styles/splitter.css`.

## When and where to use

Adjacent resizable application regions such as files and an editor.

## When not to use

Use Divider for passive boundaries, Slider for numeric input. Do not invent empty
panels to resize one preview.

## Installation and imports

```tsx
import { Splitter } from "@flowstack-ui/brick/splitter";
import { Frame } from "@flowstack-ui/brick/frame";
import "@flowstack-ui/brick/styles.css";
```

Alternatively load `@flowstack-ui/brick/styles/core.css` and
`@flowstack-ui/brick/styles/splitter.css`, plus modular CSS for composed components.

## Quick start

```tsx
<Frame blockSize={320} asChild>
  <Splitter.Root panels={[{ id: "files", minSize: 20 }, { id: "editor", minSize: 30 }]}
    defaultSizes={{ files: 30, editor: 70 }}>
    <Splitter.Panel panelId="files">Files</Splitter.Panel>
    <Splitter.ResizeTrigger before="files" after="editor" aria-label="Files width" />
    <Splitter.Panel panelId="editor">Editor</Splitter.Panel>
  </Splitter.Root>
</Frame>
```

## Anatomy and DOM ownership

Root and Panel are divs; ResizeTrigger is a focusable separator div. Decorative
Separator and Indicator are spans. Atom owns geometry and behavior; Brick owns paint.

## API

`SplitterRoot` / `SplitterRootProps`: `panels` ordered stable descriptors;
`sizes` / `defaultSizes` keyed by ID; `orientation` horizontal or vertical
(horizontal default); inherited `dir`; `disabled=false`; `keyboardStep=10` CSS
pixels. `onResizeStart`, `onResize`, `onResizeEnd` deliver sizes, pixels (null
before measurement), source and cancelled. `onCollapseChange` delivers panelId
and collapsed on actual transitions. Native onResize is intentionally replaced.

Descriptor `SplitterPanelConfig` supports id, minSize (0), maxSize (100),
collapsible (false), collapsedSize (0), resizeBehavior (proportional default or
preserve-pixels). `SplitterSize` is a percentage number or explicit `%`/`px`
string. `SplitterSizes` maps IDs to these values. Percent defaults are SSR stable;
pixel constraints reconcile after measurement. Uncontrolled pixel preservation
requires a proportional sibling; controlled applications own host-resize policy.

`SplitterPanel` / `SplitterPanelProps` requires panelId. `SplitterResizeTrigger`
/ `SplitterResizeTriggerProps` requires before/after adjacent IDs and an accessible
name, accepts disabled and valueText(percent,pixels). Root/Panel/Trigger preserve
native div props/refs and asChild/render. Do not override generated Panel IDs.

`SplitterContext` exposes `SplitterContextValue`: sizes, setSizes, resetSizes,
collapsePanel, expandPanel, isPanelCollapsed. Compose ordinary Buttons outside the
separator for non-drag alternatives. Applications own storage and localization.

Empty triggers supply `SplitterResizeTriggerSeparator` and
`SplitterResizeTriggerIndicator`; explicit children replace those defaults.
Both decorative spans have native span props/refs, with Props exports. Supply an
explicit child host for asChild. Never nest controls in the separator.

## Visual recipes and states

One neutral recipe, centered pill, accent dragging and visible focus. No panel
background is imposed. Disabled grips disappear without changing layout.

## Tokens and CSS hooks

Public variables: --brick-splitter-border, --brick-splitter-background,
--brick-splitter-target, --brick-splitter-grip-width, --brick-splitter-grip-length.

## Customization

Compose decorative parts to use a line-only or indicator-only handle. Keep
interactive geometry and behavior intact.

## Responsive behavior

Panel percentages follow the root. Coarse targets grow independently. Orientation
is scalar; applications decide whether changing the arrangement is appropriate.

## Accessibility

Atom owns focusable separator roles, controls, ranges and perpendicular
aria-orientation. Arrow keys resize physically, Shift accelerates, Home/End reach
bounds, Enter collapses/restores a collapsible primary pane, Escape cancels a
drag. Fully collapsed contents remain mounted but inert. No form participation.
`data-state` exposes idle/dragging on trigger and expanded/collapsed on panels;
`data-disabled`, `data-orientation`, `data-slot` remain public state hooks.

## Composition, native props, and refs

Classes: brick-splitter, brick-splitter-panel, brick-splitter-trigger,
brick-splitter-separator, brick-splitter-indicator. Public variables:
`--brick-splitter-border`, `--brick-splitter-background`,
`--brick-splitter-target`, `--brick-splitter-grip-width`,
`--brick-splitter-grip-length`. Default grip is 8x24px at 16px root; target is
24px fine/44px coarse. Existing Theme border-default, surface-canvas, shadow-sm,
radius-full, accent-solid and focus-ring own paint. No panel fill, padding or
clipping; compose Surface/ScrollArea separately. Impossible minima expose
data-insufficient-space and overflow rather than shrink below constraints.

## Examples

Use controlled sizes with onResize and an application reset Button; persist
only onResizeEnd when cancelled is false. Use vertical orientation inside a Frame
with a definite blockSize.

## Evidence

Unit owner: test/components/splitter/splitter.test.tsx. Browser owner:
playground/tests/components/splitter/behavior.spec.ts. Manual protocol:
playground/manual-tests/splitter.md. Real AT and physical-device checks are
reported separately, not implied by automated results.

- [Playground](../../../playground/src/components/splitter/)
- [Unit](../../../test/components/splitter/)
- [Types](../../../test/types/components/splitter.test.ts)
- [Browser](../../../playground/tests/components/splitter/behavior.spec.ts)
- [Visual](../../../playground/tests/components/splitter/visual.spec.ts)
- [Manual](../../../playground/manual-tests/splitter.md)

## Changelog

[Changes](CHANGELOG.md)
