# Table

### Responsive recipes and optional engine

`size`, `density`, and `variant` accept sparse `initial/sm/md/lg/xl` values.
Sizes use 14/14/16px type, 8/12/16px inline insets and 40/48/56px comfortable
minimum row heights; compact reduces the minimum by 8px. Cells can grow for content.
Use a named Button inside Head for application-owned sorting and pass truthful
sortDirection. SortIndicator preserves supplied decorative children.
The playground includes an optional `@tanstack/react-table@8.21.3` integration;
the engine is not a Brick runtime dependency and does not change native table semantics.

Table presents row-and-column relationships with native HTML semantics,
finished visual recipes, logical alignment, and explicit responsive
containment. Atom owns the semantic table primitives and sort metadata; Brick
owns presentation.

## When and where to use

Use Table when people compare values across meaningful columns, including
reports, invoices, inventories, pricing, and audit results. Use Data Grid when
the tabular region itself needs arrow-key cell navigation.

## When not to use

Use Data Grid when the tabular region itself needs arrow-key cell navigation.
Table does not own data mapping, sorting, filtering,
pagination, editing, resizing, virtualization, or responsive card conversion.

## Installation and imports

```tsx
import { Table } from "@flowstack-ui/brick";
// or import { Table } from "@flowstack-ui/brick/table";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/table.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Public exports include `Table`, `TableContainer`, `TableRoot`, `TableColumnGroup`, `TableColumn`, `TableCaption`,
`TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`,
`TableSortIndicator`, `TableContainerProps`, `TableRootProps`, `TableColumnGroupProps`, `TableColumnProps`,
`TableCaptionProps`, `TableHeaderProps`, `TableBodyProps`, `TableFooterProps`,
`TableRowProps`, `TableHeadProps`, `TableCellProps`,
`TableSortIndicatorProps`, `TableVariant`, `TableSize`, `TableDensity`,
`TableCaptionSide`, `TableCellAlign`, `TableCellVerticalAlign`, `TableSurface`,
`TableBorderTone`, `TableLayout`, `TableLength`, and `TableRowVariant`.

## Quick start

```tsx
<Table.Root>
  <Table.Caption>Release results</Table.Caption>
  <Table.Body><Table.Row><Table.Cell>Ready</Table.Cell></Table.Row></Table.Body>
</Table.Root>
```

## Anatomy and DOM ownership

```tsx
<Table.Container>
  <Table.Root>
    <Table.ColumnGroup>
      <Table.Column htmlWidth="35%" />
      <Table.Column />
    </Table.ColumnGroup>
    <Table.Caption>Release results</Table.Caption>
    <Table.Header><Table.Row><Table.Head>Package</Table.Head></Table.Row></Table.Header>
    <Table.Body><Table.Row><Table.Head scope="row">Atom</Table.Head></Table.Row></Table.Body>
    <Table.Footer />
  </Table.Root>
</Table.Container>
```

Container is an optional `div`; Root is always a native `table` unless Atom
composition is used. ColumnGroup and Column render native `colgroup` and `col`;
Caption, Header, Body, Footer, Row, Head, and Cell render `caption`, `thead`,
`tbody`, `tfoot`, `tr`, `th`, and `td`. Refs target those exact elements. Root
never inserts Container automatically. Place Column only inside ColumnGroup and
use `htmlWidth` as a native CSS-pixel number or percentage sizing hint, not as
a CSS-unit value, column schema, or resizing API.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `line`, `outline` | defaults to `"line"` |
| `size` | `sm`, `md`, `lg` | defaults to `"md"` |
| `density` | `compact`, `comfortable` | defaults to `"comfortable"` |
| `surface` | `transparent`, `base` | defaults to `"transparent"` |
| `borderTone` | `subtle`, `default`, `strong` | defaults to `"default"` |
| `showColumnBorder` | boolean | `false` |
| `layout` | `auto`, `fixed` | defaults to `"auto"` |
| `minInlineSize` | CSS length string or pixel number | unset; recipe baseline is `0` |
| `striped` | boolean | `false` |
| `stickyHeader` | boolean | `false` |
| `interactive` | boolean; hover presentation only | `false` |
| `Head/Cell sticky` | `start`, `end` | unset |
| `Head/Cell stickyOffset` | length string or pixel number | `0` |
| `side` | `top`, `bottom` | defaults to `"top"` |
| `align` | `start`, `center`, `end` | `start`, or `end` when numeric |
| `verticalAlign` | `top`, `middle`, `bottom` | `middle` |
| `Table.Row variant` | `default`, `section` | defaults to `"default"` |
| `numeric` | boolean | `false` |

All Atom and native props remain available, including `scope`, `headers`,
`colSpan`, `rowSpan`, `sortDirection`, `render`, `asChild`, classes, styles,
slots, events, and refs. The deprecated physical native `align` values are
intentionally replaced by logical values.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

Logical sticky columns must be applied to the matching header and body cells.
Offsets for multiple pinned columns are authored; no resizing or measurement
engine is implied. Pinned cells use an opaque base surface to keep scrolling
content from showing through. Root `interactive` never adds activation or focus.
With both sticky axes, Brick layers pinned body cells below headers and pinned
header intersections above the remaining headers. No consumer z-index override
is required for that combination.
Container applies a one-CSS-pixel leading-edge paint clip when it directly
contains a sticky-header Root. This prevents subpixel body-text leakage in
WebKit without changing dimensions, padding or sticky offsets. Keyboard focus
is inset so the clip cannot cut off the theme focus indicator. As with other
bounded vertical examples, use a line table and place any persistent outer
border on the stable surrounding surface rather than the scrolling table.

## Visual recipes and states

Line separates rows; outline adds the outer boundary while cell
corner geometry keeps section paint inside the softened outline without
clipping Caption. `showColumnBorder` independently adds logical column
separators. Surface chooses transparent parent blending or a base body with
subtle header/footer paint. Size owns typography and row metrics, density owns block
padding, stripe affects only alternating body rows, and sticky affects only
header positioning. A section Row adds stronger row-group heading cadence and
a structural separator without inventing new table semantics. Table adds no
focus, loading, empty, or error state. Hover and selected paint are opt-in
presentation; their controls and application state remain separately composed.

### Sorting

Table does not sort. Put a named Button inside Head, keep the data and direction
in application state, and pass the current direction to `sortDirection`.
`SortIndicator` is decorative only.

```tsx
<Table.Head sortDirection="ascending">
  <Button onClick={sortRows} endIcon={<Table.SortIndicator />}>Name</Button>
</Table.Head>
```

Only the currently sorted header should expose a direction.

## Tokens and CSS hooks

Stable classes are `.brick-table-container`, `.brick-table`,
`.brick-table__caption`, `__header`, `__body`, `__footer`, `__row`, `__head`,
`__cell`, and `__sort-indicator`; matching slots use `table-*` names. Public
variables use the `--brick-table-*` prefix and cover inline/minimum size,
borders, radius, section colors, cell padding, row minimum size, caption gap,
sticky offset/z-index, and sort-indicator size/color.

Public state attributes are `data-variant`, `data-size`, `data-density`,
`data-surface`, `data-border-tone`, `data-column-border`, `data-layout`,
`data-striped`, `data-sticky-header`, `data-side`, `data-align`,
`data-vertical-align`, `data-numeric`, and `data-slot`.

Public variables:

- `--brick-table-inline-size`
- `--brick-table-min-inline-size`
- `--brick-table-border-color`
- `--brick-table-border-width`
- `--brick-table-radius`
- `--brick-table-header-background`
- `--brick-table-header-foreground`
- `--brick-table-body-background`
- `--brick-table-row-stripe-background`
- `--brick-table-footer-background`
- `--brick-table-footer-foreground`
- `--brick-table-cell-foreground`
- `--brick-table-cell-padding-inline`
- `--brick-table-cell-padding-block`
- `--brick-table-section-padding-block-start`
- `--brick-table-section-padding-block-end`
- `--brick-table-row-min-block-size`
- `--brick-table-caption-foreground`
- `--brick-table-caption-gap`
- `--brick-table-sticky-offset`
- `--brick-table-sticky-z-index`
- `--brick-table-sort-indicator-size`
- `--brick-table-sort-indicator-color`

## Customization

Prefer closed recipes, then override public variables on Root for a deliberate
exception. Container accepts ordinary div classes and styles independently.

## Responsive behavior

Author `Table.Container` when wide data needs native horizontal overflow. Set
`Root minInlineSize` to the smallest honest comparison width. It
contains overflow without hiding columns, cloning labels, or changing table
semantics. For a labelled, focusable custom scrollbar region, compose Scroll
Area instead. Sticky Header is presentation only: the application supplies the
bounded vertical scroll region, block size, and optional sticky offset.

## Accessibility

Prefer Caption when the table needs a visible name; otherwise use surrounding
prose or an appropriate `aria-label`/`aria-labelledby`. Head defaults to
`scope="col"`; author `scope="row"` for row headers. Use `id`/`headers` for
complex associations. Table adds no keyboard handler or focus target.
Interactive descendants remain independent tab stops with their own names and
behavior.

## Composition, native props, and refs

The eight Atom-backed parts preserve `render` and `asChild`; composed hosts
must remain valid table elements. Classes, styles, slots, native attributes,
events, and refs merge. Container and SortIndicator are Brick-authored native
elements and do not expose Atom composition.

## Examples

See sorting above. For wide content, wrap Root explicitly in Container and set
`Root minInlineSize` to the smallest honest comparison width. For a summary,
author Footer with row headers and numeric Cells exactly like Body. Use
`Row variant="section"` for an authored row-group heading rather than targeting
internal cells from Block CSS.

For a bounded Table that also scrolls vertically, put the visible border and
radius on a stable Scroll Area viewport, use `variant="line"` on the moving
Table, and keep the visible table name outside the moving viewport with
`aria-labelledby`. A Table outline moves with its rows, so its bottom corners
cannot represent the fixed viewport edge until the final row is visible.

## Evidence

- [Playground source](../../../playground/src/components/table/)
- [Unit tests](../../../test/components/table/table.test.tsx)
- [Type tests](../../../test/types/components/table.test.ts)
- [Browser behavior](../../../playground/tests/components/table/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/table/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/table.md)

See the [Table changelog](CHANGELOG.md).

## Changelog

See the [Table changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).

### Record selection

Row accepts optional selected (boolean, default false). This is
presentation only: it emits data-selected, not aria-selected, a role,
or a tab stop. Compose a named Checkbox with the public selection utility;
optional ActionDelegate targets a real descendant primary control.
See [record selection](../../guides/record-selection.md) for the complete
state, scope, delegation and accessibility contract.

Local styling variables: --brick-table-selected-background,
--brick-table-selected-foreground, --brick-table-hover-background.
Selected paint uses `--brick-color-accent-soft` and primary text. Actionable
hover mixes primary text at 6% over the base surface; selected paint wins.
Selected paint overrides hover without changing geometry. Forced colors
uses system canvas colors; the checkbox conveys selection without color.
