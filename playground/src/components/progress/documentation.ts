import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { ProgressSizes } from "./examples/ProgressSizes.js";
import SizesSource from "./examples/ProgressSizes.tsx?raw";
import { ProgressVariants } from "./examples/ProgressVariants.js";
import VariantsSource from "./examples/ProgressVariants.tsx?raw";
import { ProgressColors } from "./examples/ProgressColors.js";
import ColorsSource from "./examples/ProgressColors.tsx?raw";
import { ProgressInline } from "./examples/ProgressInline.js";
import InlineSource from "./examples/ProgressInline.tsx?raw";
import { ProgressInfoTip } from "./examples/ProgressInfoTip.js";
import InfoTipSource from "./examples/ProgressInfoTip.tsx?raw";
import { ProgressIndeterminate } from "./examples/ProgressIndeterminate.js";
import IndeterminateSource from "./examples/ProgressIndeterminate.tsx?raw";
import { ProgressStripes } from "./examples/ProgressStripes.js";
import StripesSource from "./examples/ProgressStripes.tsx?raw";
import { ProgressAnimated } from "./examples/ProgressAnimated.js";
import AnimatedSource from "./examples/ProgressAnimated.tsx?raw";
import { ProgressBuffer } from "./examples/ProgressBuffer.js";
import BufferSource from "./examples/ProgressBuffer.tsx?raw";
import { ProgressVertical } from "./examples/ProgressVertical.js";
import VerticalSource from "./examples/ProgressVertical.tsx?raw";
import { ProgressRange } from "./examples/ProgressRange.js";
import RangeSource from "./examples/ProgressRange.tsx?raw";
import { ProgressController } from "./examples/ProgressController.js";
import ControllerSource from "./examples/ProgressController.tsx?raw";
import { ProgressResponsive } from "./examples/ProgressResponsive.js";
import ResponsiveSource from "./examples/ProgressResponsive.tsx?raw";
import { ProgressComposition } from "./examples/ProgressComposition.js";
import CompositionSource from "./examples/ProgressComposition.tsx?raw";
export const examples: OwnerExample[] = [
{ id: "sizes", title: "Sizes", description: "Size changes track thickness without changing the task value.", Demo: ProgressSizes, source: SizesSource },
{ id: "variants", title: "Variants", description: "Choose a neutral recessed track or a softly tinted track.", Demo: ProgressVariants, source: VariantsSource },
{ id: "colors", title: "Colors", description: "Semantic tones communicate task status alongside a visible label.", Demo: ProgressColors, source: ColorsSource },
{ id: "inline", title: "Inline label", description: "Keep the task, track and value in one row.", Demo: ProgressInline, source: InlineSource },
{ id: "info-tip", title: "Info tip", description: "Keep the interactive help outside the semantic progressbar.", Demo: ProgressInfoTip, source: InfoTipSource },
{ id: "indeterminate", title: "Indeterminate", description: "Use null when the amount of completed work is unknown.", Demo: ProgressIndeterminate, source: IndeterminateSource },
{ id: "stripes", title: "Stripes", description: "Add a stationary striped treatment.", Demo: ProgressStripes, source: StripesSource },
{ id: "animated", title: "Animated stripes", description: "Move the stripes while retaining a measurable value.", Demo: ProgressAnimated, source: AnimatedSource },
{ id: "buffer", title: "Buffer", description: "Show how much has been prepared ahead of the completed work.", Demo: ProgressBuffer, source: BufferSource },
{ id: "vertical", title: "Vertical", description: "Fill upward from the bottom of the track.", Demo: ProgressVertical, source: VerticalSource },
{ id: "range", title: "Custom range and value", description: "Format raw task units explicitly instead of a percentage.", Demo: ProgressRange, source: RangeSource },
{ id: "controller", title: "Controller", description: "Drive progress from application state through the shared controller.", Demo: ProgressController, source: ControllerSource },
{ id: "responsive", title: "Responsive", description: "Use sparse breakpoint recipes; unassigned widths retain the preceding value.", Demo: ProgressResponsive, source: ResponsiveSource },
{ id: "composition", title: "Composition", description: "Project static parts onto compatible elements without adding wrappers.", Demo: ProgressComposition, source: CompositionSource },
];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "The single semantic progressbar and its visual recipes.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "number | null",
        "defaultLabel": "undefined",
        "description": "Controlled current value; omitted without defaultValue is indeterminate."
      },
      {
        "name": "defaultValue",
        "typeLabel": "number | null",
        "defaultLabel": "null",
        "description": "Initial uncontrolled task value."
      },
      {
        "name": "onValueChange",
        "typeLabel": "(details: ProgressState) => void",
        "defaultLabel": "—",
        "description": "Requested changes from the controller."
      },
      {
        "name": "min",
        "typeLabel": "number",
        "defaultLabel": "0",
        "description": "Minimum task value."
      },
      {
        "name": "max",
        "typeLabel": "number",
        "defaultLabel": "100",
        "description": "Maximum task value."
      },
      {
        "name": "size",
        "typeLabel": "ResponsiveValue<\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\">",
        "defaultLabel": "\"md\"",
        "description": "Track thickness."
      },
      {
        "name": "variant",
        "typeLabel": "ResponsiveValue<\"outline\" | \"subtle\">",
        "defaultLabel": "\"outline\"",
        "description": "Neutral recessed or tinted track."
      },
      {
        "name": "tone",
        "typeLabel": "\"neutral\" | \"accent\" | \"info\" | \"success\" | \"warning\" | \"danger\"",
        "defaultLabel": "\"accent\"",
        "description": "Semantic task paint."
      },
      {
        "name": "layout",
        "typeLabel": "\"stacked\" | \"inline\"",
        "defaultLabel": "\"stacked\"",
        "description": "Label, track and value arrangement."
      },
      {
        "name": "orientation",
        "typeLabel": "\"horizontal\" | \"vertical\"",
        "defaultLabel": "\"horizontal\"",
        "description": "Fill axis; horizontal follows text direction."
      },
      {
        "name": "striped",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Stationary stripes."
      },
      {
        "name": "animated",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Animate stripes; implies striped."
      },
      {
        "name": "bufferValue",
        "typeLabel": "number | null",
        "defaultLabel": "—",
        "description": "Secondary prepared value, independent of accessible completion."
      },
      {
        "name": "radius",
        "typeLabel": "Radius",
        "defaultLabel": "—",
        "description": "Shared radius token."
      },
      {
        "name": "shape",
        "typeLabel": "\"square\" | \"rounded\" | \"pill\"",
        "defaultLabel": "\"rounded\"",
        "description": "Legacy geometry alternative; mutually exclusive with radius."
      },
      {
        "name": "valueFormat",
        "typeLabel": "\"percent\" | \"value\"",
        "defaultLabel": "\"percent\"",
        "description": "Format normalized percentage or raw task value."
      },
      {
        "name": "locale",
        "typeLabel": "Intl.LocalesArgument",
        "defaultLabel": "Inherited",
        "description": "LocaleProvider or explicit locale."
      },
      {
        "name": "formatOptions",
        "typeLabel": "Intl.NumberFormatOptions",
        "defaultLabel": "—",
        "description": "Options for visible value formatting."
      },
      {
        "name": "ids",
        "typeLabel": "ProgressIds",
        "defaultLabel": "Generated",
        "description": "Override root/label IDs."
      },
      {
        "name": "getValueLabel",
        "typeLabel": "(value, min, max) => string",
        "defaultLabel": "—",
        "description": "Domain-specific accessible value text."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Use one compatible host."
      },
      {
        "name": "render",
        "typeLabel": "RenderProp",
        "defaultLabel": "—",
        "description": "Atom host rendering."
      }
    ]
  },
  {
    "id": "props-provider",
    "title": "RootProvider",
    "description": "Same visual and native props as Root, with externally managed state instead of value/range/defaultValue.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "ProgressController",
        "defaultLabel": "Required",
        "description": "Controller returned by useProgress."
      }
    ]
  },
  {
    "id": "props-context",
    "title": "Context",
    "description": "Render state without adding a DOM element.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "(context: ProgressContextValue) => ReactNode",
        "defaultLabel": "Required",
        "description": "Read normalized progress and its optional setter."
      }
    ]
  },
  {
    "id": "props-label",
    "title": "Label",
    "description": "Visible text wired to Root's generated or explicit label ID.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Project onto one compatible host."
      }
    ]
  },
  {
    "id": "props-value",
    "title": "Value",
    "description": "Decorative formatted value; no additional live region.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Project onto one compatible host."
      },
      {
        "name": "children",
        "typeLabel": "ReactNode | (details: ProgressValueDetails) => ReactNode",
        "defaultLabel": "Formatted value",
        "description": "Override visible value content."
      }
    ]
  },
  {
    "id": "props-track",
    "title": "Track",
    "description": "Clipped decorative track, hidden from assistive technology.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Project onto one compatible host."
      }
    ]
  },
  {
    "id": "props-buffer",
    "title": "Buffer",
    "description": "Secondary decorative fill; never changes aria-valuenow.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Project onto one compatible host."
      }
    ]
  },
  {
    "id": "props-indicator",
    "title": "Indicator",
    "description": "Completion fill consuming Atom's normalized state.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Project onto one compatible host."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
