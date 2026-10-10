import {
  ownerSections,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { ListSingleSelection } from "./examples/ListSingleSelection.js";
import single from "./examples/ListSingleSelection.tsx?raw";
import { ListSpacing } from "./examples/ListSpacing.js";
import spacing from "./examples/ListSpacing.tsx?raw";
import { ListOrdered } from "./examples/ListOrdered.js";
import ordered from "./examples/ListOrdered.tsx?raw";
import { ListIcons } from "./examples/ListIcons.js";
import icons from "./examples/ListIcons.tsx?raw";
import { ListNested } from "./examples/ListNested.js";
import nested from "./examples/ListNested.tsx?raw";
import { ListMarkers } from "./examples/ListMarkers.js";
import markers from "./examples/ListMarkers.tsx?raw";
import { ListTypography } from "./examples/ListTypography.js";
import typography from "./examples/ListTypography.tsx?raw";
import { SelectableUsers } from "./SelectableUsers.js";
import selection from "./SelectableUsers.tsx?raw";
import { ListRecipes } from "./examples/ListRecipes.js";
import recipes from "./examples/ListRecipes.tsx?raw";
export const listExamples = [
  {
    id: "ordered",
    title: "Ordered",
    description:
      "Use ordered when sequence matters. Native start, reversed and item value are supported.",
    Demo: ListOrdered,
    source: ordered,
  },
  {
    id: "icons",
    title: "With icon",
    description:
      "Leading centers a decorative Icon against the first line. Content wraps independently.",
    Demo: ListIcons,
    source: icons,
  },
  {
    id: "nested",
    title: "Nested",
    description:
      "Nest a Root inside its parent Item. nestedInset controls the nested list's logical indentation.",
    Demo: ListNested,
    source: nested,
  },
  {
    id: "markers",
    title: "Marker style",
    description:
      "Choose a marker and semantic marker tone. An Item can override the list's marker tone without changing its text.",
    Demo: ListMarkers,
    source: markers,
  },
  {
    id: "typography",
    title: "Typography inheritance",
    description:
      'Use size="inherit" with a surrounding typography recipe; title and description retain their color roles.',
    Demo: ListTypography,
    source: typography,
  },
  {
    id: "spacing",
    title: "Spacing and composition",
    description:
      "Gap separates peers; density and inset control each item's padding.",
    Demo: ListSpacing,
    source: spacing,
  },
  {
    id: "recipes",
    title: "Variants and sizes",
    description: "Border treatment does not change native list behavior.",
    Demo: ListRecipes,
    source: recipes,
  },
  {
    id: "selection",
    title: "Record selection and actions",
    description:
      "Compose real checkboxes and links with selection utilities. List itself keeps native list semantics.",
    Demo: SelectableUsers,
    source: selection,
  },
  {
    id: "single",
    title: "Single selection and filtering",
    description:
      "Selecting another member replaces the prior ID; filtering does not discard it.",
    Demo: ListSingleSelection,
    source: single,
  },
];
export const listParts = [
  {
    id: "list-root-props",
    title: "Root",
    description: "Native ul or ol. Visual list, not a Listbox.",
    rows: [
      {
        name: "variant",
        typeLabel: "'plain' | 'divided' | 'bordered'",
        defaultLabel: "plain",
        description: "Border treatment, independent of markers.",
      },
      {
        name: "size",
        typeLabel: "'inherit' | 'sm' | 'md' | 'lg'",
        defaultLabel: "md",
        description:
          "Typography and inline inset; inherit preserves surrounding font metrics.",
      },
      {
        name: "density",
        typeLabel: "'none' | 'compact' | 'comfortable'",
        defaultLabel: "comfortable",
        description: "Block padding; none is flush.",
      },
      {
        name: "gap",
        typeLabel: "ResponsiveValue<SpacingValue>",
        description: "Sibling spacing without outer gap.",
      },
      {
        name: "nestedInset",
        typeLabel: "ResponsiveValue<SpacingValue>",
        defaultLabel: "6",
        description: "Logical indentation of this Root when nested in an Item.",
      },
      {
        name: "markerTone",
        typeLabel:
          "'inherit' | 'primary' | 'secondary' | 'muted' | 'accent' | 'info' | 'success' | 'warning' | 'danger'",
        defaultLabel: "secondary",
        description:
          "Native marker color. inherit follows the item text; omitted preserves the marker CSS variable.",
      },
      {
        name: "inset",
        typeLabel: "'default' | 'none'",
        defaultLabel: "default",
        description: "Inline item padding.",
      },
      {
        name: "align",
        typeLabel: "'start' | 'center' | 'end'",
        defaultLabel: "start",
        description: "Leading and trailing alignment.",
      },
      {
        name: "marker",
        typeLabel:
          "'auto' | 'disc' | 'circle' | 'square' | 'decimal' | 'lower-alpha' | 'upper-alpha' | 'lower-roman' | 'upper-roman' | 'none'",
        defaultLabel: "auto",
        description:
          "Native disc, circle, square, decimal, alphabetic, Roman or none.",
      },
      {
        name: "ordered",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Render ol.",
      },
      {
        name: "start",
        typeLabel: "number",
        description: "Native ordered starting value.",
      },
      {
        name: "reversed",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Reverse numbering, not DOM reading order.",
      },
      {
        name: "radius",
        typeLabel:
          "'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'subtle' | 'control' | 'surface' | 'overlay' | 'full'",
        defaultLabel: "surface",
        description: "Shared Radius tokens for bordered-list corners.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "One native list-compatible child.",
      },
    ],
  },
  {
    id: "list-item-props",
    title: "Item",
    description:
      "Native li. Compose a li host with asChild; retain a row wrapper for structured parts.",
    rows: [
      {
        name: "markerTone",
        typeLabel:
          "'inherit' | 'primary' | 'secondary' | 'muted' | 'accent' | 'info' | 'success' | 'warning' | 'danger'",
        description: "Overrides the parent marker tone for this item only.",
      },
      {
        name: "selected",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Presentation only; use a Checkbox to convey selection.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Metadata only; disable actual controls separately.",
      },
      {
        name: "value",
        typeLabel: "number",
        description: "Override ordered number.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge onto one li-compatible child.",
      },
    ],
  },
  {
    id: "list-leading-props",
    title: "Leading",
    description: "Styled content region; accepts native attributes and refs.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Project this part onto one compatible element; classes, styles and refs are merged.",
      },
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content.",
      },
    ],
  },
  {
    id: "list-content-props",
    title: "Content",
    description: "Styled content region; accepts native attributes and refs.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Project this part onto one compatible element; classes, styles and refs are merged.",
      },
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content.",
      },
    ],
  },
  {
    id: "list-title-props",
    title: "Title",
    description: "Styled content region; accepts native attributes and refs.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Project this part onto one compatible element; classes, styles and refs are merged.",
      },
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content.",
      },
    ],
  },
  {
    id: "list-description-props",
    title: "Description",
    description: "Styled content region; accepts native attributes and refs.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Project this part onto one compatible element; classes, styles and refs are merged.",
      },
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content.",
      },
    ],
  },
  {
    id: "list-trailing-props",
    title: "Trailing",
    description: "Styled content region; accepts native attributes and refs.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Project this part onto one compatible element; classes, styles and refs are merged.",
      },
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Authored content.",
      },
    ],
  },
] satisfies readonly OwnerPart[];
export const listSections = ownerSections(listExamples, listParts);
