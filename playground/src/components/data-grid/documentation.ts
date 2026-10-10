import { ownerSections, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { DataGridSizes } from "./examples/DataGridSizes.js";
import SizesSource from "./examples/DataGridSizes.tsx?raw";
import { DataGridDensity } from "./examples/DataGridDensity.js";
import DensitySource from "./examples/DataGridDensity.tsx?raw";
import { DataGridVariants } from "./examples/DataGridVariants.js";
import VariantsSource from "./examples/DataGridVariants.tsx?raw";
import { DataGridTones } from "./examples/DataGridTones.js";
import TonesSource from "./examples/DataGridTones.tsx?raw";
import { DataGridResponsive } from "./examples/DataGridResponsive.js";
import ResponsiveSource from "./examples/DataGridResponsive.tsx?raw";
import { DataGridSelection } from "./examples/DataGridSelection.js";
import SelectionSource from "./examples/DataGridSelection.tsx?raw";
import { DataGridSorting } from "./examples/DataGridSorting.js";
import SortingSource from "./examples/DataGridSorting.tsx?raw";
import { DataGridEditing } from "./examples/DataGridEditing.js";
import EditingSource from "./examples/DataGridEditing.tsx?raw";
import { DataGridResizing } from "./examples/DataGridResizing.js";
import ResizingSource from "./examples/DataGridResizing.tsx?raw";
import { DataGridSticky } from "./examples/DataGridSticky.js";
import StickySource from "./examples/DataGridSticky.tsx?raw";
import { DataGridStates } from "./examples/DataGridStates.js";
import StatesSource from "./examples/DataGridStates.tsx?raw";
import { DataGridEngine } from "./examples/DataGridEngine.js";
import EngineSource from "./examples/DataGridEngine.tsx?raw";
import { DataGridLoading } from "./examples/DataGridLoading.js";
import LoadingSource from "./examples/DataGridLoading.tsx?raw";
import { DataGridVirtual } from "./examples/DataGridVirtual.js";
import VirtualSource from "./examples/DataGridVirtual.tsx?raw";
import { DataGridRtl } from "./examples/DataGridRtl.js";
import RtlSource from "./examples/DataGridRtl.tsx?raw";
export const dataGridExamples = [
  { id: "sizes", title: "Sizes", description: "Choose sm, md or lg for coordinated row height, type and padding.", Demo: DataGridSizes, source: SizesSource },
  { id: "density", title: "Density", description: "Adjust vertical density independently from text size.", Demo: DataGridDensity, source: DensitySource },
  { id: "variants", title: "Variants", description: "Choose row separators or an outlined boundary.", Demo: DataGridVariants, source: VariantsSource },
  { id: "tones", title: "Selection tones", description: "Use neutral or accent for selection; hover remains distinct.", Demo: DataGridTones, source: TonesSource },
  { id: "responsive", title: "Responsive and overflow", description: "Sparse size, density and variant values inherit at shared breakpoints. Container scrolls wide content.", Demo: DataGridResponsive, source: ResponsiveSource },
  { id: "selection", title: "Controlled selection", description: "Click or press Space to select. Shift extends a mounted-row range; Ctrl/Command+A toggles mounted selectable rows.", Demo: DataGridSelection, source: SelectionSource },
  { id: "sorting", title: "Sorting", description: "Headers request application-owned sorting by pointer or Enter. Keep sortDirection synchronized.", Demo: DataGridSorting, source: SortingSource },
  { id: "editing", title: "Cell controls and editing", description: "Enter or F2 enters a cell. Fields keep their own arrow keys; Escape returns to grid navigation. Save is application-owned.", Demo: DataGridEditing, source: EditingSource },
  { id: "resizing", title: "Column resizing", description: "Drag the separator or enter its header with F2 and use Left/Right. Home/End reach bounds; Escape cancels a drag.", Demo: DataGridResizing, source: ResizingSource },
  { id: "sticky", title: "Sticky header and column", description: "Pin the header and a logical start column within one scroll container.", Demo: DataGridSticky, source: StickySource },
  { id: "states", title: "Disabled and read-only", description: "Read-only preserves cell navigation without changing row selection.", Demo: DataGridStates, source: StatesSource },
  { id: "engine", title: "Filtering and pagination with TanStack", description: "An optional TanStack Table v8 engine owns sorting, filtering and pages. Brick supplies semantics and presentation.", Demo: DataGridEngine, source: EngineSource },
  { id: "loading", title: "Loading, empty and error", description: "Keep data status outside the grid. Use a retry action for recoverable errors.", Demo: DataGridLoading, source: LoadingSource },
  { id: "virtual", title: "Virtualized rows", description: "Optional TanStack Virtual keeps the active row mounted. This composition maps vertical keys to the full 1,000-row dataset.", Demo: DataGridVirtual, source: VirtualSource },
  { id: "rtl", title: "Right-to-left", description: "Direction changes logical navigation and alignment without reversing data indexes.", Demo: DataGridRtl, source: RtlSource },
];
export const dataGridParts: OwnerPart[] = [
{ id: "data-grid-root-props", title: "Root", description: "Native table with composite grid interaction.", rows: [
{ name: "size / density / variant", typeLabel: "ResponsiveValue", defaultLabel: "md / comfortable / line", description: "Shared breakpoints support coordinated presentation." },
{ name: "tone", typeLabel: "'neutral' | 'accent'", defaultLabel: "accent", description: "Selection paint, independent from surface." },
{ name: "rowCount / columnCount", typeLabel: "number", description: "Full logical counts, including headers and offscreen rows." },
{ name: "pageSize", typeLabel: "number", defaultLabel: "10", description: "Mounted enabled rows traversed by PageUp/PageDown." },
{ name: "selectionMode", typeLabel: "'none' | 'single' | 'multiple'", defaultLabel: "none", description: "Row selection policy." },
{ name: "value / defaultValue / onValueChange", typeLabel: "string | string[] | null / callback", description: "Controlled or uncontrolled selected row IDs." },
{ name: "activeCell / defaultActiveCell / onActiveCellChange", typeLabel: "{ rowIndex, columnIndex } | null / callback", description: "One-based logical navigation position." },
{ name: "disabled / readOnly", typeLabel: "boolean", description: "Disable grid operations or preserve navigation without selection mutation." },
{ name: "selectOnRowClick / loop / wrapRows", typeLabel: "boolean", defaultLabel: "false", description: "Pointer selection and keyboard boundary behavior." },
{ name: "minInlineSize / stickyHeader / layout", typeLabel: "string | number / boolean / 'auto' | 'fixed'", description: "Overflow, header pinning and native column sizing." },
{ name: "surface / borderTone / striped / showColumnBorder / radius", typeLabel: "recipe props", description: "Independent shared surface, boundaries and corners." }
]},
{ id: "data-grid-row-props", title: "Row", description: "Stable row identity.", rows: [
{ name: "rowIndex / value", typeLabel: "number / string", description: "One-based logical position and stable selection identity." },
{ name: "selectable / disabled", typeLabel: "boolean", description: "Participation in selection and navigation." }
]},
{ id: "data-grid-cell-props", title: "Cell and RowHeader", description: "RowHeader renders a truthful th with role rowheader.", rows: [
{ name: "columnIndex", typeLabel: "number", description: "One-based logical column." },
{ name: "interactive", typeLabel: "boolean", defaultLabel: "false", description: "Enter/F2 enters child controls; Escape returns. Controls remain application-owned." },
{ name: "sticky / stickyOffset", typeLabel: "'start' | 'end' / string | number", description: "Logical pinning and authored offset." },
{ name: "align / verticalAlign / numeric / disabled", typeLabel: "cell recipes", description: "Logical alignment, number formatting and availability." }
]},
{ id: "data-grid-header-props", title: "ColumnHeader", description: "Cell presentation plus optional actions.", rows: [
{ name: "onAction / sortDirection", typeLabel: "callback / 'none' | 'ascending' | 'descending' | 'other'", description: "Application-owned sorting and truthful metadata." },
{ name: "interactive", typeLabel: "boolean", description: "F2 or Enter focuses a child control authored with tabIndex=-1." }
]},
{ id: "data-grid-resize-props", title: "ColumnResizeHandle", description: "Named separator inside an interactive column header.", rows: [
{ name: "value / defaultValue / onValueChange / onValueCommit", typeLabel: "number / callback", description: "Column width in pixels. Apply the value to Column.htmlWidth." },
{ name: "min / max / step", typeLabel: "number", defaultLabel: "40 / 1200 / 10", description: "Bounds and logical keyboard increment. Shift multiplies step by ten." },
{ name: "dir / disabled / aria-label", typeLabel: "native and behavior props", description: "Direction, availability and required accessible name." }
]},
{ id: "data-grid-structure-props", title: "Structure and artwork", description: "Container, ColumnGroup, Column, Caption, Header, Body, Footer and SortIndicator.", rows: [
{ name: "Column.htmlWidth", typeLabel: "number | percentage", description: "Native width hint; use fixed layout for predictable resizing." },
{ name: "Caption.side", typeLabel: "'top' | 'bottom'", defaultLabel: "bottom", description: "Caption placement." },
{ name: "SortIndicator.children", typeLabel: "ReactNode", description: "Custom decorative artwork is preserved." },
{ name: "native props / ref / render / asChild", typeLabel: "per-part native props", description: "Atom-backed parts preserve composition; Container and SortIndicator are native Brick elements." }
]}
];
export const dataGridSections = ownerSections(dataGridExamples, dataGridParts);
