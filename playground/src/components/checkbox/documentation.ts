import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { CheckboxSizes } from "./examples/CheckboxSizes.js";
import CheckboxSizesSource from "./examples/CheckboxSizes.tsx?raw";
import { CheckboxVariants } from "./examples/CheckboxVariants.js";
import CheckboxVariantsSource from "./examples/CheckboxVariants.tsx?raw";
import { CheckboxTones } from "./examples/CheckboxTones.js";
import CheckboxTonesSource from "./examples/CheckboxTones.tsx?raw";
import { CheckboxDensity } from "./examples/CheckboxDensity.js";
import CheckboxDensitySource from "./examples/CheckboxDensity.tsx?raw";
import { CheckboxControllerExample } from "./examples/CheckboxControllerExample.js";
import CheckboxControllerExampleSource from "./examples/CheckboxControllerExample.tsx?raw";
import { CheckboxCustomIndicator } from "./examples/CheckboxCustomIndicator.js";
import CheckboxCustomIndicatorSource from "./examples/CheckboxCustomIndicator.tsx?raw";
import { CheckboxPlacement } from "./examples/CheckboxPlacement.js";
import CheckboxPlacementSource from "./examples/CheckboxPlacement.tsx?raw";
import { CheckboxResponsive } from "./examples/CheckboxResponsive.js";
import CheckboxResponsiveSource from "./examples/CheckboxResponsive.tsx?raw";
import { CheckboxLinkedLabel } from "./examples/CheckboxLinkedLabel.js";
import CheckboxLinkedLabelSource from "./examples/CheckboxLinkedLabel.tsx?raw";
import { CheckboxLinkedStates } from "./examples/CheckboxLinkedStates.js";
import CheckboxLinkedStatesSource from "./examples/CheckboxLinkedStates.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Coordinate the square, label and gap without shrinking the comfortable target.",
    Demo: CheckboxSizes,
    source: CheckboxSizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description: "Choose filled, transparent outline or subtle selected paint.",
    Demo: CheckboxVariants,
    source: CheckboxVariantsSource,
  },
  {
    id: "tones",
    title: "Tones",
    description: "Selection colors do not replace validation states.",
    Demo: CheckboxTones,
    source: CheckboxTonesSource,
  },
  {
    id: "density",
    title: "Density",
    description:
      "Use compact targets when the surrounding layout provides adequate spacing.",
    Demo: CheckboxDensity,
    source: CheckboxDensitySource,
  },
  {
    id: "controlled",
    title: "Controlled and mixed state",
    description: "A controller can read or update the same checkbox state.",
    Demo: CheckboxControllerExample,
    source: CheckboxControllerExampleSource,
  },
  {
    id: "indicator",
    title: "Custom indicator",
    description: "Replace the mark without adding another interactive control.",
    Demo: CheckboxCustomIndicator,
    source: CheckboxCustomIndicatorSource,
  },
  {
    id: "placement",
    title: "Label placement",
    description: "Place labels and descriptions on the logical start side.",
    Demo: CheckboxPlacement,
    source: CheckboxPlacementSource,
  },
  {
    id: "responsive",
    title: "Responsive size and radius",
    description:
      "Change the visual size at a breakpoint and use shared radius values.",
    Demo: CheckboxResponsive,
    source: CheckboxResponsiveSource,
  },
  {
    id: "linked-label",
    title: "Linked label and forms",
    description:
      "Keep links separate from the checkbox and retain native validation and reset.",
    Demo: CheckboxLinkedLabel,
    source: CheckboxLinkedLabelSource,
  },
  {
    id: "states",
    title: "States",
    description: "Compose field-wide disabled, read-only and invalid state.",
    Demo: CheckboxLinkedStates,
    source: CheckboxLinkedStatesSource,
  },
];
export const parts: OwnerPart[] = [
  {
    title: "Checkbox",
    id: "props-checkbox",
    description: "Callable button-host control with text-only content.",
    rows: [
      {
        name: "size",
        typeLabel: 'ResponsiveValue<"xs" | "sm" | "md" | "lg">',
        defaultLabel: '"md"',
        description:
          "Coordinates square, text and gap; hit target is controlled by density.",
      },
      {
        name: "variant",
        typeLabel: '"solid" | "outline" | "subtle"',
        defaultLabel: '"solid"',
        description: "Checked and mixed paint; outline stays transparent.",
      },
      {
        name: "tone",
        typeLabel:
          '"neutral" | "accent" | "contrast" | "info" | "success" | "warning" | "danger"',
        defaultLabel: '"accent"',
        description: "Selection color, independent from invalid state.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "subtle",
        description: "Visual square corner radius.",
      },
      {
        name: "density",
        typeLabel: '"comfortable" | "compact"',
        defaultLabel: '"comfortable"',
        description: "44px or 24px minimum target.",
      },
      {
        name: "labelPlacement",
        typeLabel: '"start" | "end"',
        defaultLabel: '"end"',
        description: "Place label before or after the visual control.",
      },
      {
        name: "checked",
        typeLabel: 'boolean | "indeterminate"',
        defaultLabel: "—",
        description: "Controlled checked state.",
      },
      {
        name: "defaultChecked",
        typeLabel: 'boolean | "indeterminate"',
        defaultLabel: "false",
        description: "Initial uncontrolled state.",
      },
      {
        name: "onCheckedChange",
        typeLabel: "(checked) => void",
        defaultLabel: "—",
        description: "Receives the next checked state.",
      },
      {
        name: "disabled / readOnly / invalid / required",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Availability and validation states.",
      },
      {
        name: "name / value / form",
        typeLabel: "string",
        defaultLabel: "—",
        description: "Native form participation.",
      },
      {
        name: "inputRef / inputProps",
        typeLabel: "Ref<HTMLInputElement> / native input props",
        defaultLabel: "—",
        description: "Integrate with the single automatically managed input.",
      },
      {
        name: "indicator",
        typeLabel: "ReactNode",
        defaultLabel: "Default check/mixed mark",
        description:
          "Supply Checkbox.Indicator for state-aware custom artwork.",
      },
    ],
  },
  {
    title: "Root",
    id: "props-root",
    description:
      "Noninteractive Field wrapper for Control and a separate Label. Owns field flags and visual defaults, not checked state.",
    rows: [
      {
        name: "size",
        typeLabel: 'ResponsiveValue<"xs" | "sm" | "md" | "lg">',
        defaultLabel: '"md"',
        description:
          "Coordinates square, text and gap; hit target is controlled by density.",
      },
      {
        name: "variant",
        typeLabel: '"solid" | "outline" | "subtle"',
        defaultLabel: '"solid"',
        description: "Checked and mixed paint; outline stays transparent.",
      },
      {
        name: "tone",
        typeLabel:
          '"neutral" | "accent" | "contrast" | "info" | "success" | "warning" | "danger"',
        defaultLabel: '"accent"',
        description: "Selection color, independent from invalid state.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "subtle",
        description: "Visual square corner radius.",
      },
      {
        name: "density",
        typeLabel: '"comfortable" | "compact"',
        defaultLabel: '"comfortable"',
        description: "44px or 24px minimum target.",
      },
      {
        name: "labelPlacement",
        typeLabel: '"start" | "end"',
        defaultLabel: '"end"',
        description: "Place label before or after the visual control.",
      },
      {
        name: "disabled / readOnly / invalid / required",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Field-wide states. A child cannot re-enable an unavailable field.",
      },
    ],
  },
  {
    title: "Control",
    id: "props-control",
    description:
      "Button ref and checkbox state owner. Put visible label text and links in Label.",
    rows: [
      {
        name: "checked",
        typeLabel: 'boolean | "indeterminate"',
        defaultLabel: "—",
        description: "Controlled checked state.",
      },
      {
        name: "defaultChecked",
        typeLabel: 'boolean | "indeterminate"',
        defaultLabel: "false",
        description: "Initial uncontrolled state.",
      },
      {
        name: "onCheckedChange",
        typeLabel: "(checked) => void",
        defaultLabel: "—",
        description: "Receives the next checked state.",
      },
      {
        name: "disabled / readOnly / invalid / required",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Availability and validation states.",
      },
      {
        name: "name / value / form",
        typeLabel: "string",
        defaultLabel: "—",
        description: "Native form participation.",
      },
      {
        name: "inputRef / inputProps",
        typeLabel: "Ref<HTMLInputElement> / native input props",
        defaultLabel: "—",
        description: "Integrate with the single automatically managed input.",
      },
      {
        name: "indicator",
        typeLabel: "ReactNode",
        defaultLabel: "Default check/mixed mark",
        description:
          "Supply Checkbox.Indicator for state-aware custom artwork.",
      },
      {
        name: "size",
        typeLabel: 'ResponsiveValue<"xs" | "sm" | "md" | "lg">',
        defaultLabel: '"md"',
        description:
          "Coordinates square, text and gap; hit target is controlled by density.",
      },
      {
        name: "variant",
        typeLabel: '"solid" | "outline" | "subtle"',
        defaultLabel: '"solid"',
        description: "Checked and mixed paint; outline stays transparent.",
      },
      {
        name: "tone",
        typeLabel:
          '"neutral" | "accent" | "contrast" | "info" | "success" | "warning" | "danger"',
        defaultLabel: '"accent"',
        description: "Selection color, independent from invalid state.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "subtle",
        description: "Visual square corner radius.",
      },
      {
        name: "density",
        typeLabel: '"comfortable" | "compact"',
        defaultLabel: '"comfortable"',
        description: "44px or 24px minimum target.",
      },
      {
        name: "labelPlacement",
        typeLabel: '"start" | "end"',
        defaultLabel: '"end"',
        description: "Place label before or after the visual control.",
      },
    ],
  },
  {
    title: "Label",
    id: "props-label",
    description:
      "Native label associated with Control; supports independently actionable links.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description: "Visible accessible name.",
      },
    ],
  },
  {
    title: "Description",
    id: "props-description",
    description: "Supporting text registered with Field.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description: "Description associated with Control.",
      },
    ],
  },
  {
    title: "Error",
    id: "props-error",
    description: "Field-owned error text and validation relationship.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description: "Message displayed when invalid.",
      },
    ],
  },
  {
    title: "Indicator",
    id: "props-indicator",
    description:
      "Decorative state artwork supplied through the indicator prop.",
    rows: [
      {
        name: "children / indeterminate",
        typeLabel: "ReactNode",
        defaultLabel: "Default check / mixed mark",
        description: "Checked and mixed replacement artwork.",
      },
    ],
  },
  {
    title: "RootProvider",
    id: "props-provider",
    description:
      "Callable-style checkbox driven by useCheckbox. Not the Field wrapper.",
    rows: [
      {
        name: "value",
        typeLabel: "CheckboxController",
        defaultLabel: "—",
        description: "Controller returned by useCheckbox.",
      },
      {
        name: "inputValue",
        typeLabel: "string",
        defaultLabel: '"on"',
        description:
          "Submitted value; value names the controller on this part.",
      },
      {
        name: "size",
        typeLabel: 'ResponsiveValue<"xs" | "sm" | "md" | "lg">',
        defaultLabel: '"md"',
        description:
          "Coordinates square, text and gap; hit target is controlled by density.",
      },
      {
        name: "variant",
        typeLabel: '"solid" | "outline" | "subtle"',
        defaultLabel: '"solid"',
        description: "Checked and mixed paint; outline stays transparent.",
      },
      {
        name: "tone",
        typeLabel:
          '"neutral" | "accent" | "contrast" | "info" | "success" | "warning" | "danger"',
        defaultLabel: '"accent"',
        description: "Selection color, independent from invalid state.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "subtle",
        description: "Visual square corner radius.",
      },
      {
        name: "density",
        typeLabel: '"comfortable" | "compact"',
        defaultLabel: '"comfortable"',
        description: "44px or 24px minimum target.",
      },
      {
        name: "labelPlacement",
        typeLabel: '"start" | "end"',
        defaultLabel: '"end"',
        description: "Place label before or after the visual control.",
      },
    ],
  },
];
export const sections = ownerSections(examples, parts);
