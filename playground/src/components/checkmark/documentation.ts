import { CheckmarkBasic } from "./examples/CheckmarkBasic.js";
import BasicSource from "./examples/CheckmarkBasic.tsx?raw";
import { CheckmarkStates } from "./examples/CheckmarkStates.js";
import StatesSource from "./examples/CheckmarkStates.tsx?raw";
import { CheckmarkSizes } from "./examples/CheckmarkSizes.js";
import SizesSource from "./examples/CheckmarkSizes.tsx?raw";
import { CheckmarkVariants } from "./examples/CheckmarkVariants.js";
import VariantsSource from "./examples/CheckmarkVariants.tsx?raw";
import { CheckmarkTones } from "./examples/CheckmarkTones.js";
import TonesSource from "./examples/CheckmarkTones.tsx?raw";
import { CheckmarkFilled } from "./examples/CheckmarkFilled.js";
import FilledSource from "./examples/CheckmarkFilled.tsx?raw";
import { CheckmarkResponsive } from "./examples/CheckmarkResponsive.js";
import ResponsiveSource from "./examples/CheckmarkResponsive.tsx?raw";
import { CheckmarkControlled } from "./examples/CheckmarkControlled.js";
import ControlledSource from "./examples/CheckmarkControlled.tsx?raw";
import { CheckmarkRadius } from "./examples/CheckmarkRadius.js";
import RadiusSource from "./examples/CheckmarkRadius.tsx?raw";
import type { CheckmarkProps } from "@flowstack-ui/brick";
import type { OwnerExample } from "../../shared/OwnerDocumentation.js";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
export const Basic = CheckmarkBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
  {
    id: "states",
    title: "States",
    description:
      "Mirror checked and disabled state; invalid changes only the mark paint, not the parent semantics.",
    Demo: CheckmarkStates,
    source: StatesSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Choose 12, 16, 20 or 24px marks independently of the parent control height.",
    Demo: CheckmarkSizes,
    source: SizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description:
      "Compare unchecked and checked marks in each recipe. Soft is retained alongside subtle.",
    Demo: CheckmarkVariants,
    source: VariantsSource,
  },
  {
    id: "tones",
    title: "Tones",
    description:
      "Use semantic tones. Neutral and contrast intentionally share this indicator palette.",
    Demo: CheckmarkTones,
    source: TonesSource,
  },
  {
    id: "filled",
    title: "Filled",
    description:
      "Use filled with outline to give the mark an opaque canvas on a tinted surface.",
    Demo: CheckmarkFilled,
    source: FilledSource,
  },
  {
    id: "responsive",
    title: "Responsive",
    description:
      "Size and variant accept sparse breakpoint values without JavaScript layout changes.",
    Demo: CheckmarkResponsive,
    source: ResponsiveSource,
  },
  {
    id: "controlled",
    title: "Controlled",
    description:
      "The named button owns interaction and accessible pressed state; the mark is decorative.",
    Demo: CheckmarkControlled,
    source: ControlledSource,
  },
  {
    id: "radius",
    title: "Radius",
    description: "Checkmark supports the shared radius contract.",
    Demo: CheckmarkRadius,
    source: RadiusSource,
  },
];
export const rows: DocsPropDefinition<CheckmarkProps>[] = [
  {
    name: "checked",
    typeLabel: "boolean",
    defaultLabel: "false",
    description: "Mirror parent-owned selection.",
  },
  {
    name: "indeterminate",
    typeLabel: "boolean",
    defaultLabel: "false",
    description: "Mixed visual state takes precedence over checked.",
  },
  {
    name: "disabled",
    typeLabel: "boolean",
    defaultLabel: "false",
    description:
      "Fade the mark and use a disabled cursor; no behavior is added.",
  },
  {
    name: "invalid",
    typeLabel: "boolean",
    defaultLabel: "false",
    description: "Passive validation paint; parent owns semantic validation.",
  },
  {
    name: "filled",
    typeLabel: "boolean",
    defaultLabel: "false",
    description:
      "Canvas behind transparent boxed recipes; plain stays unboxed and solid selection keeps contrast.",
  },
  {
    name: "size",
    typeLabel: 'ResponsiveValue<"xs" | "sm" | "md" | "lg">',
    defaultLabel: '"md"',
    description: "12/16/20/24px geometry.",
  },
  {
    name: "variant",
    typeLabel:
      'ResponsiveValue<"solid" | "outline" | "subtle" | "soft" | "plain" | "inverted">',
    defaultLabel: '"solid"',
    description: "Sparse responsive visual recipe.",
  },
  {
    name: "tone",
    typeLabel:
      '"neutral" | "contrast" | "accent" | "info" | "success" | "warning" | "danger"',
    defaultLabel: '"accent"',
    description: "Semantic palette. Neutral and contrast share paint.",
  },
  {
    name: "radius",
    typeLabel:
      "'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'subtle' | 'control' | 'surface' | 'overlay' | 'full'",
    defaultLabel: "subtle",
    description: "Shared corner token.",
  },
];
export const sections = [
  { id: "usage", title: "Usage", level: 2 as const },
  { id: "examples", title: "Examples", level: 2 as const },
  ...examples.map(({ id, title }) => ({ id, title, level: 3 as const })),
  { id: "props", title: "Props", level: 2 as const },
];
