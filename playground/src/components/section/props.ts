import type { SectionProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
export const sectionProps = [
  {
    name: "spacing",
    defaultLabel: '"md"',
    typeLabel: "ResponsiveValue<SectionSpacing>",
    description:
      "Both block edges: none, sm, md, lg, xl or 2xl. Sparse values inherit md.",
  },
  {
    name: "startSpacing",
    typeLabel: "ResponsiveValue<SectionSpacing>",
    description:
      "Overrides only the block-start edge; omitted breakpoints inherit spacing.",
  },
  {
    name: "endSpacing",
    typeLabel: "ResponsiveValue<SectionSpacing>",
    description: "Overrides only the block-end edge.",
  },
  {
    name: "as",
    defaultLabel: '"section"',
    typeLabel: '"section" | "div" | "article" | "aside"',
    description: "Semantic host. Use div for spacing without section meaning.",
  },
] as const satisfies readonly DocsPropDefinition<SectionProps>[];
