import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";

export const bleedSections = [
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "vertical", title: "Vertical", level: 3 },
  { id: "specific-direction", title: "Specific direction", level: 3 },
  { id: "responsive", title: "Responsive", level: 3 },
  { id: "edge-override", title: "Edge override", level: 3 },
  { id: "composition", title: "Composition", level: 3 },
  { id: "guide", title: "Guide", level: 2 },
  { id: "matching-insets", title: "Matching parent insets", level: 3 },
  { id: "props", title: "Props", level: 2 },
] as const satisfies readonly DocsSectionMetadata[];

export function bleedSection(id: (typeof bleedSections)[number]["id"]) {
  return bleedSections.find(section => section.id === id)!;
}
