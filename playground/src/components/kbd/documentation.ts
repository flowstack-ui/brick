import { type KbdProps } from "@flowstack-ui/brick";
import type { OwnerExample } from "../../shared/OwnerDocumentation.js";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import { KbdBasic } from "./examples/KbdBasic.js";
import BasicSource from "./examples/KbdBasic.tsx?raw";
import { KbdCombinations } from "./examples/KbdCombinations.js";
import CombinationsSource from "./examples/KbdCombinations.tsx?raw";
import { KbdModifierKeys } from "./examples/KbdModifierKeys.js";
import ModifierKeysSource from "./examples/KbdModifierKeys.tsx?raw";
import { KbdVariants } from "./examples/KbdVariants.js";
import VariantsSource from "./examples/KbdVariants.tsx?raw";
import { KbdSizes } from "./examples/KbdSizes.js";
import SizesSource from "./examples/KbdSizes.tsx?raw";
import { KbdWithinText } from "./examples/KbdWithinText.js";
import WithinTextSource from "./examples/KbdWithinText.tsx?raw";
import { KbdTones } from "./examples/KbdTones.js";
import TonesSource from "./examples/KbdTones.tsx?raw";
import { KbdComposition } from "./examples/KbdComposition.js";
import CompositionSource from "./examples/KbdComposition.tsx?raw";
export const Basic = KbdBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
{id:"combinations",title:"Combinations",description:"Separate keycaps with visible separators, or use one Kbd for a complete combination.",Demo:KbdCombinations,source:CombinationsSource},
{id:"modifier-keys",title:"Modifier Keys",description:"Name platform symbols accessibly; the application chooses the appropriate labels.",Demo:KbdModifierKeys,source:ModifierKeysSource},
{id:"variants",title:"Variants",description:"Choose a raised keycap, outline, quiet fill, or plain notation.",Demo:KbdVariants,source:VariantsSource},
{id:"sizes",title:"Sizes",description:"Three compact sizes adjust typography and key geometry together.",Demo:KbdSizes,source:SizesSource},
{id:"within-text",title:"Within Text",description:"Keep key notation inline with its surrounding sentence.",Demo:KbdWithinText,source:WithinTextSource},
{id:"tones",title:"Tones",description:"Use theme-aware semantic colors for keyboard notation.",Demo:KbdTones,source:TonesSource},
{id:"composition",title:"Composition",description:"Style one authored kbd host without adding a wrapper.",Demo:KbdComposition,source:CompositionSource},
];
export const rows: DocsPropDefinition<KbdProps>[] = [
{name:"variant",typeLabel:'"raised" | "outline" | "subtle" | "plain"',defaultLabel:'"raised"',description:"Keycap surface treatment."},
{name:"size",typeLabel:'"sm" | "md" | "lg"',defaultLabel:'"md"',description:"Compact type and minimum key height."},
{name:"tone",typeLabel:'"neutral" | "accent" | "info" | "success" | "warning" | "danger"',defaultLabel:'"neutral"',description:"Theme-aware semantic color."},
{name:"asChild",typeLabel:"boolean",defaultLabel:"false",description:"One authored kbd element preserving native semantics."},
];
export const sections: DocsSectionMetadata[] = [{id:"usage",title:"Usage",level:2},{id:"examples",title:"Examples",level:2},...examples.map(({id,title})=>({id,title,level:3 as const})),{id:"props",title:"Props",level:2}];
