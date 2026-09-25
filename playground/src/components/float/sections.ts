import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const floatSections = [
  {
    "id": "usage",
    "title": "Usage",
    "level": 2
  },
  {
    "id": "examples",
    "title": "Examples",
    "level": 2
  },
  {
    "id": "placement",
    "title": "Placement",
    "level": 3
  },
  {
    "id": "offsets",
    "title": "Offsets",
    "level": 3
  },
  {
    "id": "avatar",
    "title": "Avatar",
    "level": 3
  },
  {
    "id": "responsive",
    "title": "Responsive",
    "level": 3
  },
  {
    "id": "inline",
    "title": "Inline anchor",
    "level": 3
  },
  {
    "id": "composition",
    "title": "Composition",
    "level": 3
  },
  {
    "id": "guide",
    "title": "Guide",
    "level": 2
  },
  {
    "id": "props",
    "title": "Props",
    "level": 2
  },
  { id: "float-root-props", title: "Root", level: 3 },
  { id: "float-anchor-props", title: "Anchor", level: 3 }
] as const satisfies readonly DocsSectionMetadata[];
export function floatSection(id: string) { return floatSections.find(section => section.id === id)!; }
