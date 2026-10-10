import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const aspectRatioSections = [
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "image", title: "Image", level: 3 },
  { id: "video", title: "Video", level: 3 },
  { id: "google-map", title: "Google Map", level: 3 },
  { id: "responsive", title: "Responsive", level: 3 },
  { id: "variants", title: "Variants", level: 3 },
  { id: "radius", title: "Radius", level: 3 },
  { id: "overflow", title: "Overflow", level: 3 },
  { id: "content-layout", title: "Content layout", level: 3 },
  { id: "guide", title: "Guide", level: 2 },
  { id: "aspect-ratio-tokens", title: "Aspect ratio tokens", level: 3 },
  { id: "props", title: "Props", level: 2 },
] as const satisfies readonly DocsSectionMetadata[];
export function aspectRatioSection(
  id: (typeof aspectRatioSections)[number]["id"],
) {
  return aspectRatioSections.find((section) => section.id === id)!;
}
