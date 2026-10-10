# Scroll Area

Scroll Area constrains native browser scrolling to explicit axes while keeping
content, input, momentum, and platform scrollbar behavior native. It adopts
Atom's Root/Viewport behavior and adds finished gutter, visibility, focus, and
semantic-color styling.

## When and where to use

Use it when a region is deliberately size-constrained and its content must
remain available by scrolling: navigation rails, activity panels, horizontal
rails, and bounded work areas.

## When not to use

Do not use it for normal document scrolling, responsive reflow, accidental
overflow, clipping, overlay boundaries, or code samples before Code Block owns
that behavior. Fix unintended overflow instead of hiding it.

## Installation and imports

```tsx
import { ScrollArea } from "@flowstack-ui/brick";
// or
import { ScrollArea } from "@flowstack-ui/brick/scroll-area";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/scroll-area.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<ScrollArea.Root style={{ blockSize: 240 }}>
  <ScrollArea.Viewport aria-label="Recent activity" focusable>
    <ActivityList />
  </ScrollArea.Viewport>
</ScrollArea.Root>
```

## Anatomy and DOM ownership

`ScrollArea.Root` owns configuration and the outer `HTMLDivElement` ref.
`ScrollArea.Viewport` owns native overflow and its `HTMLDivElement` ref. Root
does not invent a size: the consumer provides the relevant constraint.

## API

| Part or prop | Values | Default |
| --- | --- | --- |
| `orientation` | `vertical`, `horizontal`, `both` | `vertical` |
| `scrollbarGutter` | `auto`, `stable` | `auto` |
| `scrollbarVisibility` | `auto`, `always`, `interaction` | `auto` |
| `scrollbar` | `native`, `custom` | `native` |
| `size` | `xs`, `sm`, `md`, `lg` (custom only) | `md` |
| `scrollShadow` | `none`, `vertical`, `horizontal`, `both` (custom only) | `none` |
| `Viewport.focusable` | `boolean` | `false` |
| Root and Viewport composition | `render`, `asChild` | native `div` |

`auto` preserves native scrollbar policy. `always` requests scrollbars even
without overflow, although operating systems may use overlay scrollbars.
`interaction` keeps scrolling available and reveals authored scrollbar color
on hover or focus-within; touch and forced-colors environments remain native.

Public exports are `ScrollArea`, `ScrollAreaRoot`, `ScrollAreaViewport`,
`ScrollAreaOrientation`, `ScrollAreaScrollbarGutter`,
`ScrollAreaScrollbarVisibility`, `ScrollAreaRootElement`,
`ScrollAreaRootProps`, `ScrollAreaViewportElement`, and
`ScrollAreaViewportProps`.

## Visual recipes and states

Orientation changes only enabled physical axes. Gutter changes only reserved
scrollbar space. Visibility changes only the native scrollbar request and
authored color visibility; it never disables scrolling. The component has no
tone, radius, disabled, loading or validation recipe. Custom mode adds four
track sizes (4/6/8/12px), short visibility transitions and optional edge fades.

## Tokens and CSS hooks

Hooks are `.brick-scroll-area`, `.brick-scroll-area-viewport`, Atom
`data-slot` and `data-orientation`, plus `data-scrollbar-gutter` and
`data-scrollbar-visibility`.

Public variables:

- `--brick-scroll-area-scrollbar-thumb`
- `--brick-scroll-area-scrollbar-track`
- `--brick-scroll-area-scrollbar-size`
- `--brick-scroll-area-scrollbar-margin`
- `--brick-scroll-area-thumb-min-size`
- `--brick-scroll-area-shadow-size`
- `--brick-scroll-area-shadow-color`

## Customization

```tsx
<ScrollArea.Root
  style={{
    "--brick-scroll-area-scrollbar-thumb": "rebeccapurple",
    "--brick-scroll-area-scrollbar-track": "lavender",
  }}
>
  <ScrollArea.Viewport>{content}</ScrollArea.Viewport>
</ScrollArea.Root>
```

Customize scrollbar presentation through these public variables. Application
layout continues to own the viewport constraint.

## Responsive behavior

Scroll Area fills the consumer-provided box and does not add breakpoints.
Native wheel, touch, keyboard, RTL, writing-mode, nested-scroll handoff, and
reduced-motion behavior remain intact. Axis values are physical because native
overflow axes are physical.

## Accessibility

Scroll Area adds no role or tab stop by default. If plain content needs keyboard
scrolling, set `focusable` and provide a specific accessible name. When
focusable descendants already make content reachable, avoid an extra viewport
stop. Never use `role="application"`.

## Composition, native props, and refs

Root and Viewport forward native props, events, classes, styles, refs,
`render`, and `asChild`. Root owns configuration; Viewport owns scrolling.
Stack/Grid arrange and Container constrains; none replaces this scroll owner.

## Examples

### Custom scrolling

```tsx
<Frame blockSize="16rem" asChild>
  <ScrollArea.Root scrollbar="custom" scrollbarGutter="stable">
    <ScrollArea.Viewport focusable aria-label="Activity">
      <ScrollArea.Content>{content}</ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar />
  </ScrollArea.Root>
</Frame>
```

Custom mode requires Content and one Scrollbar per enabled axis. Scrollbar
supplies Thumb when children are omitted; an explicit Thumb inherits its axis.
For both axes add a horizontal Scrollbar and Corner. All DOM parts forward native
props, refs, `asChild` and `render`. Native mode rejects custom-only size/shadow
props. Until custom anatomy is measured, native bars remain available. Forced
colors also restores native bars. Never remove both scrolling affordances.

Auto and interaction custom bars reveal on hover, focus, scrolling or dragging.
Always shows only overflowing axes. Stable gutter reserves the enabled axes;
auto overlays tracks. Minimum thumb length is clamped to the available track.
Shadows fade only edges with remaining content and are hidden during focus so
they do not obscure focus indicators. Use native mode for vertical writing.

Additional exports: ScrollAreaContent, ScrollAreaScrollbar, ScrollAreaThumb,
ScrollAreaCorner, ScrollAreaRootProvider, ScrollAreaContext and matching Props;
useScrollArea, ScrollAreaController, UseScrollAreaProps, ScrollAreaIds,
ScrollAreaAxis, ScrollAreaEdge, ScrollAreaState, ScrollAreaScrollbarState,
ScrollAreaScrollToDetails, ScrollAreaScrollToEdgeDetails, ScrollAreaSize and
ScrollAreaScrollShadow. The ScrollArea namespace exposes each named part.

### Controller and application integrations

`useScrollArea({ orientation?, ids? })` supplies the value for RootProvider.
The hook or Context render prop subscribes to edge and overflow booleans.
`getScrollProgress()` returns clamped fractions (x is logical, y vertical).
`scrollTo({ top?, left?, behavior?, duration?, easing? })` uses native coordinates;
RTL left coordinates are negative. `scrollToEdge({ edge, ...options })` accepts
physical top/right/bottom/left. Custom duration uses milliseconds and easing
maps 0–1 to 0–1. New commands or user input cancel animations; reduced motion is
instant. Before mounting, commands do nothing.

`getScrollbarState({ orientation? })` exposes hidden/hovering/scrolling/dragging.
Viewport/content callback refs are also available for advanced composition;
standard parts already register them. Do not create a second viewport owner.
Bottom following, menu policy and virtualization remain application integrations.
The playground demonstrates an optional `@tanstack/react-virtual` dependency;
it is not shipped in Brick runtime dependencies.

### Horizontal rail

```tsx
<ScrollArea.Root orientation="horizontal" scrollbarVisibility="interaction">
  <ScrollArea.Viewport aria-label="Project filters">
    <HStack>{filters}</HStack>
  </ScrollArea.Viewport>
</ScrollArea.Root>
```

### Interactive descendants without an extra stop

```tsx
<ScrollArea.Root>
  <ScrollArea.Viewport>{projectLinks}</ScrollArea.Viewport>
</ScrollArea.Root>
```

## Evidence

- [Playground route source](../../../playground/src/components/scroll-area/)
- [Focused component tests](../../../test/components/scroll-area/)
- [Type tests](../../../test/types/components/scroll-area.test.ts)
- [Browser behavior](../../../playground/tests/components/scroll-area/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/scroll-area/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/scroll-area.md)

## Changelog

See the [Scroll Area changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).
