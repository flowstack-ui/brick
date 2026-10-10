import type {
  CenterProps,
  SquareProps,
  CircleProps,
} from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
export const centerProps = [
  {
    name: "inline",
    defaultLabel: "false",
    typeLabel: "boolean",
    description:
      "Uses inline-flex instead of flex. Choose an inline semantic host when placing Center inside text.",
  },
  {
    name: "as",
    defaultLabel: '"div"',
    typeLabel:
      '"div" | "span" | "section" | "article" | "aside" | "main" | "header" | "footer" | "nav" | "ul" | "ol" | "li"',
    description:
      "Selects the native host. Use asChild for other elements or components.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description:
      "Combines centering, attributes and ref with one child instead of adding a wrapper. The child must forward props and ref.",
  },
] as const satisfies readonly DocsPropDefinition<CenterProps>[];
export const squareProps = [
  {
    name: "size",
    typeLabel: "ResponsiveValue<string | number>",
    description:
      "Required equal width and height. Numbers are pixels; strings are CSS lengths. Breakpoint values carry forward. Without initial, baseline sizing is automatic.",
  },
  ...centerProps,
] as const satisfies readonly DocsPropDefinition<SquareProps>[];
export const circleProps = [
  ...squareProps,
] as const satisfies readonly DocsPropDefinition<CircleProps>[];
