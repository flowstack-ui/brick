import type { VisuallyHiddenRootProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import { VisuallyHiddenBasic } from "./examples/VisuallyHiddenBasic.js";
import basicSource from "./examples/VisuallyHiddenBasic.tsx?raw";
import { VisuallyHiddenContext } from "./examples/VisuallyHiddenContext.js";
import contextSource from "./examples/VisuallyHiddenContext.tsx?raw";
import { VisuallyHiddenComposition } from "./examples/VisuallyHiddenComposition.js";
import compositionSource from "./examples/VisuallyHiddenComposition.tsx?raw";
export { basicSource };
export const Basic = VisuallyHiddenBasic;
export const examples = [
  { id: "context", title: "Supplemental context", description: "Add specific context without repeating the visible label.", Demo: VisuallyHiddenContext, source: contextSource },
  { id: "composition", title: "Composition", description: "Use asChild or render to hide one passive semantic host without an extra wrapper.", Demo: VisuallyHiddenComposition, source: compositionSource },
];
export const rows: DocsPropDefinition<VisuallyHiddenRootProps>[] = [
  { name: "asChild", typeLabel: "boolean", defaultLabel: "false", description: "Merge hiding props onto one child element. Keep focusable controls visible." },
  { name: "render", typeLabel: "RenderProp", defaultLabel: '"span"', description: "Replace the host with an element, tag or render callback; forward all supplied props and ref." },
  { name: "data-slot", typeLabel: "string", defaultLabel: '"visually-hidden"', description: "Stable identity hook; does not control the hiding behavior." },
];
export const sections: DocsSectionMetadata[] = [
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  ...examples.map(({id,title}) => ({id,title,level:3 as const})),
  { id: "guide", title: "Guide", level: 2 },
  { id: "props", title: "Props", level: 2 },
];
