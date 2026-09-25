import type { ContainerProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
export const containerProps = [
  {
    name: "measure",
    defaultLabel: '"wide"',
    typeLabel: '"narrow" | "medium" | "wide" | "max" | "full"',
    description:
      "Maximum border-box inline size: 42rem, 64rem, 72rem, 90rem, or no maximum. Gutters are included within this size.",
  },
  {
    name: "gutter",
    defaultLabel: '"md"',
    typeLabel: '"none" | "sm" | "md" | "lg"',
    description:
      "Logical inline padding. Nonzero recipes scale fluidly with the viewport; none removes padding without changing the measure.",
  },
  {
    name: "as",
    defaultLabel: '"div"',
    typeLabel:
      '"div" | "section" | "article" | "main" | "header" | "footer" | "nav" | "aside"',
    description:
      "Selects the single native host without adding a role or wrapper. Use either as or asChild.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description:
      "Adopts one non-Fragment child, merging props and refs without another wrapper. The child must forward props and ref to one HTML host.",
  },
] as const satisfies readonly DocsPropDefinition<ContainerProps>[];
