import type { SkipLinkRootProps, SkipLinkTargetProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import { SkipLinkBasic } from "./examples/SkipLinkBasic.js";
import basicSource from "./examples/SkipLinkBasic.tsx?raw";
import { SkipLinkComposition } from "./examples/SkipLinkComposition.js";
import compositionSource from "./examples/SkipLinkComposition.tsx?raw";
import { SkipLinkNative } from "./examples/SkipLinkNative.js";
import nativeSource from "./examples/SkipLinkNative.tsx?raw";
export { basicSource };
export const Basic = SkipLinkBasic;
export const examples = [
  { id: "composition", title: "Custom destination and composition", description: "Match href with a unique id. Use asChild on an existing main in your application; this embedded example uses a section to avoid nesting main landmarks.", Demo: SkipLinkComposition, source: compositionSource },
  { id: "native", title: "Native navigation", description: "Leave fragment navigation and URL history to the browser with focusTarget=false.", Demo: SkipLinkNative, source: nativeSource },
];
export const rootRows: DocsPropDefinition<SkipLinkRootProps>[] = [
  { name: "href", typeLabel: '`#${string}`', defaultLabel: '"#main-content"', description: "The unique destination ID, prefixed with #. Set this on Root even when using asChild." },
  { name: "focusTarget", typeLabel: "boolean", defaultLabel: "true", description: "Explicitly focus and scroll without changing the hash; false preserves native navigation." },
  { name: "asChild", typeLabel: "boolean", defaultLabel: "false", description: "Merge onto one native anchor child." },
  { name: "render", typeLabel: "RenderProp", defaultLabel: '"a"', description: "Customize the host while preserving native link semantics and forwarding props/ref." },
];
export const targetRows: DocsPropDefinition<SkipLinkTargetProps>[] = [
  { name: "id", typeLabel: "string", defaultLabel: '"main-content"', description: "Unique ID matching the link destination." },
  { name: "tabIndex", typeLabel: "number", defaultLabel: "-1", description: "Accept focus without adding a Tab stop." },
  { name: "asChild", typeLabel: "boolean", defaultLabel: "false", description: "Merge onto an existing main or other destination." },
  { name: "render", typeLabel: "RenderProp", defaultLabel: '"div"', description: "Replace the neutral destination host." },
];
export const sections: DocsSectionMetadata[] = [
  { id: "usage", title: "Usage", level: 2 }, { id: "examples", title: "Examples", level: 2 },
  ...examples.map(({id,title}) => ({id,title,level:3 as const})),
  { id: "guide", title: "Guide", level: 2 }, { id: "props", title: "Props", level: 2 },
  { id: "props-root", title: "Root", level: 3 }, { id: "props-target", title: "Target", level: 3 },
];
