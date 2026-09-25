import type { BadgeProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { BadgeBasic } from "./examples/BadgeBasic.js";
import BasicSource from "./examples/BadgeBasic.tsx?raw";
import { BadgeIcons } from "./examples/BadgeIcons.js";
import IconsSource from "./examples/BadgeIcons.tsx?raw";
import { BadgeVariants } from "./examples/BadgeVariants.js";
import VariantsSource from "./examples/BadgeVariants.tsx?raw";
import { BadgeTones } from "./examples/BadgeTones.js";
import TonesSource from "./examples/BadgeTones.tsx?raw";
import { BadgeSizes } from "./examples/BadgeSizes.js";
import SizesSource from "./examples/BadgeSizes.tsx?raw";
import { BadgeShapes } from "./examples/BadgeShapes.js";
import ShapesSource from "./examples/BadgeShapes.tsx?raw";
import { BadgeRadius } from "./examples/BadgeRadius.js";
import RadiusSource from "./examples/BadgeRadius.tsx?raw";
import { BadgeResponsive } from "./examples/BadgeResponsive.js";
import ResponsiveSource from "./examples/BadgeResponsive.tsx?raw";
import { BadgeComposition } from "./examples/BadgeComposition.js";
import CompositionSource from "./examples/BadgeComposition.tsx?raw";
export const Basic = BadgeBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
  {
    id: "icons",
    title: "Icons",
    description: "Text-relative leading and trailing icons.",
    Demo: BadgeIcons,
    source: IconsSource,
  },
  {
    id: "variants",
    title: "Variants",
    description: "Five paint treatments keep the same label geometry.",
    Demo: BadgeVariants,
    source: VariantsSource,
  },
  {
    id: "tones",
    title: "Tones",
    description: "Semantic colors reinforce visible status and category text.",
    Demo: BadgeTones,
    source: TonesSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Compact labels and the larger passive icon-well size.",
    Demo: BadgeSizes,
    source: SizesSource,
  },
  {
    id: "shapes",
    title: "Shapes",
    description:
      "Rounded and pill labels, single-character circles and a named passive icon.",
    Demo: BadgeShapes,
    source: ShapesSource,
  },
  {
    id: "radius",
    title: "Radius",
    description: "Use shared radius tokens instead of custom CSS.",
    Demo: BadgeRadius,
    source: RadiusSource,
  },
  {
    id: "responsive",
    title: "Responsive",
    description: "Density and paint adapt without duplicating content.",
    Demo: BadgeResponsive,
    source: ResponsiveSource,
  },
  {
    id: "composition",
    title: "Composition",
    description:
      "Preserve Badge foreground in nested Text and native semantics with asChild.",
    Demo: BadgeComposition,
    source: CompositionSource,
  },
];
export const parts: OwnerPart[] = [
  {
    id: "badge-props",
    title: "Badge",
    description: "Passive inline label presentation and composition.",
    rows: [
      {
        name: "variant",
        typeLabel:
          'ResponsiveValue<"soft" | "solid" | "outline" | "surface" | "plain">',
        defaultLabel: '"soft"',
        description: "Complete paint treatment.",
      },
      {
        name: "size",
        typeLabel: 'ResponsiveValue<"xs" | "sm" | "md" | "lg" | "xl">',
        defaultLabel: '"md"',
        description: "Label density; xl also supports passive icon wells.",
      },
      {
        name: "tone",
        typeLabel:
          '"neutral" | "accent" | "info" | "success" | "warning" | "danger"',
        defaultLabel: '"neutral"',
        description: "Semantic foreground/background family.",
      },
      {
        name: "shape",
        typeLabel: '"rounded" | "pill" | "circle"',
        defaultLabel: '"rounded"',
        description:
          "Use circle only for a compact icon or single character. Mutually exclusive with radius.",
      },
      {
        name: "radius",
        typeLabel:
          '"none" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full" | "control" | "surface" | "overlay" | "subtle"',
        defaultLabel: "—",
        description: "Shared Radius token; omit to preserve default shape.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Merge into one passive child host.",
      },
      {
        name: "render",
        typeLabel: "Atom render prop",
        defaultLabel: "—",
        description: "Provide a compatible alternate passive host.",
      },
    ] satisfies DocsPropDefinition<BadgeProps>[],
  },
];
export const sections = ownerSections(examples, parts);
