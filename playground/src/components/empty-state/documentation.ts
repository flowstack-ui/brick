import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { EmptyStateSizes } from "./examples/EmptyStateSizes.js";
import SizesSource from "./examples/EmptyStateSizes.tsx?raw";
import { EmptyStateActions } from "./examples/EmptyStateActions.js";
import ActionsSource from "./examples/EmptyStateActions.tsx?raw";
import { EmptyStateList } from "./examples/EmptyStateList.js";
import ListSource from "./examples/EmptyStateList.tsx?raw";
import { EmptyStateResponsive } from "./examples/EmptyStateResponsive.js";
import ResponsiveSource from "./examples/EmptyStateResponsive.tsx?raw";
import { EmptyStateIllustration } from "./examples/EmptyStateIllustration.js";
import IllustrationSource from "./examples/EmptyStateIllustration.tsx?raw";
import { EmptyStateComposition } from "./examples/EmptyStateComposition.js";
import CompositionSource from "./examples/EmptyStateComposition.tsx?raw";
export const examples: OwnerExample[] = [
{ id: "sizes", title: "Sizes", description: "Choose a size to coordinate padding, title typography and icon geometry.", Demo: EmptyStateSizes, source: SizesSource },
{ id: "with-action", title: "With action", description: "Compose ButtonGroup for primary and secondary next steps.", Demo: EmptyStateActions, source: ActionsSource },
{ id: "with-list", title: "With list", description: "Offer useful suggestions with a native List.", Demo: EmptyStateList, source: ListSource },
{ id: "responsive", title: "Responsive alignment", description: "Change density and logical alignment without duplicating content.", Demo: EmptyStateResponsive, source: ResponsiveSource },
{ id: "illustration", title: "Custom illustration", description: "Place larger artwork outside the fixed-size indicator slot.", Demo: EmptyStateIllustration, source: IllustrationSource },
{ id: "composition", title: "Composition and heading level", description: "Compose Card for paint and choose a heading level independently from visual size.", Demo: EmptyStateComposition, source: CompositionSource },
];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "The transparent outer div owns density and logical alignment.",
    "rows": [
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<\"sm\" | \"md\" | \"lg\">",
        "defaultLabel": "\"md\"",
        "description": "Coordinates padding, gap, title and indicator size. Sparse objects retain md initially."
      },
      {
        "name": "align",
        "typeLabel": "ResponsiveValue<\"start\" | \"center\">",
        "defaultLabel": "\"center\"",
        "description": "Aligns text and Content children in logical direction."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Merge onto one native host instead of adding a div."
      }
    ]
  },
  {
    "id": "props-content",
    "title": "Content",
    "description": "The column div separates artwork, text group and actions.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Compose onto one element, preserving the content layout."
      }
    ]
  },
  {
    "id": "props-indicator",
    "title": "Indicator",
    "description": "A fixed, square glyph slot. Use Icon size=inherit for authored SVG.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Compose onto one element. Supply accessible meaning only when the artwork is informative."
      }
    ]
  },
  {
    "id": "props-title",
    "title": "Title",
    "description": "A semantic heading styled independently from its level.",
    "rows": [
      {
        "name": "as",
        "typeLabel": "\"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\"",
        "defaultLabel": "\"h3\"",
        "description": "Choose the heading level that fits the document."
      }
    ]
  },
  {
    "id": "props-description",
    "title": "Description",
    "description": "A paragraph using secondary body text.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Compose onto one appropriate text host instead of the paragraph."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
