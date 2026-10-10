import type { DividerProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
export const dividerProps = [
  {
    name: "orientation",
    defaultLabel: "horizontal",
    typeLabel: 'ResponsiveValue<"horizontal" | "vertical">',
    description:
      "Responsive only for decorative, unlabeled dividers. Semantic separators require a scalar orientation; labels are horizontal.",
  },
  {
    name: "variant",
    defaultLabel: "solid",
    typeLabel: '"solid" | "dashed" | "dotted"',
    description: "Border style.",
  },
  {
    name: "thickness",
    defaultLabel: "subtle",
    typeLabel: '"hairline" | "subtle" | "regular" | "bold" | "strong"',
    description: "Line weights: 0.5, 1, 2, 3 and 4px at the default root size.",
  },
  {
    name: "inset",
    defaultLabel: "none",
    typeLabel: '"none" | "start" | "both"',
    description: "Inset the line along its logical axis.",
  },
  {
    name: "stretch",
    defaultLabel: "false",
    typeLabel: "boolean",
    description:
      "Stretch in the parent cross axis, useful for vertical lines in a row.",
  },
  {
    name: "labelAlign",
    defaultLabel: "center",
    typeLabel: '"start" | "center" | "end"',
    description: "Place horizontal label content between the line segments.",
  },
  {
    name: "decorative",
    defaultLabel: "true",
    typeLabel: "boolean",
    description: "Omit separator semantics for purely visual separation.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Compose an unlabeled divider onto one child host.",
  },
] satisfies readonly DocsPropDefinition<DividerProps>[];
