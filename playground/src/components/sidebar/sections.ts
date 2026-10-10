import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const sidebarSections = [
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
    id: "states",
    title: "States",
    level: 3,
  },
  {
    id: "rail",
    title: "Rail",
    level: 3,
  },
  {
    id: "sizes",
    title: "Sizes",
    level: 3,
  },
  {
    id: "floating",
    title: "Floating",
    level: 3,
  },
  {
    id: "borders",
    title: "Borders",
    level: 3,
  },
  {
    id: "insets",
    title: "Insets",
    level: 3,
  },
  {
    id: "sides",
    title: "Sides",
    level: 3,
  },
  {
    id: "scrolling",
    title: "Scrolling",
    level: 3,
  },
  {
    id: "controlled",
    title: "Controlled and disabled",
    level: 3,
  },
  {
    id: "sticky",
    title: "Sticky",
    level: 3,
  },
  {
    id: "mobile",
    title: "Mobile composition",
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
    id: "props-panel",
    title: "Panel",
    level: 3,
  },
  {
    id: "props-main",
    title: "Main",
    level: 3,
  },
  {
    id: "props-trigger",
    title: "Trigger",
    level: 3,
  },
  {
    id: "props-header",
    title: "Header",
    level: 3,
  },
  {
    id: "props-content",
    title: "Content",
    level: 3,
  },
  {
    id: "props-footer",
    title: "Footer",
    level: 3,
  },
] as const satisfies readonly DocsSectionMetadata[];
export function sidebarSection(id: (typeof sidebarSections)[number]["id"]) {
  return sidebarSections.find((section) => section.id === id)!;
}
