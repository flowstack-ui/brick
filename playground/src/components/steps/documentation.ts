import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { StepsSizes } from "./examples/StepsSizes.js";
import { StepsReadOnly } from "./examples/StepsReadOnly.js";
import StepsReadOnlySource from "./examples/StepsReadOnly.tsx?raw";
import StepsSizesSource from "./examples/StepsSizes.tsx?raw";
import { StepsVariants } from "./examples/StepsVariants.js";
import StepsVariantsSource from "./examples/StepsVariants.tsx?raw";
import { StepsTones } from "./examples/StepsTones.js";
import StepsTonesSource from "./examples/StepsTones.tsx?raw";
import { StepsVertical } from "./examples/StepsVertical.js";
import StepsVerticalSource from "./examples/StepsVertical.tsx?raw";
import { StepsResponsive } from "./examples/StepsResponsive.js";
import StepsResponsiveSource from "./examples/StepsResponsive.tsx?raw";
import { StepsControlled } from "./examples/StepsControlled.js";
import StepsControlledSource from "./examples/StepsControlled.tsx?raw";
import { StepsController } from "./examples/StepsController.js";
import StepsControllerSource from "./examples/StepsController.tsx?raw";
import { StepsValidation } from "./examples/StepsValidation.js";
import StepsValidationSource from "./examples/StepsValidation.tsx?raw";
import { StepsOptional } from "./examples/StepsOptional.js";
import StepsOptionalSource from "./examples/StepsOptional.tsx?raw";
import { StepsDescriptions } from "./examples/StepsDescriptions.js";
import StepsDescriptionsSource from "./examples/StepsDescriptions.tsx?raw";
import { StepsCustom } from "./examples/StepsCustom.js";
import StepsCustomSource from "./examples/StepsCustom.tsx?raw";
import { StepsStates } from "./examples/StepsStates.js";
import StepsStatesSource from "./examples/StepsStates.tsx?raw";
import { StepsLifecycle } from "./examples/StepsLifecycle.js";
import StepsLifecycleSource from "./examples/StepsLifecycle.tsx?raw";
import { StepsLocale } from "./examples/StepsLocale.js";
import StepsLocaleSource from "./examples/StepsLocale.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "read-only",
    title: "Read-only progress",
    description:
      "Omit Trigger when progress is informational and stages cannot be selected.",
    Demo: StepsReadOnly,
    source: StepsReadOnlySource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Choose xs, sm, md or lg to coordinate marker, icon and text sizes.",
    Demo: StepsSizes,
    source: StepsSizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description:
      "Solid and subtle distinguish current, completed and upcoming stages.",
    Demo: StepsVariants,
    source: StepsVariantsSource,
  },
  {
    id: "tones",
    title: "Tones",
    description:
      "Use accent for branded progress or neutral for understated workflows.",
    Demo: StepsTones,
    source: StepsTonesSource,
  },
  {
    id: "vertical",
    title: "Vertical",
    description:
      "Keep the same workflow tree while changing visual placement at a breakpoint.",
    Demo: StepsVertical,
    source: StepsVerticalSource,
  },
  {
    id: "responsive",
    title: "Responsive recipes",
    description:
      "Adapt marker size and presentation without duplicating workflow state.",
    Demo: StepsResponsive,
    source: StepsResponsiveSource,
  },
  {
    id: "controlled",
    title: "Controlled",
    description: "Let application state own the current step and reset action.",
    Demo: StepsControlled,
    source: StepsControlledSource,
  },
  {
    id: "controller",
    title: "External controller",
    description:
      "Use useSteps and RootProvider to share navigation with external controls.",
    Demo: StepsController,
    source: StepsControllerSource,
  },
  {
    id: "validation",
    title: "Validation",
    description:
      "Guard forward navigation synchronously. Linear mode checks every crossed nonoptional stage.",
    Demo: StepsValidation,
    source: StepsValidationSource,
  },
  {
    id: "optional",
    title: "Optional stages",
    description:
      "Next and Back bypass optional stages; their triggers still allow direct access.",
    Demo: StepsOptional,
    source: StepsOptionalSource,
  },
  {
    id: "descriptions",
    title: "Descriptions",
    description: "Add concise supporting text alongside each title.",
    Demo: StepsDescriptions,
    source: StepsDescriptionsSource,
  },
  {
    id: "custom",
    title: "Custom indicators and radius",
    description:
      "Compose Number and Status for state artwork; choose radius independently.",
    Demo: StepsCustom,
    source: StepsCustomSource,
  },
  {
    id: "states",
    title: "Disabled and completed",
    description: "Disable navigation or start at count to show completion.",
    Demo: StepsStates,
    source: StepsStatesSource,
  },
  {
    id: "lifecycle",
    title: "Content lifecycle",
    description:
      "Content retains local state by default. Set keepMounted to false to discard it when leaving.",
    Demo: StepsLifecycle,
    source: StepsLifecycleSource,
  },
  {
    id: "locale",
    title: "Locale and RTL",
    description:
      "Default indicator numbers follow LocaleProvider; direction controls logical placement.",
    Demo: StepsLocale,
    source: StepsLocaleSource,
  },
];
export const parts: OwnerPart[] = [
  {
    id: "root",
    title: "Root",
    description: "Owns the workflow and its presentation.",
    rows: [
      {
        name: "count",
        typeLabel: "number",
        defaultLabel: "—",
        description: "Required number of stages; step=count is completion.",
      },
      {
        name: "step / defaultStep",
        typeLabel: "number",
        defaultLabel: "0",
        description: "Controlled or initial zero-based stage.",
      },
      {
        name: "onStepChange",
        typeLabel: "(step: number) => void",
        defaultLabel: "—",
        description:
          "Requested navigation; controlled state remains authoritative.",
      },
      {
        name: "onStepComplete",
        typeLabel: "() => void",
        defaultLabel: "—",
        description:
          "Fires on entering completion, not on initially completed render.",
      },
      {
        name: "linear",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Validate every crossed nonoptional stage on forward jumps.",
      },
      {
        name: "isStepValid",
        typeLabel: "(index: number) => boolean",
        defaultLabel: "—",
        description:
          "Guards forward movement, including non-linear navigation.",
      },
      {
        name: "isStepSkippable",
        typeLabel: "(index: number) => boolean",
        defaultLabel: "—",
        description:
          "Next/Back skip optional stages; direct selection remains possible.",
      },
      {
        name: "onStepInvalid",
        typeLabel: "(details: StepsInvalidDetails) => void",
        defaultLabel: "—",
        description: "Reports step, targetStep and next/set action.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Disables internal navigation.",
      },
      {
        name: "orientation",
        typeLabel: "'horizontal' | 'vertical'",
        defaultLabel: "'horizontal'",
        description: "Direction of the progress list.",
      },
      {
        name: "size",
        typeLabel: "ResponsiveValue<StepsSize>",
        defaultLabel: "'md'",
        description: "xs, sm, md or lg.",
      },
      {
        name: "variant",
        typeLabel: "ResponsiveValue<StepsVariant>",
        defaultLabel: "'solid'",
        description: "solid or subtle.",
      },
      {
        name: "tone",
        typeLabel: "ResponsiveValue<StepsTone>",
        defaultLabel: "'accent'",
        description: "accent or neutral.",
      },
      {
        name: "layout",
        typeLabel: "ResponsiveValue<StepsLayout>",
        defaultLabel: "'auto'",
        description: "auto, stacked or side; independent of list orientation.",
      },
      {
        name: "id / ids",
        typeLabel: "string / StepsIds",
        defaultLabel: "generated",
        description:
          "Coordinate root, list, trigger, title and content identifiers.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Compose one compatible host without adding a wrapper.",
      },
    ],
  },
  {
    id: "root-provider",
    title: "RootProvider",
    description:
      "Uses an existing controller and the same presentation recipes as Root.",
    rows: [
      {
        name: "value",
        typeLabel: "UseStepsReturn",
        defaultLabel: "—",
        description:
          "Controller returned by useSteps. State options belong to the hook.",
      },
    ],
  },
  {
    id: "item",
    title: "Item",
    description: "One stage in the ordered list.",
    rows: [
      {
        name: "index",
        typeLabel: "number",
        defaultLabel: "—",
        description: "Unique zero-based integer below count.",
      },
    ],
  },
  {
    id: "indicator",
    title: "Indicator",
    description: "Shows a localized number or completed check by default.",
    rows: [
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "'full'",
        description: "Finite core or semantic radius token.",
      },
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "number/check",
        description: "Replaces the default indicator content.",
      },
    ],
  },
  {
    id: "trigger",
    title: "Trigger",
    description: "Optional native button for direct navigation.",
    rows: [
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "'control'",
        description: "Trigger focus geometry.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Disables this trigger; root disabled also applies.",
      },
    ],
  },
  {
    id: "content",
    title: "Content",
    description: "Matching named stage panel.",
    rows: [
      {
        name: "index",
        typeLabel: "number",
        defaultLabel: "—",
        description: "Matches Item index.",
      },
      {
        name: "keepMounted",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Retain inactive local state; false unmounts it.",
      },
    ],
  },
  {
    id: "completed-content",
    title: "CompletedContent",
    description: "Shown at step=count. Supply an accessible name.",
    rows: [
      {
        name: "keepMounted",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Retain inactive completion content.",
      },
    ],
  },
  {
    id: "status",
    title: "Status",
    description: "Renders one state-specific node without adding a host.",
    rows: [
      {
        name: "complete / incomplete",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description: "Required completed and upcoming artwork.",
      },
      {
        name: "current",
        typeLabel: "ReactNode",
        defaultLabel: "incomplete",
        description: "Optional current-state artwork.",
      },
    ],
  },
  {
    id: "number",
    title: "Number",
    description:
      "Renders the current item’s localized one-based ordinal in a span.",
    rows: [],
  },
  {
    id: "context",
    title: "Context and ItemContext",
    description:
      "Read controller or item state through a render function; hooks provide the same values.",
    rows: [
      {
        name: "children",
        typeLabel: "(state) => ReactNode",
        defaultLabel: "—",
        description:
          "Controller includes percent and navigation. Item state includes first, last, skippable, IDs and isValid().",
      },
    ],
  },
];
export const sections = ownerSections(examples, parts, true);
