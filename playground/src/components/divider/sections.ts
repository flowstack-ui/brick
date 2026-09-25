import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const dividerSections = [
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
    id: "variants",
    title: "Variants",
    level: 3,
  },
  {
    id: "thickness",
    title: "Thickness",
    level: 3,
  },
  {
    id: "vertical",
    title: "Vertical",
    level: 3,
  },
  {
    id: "responsive",
    title: "Responsive",
    level: 3,
  },
  {
    id: "labels",
    title: "Labels",
    level: 3,
  },
  {
    id: "inset",
    title: "Inset",
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
export function dividerSection(id: string) {
  return dividerSections.find((section) => section.id === id)!;
}
