import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const frameSections = [
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
    id: "inline-constraints",
    title: "Inline constraints",
    level: 3,
  },
  {
    id: "block-constraints",
    title: "Block constraints",
    level: 3,
  },
  {
    id: "responsive",
    title: "Responsive",
    level: 3,
  },
  {
    id: "composition",
    title: "Composition",
    level: 3,
  },
  {
    id: "bounded-scrolling",
    title: "Bounded scrolling",
    level: 3,
  },
  {
    id: "guide",
    title: "Guide",
    level: 2,
  },
  {
    id: "sizing-ownership",
    title: "Sizing and composition",
    level: 3,
  },
  {
    id: "props",
    title: "Props",
    level: 2,
  },
] as const satisfies readonly DocsSectionMetadata[];
export function frameSection(id: (typeof frameSections)[number]["id"]) {
  return frameSections.find((section) => section.id === id)!;
}
