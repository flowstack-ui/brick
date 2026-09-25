import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { FieldsetBasic } from "./examples/FieldsetBasic.js";
import BasicSource from "./examples/FieldsetBasic.tsx?raw";
import { FieldsetSizes } from "./examples/FieldsetSizes.js";
import SizesSource from "./examples/FieldsetSizes.tsx?raw";
import { FieldsetDisabled } from "./examples/FieldsetDisabled.js";
import DisabledSource from "./examples/FieldsetDisabled.tsx?raw";
import { FieldsetErrors } from "./examples/FieldsetErrors.js";
import ErrorsSource from "./examples/FieldsetErrors.tsx?raw";
import { FieldsetContent } from "./examples/FieldsetContent.js";
import ContentSource from "./examples/FieldsetContent.tsx?raw";
import { FieldsetChoices } from "./examples/FieldsetChoices.js";
import ChoicesSource from "./examples/FieldsetChoices.tsx?raw";
export const Basic = FieldsetBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
  {
    id: "choices",
    title: "Grouped choices",
    description: "Give related choices one native group legend.",
    Demo: FieldsetChoices,
    source: ChoicesSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Size controls legend hierarchy and group rhythm.",
    Demo: FieldsetSizes,
    source: SizesSource,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Native fieldset disables its contained controls.",
    Demo: FieldsetDisabled,
    source: DisabledSource,
  },
  {
    id: "errors",
    title: "Group errors",
    description:
      "Mark only the failing Field invalid; the group can summarize the error.",
    Demo: FieldsetErrors,
    source: ErrorsSource,
  },
  {
    id: "content",
    title: "Content spacing",
    description:
      "Content owns spacing between fields independently from the group header.",
    Demo: FieldsetContent,
    source: ContentSource,
  },
];
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description: "State, native props and composition belong to this boundary.",
    rows: [
      {
        name: "size",
        typeLabel: "ResponsiveValue<sm | md | lg>",
        defaultLabel: "md",
        description: "Group rhythm.",
      },
      {
        name: "invalid / disabled / required",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Group state; invalid does not invalidate each Field.",
      },
      {
        name: "validationBehavior",
        typeLabel: "inline | native",
        defaultLabel: "inherited",
        description: "Native validity presentation.",
      },
      {
        name: "asChild / render",
        typeLabel: "composition",
        defaultLabel: "—",
        description: "Preserve the appropriate native host.",
      },
    ],
  },
  {
    id: "props-legend",
    title: "Legend",
    description: "Names the group.",
    rows: [
      {
        name: "requiredIndicator / optionalIndicator",
        typeLabel: "ReactNode",
        defaultLabel: "automatic required marker",
        description: "Marker content.",
      },
    ],
  },
  {
    id: "props-content",
    title: "Content",
    description: "Vertical layout for related controls.",
    rows: [
      {
        name: "gap",
        typeLabel: "ResponsiveValue<SpacingValue>",
        defaultLabel: "size recipe",
        description:
          "Content rhythm; native div attributes and asChild are supported.",
      },
    ],
  },
  {
    id: "props-description",
    title: "Description",
    description: "Group help text.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        defaultLabel: "—",
        description: "Content; native props and composition are forwarded.",
      },
    ],
  },
  {
    id: "props-error",
    title: "Error",
    description: "Group error summary.",
    rows: [
      {
        name: "match / forceMatch",
        typeLabel: "boolean",
        defaultLabel: "—",
        description: "Control visibility.",
      },
    ],
  },
  {
    id: "props-context",
    title: "Context",
    description: "Read group state.",
    rows: [
      {
        name: "children",
        typeLabel: "(context) => ReactNode",
        defaultLabel: "required",
        description: "Render-prop access.",
      },
    ],
  },
];
export const sections = ownerSections(examples, parts);
