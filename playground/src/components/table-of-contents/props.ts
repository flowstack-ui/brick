import type { TableOfContentsRootProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
export const tableOfContentsProps = [
  {
    name: "items",
    typeLabel: "readonly TableOfContentsItemData[]",
    description:
      "Explicit unique IDs and heading depths (1–6). Labels are authored Link children.",
  },
  {
    name: "size",
    typeLabel: '"sm" | "md"',
    defaultLabel: '"sm"',
    description: "Coordinated link text and minimum row size.",
  },
  {
    name: "variant",
    typeLabel: '"plain" | "line"',
    defaultLabel: '"plain"',
    description:
      "Transparent navigation, optionally with a logical-start rail.",
  },
  {
    name: "tone",
    typeLabel: '"neutral" | "accent"',
    defaultLabel: '"neutral"',
    description: "Current and hover foreground; no active fill.",
  },
  {
    name: "activeId",
    typeLabel: "string",
    description: "Controlled accepted current location.",
  },
  {
    name: "defaultActiveId",
    typeLabel: "string",
    defaultLabel: '""',
    description: "Initial uncontrolled current location.",
  },
  {
    name: "onActiveIdChange",
    typeLabel: "(id, details) => void",
    description: "Receives a requested location and its change reason.",
  },
  {
    name: "enabled",
    typeLabel: "boolean",
    defaultLabel: "true",
    description: "Enable target discovery and reading-position tracking.",
  },
  {
    name: "navigation",
    typeLabel: '"native" | "managed"',
    defaultLabel: "root-dependent",
    description:
      "Document links keep native behavior. A custom scroll element or ShadowRoot defaults to managed navigation.",
  },
  {
    name: "getTargetRoot",
    typeLabel: "() => Document | ShadowRoot | HTMLElement | null",
    defaultLabel: "document",
    description: "Scope target discovery; this is not the scrolling element.",
  },
  {
    name: "getScrollElement",
    typeLabel: "() => HTMLElement | null",
    defaultLabel: "document scrolling",
    description:
      "Article viewport. Nav has a separate getter for its rail viewport.",
  },
  {
    name: "scrollOffset",
    typeLabel: "number | (() => number)",
    defaultLabel: "computed scroll padding + margin",
    description:
      "Destination clearance in CSS pixels; application headers own this policy.",
  },
  {
    name: "scrollBehavior",
    typeLabel: '"instant" | "smooth"',
    defaultLabel: '"smooth"',
    description: "Managed scrolling; reduced motion always takes precedence.",
  },
  {
    name: "history",
    typeLabel: '"push" | "replace" | "none"',
    defaultLabel: '"push"',
    description:
      "Managed fragment-history policy. Native mode keeps browser behavior.",
  },
  {
    name: "focusTarget",
    typeLabel: "boolean",
    defaultLabel: "true",
    description:
      "Focus the target after managed activation, never during passive scrolling.",
  },
  {
    name: "asChild",
    typeLabel: "boolean",
    defaultLabel: "false",
    description:
      "Delegate the root to one element while preserving its relationships and ref.",
  },
] as const satisfies readonly DocsPropDefinition<TableOfContentsRootProps>[];
