import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const scrollAreaSections = [
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
    id: "sizes",
    title: "Sizes",
    level: 3,
  },
  {
    id: "horizontal",
    title: "Horizontal",
    level: 3,
  },
  {
    id: "both",
    title: "Both directions",
    level: 3,
  },
  {
    id: "visibility",
    title: "Visibility",
    level: 3,
  },
  {
    id: "gutter",
    title: "Gutter",
    level: 3,
  },
  {
    id: "controller",
    title: "Controller and shadows",
    level: 3,
  },
  {
    id: "customization",
    title: "Customization",
    level: 3,
  },
  {
    id: "rtl",
    title: "RTL",
    level: 3,
  },
  {
    id: "dynamic",
    title: "Dynamic content",
    level: 3,
  },
  {
    id: "bottom",
    title: "Stick to bottom",
    level: 3,
  },
  {
    id: "virtual",
    title: "Virtualization",
    level: 3,
  },
  {
    id: "menu",
    title: "Menu integration",
    level: 3,
  },
  {
    id: "native",
    title: "Native scrolling",
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
  {
    id: "props-root",
    title: "Root",
    level: 3,
  },
  {
    id: "props-root-provider",
    title: "RootProvider",
    level: 3,
  },
  {
    id: "props-viewport",
    title: "Viewport",
    level: 3,
  },
  {
    id: "props-content",
    title: "Content",
    level: 3,
  },
  {
    id: "props-scrollbar",
    title: "Scrollbar",
    level: 3,
  },
  {
    id: "props-thumb",
    title: "Thumb",
    level: 3,
  },
  {
    id: "props-corner",
    title: "Corner",
    level: 3,
  },
  {
    id: "props-context",
    title: "Context",
    level: 3,
  },
] as const satisfies readonly DocsSectionMetadata[];
export function scrollAreaSection(id: string) {
  return scrollAreaSections.find((section) => section.id === id)!;
}
