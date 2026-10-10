import type { FloatRootProps, FloatAnchorProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
export const floatProps = [
 { name: "placement", defaultLabel: '"top-end"', typeLabel: "ResponsiveValue<FloatPlacement>", description: "Nine edge/center positions; start and end mirror in RTL." },
 { name: "offset", defaultLabel: "0", typeLabel: "ResponsiveValue<FloatOffset>", description: "Uniform edge inset. Positive moves inward; negative outward." },
 { name: "offsetInline", typeLabel: "ResponsiveValue<FloatOffset>", description: "Inline-axis override, including explicit zero. Centered axes ignore their offset." },
 { name: "offsetBlock", typeLabel: "ResponsiveValue<FloatOffset>", description: "Block-axis override. Centered axes ignore their offset." },
 { name: "as", defaultLabel: '"div"', typeLabel: "FloatElement", description: "Semantic host; mutually exclusive with asChild." },
 { name: "asChild", defaultLabel: "false", typeLabel: "boolean", description: "Compose onto exactly one child capable of owning absolute placement." },
] satisfies DocsPropDefinition<FloatRootProps>[];
export const floatAnchorProps = [
 { name: "inline", defaultLabel: "false", typeLabel: "boolean", description: "Use inline-block for a content-sized anchor; parent alignment still controls stretch." },
 { name: "as", defaultLabel: '"div"', typeLabel: "FloatElement", description: "Semantic containing-block host." },
 { name: "asChild", defaultLabel: "false", typeLabel: "boolean", description: "Reuse one existing containing-block host." },
] satisfies DocsPropDefinition<FloatAnchorProps>[];
