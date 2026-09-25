import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const containerSections = [
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "measures", title: "Measures", level: 3 },
  { id: "fluid", title: "Fluid", level: 3 },
  { id: "gutters", title: "Gutters", level: 3 },
  { id: "centered-content", title: "Centered content", level: 3 },
  { id: "shared-alignment", title: "Shared alignment", level: 3 },
  { id: "as-child", title: "Composition", level: 3 },
  { id: "guide", title: "Guide", level: 2 },
  { id: "composition", title: "Measure and composition", level: 3 },
  { id: "props", title: "Props", level: 2 },
] as const satisfies readonly DocsSectionMetadata[];
export function containerSection(id: (typeof containerSections)[number]["id"]) {
  return containerSections.find((section) => section.id === id)!;
}
