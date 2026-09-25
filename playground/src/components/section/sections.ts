import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const sectionSections = [
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
    id: "rhythm",
    title: "Rhythm",
    level: 3,
  },
  {
    id: "responsive",
    title: "Responsive",
    level: 3,
  },
  {
    id: "edges",
    title: "Edges",
    level: 3,
  },
  {
    id: "composition",
    title: "Composition",
    level: 3,
  },
  {
    id: "props",
    title: "Props",
    level: 2,
  },
] as const satisfies readonly DocsSectionMetadata[];
export function sectionSection(id: (typeof sectionSections)[number]["id"]) {
  return sectionSections.find((section) => section.id === id)!;
}
