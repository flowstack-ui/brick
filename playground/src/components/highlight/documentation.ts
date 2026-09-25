import type { HighlightProps } from "@flowstack-ui/brick";
import type { OwnerExample } from "../../shared/OwnerDocumentation.js";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import { HighlightBasic } from "./examples/HighlightBasic.js";
import BasicSource from "./examples/HighlightBasic.tsx?raw";
import { HighlightMultiple } from "./examples/HighlightMultiple.js";
import MultipleSource from "./examples/HighlightMultiple.tsx?raw";
import { HighlightSearch } from "./examples/HighlightSearch.js";
import SearchSource from "./examples/HighlightSearch.tsx?raw";
import { HighlightComposition } from "./examples/HighlightComposition.js";
import CompositionSource from "./examples/HighlightComposition.tsx?raw";
import { HighlightOptionsExample } from "./examples/HighlightOptions.js";
import OptionsSource from "./examples/HighlightOptions.tsx?raw";
import { HighlightVariants } from "./examples/HighlightVariants.js";
import VariantsSource from "./examples/HighlightVariants.tsx?raw";
import { HighlightTones } from "./examples/HighlightTones.js";
import TonesSource from "./examples/HighlightTones.tsx?raw";
import { HighlightWrapping } from "./examples/HighlightWrapping.js";
import WrappingSource from "./examples/HighlightWrapping.tsx?raw";
export const Basic = HighlightBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
{id:"multiple",title:"Multiple queries",description:"Highlight several phrases without changing their original order.",Demo:HighlightMultiple,source:MultipleSource},
{id:"search",title:"Search query",description:"Keep the input and search state in the application.",Demo:HighlightSearch,source:SearchSource},
{id:"composition",title:"Custom composition",description:"Use Brick’s pure segmentation utility with For and Mark. Matching stays in Atom.",Demo:HighlightComposition,source:CompositionSource},
{id:"options",title:"Matching options",description:"Compare case sensitivity, the first match, and whole-word matching.",Demo:HighlightOptionsExample,source:OptionsSource},
{id:"variants",title:"Variants",description:"Filled, underlined, weight-only and semantic-only treatments.",Demo:HighlightVariants,source:VariantsSource},
{id:"tones",title:"Tones",description:"Use paired semantic colors consistently with Mark.",Demo:HighlightTones,source:TonesSource},
{id:"wrapping",title:"Wrapping",description:"Decorations follow multiline text and inherit the surrounding typography.",Demo:HighlightWrapping,source:WrappingSource},
];
export const rows: DocsPropDefinition<HighlightProps>[] = [
{name:"text",typeLabel:"string",defaultLabel:"—",description:"Required plain text to segment. Arbitrary JSX is not accepted."},
{name:"query",typeLabel:"string | readonly string[]",defaultLabel:"—",description:"Required literal query or queries, not regular expressions."},
{name:"ignoreCase",typeLabel:"boolean",defaultLabel:"true",description:"Ignore letter case while matching."},
{name:"matchAll",typeLabel:"boolean",defaultLabel:"true",description:"Highlight all selected matches; false selects the first match overall."},
{name:"exactMatch",typeLabel:"boolean",defaultLabel:"false",description:"Require Unicode-aware word boundaries."},
{name:"variant",typeLabel:'"subtle" | "solid" | "underline" | "text" | "plain"',defaultLabel:'"subtle"',description:"Visual treatment; typography size inherits."},
{name:"tone",typeLabel:'"accent" | "neutral" | "info" | "success" | "warning" | "danger"',defaultLabel:'"accent"',description:"Semantic palette. Text/plain preserve surrounding color."},
];
export const sections: DocsSectionMetadata[] = [{id:"usage",title:"Usage",level:2},{id:"examples",title:"Examples",level:2},...examples.map(({id,title})=>({id,title,level:3 as const})),{id:"props",title:"Props",level:2}];
