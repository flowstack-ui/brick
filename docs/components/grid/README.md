# Grid

Grid is Brick's two-dimensional layout primitive. `Grid.Root` creates exact
equal columns or intrinsic responsive columns. Optional `Grid.Item` adds
deliberate spans, line placement, and self-alignment; ordinary children remain
valid grid items without wrappers.

## When and where to use

Use Grid for peer-card collections, specimen matrices, comparison regions,
settings summaries, exact equal tracks, intrinsic responsive collections, and
asymmetric regions that need explicit item placement.

## When not to use

Use Stack, HStack, or VStack for one-dimensional flow; Container for page width
and gutters; Surface or Card for paint; and Atom DataGrid for interactive grid
semantics and keyboard navigation. Grid is not a page-template language,
breakpoint system, generic Box, or ARIA grid widget.

## Installation and imports

```tsx
import { Grid } from "@flowstack-ui/brick";
// or
import { Grid } from "@flowstack-ui/brick/grid";

import "@flowstack-ui/brick/styles.css";
```

Public exports are `Grid`, `GridRootProps`, `GridItemProps`,
`GridRootElement`, `GridItemElement`, `GridColumns`, `GridLine`, `GridSpan`,
`GridColumnSpan`, `GridGap`, `GridMinItemSize`, `GridAlign`, `GridJustify`,
`GridSelfAlign`, and `GridSelfJustify`.

## Quick start

```tsx
<Grid.Root minItemSize="md" gap="4">
  <Card.Root>Account</Card.Root>
  <Card.Root>Billing</Card.Root>
  <Card.Root>Security</Card.Root>
</Grid.Root>
```

Add Item only when placement is needed:

```tsx
<Grid.Root columns={3} gap="4">
  <Card.Root>First</Card.Root>
  <Grid.Item columnSpan={2}>
    <Card.Root>Featured</Card.Root>
  </Grid.Item>
</Grid.Root>
```

## Anatomy and DOM ownership

Root and optional Item each render exactly one selected native element:

```html
<div
  class="brick-grid"
  data-columns="3"
  data-gap="4"
  data-mode="explicit"
  data-slot="grid"
>
  <article>First</article>
  <div
    class="brick-grid-item"
    data-column-span="2"
    data-slot="grid-item"
  >Featured</div>
</div>
```

Root never clones, wraps, reorders, or annotates ordinary children. Item adds
only the wrapper explicitly authored by the consumer. Each selected element is
its corresponding `HTMLElement` ref target.

## API

### Root

| Prop | Values | Default |
| --- | --- | --- |
| `as` | `div`, `span`, `section`, `article`, `nav`, `header`, `footer`, `main`, `aside`, `ul`, `ol`, `li` | `div` |
| `columns` | `1`–`12` | `1` |
| `minItemSize` | `xs`, `sm`, `md`, `lg`, `xl` | unset |
| `gap` | `0`, `1`, `2`, `3`, `4`, `5`, `6` | `0` |
| `rowGap` | `0`, `1`, `2`, `3`, `4`, `5`, `6` | inherits `gap` |
| `columnGap` | `0`, `1`, `2`, `3`, `4`, `5`, `6` | inherits `gap` |
| `align` | `stretch`, `start`, `center`, `end`, `baseline` | `stretch` |
| `justify` | `stretch`, `start`, `center`, `end` | `stretch` |
| `slot` | `string` | `grid` |
| `children` | `ReactNode` | optional |

`columns` and `minItemSize` are mutually exclusive. Supplying `minItemSize`
selects intrinsic mode; otherwise Root uses explicit mode.

### Item

| Prop | Values | Default |
| --- | --- | --- |
| `as` | `div`, `span`, `section`, `article`, `header`, `footer`, `aside`, `li` | `div` |
| `columnSpan` | `1`–`12`, `full` | unset |
| `columnStart` / `columnEnd` | grid lines `1`–`13` | unset |
| `rowSpan` | `1`–`12` | unset |
| `rowStart` / `rowEnd` | grid lines `1`–`13` | unset |
| `align` | `auto`, `stretch`, `start`, `center`, `end`, `baseline` | `auto` |
| `justify` | `auto`, `stretch`, `start`, `center`, `end` | `auto` |
| `slot` | `string` | `grid-item` |
| `children` | `ReactNode` | optional |

On each axis, a span and explicit end are mutually exclusive. A start may
combine with a span or end. `columnSpan="full"` cannot combine with column
start/end.

## Visual recipes and states

Explicit mode uses `repeat(n, minmax(0, 1fr))`. Intrinsic mode uses
`auto-fit` with minimum sizes `8rem`, `12rem`, `16rem`, `20rem`, and `24rem`
for `xs` through `xl`. Gap values map to `--brick-space-0` through
`--brick-space-6`.

Numeric Item column placement is for explicit-column Roots. Intrinsic Roots
use native auto-placement or `columnSpan="full"` because numeric placement can
create unintended implicit columns as the responsive track count changes.
Row placement may create native implicit rows.

Grid has no interactive, focus, disabled, loading, validation, appearance,
paint, typography, or motion state.

## Tokens and CSS hooks

Stable Root hooks are `.brick-grid`, `[data-slot="grid"]`, `data-mode`,
`data-columns`, `data-min-item-size`, `data-gap`, `data-row-gap`,
`data-column-gap`, `data-align`, and `data-justify`.

Stable Item hooks are `.brick-grid-item`, `[data-slot="grid-item"]`,
`data-column-span`, `data-column-start`, `data-column-end`, `data-row-span`,
`data-row-start`, `data-row-end`, `data-align`, and `data-justify`.

Both parts expose the stable `data-slot` attribute.

Public variables:

- `--brick-grid-columns`
- `--brick-grid-gap`
- `--brick-grid-row-gap`
- `--brick-grid-column-gap`
- `--brick-grid-min-item-size`
- `--brick-grid-item-column-start`
- `--brick-grid-item-column-end`
- `--brick-grid-item-row-start`
- `--brick-grid-item-row-end`

## Customization

Use layout props first, then public variables or ordinary local CSS:

```tsx
<Grid.Root
  columns={2}
  gap="2"
  style={{
    "--brick-grid-column-gap": "2rem",
    "--brick-grid-row-gap": "0.5rem",
    border: "2px dashed var(--brick-color-accent-border)",
    padding: "var(--brick-space-4)",
  }}
>
  <Card.Root>First</Card.Root>
  <Card.Root>Second</Card.Root>
</Grid.Root>
```

Paint and outer sizing remain consumer or Surface/Card responsibilities.

## Responsive behavior

Intrinsic mode responds to Grid's available inline size without JavaScript,
viewport breakpoints, or responsive prop objects. Its `min(100%, …)` track
safeguard prevents the minimum token from forcing page overflow.

Explicit mode keeps the requested track count. Application CSS owns a
different mode or count at application breakpoints.

## Accessibility

Grid adds no role, name, state, keyboard behavior, or focus target. Never add
`role="grid"` merely because CSS Grid is used; interactive grid behavior
belongs to Atom DataGrid.

DOM order remains reading and sequential focus order. Item placement never
changes it. Dense flow, `order`, reverse behavior, and responsive visual
reordering are deliberately excluded. Choose valid semantic hosts and children
and name repeated landmarks.

## Composition, native props, and refs

Compose Stack inside a cell for one-dimensional content and Card or Surface
for paint. Use Item only for placement or self-alignment. Native global
attributes, events, ARIA/data attributes, `className`, `style`, slot hook, and
an `HTMLElement` ref pass to each authored part.

Grid does not expose `asChild`, `render`, child cloning, arbitrary template
strings, named areas, responsive objects, padding, margins, width/height,
overflow, or generic style props.

## Examples

### Featured summary

```tsx
<Grid.Root columns={4} gap="3">
  <Card.Root>Activity</Card.Root>
  <Grid.Item columnSpan={2}>
    <Card.Root>Featured report</Card.Root>
  </Grid.Item>
  <Card.Root>Storage</Card.Root>
  <Grid.Item columnSpan="full">
    <Card.Root>Workspace summary</Card.Root>
  </Grid.Item>
</Grid.Root>
```

### Semantic list

```tsx
<Grid.Root as="ul" minItemSize="sm" gap="3">
  <li>Design review</li>
  <li>Accessibility review</li>
  <li>Release review</li>
</Grid.Root>
```

## Evidence

- [Playground route source](../../../playground/src/components/grid/)
- [Focused component tests](../../../test/components/grid/)
- [Type tests](../../../test/types/components/grid.test.ts)
- [Browser behavior](../../../playground/tests/components/grid/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/grid/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/grid.md)

## Changelog

See the [Grid changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).
