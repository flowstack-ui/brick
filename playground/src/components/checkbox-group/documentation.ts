import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { CheckboxGroupSelectAll } from "./examples/CheckboxGroupSelectAll.js";
import CheckboxGroupSelectAllSource from "./examples/CheckboxGroupSelectAll.tsx?raw";
import { CheckboxGroupLimit } from "./examples/CheckboxGroupLimit.js";
import CheckboxGroupLimitSource from "./examples/CheckboxGroupLimit.tsx?raw";
import { CheckboxGroupRecipes } from "./examples/CheckboxGroupRecipes.js";
import CheckboxGroupRecipesSource from "./examples/CheckboxGroupRecipes.tsx?raw";
import { CheckboxGroupHorizontal } from "./examples/CheckboxGroupHorizontal.js";
import CheckboxGroupHorizontalSource from "./examples/CheckboxGroupHorizontal.tsx?raw";
import { CheckboxGroupLinked } from "./examples/CheckboxGroupLinked.js";
import CheckboxGroupLinkedSource from "./examples/CheckboxGroupLinked.tsx?raw";
import { CheckboxGroupControllerExample } from "./examples/CheckboxGroupControllerExample.js";
import CheckboxGroupControllerExampleSource from "./examples/CheckboxGroupControllerExample.tsx?raw";
import { CheckboxGroupStates } from "./examples/CheckboxGroupStates.js";
import CheckboxGroupStatesSource from "./examples/CheckboxGroupStates.tsx?raw";
import { CheckboxGroupForm } from "./examples/CheckboxGroupForm.js";
import CheckboxGroupFormSource from "./examples/CheckboxGroupForm.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "select-all",
    title: "Select all",
    description: "Root allValues defines the set controlled by Parent.",
    Demo: CheckboxGroupSelectAll,
    source: CheckboxGroupSelectAllSource,
  },
  {
    id: "limit",
    title: "Selection limit",
    description: "At capacity, selected choices can still be removed.",
    Demo: CheckboxGroupLimit,
    source: CheckboxGroupLimitSource,
  },
  {
    id: "recipes",
    title: "Shared recipes",
    description:
      "Inherit group presentation and override a specific item when needed.",
    Demo: CheckboxGroupRecipes,
    source: CheckboxGroupRecipesSource,
  },
  {
    id: "horizontal",
    title: "Horizontal layout",
    description: "Wrap choices with a shared spacing value.",
    Demo: CheckboxGroupHorizontal,
    source: CheckboxGroupHorizontalSource,
  },
  {
    id: "linked-label",
    title: "Linked label",
    description:
      "Bind a normal Checkbox.Control to group state without nesting a link inside a button.",
    Demo: CheckboxGroupLinked,
    source: CheckboxGroupLinkedSource,
  },
  {
    id: "controlled",
    title: "Controlled values",
    description: "Use a controller to read or update selected values.",
    Demo: CheckboxGroupControllerExample,
    source: CheckboxGroupControllerExampleSource,
  },
  {
    id: "states",
    title: "States and descriptions",
    description:
      "Keep disabled, read-only and editable choices visually understandable.",
    Demo: CheckboxGroupStates,
    source: CheckboxGroupStatesSource,
  },
  {
    id: "form",
    title: "Validation and forms",
    description:
      "Use Fieldset for a legend and a shared at-least-one validation message.",
    Demo: CheckboxGroupForm,
    source: CheckboxGroupFormSource,
  },
];
export const parts: OwnerPart[] = [
  {
    title: "Root",
    id: "props-root",
    description: "Group value, limits, naming and shared presentation owner.",
    rows: [
      {
        name: "value / defaultValue",
        typeLabel: "string[]",
        defaultLabel: "[]",
        description: "Controlled or initial selected values.",
      },
      {
        name: "onValueChange",
        typeLabel: "(value: string[]) => void",
        defaultLabel: "—",
        description: "Selection change callback.",
      },
      {
        name: "allValues",
        typeLabel: "string[]",
        defaultLabel: "—",
        description: "Explicit selectable collection required by Parent.",
      },
      {
        name: "maxSelectedValues",
        typeLabel: "number",
        defaultLabel: "—",
        description:
          "Nonnegative integer limit; selected choices remain removable.",
      },
      {
        name: "orientation",
        typeLabel: '"vertical" | "horizontal"',
        defaultLabel: '"vertical"',
        description: "Stack or wrap choices.",
      },
      {
        name: "gap",
        typeLabel: "SpacingValue",
        defaultLabel: "1.5",
        description: "Space between items.",
      },
      {
        name: "name / form",
        typeLabel: "string",
        defaultLabel: "—",
        description: "Shared native submission ownership.",
      },
      {
        name: "disabled / readOnly / invalid / required",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Group state; required means at least one eligible choice.",
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
    title: "Item",
    id: "props-item",
    description:
      "Checkbox-button shortcut. Use useCheckboxGroupItem with compound Checkbox for linked labels.",
    rows: [
      {
        name: "value",
        typeLabel: "string",
        defaultLabel: "Required",
        description: "Unique stable choice value.",
      },
      {
        name: "disabled / readOnly / invalid / required",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Individual state; group required does not make every item mandatory.",
      },
      {
        name: "indicator",
        typeLabel: "ReactNode",
        defaultLabel: "Default check",
        description: "Custom decorative mark.",
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
    title: "ItemLabel",
    id: "props-label",
    description: "Accessible name inside Item; no nested links or buttons.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "Required",
        description: "Option name.",
      },
    ],
  },
  {
    title: "ItemDescription",
    id: "props-description",
    description: "Supporting description inside Item.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "Required",
        description: "Option description.",
      },
    ],
  },
  {
    title: "Parent",
    id: "props-parent",
    description:
      "Aggregate checkbox driven by Root allValues; preserves outside selections.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description: "Name the select-all action.",
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
    title: "RootProvider",
    id: "props-provider",
    description: "Rendered group driven by useCheckboxGroup.",
    rows: [
      {
        name: "value",
        typeLabel: "CheckboxGroupController",
        defaultLabel: "Required",
        description: "Controller; application owns reset of controlled values.",
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
