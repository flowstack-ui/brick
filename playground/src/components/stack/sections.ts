import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const stackSections = [
  {
    id: "usage",
    title: "Usage",
    level: 2,
  },
  {
    id: "examples",
    title: "Examples",
    level: 2,
  },
  {
    id: "direction",
    title: "Direction",
    level: 3,
  },
  {
    id: "gaps",
    title: "Gaps",
    level: 3,
  },
  { id: "separator", title: "Separator", level: 3 },
  {
    id: "align",
    title: "Alignment",
    level: 3,
  },
  {
    id: "justify",
    title: "Distribution",
    level: 3,
  },
  {
    id: "wrapping",
    title: "Wrapping",
    level: 3,
  },
  {
    id: "lines",
    title: "Multiline alignment",
    level: 3,
  },
  {
    id: "recipes",
    title: "Item sizing",
    level: 3,
  },
  {
    id: "ordering",
    title: "Ordering",
    level: 3,
  },
  {
    id: "auto-margins",
    title: "Auto margins",
    level: 3,
  },
  {
    id: "spacer",
    title: "Weighted space",
    level: 3,
  },
  {
    id: "edges",
    title: "Edge spacing",
    level: 3,
  },
  {
    id: "inline",
    title: "Inline",
    level: 3,
  },
  {
    id: "composition",
    title: "Composition",
    level: 3,
  },
  {
    id: "guide",
    title: "Guide",
    level: 2,
  },
  {
    id: "props",
    title: "Props",
    level: 2,
  },
  { id: "stack-props", title: "Stack", level: 3 },
  { id: "stack-item-props", title: "Item", level: 3 },
  { id: "stack-separator-props", title: "Separator", level: 3 },
] as const satisfies readonly DocsSectionMetadata[];
export function stackSection(id: (typeof stackSections)[number]["id"]) {
  return stackSections.find((section) => section.id === id)!;
}
