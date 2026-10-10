import type { MarkProps } from "@flowstack-ui/brick";
import type { OwnerExample } from "../../shared/OwnerDocumentation.js";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import { MarkBasic } from "./examples/MarkBasic.js";
import BasicSource from "./examples/MarkBasic.tsx?raw";
import { MarkVariants } from "./examples/MarkVariants.js";
import VariantsSource from "./examples/MarkVariants.tsx?raw";
import { MarkTones } from "./examples/MarkTones.js";
import TonesSource from "./examples/MarkTones.tsx?raw";
import { MarkTypography } from "./examples/MarkTypography.js";
import TypographySource from "./examples/MarkTypography.tsx?raw";
import { MarkWrapping } from "./examples/MarkWrapping.js";
import WrappingSource from "./examples/MarkWrapping.tsx?raw";
import { MarkComposition } from "./examples/MarkComposition.js";
import CompositionSource from "./examples/MarkComposition.tsx?raw";
export const Basic = MarkBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
{id:"variants",title:"Variants",description:"Subtle and solid add paint; text uses medium weight; plain preserves only semantics.",Demo:MarkVariants,source:VariantsSource},
{id:"tones",title:"Tones",description:"Use semantic foreground/background pairs from the theme.",Demo:MarkTones,source:TonesSource},
{id:"typography",title:"Typography",description:"The surrounding typography controls size; no separate Mark size recipe is needed.",Demo:MarkTypography,source:TypographySource},
{id:"wrapping",title:"Wrapping",description:"Multiline decoration follows normal inline flow.",Demo:MarkWrapping,source:WrappingSource},
{id:"composition",title:"Composition",description:"Project presentation onto one native mark host without an extra wrapper.",Demo:MarkComposition,source:CompositionSource},
];
export const rows: DocsPropDefinition<MarkProps>[] = [
{name:"variant",typeLabel:'"subtle" | "solid" | "text" | "plain"',defaultLabel:'"subtle"',description:"Background or weight treatment."},
{name:"tone",typeLabel:'"accent" | "neutral" | "info" | "success" | "warning" | "danger"',defaultLabel:'"accent"',description:"Semantic color pair for filled variants. Text/plain inherit color."},
{name:"asChild",typeLabel:"boolean",defaultLabel:"false",description:"One authored element that preserves native mark semantics."},
];
export const sections: DocsSectionMetadata[] = [{id:"usage",title:"Usage",level:2},{id:"examples",title:"Examples",level:2},...examples.map(({id,title})=>({id,title,level:3 as const})),{id:"props",title:"Props",level:2}];
