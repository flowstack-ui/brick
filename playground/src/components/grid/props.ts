import type { GridRootProps, GridItemProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
export const gridRootProps = [
  {
    name: "columns",
    defaultLabel: "1",
    typeLabel: "ResponsiveValue<1 | … | 12>",
    description: "Equal columns; excludes minItemSize and templateColumns.",
  },
  {
    name: "minItemSize",
    typeLabel: '"xs" | "sm" | "md" | "lg" | "xl"',
    description: "Intrinsic auto-fit columns; excludes other column modes.",
  },
  {
    name: "templateColumns",
    typeLabel: "ResponsiveValue<string>",
    description: "Native CSS column tracks, including named lines and subgrid.",
  },
  {
    name: "templateRows",
    typeLabel: "ResponsiveValue<string>",
    description: "Native CSS grid templateRows.",
  },
  {
    name: "templateAreas",
    typeLabel: "ResponsiveValue<string>",
    description: "Native CSS grid templateAreas.",
  },
  {
    name: "autoColumns",
    typeLabel: "ResponsiveValue<string>",
    description: "Native CSS grid autoColumns.",
  },
  {
    name: "autoRows",
    typeLabel: "ResponsiveValue<string>",
    description: "Native CSS grid autoRows.",
  },
  {
    name: "autoFlow",
    defaultLabel: "row",
    typeLabel:
      'ResponsiveValue<"row" | "column" | "dense" | "row dense" | "column dense">',
    description:
      "Implicit item placement. Dense flow does not change source order.",
  },
  {
    name: "gap",
    defaultLabel: "0",
    typeLabel: "ResponsiveValue<SpacingValue>",
    description: "Spacing between tracks; axis values override gap.",
  },
  {
    name: "rowGap",
    typeLabel: "ResponsiveValue<SpacingValue>",
    description: "Spacing between tracks; axis values override gap.",
  },
  {
    name: "columnGap",
    typeLabel: "ResponsiveValue<SpacingValue>",
    description: "Spacing between tracks; axis values override gap.",
  },
  {
    name: "align",
    defaultLabel: "stretch",
    typeLabel: "ResponsiveValue<GridAlign>",
    description: "Alignment inside each grid cell.",
  },
  {
    name: "justify",
    defaultLabel: "stretch",
    typeLabel: "ResponsiveValue<GridJustify>",
    description: "Alignment inside each grid cell.",
  },
  {
    name: "alignContent",
    defaultLabel: "normal",
    typeLabel: "ResponsiveValue<GridContentAlignment>",
    description: "Distribution of tracks within remaining container space.",
  },
  {
    name: "justifyContent",
    defaultLabel: "normal",
    typeLabel: "ResponsiveValue<GridContentAlignment>",
    description: "Distribution of tracks within remaining container space.",
  },
  {
    name: "inline",
    defaultLabel: "false",
    typeLabel: "ResponsiveValue<boolean>",
    description: "Use inline-grid instead of grid.",
  },
  {
    name: "as",
    defaultLabel: "div",
    typeLabel: "GridRootElement",
    description: "Native semantic host.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Merge onto one existing element; excludes as.",
  },
] satisfies readonly DocsPropDefinition<GridRootProps>[];
export const gridItemProps = [
  {
    name: "area",
    typeLabel: "ResponsiveValue<string>",
    description: "Named area; excludes other placement props.",
  },
  {
    name: "columnSpan",
    typeLabel: 'ResponsiveValue<number | "auto" | "full">',
    description: "Positive integer span; full covers all explicit columns.",
  },
  {
    name: "rowSpan",
    typeLabel: 'ResponsiveValue<number | "auto">',
    description: "Positive integer span; full covers all explicit columns.",
  },
  {
    name: "columnStart",
    typeLabel: "ResponsiveValue<number | string>",
    description:
      "Numeric or named grid line, including auto and negative lines.",
  },
  {
    name: "columnEnd",
    typeLabel: "ResponsiveValue<number | string>",
    description:
      "Numeric or named grid line, including auto and negative lines.",
  },
  {
    name: "rowStart",
    typeLabel: "ResponsiveValue<number | string>",
    description:
      "Numeric or named grid line, including auto and negative lines.",
  },
  {
    name: "rowEnd",
    typeLabel: "ResponsiveValue<number | string>",
    description:
      "Numeric or named grid line, including auto and negative lines.",
  },
  {
    name: "align",
    defaultLabel: "auto",
    typeLabel: "ResponsiveValue<GridSelfAlign>",
    description: "Override this item's alignment.",
  },
  {
    name: "justify",
    defaultLabel: "auto",
    typeLabel: "ResponsiveValue<GridSelfJustify>",
    description: "Override this item's alignment.",
  },
  {
    name: "as",
    defaultLabel: "div",
    typeLabel: "GridItemElement",
    description: "Native semantic host.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description: "Apply placement to one existing element.",
  },
] satisfies readonly DocsPropDefinition<GridItemProps>[];
