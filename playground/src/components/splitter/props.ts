import type { SplitterRootProps, SplitterPanelProps, SplitterResizeTriggerProps, SplitterRootProviderProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
export const splitterRootProps = [
  { name: "registry", typeLabel: "SplitterRegistry", description: "An optional shared registry for perpendicular intersection dragging." },
  {
    "name": "panels",
    "typeLabel": "readonly SplitterPanelConfig[]",
    "description": "Ordered stable IDs with minSize, maxSize, collapsible, collapsedSize and resizeBehavior. Render matching panels and adjacent triggers in that order."
  },
  {
    "name": "sizes",
    "typeLabel": "SplitterSizes",
    "description": "Controlled sizes keyed by panel ID. Numbers are percentages; strings accept %, px, em, rem, vw or vh."
  },
  {
    "name": "defaultSizes",
    "typeLabel": "SplitterSizes",
    "description": "Initial uncontrolled sizes. Unspecified panels share the remaining space.",
    "defaultLabel": "{}"
  },
  {
    "name": "orientation",
    "typeLabel": "\"horizontal\" | \"vertical\"",
    "description": "The layout axis; use Frame to establish a definite height for vertical panels.",
    "defaultLabel": "horizontal"
  },
  {
    "name": "dir",
    "typeLabel": "\"ltr\" | \"rtl\"",
    "description": "Direction inherited from the surrounding provider unless overridden."
  },
  {
    "name": "disabled",
    "typeLabel": "boolean",
    "description": "Disable all resize interactions.",
    "defaultLabel": "false"
  },
  {
    "name": "keyboardStep",
    "typeLabel": "number",
    "description": "Positive resize step in CSS pixels; Shift accelerates the step.",
    "defaultLabel": "10"
  },
  {
    "name": "onResizeStart",
    "typeLabel": "(details: SplitterResizeDetails) => void",
    "description": "Receives percentage sizes, measured pixels, input source and cancelled state."
  },
  {
    "name": "onResize",
    "typeLabel": "(details: SplitterResizeDetails) => void",
    "description": "Receives percentage sizes, measured pixels, input source and cancelled state."
  },
  {
    "name": "onResizeEnd",
    "typeLabel": "(details: SplitterResizeDetails) => void",
    "description": "Receives percentage sizes, measured pixels, input source and cancelled state."
  },
  {
    "name": "onCollapseChange",
    "typeLabel": "(details: { panelId: string; collapsed: boolean }) => void",
    "description": "Notifies actual collapse and expansion transitions."
  },
  {
    "name": "asChild",
    "typeLabel": "boolean",
    "description": "Merge onto one child host.",
    "defaultLabel": "false"
  },
  {
    "name": "render",
    "typeLabel": "RenderProp",
    "description": "Use the public render composition contract."
  }
] satisfies readonly DocsPropDefinition<SplitterRootProps>[];
export const splitterPanelProps = [
  {
    "name": "panelId",
    "typeLabel": "string",
    "description": "Required stable ID matching a Root panel descriptor."
  },
  {
    "name": "asChild",
    "typeLabel": "boolean",
    "description": "Merge onto one child host.",
    "defaultLabel": "false"
  },
  {
    "name": "render",
    "typeLabel": "RenderProp",
    "description": "Use the public render composition contract."
  }
] satisfies readonly DocsPropDefinition<SplitterPanelProps>[];
export const splitterTriggerProps = [
  {
    "name": "before",
    "typeLabel": "string",
    "description": "ID of the preceding adjacent panel."
  },
  {
    "name": "after",
    "typeLabel": "string",
    "description": "ID of the following adjacent panel."
  },
  {
    "name": "disabled",
    "typeLabel": "boolean",
    "description": "Disable this boundary only.",
    "defaultLabel": "false"
  },
  {
    "name": "valueText",
    "typeLabel": "(percent: number, pixels: number | null) => string",
    "description": "Localize the accessible value text."
  },
  {
    "name": "asChild",
    "typeLabel": "boolean",
    "description": "Merge onto one explicit child host; provide decorative content.",
    "defaultLabel": "false"
  },
  {
    "name": "render",
    "typeLabel": "RenderProp",
    "description": "Use the public render composition contract."
  }
] satisfies readonly DocsPropDefinition<SplitterResizeTriggerProps>[];
export const splitterProviderProps = [
  { name: "value", typeLabel: "UseSplitterReturn", description: "The value returned by useSplitter. Mount one provider for each store." },
  { name: "asChild", typeLabel: "boolean", defaultLabel: "false", description: "Merge onto one child host." },
  { name: "render", typeLabel: "RenderProp", description: "Render composition preserving the root behavior." },
] satisfies readonly DocsPropDefinition<SplitterRootProviderProps>[];
