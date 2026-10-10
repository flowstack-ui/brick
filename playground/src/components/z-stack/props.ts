import type { ZStackRootProps, ZStackItemProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
const hostProps = (typeLabel: string) => [
  {
    name: "as",
    defaultLabel: '"div"',
    typeLabel,
    description:
      "Selects a structural HTML host. Mutually exclusive with asChild.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description:
      "Merges layout props and refs into one non-Fragment child that forwards both to its HTML host.",
  },
] as const;
export const zStackRootProps = [
  {
    name: "align",
    defaultLabel: '"stretch"',
    typeLabel: 'ResponsiveValue<"stretch" | "start" | "center" | "end">',
    description: "Block-axis alignment shared by the layers.",
  },
  {
    name: "justify",
    defaultLabel: '"stretch"',
    typeLabel: 'ResponsiveValue<"stretch" | "start" | "center" | "end">',
    description: "Logical inline-axis alignment shared by the layers.",
  },
  {
    name: "isolation",
    defaultLabel: '"contained"',
    typeLabel: '"contained" | "open"',
    description:
      "Contained isolates internal layers. Open lets them participate in an ancestor stacking context; it is not needed just to make actions clickable.",
  },
  ...hostProps("ZStackElement"),
] as const satisfies readonly DocsPropDefinition<ZStackRootProps>[];
export const zStackItemProps = [
  {
    name: "align",
    defaultLabel: '"auto"',
    typeLabel:
      'ResponsiveValue<"auto" | "stretch" | "start" | "center" | "end">',
    description: "Overrides block-axis alignment; auto follows Root.",
  },
  {
    name: "justify",
    defaultLabel: '"auto"',
    typeLabel:
      'ResponsiveValue<"auto" | "stretch" | "start" | "center" | "end">',
    description: "Overrides inline-axis alignment; auto follows Root.",
  },
  {
    name: "edgeSpacing",
    typeLabel: "ResponsiveValue<SpacingValue>",
    description:
      "Theme spacing around the layer. Numbers are spacing factors, strings support spacing tokens or CSS values. Omitted preserves host margins; zero resets them.",
  },
  {
    name: "layer",
    defaultLabel: '"base"',
    typeLabel: '"base" | "content" | "action"',
    description:
      "Closed internal depth levels: 0, 1 and 2. Keep DOM and keyboard order meaningful.",
  },
  ...hostProps("ZStackItemElement"),
] as const satisfies readonly DocsPropDefinition<ZStackItemProps>[];
