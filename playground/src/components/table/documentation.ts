import {
  ownerSections,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { TableStructure } from "./examples/TableStructure.js";
import TableStructureSource from "./examples/TableStructure.tsx?raw";
import { TableSizes } from "./examples/TableSizes.js";
import TableSizesSource from "./examples/TableSizes.tsx?raw";
import { TableVariants } from "./examples/TableVariants.js";
import TableVariantsSource from "./examples/TableVariants.tsx?raw";
import { TableStriped } from "./examples/TableStriped.js";
import TableStripedSource from "./examples/TableStriped.tsx?raw";
import { TableCaption } from "./examples/TableCaption.js";
import TableCaptionSource from "./examples/TableCaption.tsx?raw";
import { TableCaptionTop } from "./examples/TableCaptionTop.js";
import TableCaptionTopSource from "./examples/TableCaptionTop.tsx?raw";
import { TableColumnBorder } from "./examples/TableColumnBorder.js";
import TableColumnBorderSource from "./examples/TableColumnBorder.tsx?raw";
import { TableOverflow } from "./examples/TableOverflow.js";
import TableOverflowSource from "./examples/TableOverflow.tsx?raw";
import { TableStickyHeader } from "./examples/TableStickyHeader.js";
import TableStickyHeaderSource from "./examples/TableStickyHeader.tsx?raw";
import { TableStickyColumn } from "./examples/TableStickyColumn.js";
import TableStickyColumnSource from "./examples/TableStickyColumn.tsx?raw";
import { TableSticky } from "./examples/TableSticky.js";
import TableStickySource from "./examples/TableSticky.tsx?raw";
import { TableHover } from "./examples/TableHover.js";
import TableHoverSource from "./examples/TableHover.tsx?raw";
import { TablePagination } from "./examples/TablePagination.js";
import TablePaginationSource from "./examples/TablePagination.tsx?raw";
import { TableSelection } from "./examples/TableSelection.js";
import TableSelectionSource from "./examples/TableSelection.tsx?raw";
import { TableActionBar } from "./examples/TableActionBar.js";
import TableActionBarSource from "./examples/TableActionBar.tsx?raw";
import { TableDensity } from "./examples/TableDensity.js";
import TableDensitySource from "./examples/TableDensity.tsx?raw";
import { TableSurfaces } from "./examples/TableSurfaces.js";
import TableSurfacesSource from "./examples/TableSurfaces.tsx?raw";
import { TableBorderTones } from "./examples/TableBorderTones.js";
import TableBorderTonesSource from "./examples/TableBorderTones.tsx?raw";
import { TableNested } from "./examples/TableNested.js";
import TableNestedSource from "./examples/TableNested.tsx?raw";
import { RecordTransactions } from "./RecordTransactions.js";
import RecordTransactionsSource from "./RecordTransactions.tsx?raw";
import { TableSorting } from "./examples/TableSorting.js";
import SortingSource from "./examples/TableSorting.tsx?raw";
import { TableEngine } from "./examples/TableEngine.js";
import EngineSource from "./examples/TableEngine.tsx?raw";
import { TableResponsive } from "./examples/TableResponsive.js";
import ResponsiveSource from "./examples/TableResponsive.tsx?raw";
export const tableExamples = [
  { id: "sorting", title: "Sorting", description: "A real button requests application-owned sorting; Table keeps native reading semantics.", Demo: TableSorting, source: SortingSource },
  { id: "engine", title: "TanStack Table", description: "An optional TanStack Table v8 engine owns the sorted row model; Brick renders the native table.", Demo: TableEngine, source: EngineSource },
  { id: "responsive", title: "Responsive recipes", description: "Size, density and variant accept sparse shared breakpoint values.", Demo: TableResponsive, source: ResponsiveSource },
  {
    id: "sizes",
    title: "Sizes",
    description: "Change the coordinated table size with size.",
    Demo: TableSizes,
    source: TableSizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description:
      "Use line for row separators or outline for an outer boundary.",
    Demo: TableVariants,
    source: TableVariantsSource,
  },
  {
    id: "striped",
    title: "Striped",
    description: "Add alternating row backgrounds with striped.",
    Demo: TableStriped,
    source: TableStripedSource,
  },
  {
    id: "caption",
    title: "Caption",
    description:
      'Use Table.Caption with side="bottom" for a caption below the table.',
    Demo: TableCaption,
    source: TableCaptionSource,
  },
  {
    id: "caption-top",
    title: "Caption Top",
    description: "Brick places captions at the top by default.",
    Demo: TableCaptionTop,
    source: TableCaptionTopSource,
  },
  {
    id: "column-border",
    title: "Column Border",
    description: "Add logical borders between columns with showColumnBorder.",
    Demo: TableColumnBorder,
    source: TableColumnBorderSource,
  },
  {
    id: "overflow",
    title: "Overflow",
    description:
      "Table.Container keeps a wide table horizontally scrollable without hiding columns.",
    Demo: TableOverflow,
    source: TableOverflowSource,
  },
  {
    id: "sticky-header",
    title: "Sticky Header",
    description: "Keep column headings visible in a bounded scroll container.",
    Demo: TableStickyHeader,
    source: TableStickyHeaderSource,
  },
  {
    id: "sticky-column",
    title: "Sticky Column",
    description:
      "Pin matching header and body cells at the logical start edge.",
    Demo: TableStickyColumn,
    source: TableStickyColumnSource,
  },
  {
    id: "sticky",
    title: "Sticky Header and Column",
    description:
      "Combine both props. Brick owns the intersection layers; no application z-index override is needed.",
    Demo: TableSticky,
    source: TableStickySource,
  },
  {
    id: "hover",
    title: "Highlight on Hover",
    description:
      "interactive adds row hover paint without adding click behavior.",
    Demo: TableHover,
    source: TableHoverSource,
  },
  {
    id: "pagination",
    title: "Pagination",
    description: "Compose Pagination with application-owned page state.",
    Demo: TablePagination,
    source: TablePaginationSource,
  },
  {
    id: "selection",
    title: "Selection",
    description:
      "Compose named checkboxes with useSelection; the table keeps native semantics.",
    Demo: TableSelection,
    source: TableSelectionSource,
  },
  {
    id: "action-bar",
    title: "Selection with Action Bar",
    description:
      "Use ActionBar for actions on the selected products. This demo clears the selection.",
    Demo: TableActionBar,
    source: TableActionBarSource,
  },
  {
    id: "density",
    title: "Density",
    description:
      "Brick controls vertical padding independently from type size.",
    Demo: TableDensity,
    source: TableDensitySource,
  },
  {
    id: "surfaces",
    title: "Surfaces",
    description:
      "Choose transparent or base paint independently from the structural variant.",
    Demo: TableSurfaces,
    source: TableSurfacesSource,
  },
  {
    id: "border-tones",
    title: "Border Tones",
    description:
      "Choose border contrast independently from surface and column separators.",
    Demo: TableBorderTones,
    source: TableBorderTonesSource,
  },
  {
    id: "nested",
    title: "Nested Tables",
    description:
      "A nested table retains its own visual recipe and sticky behavior.",
    Demo: TableNested,
    source: TableNestedSource,
  },
  {
    id: "structure",
    title: "Column Widths, Grouped Rows and Footer",
    description:
      "Use fixed layout and ColumnGroup for authored widths, section rows for grouping, and Footer for totals. Cell alignment stays explicit.",
    Demo: TableStructure,
    source: TableStructureSource,
  },
  {
    id: "record-workflow",
    title: "Record Workflow",
    description:
      "A fuller application composition adds filtering, primary actions, pagination and scoped bulk actions.",
    Demo: RecordTransactions,
    source: RecordTransactionsSource,
  },
];
export const tableParts = [
  {
    id: "table-root-props",
    title: "Root",
    description: "Native table and visual recipes.",
    rows: [
      {
        name: "variant",
        typeLabel: "'line' | 'outline'",
        defaultLabel: "line",
        description: "Structural boundaries.",
      },
      {
        name: "size",
        typeLabel: "'sm' | 'md' | 'lg'",
        defaultLabel: "md",
        description: "Coordinated text and inline inset.",
      },
      {
        name: "density",
        typeLabel: "'compact' | 'comfortable'",
        defaultLabel: "comfortable",
        description: "Block padding.",
      },
      {
        name: "surface",
        typeLabel: "'transparent' | 'base'",
        defaultLabel: "transparent",
        description: "Independent section backgrounds.",
      },
      {
        name: "borderTone",
        typeLabel: "'subtle' | 'default' | 'strong'",
        defaultLabel: "default",
        description: "Border contrast.",
      },
      {
        name: "striped",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Alternate body row paint.",
      },
      {
        name: "interactive",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Hover only, not activation.",
      },
      {
        name: "stickyHeader",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Sticky header in the containing scroll viewport.",
      },
      {
        name: "showColumnBorder",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Logical column separators.",
      },
      {
        name: "layout",
        typeLabel: "'auto' | 'fixed'",
        defaultLabel: "auto",
        description: "Native layout algorithm.",
      },
      {
        name: "minInlineSize",
        typeLabel: "string | number",
        description: "Minimum comparison width; numbers are pixels.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        description: "Shared core or semantic corners.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge onto one table-compatible child.",
      },
    ],
  },
  {
    id: "table-row-props",
    title: "Row",
    description: "Structural tr, not an interactive widget.",
    rows: [
      {
        name: "selected",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Presentation only; a named Checkbox conveys selection.",
      },
      {
        name: "variant",
        typeLabel: "'default' | 'section'",
        defaultLabel: "default",
        description: "Section grouping rhythm.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "One tr-compatible child.",
      },
    ],
  },
  {
    id: "table-head-props",
    title: "Head",
    description: "Native cell; keep correct headers and scope.",
    rows: [
      {
        name: "align",
        typeLabel: "'start' | 'center' | 'end'",
        defaultLabel: "start",
        description: "Logical content alignment; numeric defaults end.",
      },
      {
        name: "verticalAlign",
        typeLabel: "'top' | 'middle' | 'bottom'",
        defaultLabel: "middle",
        description: "Cross-row content alignment.",
      },
      {
        name: "numeric",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Tabular numerals and no wrapping.",
      },
      {
        name: "sticky",
        typeLabel: "'start' | 'end'",
        description: "Pin at a logical edge.",
      },
      {
        name: "stickyOffset",
        typeLabel: "string | number",
        defaultLabel: "0",
        description: "Authored offset for adjacent pinned columns.",
      },
      {
        name: "sortDirection",
        typeLabel: "'ascending' | 'descending' | 'none' | 'other'",
        description: "Sort metadata only; use a Button for sorting.",
      },
      {
        name: "scope",
        typeLabel: "'col' | 'row' | 'colgroup' | 'rowgroup'",
        defaultLabel: "col",
        description: "Header relationships.",
      },
    ],
  },
  {
    id: "table-cell-props",
    title: "Cell",
    description: "Native cell; keep correct headers and scope.",
    rows: [
      {
        name: "align",
        typeLabel: "'start' | 'center' | 'end'",
        defaultLabel: "start",
        description: "Logical content alignment; numeric defaults end.",
      },
      {
        name: "verticalAlign",
        typeLabel: "'top' | 'middle' | 'bottom'",
        defaultLabel: "middle",
        description: "Cross-row content alignment.",
      },
      {
        name: "numeric",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Tabular numerals and no wrapping.",
      },
      {
        name: "sticky",
        typeLabel: "'start' | 'end'",
        description: "Pin at a logical edge.",
      },
      {
        name: "stickyOffset",
        typeLabel: "string | number",
        defaultLabel: "0",
        description: "Authored offset for adjacent pinned columns.",
      },
      {
        name: "colSpan",
        typeLabel: "number",
        description: "Native column span.",
      },
      {
        name: "headers",
        typeLabel: "string",
        description: "Associated header IDs.",
      },
    ],
  },
  {
    id: "table-caption-props",
    title: "Caption",
    description: "Native caption.",
    rows: [
      {
        name: "side",
        typeLabel: "'top' | 'bottom'",
        defaultLabel: "top",
        description: "Caption placement.",
      },
    ],
  },
  {
    id: "table-column-props",
    title: "Column",
    description: "Native col inside ColumnGroup.",
    rows: [
      {
        name: "htmlWidth",
        typeLabel: "number | string",
        description: "Pixel number or percentage sizing hint, not resizing.",
      },
    ],
  },
  {
    id: "table-container-props",
    title: "Container",
    description: "Optional overflow div; root inserts no wrapper.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content matching the part anatomy.",
      },
    ],
  },
  {
    id: "table-columngroup-props",
    title: "ColumnGroup",
    description: "Native structural part; accepts native attributes and refs.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content matching the part anatomy.",
      },
    ],
  },
  {
    id: "table-header-props",
    title: "Header",
    description: "Native structural part; accepts native attributes and refs.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content matching the part anatomy.",
      },
    ],
  },
  {
    id: "table-body-props",
    title: "Body",
    description: "Native structural part; accepts native attributes and refs.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content matching the part anatomy.",
      },
    ],
  },
  {
    id: "table-footer-props",
    title: "Footer",
    description: "Native structural part; accepts native attributes and refs.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content matching the part anatomy.",
      },
    ],
  },
  {
    id: "table-sortindicator-props",
    title: "SortIndicator",
    description: "Decorative sort artwork inside an authored sort Button.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content matching the part anatomy.",
      },
    ],
  },
] satisfies readonly OwnerPart[];
export const tableSections = ownerSections(tableExamples, tableParts);
