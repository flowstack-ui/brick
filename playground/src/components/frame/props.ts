import type { FrameProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
export const frameProps = [
  {
    name: "inlineSize",
    defaultLabel: "—",
    typeLabel: "ResponsiveValue<string | number>",
    description:
      "Inline-axis size. Finite nonnegative numbers use px; strings accept CSS lengths and functions. Omitted dimensions preserve the host recipe; sparse values activate at their first breakpoint.",
  },
  {
    name: "minInlineSize",
    defaultLabel: "—",
    typeLabel: "ResponsiveValue<string | number>",
    description:
      "Inline-axis minimum. Finite nonnegative numbers use px; strings accept CSS lengths and functions. Omitted dimensions preserve the host recipe; sparse values activate at their first breakpoint.",
  },
  {
    name: "maxInlineSize",
    defaultLabel: "—",
    typeLabel: "ResponsiveValue<string | number>",
    description:
      "Inline-axis maximum. Finite nonnegative numbers use px; strings accept CSS lengths and functions. Omitted dimensions preserve the host recipe; sparse values activate at their first breakpoint.",
  },
  {
    name: "blockSize",
    defaultLabel: "—",
    typeLabel: "ResponsiveValue<string | number>",
    description:
      "Block-axis size. Finite nonnegative numbers use px; strings accept CSS lengths and functions. Omitted dimensions preserve the host recipe; sparse values activate at their first breakpoint.",
  },
  {
    name: "minBlockSize",
    defaultLabel: "—",
    typeLabel: "ResponsiveValue<string | number>",
    description:
      "Block-axis minimum. Finite nonnegative numbers use px; strings accept CSS lengths and functions. Omitted dimensions preserve the host recipe; sparse values activate at their first breakpoint.",
  },
  {
    name: "maxBlockSize",
    defaultLabel: "—",
    typeLabel: "ResponsiveValue<string | number>",
    description:
      "Block-axis maximum. Finite nonnegative numbers use px; strings accept CSS lengths and functions. Omitted dimensions preserve the host recipe; sparse values activate at their first breakpoint.",
  },
  {
    name: "as",
    defaultLabel: '"div"',
    typeLabel: "FrameElement",
    description:
      "Selects a structural HTML host. Mutually exclusive with asChild.",
  },
  {
    name: "asChild",
    defaultLabel: "false",
    typeLabel: "boolean",
    description:
      "Merges constraints and refs into one non-Fragment child that forwards props and ref.",
  },
] as const satisfies readonly DocsPropDefinition<FrameProps>[];
