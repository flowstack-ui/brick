import type { PlaygroundEntry } from "./component-registry.js";

/** Copy-owned compositions are not public Brick component/API owners. */
export const compositionEntries: readonly PlaygroundEntry[] = [
  {
    kind: "composition",
    category: "Typography",
    id: "rich-text-editor",
    route: "/rich-text-editor",
    title: "Rich Text Editor",
    description: "A source-installed Tiptap editor composed with Brick controls.",
  },
];
