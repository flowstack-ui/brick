import { RadiomarkBasic } from "./examples/RadiomarkBasic.js";
import BasicSource from "./examples/RadiomarkBasic.tsx?raw";
import { RadiomarkStates } from "./examples/RadiomarkStates.js";
import StatesSource from "./examples/RadiomarkStates.tsx?raw";
import { RadiomarkSizes } from "./examples/RadiomarkSizes.js";
import SizesSource from "./examples/RadiomarkSizes.tsx?raw";
import { RadiomarkVariants } from "./examples/RadiomarkVariants.js";
import VariantsSource from "./examples/RadiomarkVariants.tsx?raw";
import { RadiomarkTones } from "./examples/RadiomarkTones.js";
import TonesSource from "./examples/RadiomarkTones.tsx?raw";
import { RadiomarkFilled } from "./examples/RadiomarkFilled.js";
import FilledSource from "./examples/RadiomarkFilled.tsx?raw";
import { RadiomarkResponsive } from "./examples/RadiomarkResponsive.js";
import ResponsiveSource from "./examples/RadiomarkResponsive.tsx?raw";
import { RadiomarkControlled } from "./examples/RadiomarkControlled.js";
import ControlledSource from "./examples/RadiomarkControlled.tsx?raw";
import { RadiomarkArtwork } from "./examples/RadiomarkArtwork.js";
import ArtworkSource from "./examples/RadiomarkArtwork.tsx?raw";
import type { RadiomarkProps } from "@flowstack-ui/brick";
import type { OwnerExample } from "../../shared/OwnerDocumentation.js";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
export const Basic = RadiomarkBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
  {
    id: "states",
    title: "States",
    description:
      "Mirror checked and disabled state; invalid changes only the mark paint, not the parent semantics.",
    Demo: RadiomarkStates,
    source: StatesSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Choose 12, 16, 20 or 24px marks independently of the parent control height.",
    Demo: RadiomarkSizes,
    source: SizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description:
      "Compare unchecked and checked marks in each recipe. Soft is retained alongside subtle.",
    Demo: RadiomarkVariants,
    source: VariantsSource,
  },
  {
    id: "tones",
    title: "Tones",
    description:
      "Use semantic tones. Neutral and contrast intentionally share this indicator palette.",
    Demo: RadiomarkTones,
    source: TonesSource,
  },
  {
    id: "filled",
    title: "Filled",
    description:
      "Use filled with outline to give the mark an opaque canvas on a tinted surface.",
    Demo: RadiomarkFilled,
    source: FilledSource,
  },
  {
    id: "responsive",
    title: "Responsive",
    description:
      "Size and variant accept sparse breakpoint values without JavaScript layout changes.",
    Demo: RadiomarkResponsive,
    source: ResponsiveSource,
  },
  {
    id: "controlled",
    title: "Controlled",
    description:
      "The named button owns interaction and accessible pressed state; the mark is decorative.",
    Demo: RadiomarkControlled,
    source: ControlledSource,
  },
  {
    id: "artwork",
    title: "Artwork",
    description:
      "Replace the radio dot with one decorative icon; never put an interactive child inside the mark.",
    Demo: RadiomarkArtwork,
    source: ArtworkSource,
  },
];
export const rows: DocsPropDefinition<RadiomarkProps>[] = [
  {
    name: "checked",
    typeLabel: "boolean",
    defaultLabel: "false",
    description: "Mirror parent-owned selection.",
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
      'ResponsiveValue<"solid" | "outline" | "subtle" | "soft" | "inverted">',
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
    name: "children",
    typeLabel: "ReactNode",
    defaultLabel: "dot",
    description: "Decorative replacement artwork.",
  },
];
export const sections = [
  { id: "usage", title: "Usage", level: 2 as const },
  { id: "examples", title: "Examples", level: 2 as const },
  ...examples.map(({ id, title }) => ({ id, title, level: 3 as const })),
  { id: "props", title: "Props", level: 2 as const },
];
