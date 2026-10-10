import type {
  SurfaceProps,
  SurfaceMediaProps,
  SurfaceScrimProps,
  SurfaceContentProps,
} from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
export const surfaceProps = [
  {
    name: "treatment",
    typeLabel: '"none" | "translucent"',
    defaultLabel: "—",
    description:
      "Opt-in surface preset; explicit parameters remain independent.",
  },
  {
    name: "backgroundOpacity",
    typeLabel: "number (0–1)",
    defaultLabel: "recipe",
    description: "Fill alpha multiplier; does not fade children.",
  },
  {
    name: "backdropBlur",
    typeLabel: '"none" | "sm" | "md" | "lg" | "0" | px/rem/em length',
    defaultLabel: "recipe",
    description: "Named or precise backdrop blur, for example 18px.",
  },
  {
    name: "backdropSaturate",
    typeLabel: "number ≥ 0",
    defaultLabel: "recipe",
    description: "Backdrop saturation; 1 leaves saturation unchanged.",
  },
  {
    name: "borderColor",
    typeLabel: "CSS color",
    defaultLabel: "semantic role",
    description: "Existing structural border color; does not create a border.",
  },
  {
    name: "borderOpacity",
    typeLabel: "number (0–1)",
    defaultLabel: "1",
    description: "Border alpha multiplier; independent of focus and selection.",
  },
  {
    name: "level",
    defaultLabel: '"base"',
    typeLabel: '"transparent" | "canvas" | "base" | "subtle" | "raised"',
    description:
      "Paint plane. Transparent removes fill; canvas remains opaque.",
  },
  {
    name: "tone",
    defaultLabel: '"neutral"',
    typeLabel: '"neutral" | "accent"',
    description: "Semantic foreground and background pairing.",
  },
  {
    name: "bordered",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Structural border independent of paint.",
  },
  {
    name: "elevation",
    defaultLabel: '"none"',
    typeLabel: '"none" | "low" | "medium" | "high"',
    description: "Shared theme shadow roles; does not set z-index.",
  },
  {
    name: "radius",
    defaultLabel: '"surface"',
    typeLabel: "Radius",
    description: "Core or semantic radius; does not clip content.",
  },
  {
    name: "inset",
    defaultLabel: '"none"',
    typeLabel: "ResponsiveValue<SurfaceInset>",
    description: "All-edge padding: none, sm, md, lg, xl or 2xl.",
  },
  {
    name: "as",
    defaultLabel: '"div"',
    typeLabel: "SurfaceElement",
    description: "Native host, mutually exclusive with asChild.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Merges paint, events and refs onto one non-Fragment child.",
  },
] as const satisfies readonly DocsPropDefinition<SurfaceProps>[];
export const surfaceMediaProps = [
  {
    name: "children",
    typeLabel: "ReactNode",
    description:
      "Decorative media only. The layer is aria-hidden and noninteractive.",
  },
] as const satisfies readonly DocsPropDefinition<SurfaceMediaProps>[];
export const surfaceScrimProps = [
  {
    name: "direction",
    defaultLabel: '"uniform"',
    typeLabel:
      '"uniform" | "inline-start" | "inline-end" | "block-start" | "block-end"',
    description:
      "Directional gradients support horizontal writing; inline follows resolved dir. Use uniform in vertical writing.",
  },
  {
    name: "strength",
    defaultLabel: '"medium"',
    typeLabel: '"soft" | "medium" | "strong"',
    description: "Intensity and directional reach. Verify foreground contrast.",
  },
] as const satisfies readonly DocsPropDefinition<SurfaceScrimProps>[];
export const surfaceContentProps = [
  {
    name: "children",
    typeLabel: "ReactNode",
    description:
      "Foreground above Media and Scrim. Use layout components to arrange it.",
  },
] as const satisfies readonly DocsPropDefinition<SurfaceContentProps>[];
