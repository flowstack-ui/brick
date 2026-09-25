import type { RatingRootProps, RatingRootProviderProps, RatingPropsProviderProps, RatingLabelProps, RatingControlProps, RatingItemProps, RatingItemIndicatorProps, RatingItemsProps, RatingHiddenInputProps, RatingDisplayProps, RatingSummaryProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { RatingSizes } from "./examples/RatingSizes.js";
import SizesSource from "./examples/RatingSizes.tsx?raw";
import { RatingControlled } from "./examples/RatingControlled.js";
import ControlledSource from "./examples/RatingControlled.tsx?raw";
import { RatingControllerExample } from "./examples/RatingController.js";
import ControllerSource from "./examples/RatingController.tsx?raw";
import { RatingPrecision } from "./examples/RatingPrecision.js";
import PrecisionSource from "./examples/RatingPrecision.tsx?raw";
import { RatingHover } from "./examples/RatingHover.js";
import HoverSource from "./examples/RatingHover.tsx?raw";
import { RatingArtwork } from "./examples/RatingArtwork.js";
import ArtworkSource from "./examples/RatingArtwork.tsx?raw";
import { RatingColors } from "./examples/RatingColors.js";
import ColorsSource from "./examples/RatingColors.tsx?raw";
import { RatingStates } from "./examples/RatingStates.js";
import StatesSource from "./examples/RatingStates.tsx?raw";
import { RatingForm } from "./examples/RatingForm.js";
import FormSource from "./examples/RatingForm.tsx?raw";
import { RatingHookForm } from "./examples/RatingHookForm.js";
import HookFormSource from "./examples/RatingHookForm.tsx?raw";
import { RatingAggregates } from "./examples/RatingAggregates.js";
import AggregatesSource from "./examples/RatingAggregates.tsx?raw";
import { RatingComposition } from "./examples/RatingComposition.js";
import CompositionSource from "./examples/RatingComposition.tsx?raw";
import { RatingResponsive } from "./examples/RatingResponsive.js";
import ResponsiveSource from "./examples/RatingResponsive.tsx?raw";
export const examples: OwnerExample[] = [
  { id: "sizes", title: "Sizes", description: "Compare artwork sizes; comfortable targets remain 44px.", Demo: RatingSizes, source: SizesSource },
  { id: "controlled", title: "Controlled", description: "Keep the committed score in application state.", Demo: RatingControlled, source: ControlledSource },
  { id: "controller", title: "Controller", description: "Use the controller when actions outside Rating need access to its state.", Demo: RatingControllerExample, source: ControllerSource },
  { id: "precision", title: "Precision", description: "Use step for half stars or finer fractional scoring.", Demo: RatingPrecision, source: PrecisionSource },
  { id: "hover", title: "Hover", description: "Preview a score without changing the committed value.", Demo: RatingHover, source: HoverSource },
  { id: "artwork", title: "Custom artwork", description: "Replace the star or render state-driven content once.", Demo: RatingArtwork, source: ArtworkSource },
  { id: "colors", title: "Colors", description: "Use semantic paint or local color overrides; check contrast on your surface.", Demo: RatingColors, source: ColorsSource },
  { id: "states", title: "States", description: "Disabled removes editing and tab access; read-only preserves focus.", Demo: RatingStates, source: StatesSource },
  { id: "form", title: "Form", description: "Submit one named score and reset to the initial value.", Demo: RatingForm, source: FormSource },
  { id: "hook-form", title: "React Hook Form", description: "Connect the numeric value and focus ref through React Hook Form.", Demo: RatingHookForm, source: HookFormSource },
  { id: "aggregates", title: "Display and Summary", description: "Use passive Display and Summary for existing review scores.", Demo: RatingAggregates, source: AggregatesSource },
  { id: "composition", title: "Composition", description: "Compose explicit parts and one manual submission input.", Demo: RatingComposition, source: CompositionSource },
  { id: "responsive", title: "Responsive", description: "Adapt artwork, target density and spacing without changing value state.", Demo: RatingResponsive, source: ResponsiveSource },
];
export const parts: OwnerPart[] = [
  { id: "props-root", title: "Root", description: "Single slider; omission of children generates Control and Items.", rows: [
  {
    "name": "size",
    "typeLabel": "ResponsiveValue<\"xs\" | \"sm\" | \"md\" | \"lg\">",
    "defaultLabel": "\"md\"",
    "description": "Artwork size; targets are controlled by density."
  },
  {
    "name": "tone",
    "typeLabel": "\"accent\" | \"neutral\"",
    "defaultLabel": "\"accent\"",
    "description": "Semantic fill color."
  },
  {
    "name": "variant",
    "typeLabel": "ResponsiveValue<\"solid\" | \"outline\">",
    "defaultLabel": "\"solid\"",
    "description": "Artwork paint."
  },
  {
    "name": "density",
    "typeLabel": "ResponsiveValue<\"comfortable\" | \"compact\">",
    "defaultLabel": "\"comfortable\"",
    "description": "44px or at least 24px interactive targets."
  },
  {
    "name": "gap",
    "typeLabel": "ResponsiveValue<SpacingValue>",
    "defaultLabel": "0",
    "description": "Inter-item spacing."
  },
  {
    "name": "fillColor",
    "typeLabel": "CSSProperties['color']",
    "defaultLabel": "—",
    "description": "Local filled artwork color; wins over the corresponding custom property."
  },
  {
    "name": "emptyColor",
    "typeLabel": "CSSProperties['color']",
    "defaultLabel": "—",
    "description": "Local empty artwork color."
  },
  {
    "name": "value",
    "typeLabel": "number",
    "defaultLabel": "min",
    "description": "Controlled or initial committed value."
  },
  {
    "name": "defaultValue",
    "typeLabel": "number",
    "defaultLabel": "min",
    "description": "Controlled or initial committed value."
  },
  {
    "name": "onValueChange",
    "typeLabel": "(value: number) => void",
    "defaultLabel": "—",
    "description": "Committed score changes only."
  },
  {
    "name": "onHoverChange",
    "typeLabel": "(value: number | null) => void",
    "defaultLabel": "—",
    "description": "Independent pointer preview."
  },
  {
    "name": "min",
    "typeLabel": "number",
    "defaultLabel": "0",
    "description": "Numeric scale; step=0.5 permits half ratings."
  },
  {
    "name": "max",
    "typeLabel": "number",
    "defaultLabel": "5",
    "description": "Numeric scale; step=0.5 permits half ratings."
  },
  {
    "name": "step",
    "typeLabel": "number",
    "defaultLabel": "1",
    "description": "Numeric scale; step=0.5 permits half ratings."
  },
  {
    "name": "largeStep",
    "typeLabel": "number",
    "defaultLabel": "half range, capped at 10 steps",
    "description": "PageUp/PageDown increment."
  },
  {
    "name": "allowClear",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Activate the selected score again to clear."
  },
  {
    "name": "disabled",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Inherits Field state; disabled wins and leaves tab order."
  },
  {
    "name": "readOnly",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Inherits Field state; disabled wins and leaves tab order."
  },
  {
    "name": "invalid",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Inherits Field state; disabled wins and leaves tab order."
  },
  {
    "name": "required",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Inherits Field state; disabled wins and leaves tab order."
  },
  {
    "name": "name",
    "typeLabel": "string",
    "defaultLabel": "—",
    "description": "Submission name, external form ID or explicit serialized value."
  },
  {
    "name": "form",
    "typeLabel": "string",
    "defaultLabel": "—",
    "description": "Submission name, external form ID or explicit serialized value."
  },
  {
    "name": "formValue",
    "typeLabel": "string",
    "defaultLabel": "—",
    "description": "Submission name, external form ID or explicit serialized value."
  },
  {
    "name": "inputMode",
    "typeLabel": "\"auto\" | \"manual\"",
    "defaultLabel": "\"auto\"",
    "description": "Manual requires exactly one HiddenInput."
  },
  {
    "name": "getValueLabel",
    "typeLabel": "(value, min, max) => string",
    "defaultLabel": "value out of max",
    "description": "Localized accessible value text."
  },
  {
    "name": "ids",
    "typeLabel": "{ root?, label?, control?, input? }",
    "defaultLabel": "—",
    "description": "Stable part IDs."
  },
  {
    "name": "autoFocus",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Focus once when enabled."
  },
  {
    "name": "asChild",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Compose a single host while preserving behavior."
  },
  {
    "name": "render",
    "typeLabel": "RenderProp",
    "defaultLabel": "—",
    "description": "Compose a single host while preserving behavior."
  },
  {
    "name": "validationBehavior",
    "typeLabel": "\"inline\" | \"native\"",
    "defaultLabel": "Field/Form or native",
    "description": "Required feedback owner."
  },
  {
    "name": "dir",
    "typeLabel": "\"ltr\" | \"rtl\"",
    "defaultLabel": "Direction context",
    "description": "Logical pointer, keyboard and fill direction."
  },
  {
    "name": "children",
    "typeLabel": "ReactNode",
    "defaultLabel": "Control",
    "description": "Explicit children replace the shortcut."
  }
] satisfies readonly DocsPropDefinition<RatingRootProps>[] },
  { id: "props-root-provider", title: "RootProvider", description: "Same DOM and presentation as Root; behavior comes from useRating.", rows: [
  {
    "name": "controller",
    "typeLabel": "RatingController",
    "defaultLabel": "required",
    "description": "Controller returned by useRating; configure behavior options on the hook."
  },
  {
    "name": "size",
    "typeLabel": "ResponsiveValue<\"xs\" | \"sm\" | \"md\" | \"lg\">",
    "defaultLabel": "\"md\"",
    "description": "Artwork size; targets are controlled by density."
  },
  {
    "name": "tone",
    "typeLabel": "\"accent\" | \"neutral\"",
    "defaultLabel": "\"accent\"",
    "description": "Semantic fill color."
  },
  {
    "name": "variant",
    "typeLabel": "ResponsiveValue<\"solid\" | \"outline\">",
    "defaultLabel": "\"solid\"",
    "description": "Artwork paint."
  },
  {
    "name": "density",
    "typeLabel": "ResponsiveValue<\"comfortable\" | \"compact\">",
    "defaultLabel": "\"comfortable\"",
    "description": "44px or at least 24px interactive targets."
  },
  {
    "name": "gap",
    "typeLabel": "ResponsiveValue<SpacingValue>",
    "defaultLabel": "0",
    "description": "Inter-item spacing."
  },
  {
    "name": "fillColor",
    "typeLabel": "CSSProperties['color']",
    "defaultLabel": "—",
    "description": "Local filled artwork color; wins over the corresponding custom property."
  },
  {
    "name": "emptyColor",
    "typeLabel": "CSSProperties['color']",
    "defaultLabel": "—",
    "description": "Local empty artwork color."
  }
] satisfies readonly DocsPropDefinition<RatingRootProviderProps>[] },
  { id: "props-props-provider", title: "PropsProvider", description: "Presentation defaults only; nested explicit props win.", rows: [
  {
    "name": "size",
    "typeLabel": "ResponsiveValue<\"xs\" | \"sm\" | \"md\" | \"lg\">",
    "defaultLabel": "\"md\"",
    "description": "Artwork size; targets are controlled by density."
  },
  {
    "name": "tone",
    "typeLabel": "\"accent\" | \"neutral\"",
    "defaultLabel": "\"accent\"",
    "description": "Semantic fill color."
  },
  {
    "name": "variant",
    "typeLabel": "ResponsiveValue<\"solid\" | \"outline\">",
    "defaultLabel": "\"solid\"",
    "description": "Artwork paint."
  },
  {
    "name": "density",
    "typeLabel": "ResponsiveValue<\"comfortable\" | \"compact\">",
    "defaultLabel": "\"comfortable\"",
    "description": "44px or at least 24px interactive targets."
  },
  {
    "name": "gap",
    "typeLabel": "ResponsiveValue<SpacingValue>",
    "defaultLabel": "0",
    "description": "Inter-item spacing."
  },
  {
    "name": "fillColor",
    "typeLabel": "CSSProperties['color']",
    "defaultLabel": "—",
    "description": "Local filled artwork color; wins over the corresponding custom property."
  },
  {
    "name": "emptyColor",
    "typeLabel": "CSSProperties['color']",
    "defaultLabel": "—",
    "description": "Local empty artwork color."
  }
] satisfies readonly DocsPropDefinition<RatingPropsProviderProps>[] },
  { id: "props-label", title: "Label", description: "Visible text naming and focusing Root.", rows: [
  {
    "name": "id",
    "typeLabel": "string",
    "defaultLabel": "generated",
    "description": "Override the label ID."
  },
  {
    "name": "asChild",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Compose one text host."
  },
  {
    "name": "render",
    "typeLabel": "RenderProp",
    "defaultLabel": "—",
    "description": "Compose one text host."
  }
] satisfies readonly DocsPropDefinition<RatingLabelProps>[] },
  { id: "props-control", title: "Control", description: "Nonfocusable star strip; no children generates Items.", rows: [
  {
    "name": "children",
    "typeLabel": "ReactNode",
    "defaultLabel": "Rating.Items",
    "description": "Explicit children replace generated items."
  },
  {
    "name": "asChild",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Compose one layout host."
  },
  {
    "name": "render",
    "typeLabel": "RenderProp",
    "defaultLabel": "—",
    "description": "Compose one layout host."
  }
] satisfies readonly DocsPropDefinition<RatingControlProps>[] },
  { id: "props-item", title: "Item", description: "Decorative pointer target for one endpoint.", rows: [
  {
    "name": "value",
    "typeLabel": "number",
    "defaultLabel": "required",
    "description": "Upper endpoint represented by the item."
  },
  {
    "name": "contentMode",
    "typeLabel": "\"artwork\" | \"content\"",
    "defaultLabel": "auto-detected",
    "description": "Use content for opaque wrappers or single-rendered emoji."
  },
  {
    "name": "asChild",
    "typeLabel": "boolean",
    "defaultLabel": "false",
    "description": "Preserve one host, refs and handlers."
  },
  {
    "name": "render",
    "typeLabel": "RenderProp",
    "defaultLabel": "—",
    "description": "Preserve one host, refs and handlers."
  }
] satisfies readonly DocsPropDefinition<RatingItemProps>[] },
  { id: "props-item-indicator", title: "ItemIndicator", description: "Decorative empty and filled layers.", rows: [
  {
    "name": "icon",
    "typeLabel": "ReactElement",
    "defaultLabel": "star",
    "description": "Custom decorative artwork. Avoid IDs in repeated icons."
  }
] satisfies readonly DocsPropDefinition<RatingItemIndicatorProps>[] },
  { id: "props-items", title: "Items", description: "Generate integer endpoint Items from the controller range.", rows: [
  {
    "name": "icon",
    "typeLabel": "ReactElement",
    "defaultLabel": "star",
    "description": "Shared decorative artwork; custom endpoints use explicit Items."
  }
] satisfies readonly DocsPropDefinition<RatingItemsProps>[] },
  { id: "props-hidden-input", title: "HiddenInput", description: "Manual named submission input; the unnamed validation proxy remains Root-owned.", rows: [
  {
    "name": "id",
    "typeLabel": "string",
    "defaultLabel": "ids.input",
    "description": "Native input ID; name/value/form come from Root."
  }
] satisfies readonly DocsPropDefinition<RatingHiddenInputProps>[] },
  { id: "props-display", title: "Display", description: "Passive repeated-star aggregate, not a form control.", rows: [
  {
    "name": "label",
    "typeLabel": "string",
    "defaultLabel": "required",
    "description": "Localized score and maximum."
  },
  {
    "name": "value",
    "typeLabel": "number",
    "defaultLabel": "required",
    "description": "Aggregate score and integer artwork count."
  },
  {
    "name": "max",
    "typeLabel": "number",
    "defaultLabel": "5",
    "description": "Aggregate score and integer artwork count."
  },
  {
    "name": "size",
    "typeLabel": "ResponsiveValue<\"xs\" | \"sm\" | \"md\" | \"lg\">",
    "defaultLabel": "\"md\"",
    "description": "Artwork size; targets are controlled by density."
  },
  {
    "name": "tone",
    "typeLabel": "\"accent\" | \"neutral\"",
    "defaultLabel": "\"accent\"",
    "description": "Semantic fill color."
  },
  {
    "name": "variant",
    "typeLabel": "ResponsiveValue<\"solid\" | \"outline\">",
    "defaultLabel": "\"solid\"",
    "description": "Artwork paint."
  },
  {
    "name": "gap",
    "typeLabel": "ResponsiveValue<SpacingValue>",
    "defaultLabel": "0",
    "description": "Inter-item spacing."
  },
  {
    "name": "fillColor",
    "typeLabel": "CSSProperties['color']",
    "defaultLabel": "—",
    "description": "Local filled artwork color; wins over the corresponding custom property."
  },
  {
    "name": "emptyColor",
    "typeLabel": "CSSProperties['color']",
    "defaultLabel": "—",
    "description": "Local empty artwork color."
  },
  {
    "name": "icon",
    "typeLabel": "ReactElement",
    "defaultLabel": "star",
    "description": "Custom artwork."
  }
] satisfies readonly DocsPropDefinition<RatingDisplayProps>[] },
  { id: "props-summary", title: "Summary", description: "Passive single-star numeric aggregate.", rows: [
  {
    "name": "label",
    "typeLabel": "string",
    "defaultLabel": "required",
    "description": "Localized score and maximum."
  },
  {
    "name": "value",
    "typeLabel": "number",
    "defaultLabel": "required",
    "description": "Aggregate score bounds."
  },
  {
    "name": "max",
    "typeLabel": "number",
    "defaultLabel": "5",
    "description": "Aggregate score bounds."
  },
  {
    "name": "valueText",
    "typeLabel": "ReactNode",
    "defaultLabel": "normalized value",
    "description": "Localized visible score."
  },
  {
    "name": "size",
    "typeLabel": "ResponsiveValue<\"xs\" | \"sm\" | \"md\" | \"lg\">",
    "defaultLabel": "\"md\"",
    "description": "Artwork size; targets are controlled by density."
  },
  {
    "name": "tone",
    "typeLabel": "\"accent\" | \"neutral\"",
    "defaultLabel": "\"accent\"",
    "description": "Semantic fill color."
  },
  {
    "name": "gap",
    "typeLabel": "ResponsiveValue<SpacingValue>",
    "defaultLabel": "0",
    "description": "Inter-item spacing."
  },
  {
    "name": "fillColor",
    "typeLabel": "CSSProperties['color']",
    "defaultLabel": "—",
    "description": "Local filled artwork color; wins over the corresponding custom property."
  },
  {
    "name": "icon",
    "typeLabel": "ReactElement",
    "defaultLabel": "star",
    "description": "Custom artwork."
  }
] satisfies readonly DocsPropDefinition<RatingSummaryProps>[] }
];
export const sections = ownerSections(examples, parts);
