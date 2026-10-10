import type { EmProps } from "@flowstack-ui/brick";
import type { OwnerExample } from "../../shared/OwnerDocumentation.js";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import { EmBasic } from "./examples/EmBasic.js";
import BasicSource from "./examples/EmBasic.tsx?raw";
import { EmTypography } from "./examples/EmTypography.js";
import TypographySource from "./examples/EmTypography.tsx?raw";
import { EmComposition } from "./examples/EmComposition.js";
import CompositionSource from "./examples/EmComposition.tsx?raw";
import { EmWrapping } from "./examples/EmWrapping.js";
import WrappingSource from "./examples/EmWrapping.tsx?raw";
export const Basic = EmBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
{id:"typography",title:"Typography",description:"Inherit size, weight and color from the surrounding text.",Demo:EmTypography,source:TypographySource},
{id:"composition",title:"Composition",description:"Use asChild with one authored em to preserve stress emphasis without another wrapper.",Demo:EmComposition,source:CompositionSource},
{id:"wrapping",title:"Wrapping",description:"Em follows normal inline flow, including localized copy.",Demo:EmWrapping,source:WrappingSource},
];
export const rows: DocsPropDefinition<EmProps>[] = [
{name:"asChild",typeLabel:"boolean",defaultLabel:"false",description:"Merge presentation onto one element that preserves em semantics."},
{name:"data-slot",typeLabel:"string",defaultLabel:'"em"',description:"Public styling hook. Overrides the legacy slot alias."},
{name:"slot",typeLabel:"string",defaultLabel:"—",description:"Deprecated data-slot alias, not native HTML slot forwarding."},
];
export const sections: DocsSectionMetadata[] = [{id:"usage",title:"Usage",level:2},{id:"examples",title:"Examples",level:2},...examples.map(({id,title})=>({id,title,level:3 as const})),{id:"props",title:"Props",level:2}];
