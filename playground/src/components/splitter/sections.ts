import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
export const splitterSections = [
  {
    "id": "usage",
    "title": "Usage",
    "level": 2
  },
  {
    "id": "shortcuts",
    "title": "Shortcuts",
    "level": 2
  },
  {
    "id": "examples",
    "title": "Examples",
    "level": 2
  },
  {
    "id": "controlled",
    "title": "Controlled",
    "level": 3
  },
  {
    "id": "vertical",
    "title": "Vertical",
    "level": 3
  },
  {
    "id": "multiple",
    "title": "Multiple panels",
    "level": 3
  },
  {
    "id": "collapsible",
    "title": "Collapse and constraints",
    "level": 3
  },
  {
    "id": "pixels",
    "title": "Pixel sizes and preservation",
    "level": 3
  },
  {
    "id": "nested",
    "title": "Nested panels",
    "level": 3
  },
  {
    "id": "disabled",
    "title": "Disabled resizing",
    "level": 3
  },
  {
    "id": "separator",
    "title": "Separator only",
    "level": 3
  },
  {
    "id": "reset",
    "title": "Reset on double click",
    "level": 3
  },
  {
    "id": "events",
    "title": "Events and keyboard resizing",
    "level": 3
  },
  {"id":"store","title":"Store","level":3},
  {"id":"units","title":"CSS unit sizes","level":3},
  {"id":"dynamic","title":"Dynamic panels","level":3},
  {"id":"intersection","title":"Intersection dragging","level":3},
  {"id":"responsive","title":"Responsive orientation","level":3},
  {"id":"storage","title":"Storage","level":3},
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
  {
    "id": "splitter-root-props",
    "title": "Root",
    "level": 3
  },
  { "id": "splitter-provider-props", "title": "RootProvider", "level": 3 },
  {
    "id": "splitter-panel-props",
    "title": "Panel",
    "level": 3
  },
  {
    "id": "splitter-trigger-props",
    "title": "ResizeTrigger",
    "level": 3
  }
] as const satisfies readonly DocsSectionMetadata[];
export function splitterSection(id: string) { return splitterSections.find(section => section.id === id)!; }
