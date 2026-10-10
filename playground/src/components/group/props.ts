import type { GroupProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
export const groupProps = [
  {
    name: "attached",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Join adjacent borders and inside corners.",
  },
  {
    name: "grow",
    defaultLabel: "false",
    typeLabel: "ResponsiveValue<boolean>",
    description: "Share available space among participating items.",
  },
  {
    name: "orientation",
    defaultLabel: "horizontal",
    typeLabel: 'ResponsiveValue<"horizontal" | "vertical">',
    description: "Choose the group axis.",
  },
  {
    name: "gap",
    defaultLabel: "2",
    typeLabel: "ResponsiveValue<SpacingValue>",
    description: "Spacing between detached items. Attached forces zero gap.",
  },
  {
    name: "align",
    defaultLabel: "center",
    typeLabel:
      'ResponsiveValue<"start" | "end" | "center" | "stretch" | "baseline">',
    description: "Cross-axis alignment.",
  },
  {
    name: "justify",
    defaultLabel: "start",
    typeLabel:
      'ResponsiveValue<"start" | "end" | "center" | "space-between" | "space-around" | "space-evenly">',
    description: "Main-axis distribution.",
  },
  {
    name: "wrap",
    defaultLabel: "nowrap",
    typeLabel: 'ResponsiveValue<"nowrap" | "wrap" | "wrap-reverse">',
    description: "Wrapping; attachment remains source-order based.",
  },
  {
    name: "stacking",
    typeLabel: '"first-on-top" | "last-on-top"',
    description: "Default item stacking; focus and hover take precedence.",
  },
  {
    name: "skip",
    typeLabel: "(child: ReactElement) => boolean",
    description: "Exclude a child from grouping, without removing it.",
  },
  {
    name: "as",
    defaultLabel: "div",
    typeLabel: '"div" | "span"',
    description: "Native host.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Compose with one existing host instead of a wrapper.",
  },
] satisfies readonly DocsPropDefinition<GroupProps>[];
