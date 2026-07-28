# Tree Grid

Tree Grid presents hierarchical rows with Atom-owned cell navigation,
expansion, selection, active-cell semantics, and sortable-header activation.
Brick supplies finished table paint, hierarchy artwork, recipes, and overflow;
applications own records, coordinates, and data transforms.

## When and where to use

Use Tree Grid when parent and child rows share multiple independently
navigable columns. Use Tree when each node has one primary value.

## When not to use

Use Data Grid for flat interactive rows, Table for static tabular content, and
a disclosure pattern when expansion reveals detail rather than child rows.
Tree Grid does not provide schemas, sorting or filtering algorithms,
pagination, editing, resizing, reordering, virtualization, or spreadsheet
behavior. Interactive descendants inside cells are unsupported in this version.

## Installation and imports

```tsx
import { TreeGrid } from "@flowstack-ui/brick";
// or import { TreeGrid } from "@flowstack-ui/brick/tree-grid";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<TreeGrid.Container>
  <TreeGrid.Root aria-label="Release files" columnCount={2} rowCount={2} defaultExpandedValue={["src"]}>
    <TreeGrid.Caption>Release files</TreeGrid.Caption>
    <TreeGrid.Header>
      <TreeGrid.Row value="header" rowIndex={1} selectable={false}>
        <TreeGrid.ColumnHeader columnIndex={1}>Name</TreeGrid.ColumnHeader>
        <TreeGrid.ColumnHeader columnIndex={2}>Type</TreeGrid.ColumnHeader>
      </TreeGrid.Row>
    </TreeGrid.Header>
    <TreeGrid.Body>
      <TreeGrid.Row value="src" rowIndex={2} level={1} expandable selectable>
        <TreeGrid.RowHeader columnIndex={1}><TreeGrid.Indicator />src</TreeGrid.RowHeader>
        <TreeGrid.Cell columnIndex={2}>Folder</TreeGrid.Cell>
      </TreeGrid.Row>
    </TreeGrid.Body>
  </TreeGrid.Root>
</TreeGrid.Container>
```

## Anatomy and DOM ownership

Container is an overflow `div`. Root is Atom TreeGrid rendered as a native
`table` with `role="treegrid"`. Caption, Header, Body, Footer, Row,
ColumnHeader, RowHeader, and Cell render `caption`, `thead`, `tbody`, `tfoot`,
`tr`, `th`, `th`, and `td`. Indicator and SortIndicator are Brick-authored,
decorative `span` elements. Refs target those exact elements.

Header/Body/Footer directly contain Rows. Data Rows use a column-1 RowHeader,
then Cells. Indicator belongs at the logical start of that RowHeader and keeps
leaf and branch text aligned. Consumers author stable row values, parent
values, levels, one-based row and column indexes, and truthful counts.

## API

### Exports

`TreeGrid`, `TreeGridContainer`, `TreeGridRoot`, `TreeGridCaption`,
`TreeGridHeader`, `TreeGridBody`, `TreeGridFooter`, `TreeGridRow`,
`TreeGridColumnHeader`, `TreeGridRowHeader`, `TreeGridCell`,
`TreeGridIndicator`, `TreeGridSortIndicator`, `TreeGridContainerProps`,
`TreeGridRootProps`, `TreeGridCaptionProps`, `TreeGridHeaderProps`,
`TreeGridBodyProps`, `TreeGridFooterProps`, `TreeGridRowProps`,
`TreeGridColumnHeaderProps`, `TreeGridRowHeaderProps`, `TreeGridCellProps`,
`TreeGridIndicatorProps`, `TreeGridSortIndicatorProps`, and `TreeGridVariant`,
`TreeGridSize`, `TreeGridDensity`,
`TreeGridCaptionSide`, and `TreeGridCellAlign` are available from root and
`@flowstack-ui/brick/tree-grid` imports.

### Recipes

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `line`, `outline` | defaults to `"line"` |
| `size` | `sm`, `md`, `lg` | defaults to `"md"` |
| `density` | `compact`, `comfortable`, `spacious` | defaults to `"comfortable"` |
| `side` (Caption) | `top`, `bottom` | defaults to `"bottom"` |
| Cell/header `align` | `start`, `center`, `end` | `start`, or `end` when numeric |
| Cell/header `numeric` | boolean | `false` |

Root forwards Atom selection, expansion and active-cell control, disabled and
read-only state, looping, direction, counts, row-click selection, composition,
events, native table props, and ref. Row forwards hierarchy, expansion,
selection, disabled, parent, level, and coordinate props. Physical native
`align` is deliberately replaced by logical alignment.

## Visual recipes and states

Line provides row separators; outline adds a clipped rounded outer boundary
and column separators. Size changes typography, row metrics, and hierarchy
indent. Density changes only block padding. Active cell, selected row, hover,
disabled, expanded, and sorted states are painted from Atom attributes without
changing semantics or authored coordinates. Outline clips header, footer, and
selected fills to every rounded edge.

### Keyboard, hierarchy, selection, and sorting

Root is the single focus target and exposes an active descendant. Arrow keys
move among visible cells. In column 1, the direction-aware horizontal keys
expand, collapse, or move through hierarchy; other columns retain grid
movement. Home/End move within a row and Control/Command+Home/End reach the
first or last visible cell. Space applies row selection. Collapsing a branch
that contains the active cell moves active state to the collapsed ancestor's
column-1 cell.

Sorting is application-controlled. Give an indexed ColumnHeader `onAction`,
update records and `sortDirection`, and render decorative SortIndicator.
Pointer and active-header Enter invoke the same action.

## Tokens and CSS hooks

Stable classes are `.brick-tree-grid`, `.brick-tree-grid-container`, and
`.brick-tree-grid__*`; slots use matching `tree-grid-*` values. Public state
hooks are `data-variant`, `data-size`, `data-density`, `data-side`,
`data-align`, `data-numeric`, and `data-slot`, plus Atom hierarchy, expansion,
selection, action, sort, active, disabled, and hidden attributes.

Public variables:

- `--brick-tree-grid-inline-size`
- `--brick-tree-grid-min-inline-size`
- `--brick-tree-grid-border-color`
- `--brick-tree-grid-border-width`
- `--brick-tree-grid-radius`
- `--brick-tree-grid-header-background`
- `--brick-tree-grid-header-foreground`
- `--brick-tree-grid-body-background`
- `--brick-tree-grid-footer-background`
- `--brick-tree-grid-cell-foreground`
- `--brick-tree-grid-cell-padding-inline`
- `--brick-tree-grid-cell-padding-block`
- `--brick-tree-grid-row-min-block-size`
- `--brick-tree-grid-depth-indent`
- `--brick-tree-grid-caption-foreground`
- `--brick-tree-grid-caption-gap`
- `--brick-tree-grid-active-color`
- `--brick-tree-grid-active-width`
- `--brick-tree-grid-selected-background`
- `--brick-tree-grid-selected-foreground`
- `--brick-tree-grid-hover-background`
- `--brick-tree-grid-disabled-opacity`
- `--brick-tree-grid-indicator-size`
- `--brick-tree-grid-indicator-color`
- `--brick-tree-grid-sort-indicator-size`
- `--brick-tree-grid-sort-indicator-color`
- `--brick-tree-grid-motion-duration`
- `--brick-tree-grid-motion-easing`

## Customization

Choose recipes first, then override public semantic or component variables in
a local scope. Indicator and SortIndicator accept custom decorative children.
Classes, styles, slots, native props, and Atom composition remain available.

## Responsive behavior

Container owns horizontal scrolling and never changes Tree Grid semantics.
Root has a content-aware minimum inline size that can be customized. Logical
indent, alignment, indicator direction, and horizontal navigation mirror in
RTL. Long safe content wraps; numeric content remains tabular. Reduced motion
removes indicator rotation and forced colors preserve boundaries, focus,
selection, hierarchy, and disabled distinction.

## Accessibility

Provide one stable accessible name. Keep the first data column a RowHeader,
indexes one-based, parent/level relationships correct, and counts truthful.
Atom owns roles, active descendant, keyboard movement, expansion, selection,
disabled/read-only state, and RTL. Brick keeps active focus separate from
selected fill and makes both indicators silent. Do not place links, buttons,
inputs, or editable controls inside cells in this version.

## Composition, native props, and refs

Atom-backed parts preserve `render`, `asChild`, native attributes, merged
events, classes, styles, slots, and exact refs. Container, Indicator, and
SortIndicator are Brick-authored elements. Compose Toolbar, filters,
Pagination, status, and detail Surfaces outside Root.

## Examples

The quick start covers canonical hierarchy. The playground includes controlled
expansion, selection, sorting, deep rows, captions, footer, RTL, overflow,
appearances, and public-token customization.

## Evidence

- [Unit tests](../../../test/components/tree-grid/tree-grid.test.tsx)
- [Type tests](../../../test/types/components/tree-grid.test.ts)
- [Playground source](../../../playground/src/components/tree-grid/)
- [Browser behavior](../../../playground/tests/components/tree-grid/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/tree-grid/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/tree-grid.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
