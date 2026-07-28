# Table

Table presents static row-and-column relationships with native HTML semantics,
finished visual recipes, logical alignment, and explicit responsive
containment. Atom owns the semantic table primitives and sort metadata; Brick
owns presentation.

## When and where to use

Use Table when people compare values across meaningful columns, including
reports, invoices, inventories, pricing, and audit results. Use Data Grid when
the tabular region itself needs arrow-key cell navigation or row selection.
reports, invoices, inventories, pricing, and audit results.

## When not to use

Use Data Grid when the tabular region itself needs arrow-key cell navigation
or row selection. Table does not own data mapping, sorting, filtering,
pagination, editing, resizing, virtualization, or responsive card conversion.

## Installation and imports

```tsx
import { Table } from "@flowstack-ui/brick";
// or import { Table } from "@flowstack-ui/brick/table";
import "@flowstack-ui/brick/styles.css";
```

Public exports include `Table`, `TableContainer`, `TableRoot`, `TableCaption`,
`TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`,
`TableSortIndicator`, `TableContainerProps`, `TableRootProps`,
`TableCaptionProps`, `TableHeaderProps`, `TableBodyProps`, `TableFooterProps`,
`TableRowProps`, `TableHeadProps`, `TableCellProps`,
`TableSortIndicatorProps`, `TableVariant`, `TableSize`, `TableDensity`,
`TableCaptionSide`, and `TableCellAlign`.

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
    <Table.Caption>Release results</Table.Caption>
    <Table.Header><Table.Row><Table.Head>Package</Table.Head></Table.Row></Table.Header>
    <Table.Body><Table.Row><Table.Head scope="row">Atom</Table.Head></Table.Row></Table.Body>
    <Table.Footer />
  </Table.Root>
</Table.Container>
```

Container is an optional `div`; Root is always a native `table` unless Atom
composition is used. Caption, Header, Body, Footer, Row, Head, and Cell render
`caption`, `thead`, `tbody`, `tfoot`, `tr`, `th`, and `td`. Refs target those
exact elements. Root never inserts Container automatically.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `line`, `outline` | defaults to `"line"` |
| `size` | `sm`, `md`, `lg` | defaults to `"md"` |
| `density` | `compact`, `comfortable` | defaults to `"comfortable"` |
| `striped` | boolean | `false` |
| `stickyHeader` | boolean | `false` |
| `side` | `top`, `bottom` | defaults to `"top"` |
| `align` | `start`, `center`, `end` | `start`, or `end` when numeric |
| `numeric` | boolean | `false` |

All Atom and native props remain available, including `scope`, `headers`,
`colSpan`, `rowSpan`, `sortDirection`, `render`, `asChild`, classes, styles,
slots, events, and refs. The deprecated physical native `align` values are
intentionally replaced by logical values.

## Visual recipes and states

Line separates rows; outline adds the outer and column boundaries. Size owns
typography and row metrics, density owns block padding, stripe affects only
alternating body rows, and sticky affects only header positioning. Table adds
no hover, selected, focus, loading, empty, or error state.

### Sorting

Table does not sort. Put a named Button inside Head, keep the data and direction
in application state, and pass the current direction to `sortDirection`.
`SortIndicator` is decorative only.

```tsx
<Table.Head sortDirection="ascending">
  <Button onClick={sortRows}>Name<Table.SortIndicator /></Button>
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
`data-striped`, `data-sticky-header`, `data-side`, `data-align`, `data-numeric`,
and `data-slot`.

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

Author `Table.Container` when wide data needs native horizontal overflow. It
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
`--brick-table-min-inline-size` to the smallest honest comparison width. For a
summary, author Footer with row headers and numeric Cells exactly like Body.

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
