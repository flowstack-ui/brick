import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const gridSections = [
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
    id: "spans",
    title: "Spanning",
    level: 3,
  },
  {
    id: "templates",
    title: "Track templates",
    level: 3,
  },
  {
    id: "areas",
    title: "Named areas",
    level: 3,
  },
  {
    id: "flow",
    title: "Auto flow",
    level: 3,
  },
  {
    id: "intrinsic",
    title: "Intrinsic columns",
    level: 3,
  },
  {
    id: "responsive",
    title: "Responsive placement",
    level: 3,
  },
  {
    id: "alignment",
    title: "Alignment and distribution",
    level: 3,
  },
  {
    id: "inline",
    title: "Inline and composition",
    level: 3,
  },
  {
    id: "implicit",
    title: "Implicit tracks",
    level: 3,
  },
  {
    id: "subgrid",
    title: "Subgrid",
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
  {
    id: "grid-root-props",
    title: "Root",
    level: 3,
  },
  {
    id: "grid-item-props",
    title: "Item",
    level: 3,
  },
] as const satisfies readonly DocsSectionMetadata[];
export function gridSection(id: string) {
  return gridSections.find((section) => section.id === id)!;
}
