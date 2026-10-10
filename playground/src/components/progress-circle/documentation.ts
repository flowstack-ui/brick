import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { ProgressCircleRounded } from "./examples/ProgressCircleRounded.js";
import RoundedSource from "./examples/ProgressCircleRounded.tsx?raw";
import { ProgressCircleSizes } from "./examples/ProgressCircleSizes.js";
import SizesSource from "./examples/ProgressCircleSizes.tsx?raw";
import { ProgressCircleColors } from "./examples/ProgressCircleColors.js";
import ColorsSource from "./examples/ProgressCircleColors.tsx?raw";
import { ProgressCircleValue } from "./examples/ProgressCircleValue.js";
import ValueSource from "./examples/ProgressCircleValue.tsx?raw";
import { ProgressCircleThickness } from "./examples/ProgressCircleThickness.js";
import ThicknessSource from "./examples/ProgressCircleThickness.tsx?raw";
import { ProgressCircleIndeterminate } from "./examples/ProgressCircleIndeterminate.js";
import IndeterminateSource from "./examples/ProgressCircleIndeterminate.tsx?raw";
import { ProgressCircleCustomStroke } from "./examples/ProgressCircleCustomStroke.js";
import CustomStrokeSource from "./examples/ProgressCircleCustomStroke.tsx?raw";
import { ProgressCircleRange } from "./examples/ProgressCircleRange.js";
import RangeSource from "./examples/ProgressCircleRange.tsx?raw";
import { ProgressCircleResponsive } from "./examples/ProgressCircleResponsive.js";
import ResponsiveSource from "./examples/ProgressCircleResponsive.tsx?raw";
import { ProgressCircleController } from "./examples/ProgressCircleController.js";
import ControllerSource from "./examples/ProgressCircleController.tsx?raw";
import { ProgressCircleComposition } from "./examples/ProgressCircleComposition.js";
import CompositionSource from "./examples/ProgressCircleComposition.tsx?raw";
export const examples: OwnerExample[] = [
{ id: "rounded", title: "Rounded caps", description: "Choose flat or rounded ends for the active range.", Demo: ProgressCircleRounded, source: RoundedSource },
{ id: "sizes", title: "Sizes", description: "Diameter and regular stroke are paired; keep text outside small rings.", Demo: ProgressCircleSizes, source: SizesSource },
{ id: "colors", title: "Colors", description: "Use semantic task tones with a visible name.", Demo: ProgressCircleColors, source: ColorsSource },
{ id: "value", title: "Value", description: "Center a readable value inside a larger ring.", Demo: ProgressCircleValue, source: ValueSource },
{ id: "thickness", title: "Thickness", description: "Change stroke weight without changing the allocated square.", Demo: ProgressCircleThickness, source: ThicknessSource },
{ id: "indeterminate", title: "Indeterminate", description: "Use an animated arc while completion is unknown.", Demo: ProgressCircleIndeterminate, source: IndeterminateSource },
{ id: "custom-stroke", title: "Custom stroke", description: "Customize the unitless 100-unit stroke and semantic ring colors.", Demo: ProgressCircleCustomStroke, source: CustomStrokeSource },
{ id: "range", title: "Custom range and formatting", description: "Show raw task units, with domain-specific accessible text.", Demo: ProgressCircleRange, source: RangeSource },
{ id: "responsive", title: "Responsive", description: "Change ring geometry together across breakpoints.", Demo: ProgressCircleResponsive, source: ResponsiveSource },
{ id: "controller", title: "Controller", description: "Drive the same headless model through a circular presentation.", Demo: ProgressCircleController, source: ControllerSource },
{ id: "composition", title: "Composition", description: "Project parts onto matching SVG hosts while preserving geometry and refs.", Demo: ProgressCircleComposition, source: CompositionSource },
];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "Single semantic progressbar and circular visual recipes.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "number | null",
        "defaultLabel": "undefined",
        "description": "Measured task value; null is indeterminate."
      },
      {
        "name": "defaultValue",
        "typeLabel": "number | null",
        "defaultLabel": "null",
        "description": "Initial uncontrolled value."
      },
      {
        "name": "min / max",
        "typeLabel": "number",
        "defaultLabel": "0 / 100",
        "description": "Task range."
      },
      {
        "name": "onValueChange",
        "typeLabel": "(details: ProgressState) => void",
        "defaultLabel": "—",
        "description": "Changed controller requests."
      },
      {
        "name": "ids",
        "typeLabel": "ProgressIds",
        "defaultLabel": "Generated",
        "description": "Explicit root and label IDs."
      },
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\">",
        "defaultLabel": "\"md\"",
        "description": "Paired ring diameter and regular stroke."
      },
      {
        "name": "thickness",
        "typeLabel": "\"thin\" | \"regular\" | \"thick\"",
        "defaultLabel": "\"regular\"",
        "description": "Relative stroke weight."
      },
      {
        "name": "cap",
        "typeLabel": "\"round\" | \"butt\"",
        "defaultLabel": "\"round\"",
        "description": "Active range ends."
      },
      {
        "name": "tone",
        "typeLabel": "\"neutral\" | \"accent\" | \"info\" | \"success\" | \"warning\" | \"danger\"",
        "defaultLabel": "\"accent\"",
        "description": "Semantic task paint."
      },
      {
        "name": "valueFormat",
        "typeLabel": "\"percent\" | \"value\"",
        "defaultLabel": "\"percent\"",
        "description": "Normalized percentage or raw task units."
      },
      {
        "name": "locale",
        "typeLabel": "Intl.LocalesArgument",
        "defaultLabel": "Inherited",
        "description": "LocaleProvider or explicit override."
      },
      {
        "name": "formatOptions",
        "typeLabel": "Intl.NumberFormatOptions",
        "defaultLabel": "—",
        "description": "Visible value formatting options."
      },
      {
        "name": "getValueLabel",
        "typeLabel": "(value, min, max) => string",
        "defaultLabel": "—",
        "description": "Accessible domain text; explicit aria-valuetext wins."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "One compatible root host."
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "defaultLabel": "—",
        "description": "Atom host composition."
      }
    ]
  },
  {
    "id": "props-provider",
    "title": "RootProvider",
    "description": "Same visual/native props as Root; controller replaces local value/range/defaultValue/ids.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "ProgressController",
        "defaultLabel": "Required",
        "description": "Controller from useProgress."
      }
    ]
  },
  {
    "id": "props-context",
    "title": "Context",
    "description": "Read progress without a DOM wrapper.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "(context: ProgressContextValue) => ReactNode",
        "defaultLabel": "Required",
        "description": "Read normalized state and optional setter."
      }
    ]
  },
  {
    "id": "props-circle",
    "title": "Circle",
    "description": "Decorative svg; owns its 100-unit viewBox.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Project only onto the matching SVG element."
      }
    ]
  },
  {
    "id": "props-track",
    "title": "Track",
    "description": "Decorative circle; recipe owns center, radius and stroke.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Project only onto the matching SVG element."
      }
    ]
  },
  {
    "id": "props-indicator",
    "title": "Indicator",
    "description": "Decorative circle; normalized state owns the painted range.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Project only onto the matching SVG element."
      }
    ]
  },
  {
    "id": "props-label",
    "title": "Label",
    "description": "Task name wired to the root's label ID.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Project onto one compatible element."
      }
    ]
  },
  {
    "id": "props-value",
    "title": "Value",
    "description": "Decorative formatted value; use larger rings for text.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Project onto one compatible element."
      },
      {
        "name": "children",
        "typeLabel": "ReactNode | (details: ProgressCircleValueDetails) => ReactNode",
        "defaultLabel": "Formatted value",
        "description": "Override visible content."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
