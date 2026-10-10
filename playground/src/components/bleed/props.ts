import type { BleedProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";

export const bleedProps = [
  { name: "inline", defaultLabel: "0", typeLabel: "ResponsiveValue<SpacingValue>", description: "Extends both inline edges. Use a non-negative spacing amount; Bleed converts it to negative margins." },
  { name: "block", defaultLabel: "0", typeLabel: "ResponsiveValue<SpacingValue>", description: "Extends both block edges. In ordinary horizontal writing, these are top and bottom." },
  { name: "inlineStart", defaultLabel: "inline", typeLabel: "ResponsiveValue<SpacingValue>", description: "Overrides inline at the start edge: left in LTR, right in RTL. Zero disables this edge." },
  { name: "inlineEnd", defaultLabel: "inline", typeLabel: "ResponsiveValue<SpacingValue>", description: "Overrides inline at the end edge: right in LTR, left in RTL." },
  { name: "blockStart", defaultLabel: "block", typeLabel: "ResponsiveValue<SpacingValue>", description: "Overrides block at the block-start edge." },
  { name: "blockEnd", defaultLabel: "block", typeLabel: "ResponsiveValue<SpacingValue>", description: "Overrides block at the block-end edge." },
  { name: "as", defaultLabel: '"div"', typeLabel: '"div" | "span" | "section" | "article" | "aside" | "main" | "header" | "footer" | "nav" | "ul" | "ol" | "li"', description: "Selects the native host. For a different host or component, use asChild." },
  { name: "asChild", defaultLabel: "false", typeLabel: "boolean", description: "Merges margins, attributes and ref onto one non-Fragment child instead of adding a wrapper. Custom components must forward those props and ref." },
] as const satisfies readonly DocsPropDefinition<BleedProps>[];
