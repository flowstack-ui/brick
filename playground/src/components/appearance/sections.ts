import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const appearanceSections = [
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
    id: "nested",
    title: "Nested",
    level: 3,
  },
  {
    id: "portalled",
    title: "Portalled",
    level: 3,
  },
  {
    id: "page",
    title: "Page-specific appearance",
    level: 3,
  },
  {
    id: "native",
    title: "Native HTML",
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
export function appearanceSection(
  id: (typeof appearanceSections)[number]["id"],
) {
  return appearanceSections.find((section) => section.id === id)!;
}
