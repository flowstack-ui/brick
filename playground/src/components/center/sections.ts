import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const centerSections = [
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "icon", title: "Icon", level: 3 },
  { id: "inline", title: "Center with inline", level: 3 },
  { id: "square", title: "Square", level: 3 },
  { id: "circle", title: "Circle", level: 3 },
  { id: "responsive", title: "Responsive sizing", level: 3 },
  { id: "guide", title: "Guide", level: 2 },
  { id: "composition", title: "Choosing the right component", level: 3 },
  { id: "props", title: "Props", level: 2 },
  { id: "center-props", title: "Center", level: 3 },
  { id: "square-props", title: "Square", level: 3 },
  { id: "circle-props", title: "Circle", level: 3 },
] as const satisfies readonly DocsSectionMetadata[];
export function centerSection(id: (typeof centerSections)[number]["id"]) {
  return centerSections.find((section) => section.id === id)!;
}
