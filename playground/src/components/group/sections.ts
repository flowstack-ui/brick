import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const groupSections = [
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
    id: "attached",
    title: "Attached",
    level: 3,
  },
  {
    id: "mixed",
    title: "Mixed controls",
    level: 3,
  },
  {
    id: "grow",
    title: "Grow",
    level: 3,
  },
  {
    id: "vertical",
    title: "Orientation",
    level: 3,
  },
  {
    id: "alignment",
    title: "Alignment",
    level: 3,
  },
  {
    id: "wrap",
    title: "Wrapping",
    level: 3,
  },
  {
    id: "stacking",
    title: "Stacking",
    level: 3,
  },
  {
    id: "skip",
    title: "Skip a child",
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
] as const satisfies readonly DocsSectionMetadata[];
export function groupSection(id: string) {
  return groupSections.find((section) => section.id === id)!;
}
