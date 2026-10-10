import type { AspectRatioRootProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";

export const aspectRatioProps = [
  {
    name: "ratio", defaultLabel: "16 / 9", typeLabel: "ResponsiveValue<number>",
    description: "Width divided by height. Accepts a positive number or numeric breakpoint values. Sparse objects keep 16:9 before the first breakpoint. Named aspectRatios constants are numbers, not strings.",
  },
  {
    name: "variant", defaultLabel: '"plain"', typeLabel: '"plain" | "subtle" | "outline"',
    description: "Plain is transparent, subtle adds a neutral fill, and outline adds a border without a background.",
  },
  {
    name: "radius", defaultLabel: '"none"', typeLabel: '"none" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "subtle" | "control" | "surface" | "overlay" | "full"',
    description: "Uses the shared Radius type. Core sizes are fixed tokens; semantic roles follow the theme. Full rounds a square into a circle.",
  },
  {
    name: "overflow", defaultLabel: '"hidden"', typeLabel: '"visible" | "hidden"',
    description: "Clips content at the frame boundary or allows it to extend beyond the frame. Visible overflow does not reserve extra layout space.",
  },
  {
    name: "contentLayout", defaultLabel: '"fill"', typeLabel: '"fill" | "flow"',
    description: "Fill stretches immediate element children across the frame. Flow preserves natural child layout. Child content keeps its own semantics and behavior.",
  },
  {
    name: "asChild", defaultLabel: "false", typeLabel: "boolean",
    description: "Merge the root props and ref onto one supplied child element instead of adding the default div.",
  },
  {
    name: "render", typeLabel: "RenderProp",
    description: "An element tag name, React element, or callback returning a React element. Custom callbacks must forward the supplied props, including the ref. Omission renders a div.",
  },
] as const satisfies readonly DocsPropDefinition<AspectRatioRootProps>[];
