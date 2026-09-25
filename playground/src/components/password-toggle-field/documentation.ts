import type {
  PasswordToggleFieldIconProps,
  PasswordToggleFieldInputProps,
  PasswordToggleFieldRootProps,
  PasswordToggleFieldToggleProps,
} from "@flowstack-ui/brick";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import { PasswordToggleFieldBasic } from "./examples/PasswordToggleFieldBasic.js";
import basicSource from "./examples/PasswordToggleFieldBasic.tsx?raw";
import { PasswordToggleFieldControlledValue } from "./examples/PasswordToggleFieldControlledValue.js";
import controlledValueSource from "./examples/PasswordToggleFieldControlledValue.tsx?raw";
import { PasswordToggleFieldControlledVisibility } from "./examples/PasswordToggleFieldControlledVisibility.js";
import controlledVisibilitySource from "./examples/PasswordToggleFieldControlledVisibility.tsx?raw";
import { PasswordToggleFieldCustomAction } from "./examples/PasswordToggleFieldCustomAction.js";
import customActionSource from "./examples/PasswordToggleFieldCustomAction.tsx?raw";
import { PasswordToggleFieldDefaultVisible } from "./examples/PasswordToggleFieldDefaultVisible.js";
import defaultVisibleSource from "./examples/PasswordToggleFieldDefaultVisible.tsx?raw";
import { PasswordToggleFieldHookForm } from "./examples/PasswordToggleFieldHookForm.js";
import hookFormSource from "./examples/PasswordToggleFieldHookForm.tsx?raw";
import { PasswordToggleFieldNativeForm } from "./examples/PasswordToggleFieldNativeForm.js";
import nativeFormSource from "./examples/PasswordToggleFieldNativeForm.tsx?raw";
import { PasswordToggleFieldResponsiveRtl } from "./examples/PasswordToggleFieldResponsiveRtl.js";
import responsiveRtlSource from "./examples/PasswordToggleFieldResponsiveRtl.tsx?raw";
import { PasswordToggleFieldSizes } from "./examples/PasswordToggleFieldSizes.js";
import sizesSource from "./examples/PasswordToggleFieldSizes.tsx?raw";
import { PasswordToggleFieldStates } from "./examples/PasswordToggleFieldStates.js";
import statesSource from "./examples/PasswordToggleFieldStates.tsx?raw";
import { PasswordToggleFieldStrength } from "./examples/PasswordToggleFieldStrength.js";
import strengthSource from "./examples/PasswordToggleFieldStrength.tsx?raw";
import { PasswordToggleFieldVariants } from "./examples/PasswordToggleFieldVariants.js";
import variantsSource from "./examples/PasswordToggleFieldVariants.tsx?raw";

export const Basic = PasswordToggleFieldBasic;
export { basicSource };

export const examples = [
  {
    id: "sizes",
    title: "Sizes",
    description: "Seven sizes keep the value and reveal artwork contained.",
    Demo: PasswordToggleFieldSizes,
    source: sizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description: "Seven field recipes share the same visibility behavior.",
    Demo: PasswordToggleFieldVariants,
    source: variantsSource,
  },
  {
    id: "controlled-value",
    title: "Controlled value",
    description:
      "Keep value ownership on Input without rendering, logging or announcing the secret.",
    Demo: PasswordToggleFieldControlledValue,
    source: controlledValueSource,
  },
  {
    id: "controlled-visibility",
    title: "Controlled visibility",
    description:
      "Control visible separately and report only its non-secret state.",
    Demo: PasswordToggleFieldControlledVisibility,
    source: controlledVisibilitySource,
  },
  {
    id: "default-visibility",
    title: "Default visibility",
    description:
      "Opt in only when the surrounding observation and privacy context permits disclosure.",
    Demo: PasswordToggleFieldDefaultVisible,
    source: defaultVisibleSource,
  },
  {
    id: "custom-action",
    title: "Custom artwork and action",
    description:
      "Replace Icon artwork or compose a deliberately different IconButton recipe without adding another behavior owner.",
    Demo: PasswordToggleFieldCustomAction,
    source: customActionSource,
  },
  {
    id: "states",
    title: "States",
    description:
      "Disabled, read-only and invalid/required states preserve distinct behavior and feedback.",
    Demo: PasswordToggleFieldStates,
    source: statesSource,
  },
  {
    id: "hook-form",
    title: "React Hook Form",
    description:
      "Optional integration: install react-hook-form separately. Register and Controller preserve native refs, reset and validation without exposing submitted values.",
    Demo: PasswordToggleFieldHookForm,
    source: hookFormSource,
  },
  {
    id: "strength",
    title: "Strength indicator",
    description:
      "Optional integration: install check-password-strength separately. Scoring stays local and illustrative; server policy remains application-owned.",
    Demo: PasswordToggleFieldStrength,
    source: strengthSource,
  },
  {
    id: "native-form",
    title: "Native form",
    description:
      "Submit and reset through native form behavior while feedback reports no password payload.",
    Demo: PasswordToggleFieldNativeForm,
    source: nativeFormSource,
  },
  {
    id: "responsive-rtl",
    title: "Responsive and RTL",
    description:
      "Responsive field recipes and LocaleProvider-backed action labels follow logical direction.",
    Demo: PasswordToggleFieldResponsiveRtl,
    source: responsiveRtlSource,
  },
] as const;

export const rootRows: DocsPropDefinition<PasswordToggleFieldRootProps>[] = [
  {
    name: "visible",
    typeLabel: "boolean",
    description: "Controlled visibility; pair with onVisibleChange.",
  },
  {
    name: "defaultVisible",
    typeLabel: "boolean",
    defaultLabel: "false",
    description:
      "Initial uncontrolled visibility. Reset returns to this value.",
  },
  {
    name: "onVisibleChange",
    typeLabel: "(visible: boolean) => void",
    description:
      "Receives one requested visibility change per accepted activation.",
  },
  {
    name: "showLabel",
    typeLabel: "string",
    description:
      "Explicit hidden-state action label; overrides LocaleProvider showPassword.",
  },
  {
    name: "hideLabel",
    typeLabel: "string",
    description:
      "Explicit visible-state action label; overrides LocaleProvider hidePassword.",
  },
  {
    name: "variant",
    typeLabel: "ResponsiveValue<PasswordToggleFieldVariant>",
    defaultLabel: '"outline"',
    description:
      "outline, surface, soft, subtle, ghost, plain or underline. Responsive variants exclude radius and shape.",
  },
  {
    name: "size",
    typeLabel: "ResponsiveValue<ControlSize>",
    defaultLabel: '"lg"',
    description: "2xs, xs, sm, md, lg, xl or 2xl.",
  },
  {
    name: "radius",
    typeLabel: "Radius",
    description: "Token-based corners for non-underline scalar variants.",
  },
  {
    name: "shape",
    typeLabel: '"sharp" | "rounded" | "pill"',
    defaultLabel: '"rounded"',
    description: "Convenience geometry for non-underline scalar variants.",
  },
  {
    name: "fullWidth",
    typeLabel: "boolean",
    defaultLabel: "true",
    description: "Fill the available inline width.",
  },
];

export const inputRows: DocsPropDefinition<PasswordToggleFieldInputProps>[] = [
  { name: "name", typeLabel: "string", description: "Native form field name." },
  {
    name: "value",
    typeLabel: "string",
    description: "Controlled native value; pair with onChange.",
  },
  {
    name: "defaultValue",
    typeLabel: "string",
    description: "Initial DOM-owned native value.",
  },
  {
    name: "autoComplete",
    typeLabel: "string",
    description: "Choose current-password or new-password deliberately.",
  },
  {
    name: "asChild",
    typeLabel: "boolean",
    description:
      "Use one child input host while preserving Atom props, handlers and the forwarded native input ref.",
  },
  {
    name: "render",
    typeLabel: "RenderProp",
    description:
      "Render a custom input host while preserving Atom props, handlers and ref.",
  },
];

export const toggleRows: DocsPropDefinition<PasswordToggleFieldToggleProps>[] =
  [
    {
      name: "children",
      typeLabel: "ReactNode",
      description: "Custom action content; omission renders Icon.",
    },
    {
      name: "aria-label",
      typeLabel: "string",
      description:
        "One explicit action name. Prefer Root showLabel/hideLabel for state-aware localization.",
    },
    {
      name: "asChild",
      typeLabel: "boolean",
      description:
        "Compose another button host, including IconButton, while retaining Atom activation and the forwarded button ref.",
    },
    {
      name: "render",
      typeLabel: "RenderProp",
      description:
        "Render a custom button host while retaining Atom activation and ref.",
    },
  ];

export const iconRows: DocsPropDefinition<PasswordToggleFieldIconProps>[] = [
  {
    name: "hidden",
    typeLabel: "ReactNode",
    description: "Decorative artwork shown while the input is concealed.",
  },
  {
    name: "visible",
    typeLabel: "ReactNode",
    description: "Decorative artwork shown while the input is revealed.",
  },
];

export const sections: DocsSectionMetadata[] = [
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  ...examples.map(({ id, title }) => ({ id, title, level: 3 as const })),
  { id: "props", title: "Props", level: 2 },
  { id: "props-root", title: "Root", level: 3 },
  { id: "props-input", title: "Input", level: 3 },
  { id: "props-toggle", title: "Toggle", level: 3 },
  { id: "props-icon", title: "Icon", level: 3 },
];
