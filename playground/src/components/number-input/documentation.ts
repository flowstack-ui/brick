import type { NumberInputRootProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { NumberInputBasic } from "./examples/NumberInputBasic.js";
import basicSource from "./examples/NumberInputBasic.tsx?raw";
import { NumberInputSizes } from "./examples/NumberInputSizes.js";
import sizesSource from "./examples/NumberInputSizes.tsx?raw";
import { NumberInputVariants } from "./examples/NumberInputVariants.js";
import variantsSource from "./examples/NumberInputVariants.tsx?raw";
import { NumberInputFormatting } from "./examples/NumberInputFormatting.js";
import formattingSource from "./examples/NumberInputFormatting.tsx?raw";
import { NumberInputLocale } from "./examples/NumberInputLocale.js";
import localeSource from "./examples/NumberInputLocale.tsx?raw";
import { NumberInputBounds } from "./examples/NumberInputBounds.js";
import boundsSource from "./examples/NumberInputBounds.tsx?raw";
import { NumberInputSteps } from "./examples/NumberInputSteps.js";
import stepsSource from "./examples/NumberInputSteps.tsx?raw";
import { NumberInputControlled } from "./examples/NumberInputControlled.js";
import controlledSource from "./examples/NumberInputControlled.tsx?raw";
import { NumberInputStepper } from "./examples/NumberInputStepper.js";
import stepperSource from "./examples/NumberInputStepper.tsx?raw";
import { NumberInputWheel } from "./examples/NumberInputWheel.js";
import wheelSource from "./examples/NumberInputWheel.tsx?raw";
import { NumberInputStates } from "./examples/NumberInputStates.js";
import statesSource from "./examples/NumberInputStates.tsx?raw";
import { NumberInputHelper } from "./examples/NumberInputHelper.js";
import helperSource from "./examples/NumberInputHelper.tsx?raw";
import { NumberInputScrubber } from "./examples/NumberInputScrubber.js";
import scrubberSource from "./examples/NumberInputScrubber.tsx?raw";
import { NumberInputController } from "./examples/NumberInputController.js";
import controllerSource from "./examples/NumberInputController.tsx?raw";
import { NumberInputForm } from "./examples/NumberInputForm.js";
import formSource from "./examples/NumberInputForm.tsx?raw";
import { NumberInputResponsive } from "./examples/NumberInputResponsive.js";
import responsiveSource from "./examples/NumberInputResponsive.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "basic",
    title: "Basic",
    description: "Compose one input and the built-in step controls.",
    Demo: NumberInputBasic,
    source: basicSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Seven sizes use the shared control scale and touch-target policy.",
    Demo: NumberInputSizes,
    source: sizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description:
      "Compare all seven shared field recipes without changing numeric behavior.",
    Demo: NumberInputVariants,
    source: variantsSource,
  },
  {
    id: "formatting",
    title: "Formatting",
    description: "Use native Intl options for currency, percent and units.",
    Demo: NumberInputFormatting,
    source: formattingSource,
  },
  {
    id: "locale",
    title: "Locale",
    description: "Parsing and formatting inherit the provider locale.",
    Demo: NumberInputLocale,
    source: localeSource,
  },
  {
    id: "bounds",
    title: "Min and max",
    description:
      "Enter and blur commit values. Step controls reflect boundaries.",
    Demo: NumberInputBounds,
    source: boundsSource,
  },
  {
    id: "steps",
    title: "Steps",
    description:
      "Try Arrow, Shift+Arrow, Alt+Arrow and Page keys, or hold a step button.",
    Demo: NumberInputSteps,
    source: stepsSource,
  },
  {
    id: "controlled",
    title: "Controlled values",
    description:
      "Numeric callbacks receive number/null; string-mode callbacks provide text and parsed details.",
    Demo: NumberInputControlled,
    source: controlledSource,
  },
  {
    id: "stepper",
    title: "Mobile stepper",
    description:
      "A read-only display can sit between independently named actions.",
    Demo: NumberInputStepper,
    source: stepperSource,
  },
  {
    id: "wheel",
    title: "Mouse wheel",
    description:
      "Wheel stepping is opt-in and only active while the input is focused.",
    Demo: NumberInputWheel,
    source: wheelSource,
  },
  {
    id: "states",
    title: "States",
    description: "Unavailable actions do not show enabled hover feedback.",
    Demo: NumberInputStates,
    source: statesSource,
  },
  {
    id: "helper",
    title: "Helper text and unit",
    description: "Field owns labels and descriptions; Unit is a visual suffix.",
    Demo: NumberInputHelper,
    source: helperSource,
  },
  {
    id: "scrubber",
    title: "Scrubber",
    description: "Drag horizontally as a supplement to keyboard input.",
    Demo: NumberInputScrubber,
    source: scrubberSource,
  },
  {
    id: "controller",
    title: "Controller and label",
    description: "Use RootProvider with the same Atom-owned controller.",
    Demo: NumberInputController,
    source: controllerSource,
  },
  {
    id: "form",
    title: "Native form",
    description:
      "Submit parsed numeric values and restore defaults with reset.",
    Demo: NumberInputForm,
    source: formSource,
  },
  {
    id: "responsive",
    title: "Responsive and hover controls",
    description:
      "Sparse responsive sizes inherit the default; hover controls remain available on touch.",
    Demo: NumberInputResponsive,
    source: responsiveSource,
  },
];
const rootRows = [
  {
    name: "valueMode",
    typeLabel: '"number" | "string"',
    defaultLabel: '"number"',
    description: "Selects numeric/null or string value and callback contracts.",
  },
  {
    name: "value",
    typeLabel: "number | null | string",
    description: "Controlled value matching valueMode.",
  },
  {
    name: "defaultValue",
    typeLabel: "number | string",
    description: "Uncontrolled initial value matching valueMode.",
  },
  {
    name: "onValueChange",
    typeLabel: "numeric callback | details callback",
    description:
      "Number/null in numeric mode; { value, valueAsNumber } in string mode.",
  },
  {
    name: "min",
    typeLabel: "number",
    description: "Optional numeric boundary.",
  },
  {
    name: "max",
    typeLabel: "number",
    description: "Optional numeric boundary.",
  },
  {
    name: "precision",
    typeLabel: "number",
    description: "Fixed decimal precision, otherwise inferred.",
  },
  {
    name: "step",
    typeLabel: "number",
    defaultLabel: "1",
    description: "Positive finite stepping amount.",
  },
  {
    name: "largeStep",
    typeLabel: "number",
    defaultLabel: "step * 10",
    description: "Positive finite stepping amount.",
  },
  {
    name: "smallStep",
    typeLabel: "number",
    defaultLabel: "step / 10",
    description: "Positive finite stepping amount.",
  },
  {
    name: "locale",
    typeLabel: "string",
    defaultLabel: "LocaleProvider",
    description: "Parsing and formatting locale.",
  },
  {
    name: "formatOptions",
    typeLabel: "Intl.NumberFormatOptions",
    description:
      "Native localized formatting; mutually exclusive with custom formatter/parser.",
  },
  {
    name: "formatter",
    typeLabel: "(value: string) => string",
    description: "Legacy reversible display formatter.",
  },
  {
    name: "parser",
    typeLabel: "(value: string) => string",
    description: "Legacy parser paired with formatter.",
  },
  {
    name: "clampOnBlur",
    typeLabel: "boolean",
    defaultLabel: "true",
    description: "Clamp on blur and Enter.",
  },
  {
    name: "allowOverflow",
    typeLabel: "boolean",
    defaultLabel: "true",
    description: "Permit temporary out-of-range editing.",
  },
  {
    name: "allowMouseWheel",
    typeLabel: "boolean",
    defaultLabel: "false",
    description: "Only active while focused.",
  },
  {
    name: "spinOnPress",
    typeLabel: "boolean",
    defaultLabel: "true",
    description: "Hold a step action to repeat.",
  },
  {
    name: "focusInputOnChange",
    typeLabel: "boolean",
    defaultLabel: "true",
    description:
      "Component behavior or presentation option; Field state is inherited where applicable.",
  },
  {
    name: "disabled",
    typeLabel: "boolean",
    defaultLabel: "false",
    description:
      "Component behavior or presentation option; Field state is inherited where applicable.",
  },
  {
    name: "readOnly",
    typeLabel: "boolean",
    defaultLabel: "false",
    description:
      "Component behavior or presentation option; Field state is inherited where applicable.",
  },
  {
    name: "required",
    typeLabel: "boolean",
    defaultLabel: "false",
    description:
      "Component behavior or presentation option; Field state is inherited where applicable.",
  },
  {
    name: "invalid",
    typeLabel: "boolean",
    defaultLabel: "false",
    description:
      "Component behavior or presentation option; Field state is inherited where applicable.",
  },
  {
    name: "fullWidth",
    typeLabel: "boolean",
    defaultLabel: "true",
    description:
      "Component behavior or presentation option; Field state is inherited where applicable.",
  },
  {
    name: "size",
    typeLabel: "ResponsiveValue<ControlSize>",
    defaultLabel: '"lg"',
    description: "2xs, xs, sm, md, lg, xl, 2xl.",
  },
  {
    name: "variant",
    typeLabel: 'ResponsiveValue<"outline" | "surface" | "soft" | "subtle" | "ghost" | "plain" | "underline">',
    defaultLabel: '"outline"',
    description: "Finished field recipe.",
  },
  {
    name: "radius",
    typeLabel:
      '"none" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "subtle" | "control" | "surface" | "overlay" | "full"',
    defaultLabel: '"control"',
    description:
      "Core or semantic radius; mutually exclusive with shape, unavailable for underline.",
  },
  {
    name: "shape",
    typeLabel: '"sharp" | "rounded" | "pill"',
    defaultLabel: '"rounded"',
    description: "Legacy shape shorthand.",
  },
  {
    name: "layout",
    typeLabel: '"field" | "stepper"',
    defaultLabel: '"field"',
    description: "Compact end controls or detached step actions.",
  },
  {
    name: "stepperVisibility",
    typeLabel: '"always" | "hover"',
    defaultLabel: '"always"',
    description: "Fine-pointer hover policy; touch controls remain available.",
  },
  {
    name: "inputMode",
    typeLabel: '"text" | "tel" | "numeric" | "decimal"',
    defaultLabel: '"decimal"',
    description: "Forwarded to the actual input.",
  },
  {
    name: "pattern",
    typeLabel: "string",
    description: "Native input pattern.",
  },
  {
    name: "name",
    typeLabel: "string",
    description: "Native form ownership.",
  },
  {
    name: "form",
    typeLabel: "string",
    description: "Native form ownership.",
  },
  {
    name: "id",
    typeLabel: "string",
    description: "Legacy input ID; use ids.root for the root.",
  },
  {
    name: "ids",
    typeLabel: "NumberInputIds",
    description: "Explicit root/input/label/action/scrubber IDs.",
  },
  {
    name: "translations",
    typeLabel: "NumberInputTranslations",
    defaultLabel: "localeText",
    description: "Action labels and value text.",
  },
  {
    name: "onValueCommit",
    typeLabel: "(details) => void",
    description: "Commit, focus, or range details from the shared controller.",
  },
  {
    name: "onFocusChange",
    typeLabel: "(details) => void",
    description: "Commit, focus, or range details from the shared controller.",
  },
  {
    name: "onValueInvalid",
    typeLabel: "(details) => void",
    description: "Commit, focus, or range details from the shared controller.",
  },
  {
    name: "asChild",
    typeLabel: "boolean",
    defaultLabel: "false",
    description: "Merge root presentation into one authored child.",
  },
  {
    name: "render",
    typeLabel: "RenderProp",
    description: "Atom render composition.",
  },
  {
    name: "validationBehavior",
    typeLabel: '"inline" | "native"',
    defaultLabel: '"native"',
    description: "Field/Form validation ownership.",
  },
  {
    name: "children",
    typeLabel: "ReactNode | render callback",
    description: "One explicit Input, or automatic Input when omitted.",
  },
] satisfies DocsPropDefinition<NumberInputRootProps>[];
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description:
      "Component-owned properties. Native host attributes retain their usual meaning.",
    rows: rootRows,
  },
  {
    id: "props-group",
    title: "Group",
    description:
      "Field boundary inside Root or RootProvider. Place Label before it; use with layout=field.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        description:
          "Input, optional Element/Unit, and Control. Inherits Root recipes; native div attributes and refs are supported.",
      },
    ],
  },
  {
    id: "props-element",
    title: "Element",
    description: "Leading or trailing content within Group.",
    rows: [
      {
        name: "placement",
        typeLabel: '"start" | "end"',
        defaultLabel: '"start"',
        description:
          "Logical side; follows direction. Native div attributes and refs are supported.",
      },
    ],
  },
  {
    id: "props-unit",
    title: "Unit",
    description:
      "Decorative suffix; the input's accessible name must still describe its unit.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        description:
          "Visible unit content. Native span attributes and refs are supported.",
      },
    ],
  },
  {
    id: "props-decrement",
    title: "Decrement",
    description: "Decreases the current value using the shared controller.",
    rows: [
      {
        name: "aria-label",
        typeLabel: "string",
        defaultLabel: "localeText",
        description: "Explicit name takes precedence.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge into one native button.",
      },
    ],
  },
  {
    id: "props-rootprovider",
    title: "RootProvider",
    description: "Styled host for an external useNumberInput controller.",
    rows: [
      {
        name: "value",
        typeLabel: "NumberInputContextValue",
        description: "Required controller; visual props match Root.",
      },
    ],
  },
  {
    id: "props-input",
    title: "Input",
    description: "The spinbutton and native validity owner.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Compose an input host.",
      },
      {
        name: "inputMode",
        typeLabel: "string",
        defaultLabel: "Root",
        description: "Explicit override.",
      },
      {
        name: "pattern",
        typeLabel: "string",
        defaultLabel: "Root",
        description: "Native pattern.",
      },
    ],
  },
  {
    id: "props-control",
    title: "Control",
    description:
      "Generates Increment and Decrement unless children are supplied.",
    rows: [
      {
        name: "incrementLabel",
        typeLabel: "string",
        defaultLabel: "localeText",
        description: "Accessible increment name.",
      },
      {
        name: "decrementLabel",
        typeLabel: "string",
        defaultLabel: "localeText",
        description: "Accessible decrement name.",
      },
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "generated controls",
        description: "Custom step actions.",
      },
    ],
  },
  {
    id: "props-increment",
    title: "Increment",
    description: "Increment action; Decrement has the same composition API.",
    rows: [
      {
        name: "aria-label",
        typeLabel: "string",
        defaultLabel: "localeText",
        description: "Explicit names take precedence.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge into one native button.",
      },
    ],
  },
  {
    id: "props-label",
    title: "Label",
    description: "Native label associated with the input.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge into an authored label.",
      },
    ],
  },
  {
    id: "props-valuetext",
    title: "ValueText",
    description:
      "Current value display; do not substitute for typed input unless actions suffice.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "current display",
        description: "Optional authored content.",
      },
    ],
  },
  {
    id: "props-scrubber",
    title: "Scrubber",
    description: "Pointer supplement with RTL-aware horizontal stepping.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge into a noninteractive host.",
      },
    ],
  },
  {
    id: "props-context",
    title: "Context",
    description: "Render callback sharing the existing controller.",
    rows: [
      {
        name: "children",
        typeLabel: "(controller) => ReactNode",
        description: "Required callback, no DOM wrapper.",
      },
    ],
  },
];
export const sections = ownerSections(examples.slice(1), parts);
