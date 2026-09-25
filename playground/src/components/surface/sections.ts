import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const surfaceSections = [
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
  { id: "surface-effects", title: "Surface effects", level: 3 },
  {
    id: "levels",
    title: "Levels",
    level: 3,
  },
  {
    id: "tones",
    title: "Tones",
    level: 3,
  },
  {
    id: "borders",
    title: "Borders",
    level: 3,
  },
  {
    id: "elevation",
    title: "Elevation",
    level: 3,
  },
  {
    id: "radius",
    title: "Radius",
    level: 3,
  },
  {
    id: "inset",
    title: "Inset",
    level: 3,
  },
  {
    id: "composition",
    title: "Composition",
    level: 3,
  },
  {
    id: "media",
    title: "Media",
    level: 3,
  },
  {
    id: "scrims",
    title: "Scrims",
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
    id: "props-media",
    title: "Media",
    level: 3,
  },
  {
    id: "props-scrim",
    title: "Scrim",
    level: 3,
  },
  {
    id: "props-content",
    title: "Content",
    level: 3,
  },
] as const satisfies readonly DocsSectionMetadata[];
export function surfaceSection(id: (typeof surfaceSections)[number]["id"]) {
  return surfaceSections.find((section) => section.id === id)!;
}
