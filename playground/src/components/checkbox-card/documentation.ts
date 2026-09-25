import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { CheckboxCardDescription } from "./examples/CheckboxCardDescription.js";
import DescriptionSource from "./examples/CheckboxCardDescription.tsx?raw";
import { CheckboxCardGroup } from "./examples/CheckboxCardGroup.js";
import GroupSource from "./examples/CheckboxCardGroup.tsx?raw";
import { CheckboxCardSizes } from "./examples/CheckboxCardSizes.js";
import SizesSource from "./examples/CheckboxCardSizes.tsx?raw";
import { CheckboxCardVariants } from "./examples/CheckboxCardVariants.js";
import VariantsSource from "./examples/CheckboxCardVariants.tsx?raw";
import { CheckboxCardStates } from "./examples/CheckboxCardStates.js";
import StatesSource from "./examples/CheckboxCardStates.tsx?raw";
import { CheckboxCardAddon } from "./examples/CheckboxCardAddon.js";
import AddonSource from "./examples/CheckboxCardAddon.tsx?raw";
import { CheckboxCardNoIndicator } from "./examples/CheckboxCardNoIndicator.js";
import NoIndicatorSource from "./examples/CheckboxCardNoIndicator.tsx?raw";
import { CheckboxCardIcon } from "./examples/CheckboxCardIcon.js";
import IconSource from "./examples/CheckboxCardIcon.tsx?raw";
import { CheckboxCardTones } from "./examples/CheckboxCardTones.js";
import TonesSource from "./examples/CheckboxCardTones.tsx?raw";
import { CheckboxCardLayout } from "./examples/CheckboxCardLayout.js";
import LayoutSource from "./examples/CheckboxCardLayout.tsx?raw";
import { CheckboxCardCustomIndicator } from "./examples/CheckboxCardCustomIndicator.js";
import CustomIndicatorSource from "./examples/CheckboxCardCustomIndicator.tsx?raw";
import { CheckboxCardResponsive } from "./examples/CheckboxCardResponsive.js";
import ResponsiveSource from "./examples/CheckboxCardResponsive.tsx?raw";
import { CheckboxCardController } from "./examples/CheckboxCardController.js";
import ControllerSource from "./examples/CheckboxCardController.tsx?raw";
import { CheckboxCardForm } from "./examples/CheckboxCardForm.js";
import FormSource from "./examples/CheckboxCardForm.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "description",
    title: "Description",
    description: "Add supporting text without enlarging the option label.",
    Demo: CheckboxCardDescription,
    source: DescriptionSource,
  },
  {
    id: "group",
    title: "Group",
    description:
      "Use CheckboxGroup and Fieldset for related independent choices.",
    Demo: CheckboxCardGroup,
    source: GroupSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Size coordinates padding, type, gap and indicator.",
    Demo: CheckboxCardSizes,
    source: SizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description: "Choose outline, surface, subtle or solid selection paint.",
    Demo: CheckboxCardVariants,
    source: VariantsSource,
  },
  {
    id: "states",
    title: "States",
    description:
      "Availability, mixed selection and validation remain distinct.",
    Demo: CheckboxCardStates,
    source: StatesSource,
  },
  {
    id: "addon",
    title: "Addon",
    description: "Place supporting metadata in a separated region.",
    Demo: CheckboxCardAddon,
    source: AddonSource,
  },
  {
    id: "no-indicator",
    title: "No indicator",
    description: "Omit the mark while retaining a visible selection boundary.",
    Demo: CheckboxCardNoIndicator,
    source: NoIndicatorSource,
  },
  {
    id: "icon",
    title: "Icon",
    description: "Compose decorative artwork alongside the label.",
    Demo: CheckboxCardIcon,
    source: IconSource,
  },
  {
    id: "tones",
    title: "Tones",
    description: "Use the same selection tones as Checkbox.",
    Demo: CheckboxCardTones,
    source: TonesSource,
  },
  {
    id: "layout",
    title: "Layout",
    description: "Arrange content and indicator with the compound parts.",
    Demo: CheckboxCardLayout,
    source: LayoutSource,
  },
  {
    id: "custom-indicator",
    title: "Custom indicator",
    description: "Replace the default mark with state-aware artwork.",
    Demo: CheckboxCardCustomIndicator,
    source: CustomIndicatorSource,
  },
  {
    id: "responsive",
    title: "Responsive",
    description: "Adapt presentation without changing the keyboard model.",
    Demo: CheckboxCardResponsive,
    source: ResponsiveSource,
  },
  {
    id: "controller",
    title: "Controller",
    description: "Read and control selection through the shared controller.",
    Demo: CheckboxCardController,
    source: ControllerSource,
  },
  {
    id: "form",
    title: "Form",
    description: "Submit, validate and reset a constrained group.",
    Demo: CheckboxCardForm,
    source: FormSource,
  },
];
export const parts: OwnerPart[] = [
  {
    title: "Root",
    id: "props-root",
    description: "Label host owning selection and the card recipe.",
    rows: [
      {
        name: "checked / defaultChecked",
        typeLabel: 'boolean | "indeterminate"',
        defaultLabel: "false",
        description: "Controlled or initial selection.",
      },
      {
        name: "onCheckedChange",
        typeLabel: "(checked) => void",
        defaultLabel: "—",
        description: "Receives the next state.",
      },
      {
        name: "size",
        typeLabel: 'ResponsiveValue<"sm" | "md" | "lg">',
        defaultLabel: '"md"',
        description: "Coordinates inset, type and mark geometry.",
      },
      {
        name: "variant",
        typeLabel:
          'ResponsiveValue<"outline" | "surface" | "subtle" | "solid">',
        defaultLabel: '"outline"',
        description: "Resting and selected paint.",
      },
      {
        name: "tone",
        typeLabel: "CheckboxTone",
        defaultLabel: '"accent"',
        description: "Selection color, independent of validation.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "surface",
        description: "Token-only corners.",
      },
      {
        name: "orientation",
        typeLabel: 'ResponsiveValue<"horizontal" | "vertical">',
        defaultLabel: '"horizontal"',
        description: "Internal visual arrangement, not keyboard direction.",
      },
      {
        name: "align / justify",
        typeLabel: 'ResponsiveValue<"start" | "center" | "end">',
        defaultLabel: '"start"',
        description: "Logical content alignment.",
      },
      {
        name: "disabled / readOnly / required / invalid",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Availability and validation.",
      },
      {
        name: "name / value / form",
        typeLabel: "string",
        defaultLabel: 'value: "on"',
        description: "Native submission; inherited inside CheckboxGroup.",
      },
      {
        name: "ids",
        typeLabel: "{ input?, label?, description? }",
        defaultLabel: "generated",
        description: "Stable explicit part IDs.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "—",
        description: "Preserve a label host and native behavior.",
      },
    ],
  },
  {
    title: "RootProvider",
    id: "props-provider",
    description: "Controlled root with the same visual props.",
    rows: [
      {
        name: "value",
        typeLabel: "CheckboxController",
        defaultLabel: "required",
        description: "Controller from useCheckboxCard.",
      },
      {
        name: "inputValue",
        typeLabel: "string",
        defaultLabel: '"on"',
        description: "Native submitted value.",
      },
    ],
  },
  {
    title: "HiddenInput",
    id: "props-input",
    description: "Required native checkbox and keyboard focus target.",
    rows: [
      {
        name: "ref",
        typeLabel: "Ref<HTMLInputElement>",
        defaultLabel: "—",
        description: "Native input ref; Root refs target labels.",
      },
      {
        name: "native input props",
        typeLabel: "InputHTMLAttributes",
        defaultLabel: "—",
        description: "State and form ownership remain on Root.",
      },
    ],
  },
  {
    title: "Control",
    id: "props-control",
    description: "Noninteractive layout regions for option content.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge onto a valid phrasing-content host.",
      },
    ],
  },
  {
    title: "Content",
    id: "props-content",
    description: "Flexible region containing the option name and description.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge onto a noninteractive phrasing-content host.",
      },
    ],
  },
  {
    title: "Label",
    id: "props-label",
    description: "Associated option name and supporting description.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description: "Noninteractive phrasing content.",
      },
    ],
  },
  {
    title: "Description",
    id: "props-description",
    description: "Supporting text associated with the native checkbox.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description: "Noninteractive supporting content.",
      },
    ],
  },
  {
    title: "Indicator",
    id: "props-indicator",
    description: "Optional decorative checked/mixed mark.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "Checkmark",
        description: "Custom artwork replaces the default mark.",
      },
    ],
  },
  {
    title: "Addon",
    id: "props-addon",
    description: "Separated supporting metadata; no independent actions.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description: "Noninteractive supporting content.",
      },
    ],
  },
  {
    title: "Context",
    id: "props-context",
    description: "Render selection-aware content.",
    rows: [
      {
        name: "children",
        typeLabel: "(state: CheckboxController) => ReactNode",
        defaultLabel: "required",
        description: "Read state without adding another store.",
      },
    ],
  },
];
export const sections = ownerSections(examples, parts, true);
