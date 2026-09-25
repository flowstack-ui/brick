import { ownerSections, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { TreeGridWindowing } from "./examples/TreeGridWindowing.js";
import TreeGridWindowingSource from "./examples/TreeGridWindowing.tsx?raw";
import { TreeGridCheckboxSelection } from "./examples/TreeGridCheckboxSelection.js";
import TreeGridCheckboxSelectionSource from "./examples/TreeGridCheckboxSelection.tsx?raw";
import { TreeGridRemote } from "./examples/TreeGridRemote.js";
import TreeGridRemoteSource from "./examples/TreeGridRemote.tsx?raw";
import { TreeGridSizes } from "./examples/TreeGridSizes.js";
import TreeGridSizesSource from "./examples/TreeGridSizes.tsx?raw";
import { TreeGridDensity } from "./examples/TreeGridDensity.js";
import TreeGridDensitySource from "./examples/TreeGridDensity.tsx?raw";
import { TreeGridVariants } from "./examples/TreeGridVariants.js";
import TreeGridVariantsSource from "./examples/TreeGridVariants.tsx?raw";
import { TreeGridTones } from "./examples/TreeGridTones.js";
import TreeGridTonesSource from "./examples/TreeGridTones.tsx?raw";
import { TreeGridResponsive } from "./examples/TreeGridResponsive.js";
import TreeGridResponsiveSource from "./examples/TreeGridResponsive.tsx?raw";
import { TreeGridSelection } from "./examples/TreeGridSelection.js";
import TreeGridSelectionSource from "./examples/TreeGridSelection.tsx?raw";
import { TreeGridSorting } from "./examples/TreeGridSorting.js";
import TreeGridSortingSource from "./examples/TreeGridSorting.tsx?raw";
import { TreeGridDisclosure } from "./examples/TreeGridDisclosure.js";
import TreeGridDisclosureSource from "./examples/TreeGridDisclosure.tsx?raw";
import { TreeGridEditing } from "./examples/TreeGridEditing.js";
import TreeGridEditingSource from "./examples/TreeGridEditing.tsx?raw";
import { TreeGridResizing } from "./examples/TreeGridResizing.js";
import TreeGridResizingSource from "./examples/TreeGridResizing.tsx?raw";
import { TreeGridSticky } from "./examples/TreeGridSticky.js";
import TreeGridStickySource from "./examples/TreeGridSticky.tsx?raw";
import { TreeGridStates } from "./examples/TreeGridStates.js";
import TreeGridStatesSource from "./examples/TreeGridStates.tsx?raw";
import { TreeGridRtl } from "./examples/TreeGridRtl.js";
import TreeGridRtlSource from "./examples/TreeGridRtl.tsx?raw";
import { TreeGridFiltering } from "./examples/TreeGridFiltering.js";
import TreeGridFilteringSource from "./examples/TreeGridFiltering.tsx?raw";
export const treeGridExamples = [
 { id: "windowing", title: "Windowing integration", description: "A fixed-row adapter combines Atom Virtualizer with truthful logical indexes, sibling metadata and pinned active/ancestor DOM. Mount and scroll before requesting focus; remote loading and variable-height rows require a separate adapter.", Demo: TreeGridWindowing, source: TreeGridWindowingSource },
 { id: "checkbox-selection", title: "Checkbox selection", description: "Compose Checkbox in an interactive cell. Selection is controlled outside the grid; parent checking does not implicitly select descendants.", Demo: TreeGridCheckboxSelection, source: TreeGridCheckboxSelectionSource },
 { id: "remote", title: "Server pages and recovery", description: "Applications own fetching, pagination and cancellation. Keep loading, error, retry and empty feedback outside the grid; logical indexes and totals describe all records.", Demo: TreeGridRemote, source: TreeGridRemoteSource },
 { id: "sizes", title: "Sizes", description: "Choose sm, md or lg for coordinated row height and 14/14/16px typography.", Demo: TreeGridSizes, source: TreeGridSizesSource },
 { id: "density", title: "Density", description: "Adjust vertical density independently from text size.", Demo: TreeGridDensity, source: TreeGridDensitySource },
 { id: "variants", title: "Variants", description: "Choose separators or an outline; stripes and column borders remain independent.", Demo: TreeGridVariants, source: TreeGridVariantsSource },
 { id: "tones", title: "Tones", description: "Neutral and accent change selection without conflating it with hover.", Demo: TreeGridTones, source: TreeGridTonesSource },
 { id: "responsive", title: "Responsive", description: "Sparse recipes inherit at shared breakpoints; Container scrolls authored wide content.", Demo: TreeGridResponsive, source: TreeGridResponsiveSource },
 { id: "selection", title: "Selection", description: "Control selection and expansion separately. Shift-click extends a visible range; Ctrl/Command+A toggles eligible visible rows.", Demo: TreeGridSelection, source: TreeGridSelectionSource },
 { id: "sorting", title: "Sorting", description: "Sort siblings recursively and flatten preorder. Pointer and Enter request the same sort.", Demo: TreeGridSorting, source: TreeGridSortingSource },
 { id: "disclosure", title: "Disclosure", description: "Use Trigger and disable RowHeader click expansion to separate disclosure from selection.", Demo: TreeGridDisclosure, source: TreeGridDisclosureSource },
 { id: "editing", title: "Editing", description: "Enter/F2 enters cell controls; Escape returns to navigation. Save and persistence are application-owned.", Demo: TreeGridEditing, source: TreeGridEditingSource },
 { id: "resizing", title: "Resizing", description: "Drag a named separator or enter its header with F2 and resize with arrow keys. Apply the controlled width to Column.", Demo: TreeGridResizing, source: TreeGridResizingSource },
 { id: "sticky", title: "Sticky", description: "Pin a logical column and header inside the same scroll container.", Demo: TreeGridSticky, source: TreeGridStickySource },
 { id: "states", title: "States", description: "Disabled prevents interaction. Read-only preserves navigation without changing selection.", Demo: TreeGridStates, source: TreeGridStatesSource },
 { id: "rtl", title: "Right-to-left", description: "Logical alignment, hierarchy indicators and horizontal keyboard navigation follow dir.", Demo: TreeGridRtl, source: TreeGridRtlSource },
 { id: "filtering", title: "Filtering", description: "Retain matching descendants and their ancestors, then recompute truthful row coordinates.", Demo: TreeGridFiltering, source: TreeGridFilteringSource },
];
export const treeGridParts: OwnerPart[] = [
{ id: "tree-grid-root-props", title: "Root", description: "Native table with hierarchical composite navigation.", rows: [
{ name: "size / density / variant", typeLabel: "ResponsiveValue", defaultLabel: "md / comfortable / line", description: "sm/md/lg, compact/comfortable/spacious and line/outline." },
{ name: "tone", typeLabel: "'neutral' | 'accent'", defaultLabel: "accent", description: "Selection paint independent from surface." },
{ name: "rowCount / columnCount / pageSize", typeLabel: "number", description: "Full logical counts and PageUp/PageDown movement; pageSize defaults to ten visible rows." },
{ name: "selectionMode / value / defaultValue / onValueChange", typeLabel: "selection policy and state", description: "None, single or multiple stable row IDs." },
{ name: "expandedValue / defaultExpandedValue / onExpandedValueChange", typeLabel: "string[] / callback", description: "Open branch identities." },
{ name: "activeCell / defaultActiveCell / onActiveCellChange", typeLabel: "{ rowIndex, columnIndex } | null / callback", description: "One-based logical coordinates." },
{ name: "disabled / readOnly / selectOnRowClick / loop / dir", typeLabel: "behavior props", description: "Availability, pointer selection, wrapping and direction." },
{ name: "minInlineSize / stickyHeader / layout", typeLabel: "string | number / boolean / 'auto' | 'fixed'", description: "Authored overflow, header pinning and native sizing." },
{ name: "surface / borderTone / striped / showColumnBorder / radius", typeLabel: "presentation props", description: "Shared surface, border and corner decisions." }
]},
{ id: "tree-grid-row-props", title: "Row", description: "A stable hierarchical row, not a visible-slice identity.", rows: [
{ name: "value / parentValue / level / rowIndex", typeLabel: "string / string | null / number / number", description: "Stable identity, parent, depth and truthful one-based position." },
{ name: "expandable / selectable / disabled", typeLabel: "boolean", description: "Independent expansion, selection eligibility and availability." }
]},
{ id: "tree-grid-cell-props", title: "Cell, RowHeader and ColumnHeader", description: "Indexed cells with shared alignment and sticky recipes.", rows: [
{ name: "columnIndex / index", typeLabel: "number", description: "One-based coordinate, or legacy zero-based index." },
{ name: "interactive", typeLabel: "boolean", defaultLabel: "false", description: "F2 enters native controls; Escape returns. Enter preserves header onAction." },
{ name: "sticky / stickyOffset", typeLabel: "'start' | 'end' / string | number", description: "Logical pinning and authored offset." },
{ name: "align / verticalAlign / numeric / disabled", typeLabel: "cell props", description: "Logical alignment, tabular numbers and eligibility." },
{ name: "RowHeader.expandOnClick", typeLabel: "boolean", defaultLabel: "true", description: "Set false when an independent Trigger owns pointer disclosure." },
{ name: "ColumnHeader.onAction / sortDirection", typeLabel: "callback / sort metadata", description: "Application-owned sorting with equivalent pointer and Enter activation." }
]},
{ id: "tree-grid-trigger-props", title: "Trigger", description: "Independent disclosure button inside a row header.", rows: [
{ name: "children / aria-label / disabled / render / asChild", typeLabel: "button composition props", description: "Decorative default indicator, localized name and native composition." }
]},
{ id: "tree-grid-resize-props", title: "ColumnResizeHandle", description: "Named separator inside an interactive indexed header.", rows: [
{ name: "value / defaultValue / onValueChange / onValueCommit", typeLabel: "number / callback", description: "Width in pixels; apply to Column.htmlWidth." },
{ name: "min / max / step", typeLabel: "number", defaultLabel: "40 / 1200 / 10", description: "Bounds and logical keyboard increment; Shift multiplies step by ten." },
{ name: "dir / disabled / aria-label", typeLabel: "behavior and native props", description: "Direction, availability and accessible name." }
]},
{ id: "tree-grid-structure-props", title: "Structure and artwork", description: "Container, ColumnGroup, Column, Caption, Header, Body, Footer, Indicator and SortIndicator.", rows: [
{ name: "Column.htmlWidth / span", typeLabel: "number | percentage / number", description: "Native width hints and column span." },
{ name: "Caption.side", typeLabel: "'top' | 'bottom'", defaultLabel: "bottom", description: "Caption placement." },
{ name: "Indicator.children / SortIndicator.children", typeLabel: "ReactNode", description: "Custom artwork is decorative and its paths are preserved." },
{ name: "native props / ref / render / asChild", typeLabel: "per-part composition props", description: "Atom-backed parts preserve composition. Container and artwork are native Brick elements." }
]}
];
export const treeGridSections = ownerSections(treeGridExamples, treeGridParts);
