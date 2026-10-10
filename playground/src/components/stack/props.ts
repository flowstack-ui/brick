import type { StackProps, StackItemProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
export const stackProps = [
  { name: "separator", typeLabel: "ReactElement", description: "Decorative template inserted between authored peers. Not available with asChild or ul/ol hosts. Gap is applied on each side of the separator." },
  {
    name: "direction",
    defaultLabel: '"column"',
    typeLabel:
      'ResponsiveValue<"row" | "column" | "row-reverse" | "column-reverse">',
    description: "Flex direction. HStack and VStack keep their fixed axes.",
  },
  {
    name: "gap",
    defaultLabel: '"0"',
    typeLabel: "ResponsiveValue<SpacingValue>",
    description: "Shared gap baseline; numbers are spacing factors.",
  },
  {
    name: "rowGap",
    defaultLabel: "—",
    typeLabel: "ResponsiveValue<SpacingValue>",
    description: "Independent row-gap override.",
  },
  {
    name: "columnGap",
    defaultLabel: "—",
    typeLabel: "ResponsiveValue<SpacingValue>",
    description: "Independent column-gap override.",
  },
  {
    name: "align",
    defaultLabel: '"stretch"',
    typeLabel: "ResponsiveValue<StackAlign>",
    description: "CSS align-items; HStack defaults to center.",
  },
  {
    name: "justify",
    defaultLabel: '"start"',
    typeLabel: "ResponsiveValue<StackJustify>",
    description:
      "CSS justify-content, including between/around/evenly aliases.",
  },
  {
    name: "alignContent",
    defaultLabel: '"normal"',
    typeLabel: "ResponsiveValue<StackAlignContent>",
    description: "Distribution of wrapped lines in available cross-axis space.",
  },
  {
    name: "wrap",
    defaultLabel: "false",
    typeLabel: 'ResponsiveValue<boolean | "nowrap" | "wrap" | "wrap-reverse">',
    description: "Wrapping mode; true aliases wrap.",
  },
  {
    name: "inline",
    defaultLabel: "false",
    typeLabel: "ResponsiveValue<boolean>",
    description: "inline-flex display, without changing the semantic host.",
  },
  {
    name: "startSpacing",
    defaultLabel: "—",
    typeLabel: "ResponsiveValue<SpacingValue>",
    description:
      "Padding at main-start, mapped through direction and reversal.",
  },
  {
    name: "endSpacing",
    defaultLabel: "—",
    typeLabel: "ResponsiveValue<SpacingValue>",
    description:
      "Padding at main-end. A composed Surface keeps its inset as baseline.",
  },
  {
    name: "as",
    defaultLabel: '"div"',
    typeLabel: "StackElement",
    description: "Select a native host; use either as or asChild.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Adopt one non-Fragment element and merge props/refs.",
  },
] as const satisfies readonly DocsPropDefinition<StackProps>[];
export const stackItemProps = [
  {
    name: "flex",
    defaultLabel: '"content"',
    typeLabel: 'ResponsiveValue<"content" | "fixed" | "auto" | 1 | 2 | 3 | 4>',
    description:
      "Base allocation recipe. Explicit longhands override individual channels.",
  },
  {
    name: "grow",
    defaultLabel: "recipe",
    typeLabel: "ResponsiveValue<number>",
    description: "Finite nonnegative growth factor.",
  },
  {
    name: "shrink",
    defaultLabel: "recipe",
    typeLabel: "ResponsiveValue<number>",
    description: "Finite nonnegative shrink factor.",
  },
  {
    name: "basis",
    defaultLabel: "recipe",
    typeLabel: "ResponsiveValue<StackBasis>",
    description:
      "CSS basis. Numbers are pixels; percentages need definite main size.",
  },
  {
    name: "order",
    defaultLabel: "0",
    typeLabel: "ResponsiveValue<number>",
    description:
      "Finite integer. Changes visual order, never DOM or focus order.",
  },
  {
    name: "align",
    defaultLabel: '"auto"',
    typeLabel: "ResponsiveValue<StackItemAlign>",
    description: "CSS align-self; independent of the root alignment.",
  },
  {
    name: "marginInlineStart",
    defaultLabel: "—",
    typeLabel: "ResponsiveValue<SpacingValue>",
    description:
      "Logical margin; auto consumes free space, zero resets. Omitted preserves the host.",
  },
  {
    name: "marginInlineEnd",
    defaultLabel: "—",
    typeLabel: "ResponsiveValue<SpacingValue>",
    description:
      "Logical margin; auto consumes free space, zero resets. Omitted preserves the host.",
  },
  {
    name: "marginBlockStart",
    defaultLabel: "—",
    typeLabel: "ResponsiveValue<SpacingValue>",
    description:
      "Logical margin; auto consumes free space, zero resets. Omitted preserves the host.",
  },
  {
    name: "marginBlockEnd",
    defaultLabel: "—",
    typeLabel: "ResponsiveValue<SpacingValue>",
    description:
      "Logical margin; auto consumes free space, zero resets. Omitted preserves the host.",
  },
  {
    name: "as",
    defaultLabel: '"div"',
    typeLabel: "StackItemElement",
    description: "Item host.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description:
      "Adopt an existing item host; preserve its control minimum block size.",
  },
] as const satisfies readonly DocsPropDefinition<StackItemProps>[];
