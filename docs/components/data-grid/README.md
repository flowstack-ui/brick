# Data Grid

Data Grid presents tabular data with Atom-owned cell navigation, row selection,
active-cell semantics, and sortable-header activation. Brick supplies the
finished visual recipes; applications own data transforms and surrounding
controls.

## When and where to use

Use Data Grid when people must move through cells with arrow keys or select
rows.

## When not to use

Use Table for static comparison, Grid for page layout, and Tree Grid for
hierarchical rows. Data Grid does not provide editing, filtering, pagination,
column resizing, virtualization, schemas, or enterprise data processing.

## Installation and imports

```tsx
import { DataGrid } from "@flowstack-ui/brick";
// or import { DataGrid } from "@flowstack-ui/brick/data-grid";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<DataGrid.Container>
  <DataGrid.Root aria-label="Projects" columnCount={2} rowCount={2}>
    <DataGrid.Caption>Current projects</DataGrid.Caption>
    <DataGrid.Header>
      <DataGrid.Row rowIndex={1}>
        <DataGrid.ColumnHeader columnIndex={1}>Project</DataGrid.ColumnHeader>
        <DataGrid.ColumnHeader columnIndex={2}>Status</DataGrid.ColumnHeader>
      </DataGrid.Row>
    </DataGrid.Header>
    <DataGrid.Body>
      <DataGrid.Row rowIndex={2} value="atom" selectable>
        <DataGrid.Cell columnIndex={1}>Atom</DataGrid.Cell>
        <DataGrid.Cell columnIndex={2}>Ready</DataGrid.Cell>
      </DataGrid.Row>
    </DataGrid.Body>
    <DataGrid.Footer />
  </DataGrid.Root>
</DataGrid.Container>
```

## Anatomy and DOM ownership

Container is an explicit overflow `div`; Root remains a native `table` with
`role="grid"`. The remaining parts render `caption`, `thead`, `tbody`, `tfoot`,
`tr`, `th`, and `td`, and refs target those exact elements. Indices are
one-based and counts describe the complete logical data set.

## API

### Exports

`DataGrid`, `DataGridContainer`, `DataGridRoot`, `DataGridCaption`,
`DataGridHeader`, `DataGridBody`, `DataGridFooter`, `DataGridRow`,
`DataGridColumnHeader`, `DataGridCell`, `DataGridSortIndicator`,
`DataGridContainerProps`, `DataGridRootProps`, `DataGridCaptionProps`,
`DataGridHeaderProps`, `DataGridBodyProps`, `DataGridFooterProps`,
`DataGridRowProps`, `DataGridColumnHeaderProps`, `DataGridCellProps`,
`DataGridSortIndicatorProps`, `DataGridVariant`, `DataGridSize`,
`DataGridDensity`, `DataGridCaptionSide`, and `DataGridCellAlign` are available
from root and subpath imports.

### Root recipes

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `line`, `outline` | defaults to `"line"` |
| `size` | `sm`, `md`, `lg` | defaults to `"md"` |
| `density` | `compact`, `comfortable`, `spacious` | defaults to `"comfortable"` |
| `side` (Caption) | `top`, `bottom` | `bottom` |
| Cell/header `align` | `start`, `center`, `end` | `start`, or `end` when numeric |
| Cell/header `numeric` | boolean | `false` |

Atom props remain available, including selection state, active-cell state,
direction, looping, wrapping, disabled/read-only state, indexes, counts,
`sortDirection`, composition, events, and refs. Physical native `align` values
are deliberately replaced by logical values.

## Visual recipes and states

Line separates rows; outline adds outer and column boundaries. Size changes
typography and row metrics, while density changes block padding. Hover,
selected, active, disabled, and sorted paint is driven by Atom state attributes
without moving cell geometry.

### Keyboard, selection, and sorting

Root is the single focus target and exposes the active descendant. Arrow keys
move by cell, Home/End move within a row, PageUp/PageDown move by row, and
Ctrl/Meta+Home or End reaches the first or last cell. Space applies Atom's row
selection behavior. Disabled cells and rows are skipped according to Atom's
contract.

Sorting is controlled by the application. Give a one-based indexed
ColumnHeader `onAction`, update the data and `sortDirection` in application
state, and render the decorative SortIndicator. Pointer activation and Enter
invoke `onAction`; only the sorted header should expose a direction.

```tsx
<DataGrid.ColumnHeader columnIndex={1} sortDirection={direction} onAction={sort}>
  Project <DataGrid.SortIndicator />
</DataGrid.ColumnHeader>
```

Compose external Toolbar and Pagination components around the grid when those
features are needed. Cells should remain non-editing in this version.

## Tokens and CSS hooks

Stable classes use `.brick-data-grid`, `.brick-data-grid-container`, and
`.brick-data-grid__*`; slots use matching `data-grid-*` names. Public variables
use `--brick-data-grid-*` and cover inline size, borders, radius, section
surfaces, cell spacing, row size, caption, active outline, selected/hover
surfaces, disabled opacity, and sort-indicator geometry. Prefer recipes before
scoped variable overrides.

Public state hooks are `data-variant`, `data-size`, `data-density`, `data-side`,
`data-align`, `data-numeric`, and `data-slot`. Atom additionally exposes its
behavioral state attributes.

Public variables:

- `--brick-data-grid-inline-size`
- `--brick-data-grid-min-inline-size`
- `--brick-data-grid-border-color`
- `--brick-data-grid-border-width`
- `--brick-data-grid-radius`
- `--brick-data-grid-header-background`
- `--brick-data-grid-header-foreground`
- `--brick-data-grid-body-background`
- `--brick-data-grid-footer-background`
- `--brick-data-grid-cell-foreground`
- `--brick-data-grid-cell-padding-inline`
- `--brick-data-grid-cell-padding-block`
- `--brick-data-grid-row-min-block-size`
- `--brick-data-grid-caption-foreground`
- `--brick-data-grid-caption-gap`
- `--brick-data-grid-active-color`
- `--brick-data-grid-active-width`
- `--brick-data-grid-selected-background`
- `--brick-data-grid-selected-foreground`
- `--brick-data-grid-hover-background`
- `--brick-data-grid-disabled-opacity`
- `--brick-data-grid-sort-indicator-size`
- `--brick-data-grid-sort-indicator-color`

## Customization

Choose a closed recipe first, then override documented public variables on a
deliberate local scope. Classes, styles, slots, native props, and Atom
composition remain available.

## Responsive behavior

Author Container when wide content needs horizontal overflow. It never appears
implicitly and does not alter grid semantics. Logical alignment mirrors under
RTL, while numeric content uses tabular figures.

## Accessibility

Provide a stable accessible name through Caption, `aria-label`, or
`aria-labelledby`. Keep all indexes one-based and counts truthful, including
when the application displays a window of a larger data set. Selection state,
disabled state, sorting, and the active descendant are announced by Atom;
SortIndicator is always decorative.

## Composition, native props, and refs

Atom-backed parts preserve `render`, `asChild`, native attributes, merged
events, classes, styles, slots, and exact refs. Container and SortIndicator are
Brick-authored elements. Compose Toolbar and Pagination outside Root.

## Examples

The quick start and controlled sorting examples above cover the canonical
composition. Use controlled `value`/`onValueChange` for application-owned row
selection and controlled `activeCell` only when the application must observe
or restore navigation.

## Evidence

- [Unit tests](../../../test/components/data-grid/data-grid.test.tsx)
- [Type tests](../../../test/types/components/data-grid.test.ts)
- [Playground source](../../../playground/src/components/data-grid/)
- [Browser behavior](../../../playground/tests/components/data-grid/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/data-grid/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/data-grid.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
