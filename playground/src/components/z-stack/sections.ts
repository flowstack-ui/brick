import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const zStackSections = [
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
    id: "placement",
    title: "Placement",
    level: 3,
  },
  {
    id: "items",
    title: "Item placement",
    level: 3,
  },
  {
    id: "responsive",
    title: "Responsive",
    level: 3,
  },
  {
    id: "natural-sizing",
    title: "Natural sizing",
    level: 3,
  },
  {
    id: "layers",
    title: "Layers and actions",
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
    id: "overlap-ownership",
    title: "Overlap and isolation",
    level: 3,
  },
  {
    id: "props",
    title: "Props",
    level: 2,
  },
  {
    id: "props-root",
    title: "Root",
    level: 3,
  },
  {
    id: "props-item",
    title: "Item",
    level: 3,
  },
] as const satisfies readonly DocsSectionMetadata[];
export function zStackSection(id: (typeof zStackSections)[number]["id"]) {
  return zStackSections.find((s) => s.id === id)!;
}
