import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { CodeBasic } from "./examples/CodeBasic.js";
import BasicSource from "./examples/CodeBasic.tsx?raw";
import { CodeSizes } from "./examples/CodeSizes.js";
import SizesSource from "./examples/CodeSizes.tsx?raw";
import { CodeVariants } from "./examples/CodeVariants.js";
import VariantsSource from "./examples/CodeVariants.tsx?raw";
import { CodeTones } from "./examples/CodeTones.js";
import TonesSource from "./examples/CodeTones.tsx?raw";
import { CodeComposition } from "./examples/CodeComposition.js";
import CompositionSource from "./examples/CodeComposition.tsx?raw";
export const Basic = CodeBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
{id:"sizes",title:"Sizes",description:"Choose inherited sizing inside prose or an explicit typography size.",Demo:CodeSizes,source:SizesSource},
{id:"variants",title:"Variants",description:"Compare surface treatments; outline and plain have transparent backgrounds.",Demo:CodeVariants,source:VariantsSource},
{id:"tones",title:"Tones",description:"Use semantic colors, not a second set of palette names.",Demo:CodeTones,source:TonesSource},
{id:"composition",title:"Composition",description:"Project styling onto one code element without an extra wrapper.",Demo:CodeComposition,source:CompositionSource},
];
export const parts: OwnerPart[] = [
  {
    "id": "props-code",
    "title": "Code",
    "description": "Native code attributes are forwarded.",
    "rows": [
      {
        "name": "variant",
        "typeLabel": "\"subtle\" | \"solid\" | \"outline\" | \"surface\" | \"plain\"",
        "defaultLabel": "\"subtle\"",
        "description": "Surface treatment."
      },
      {
        "name": "tone",
        "typeLabel": "\"neutral\" | \"inherit\" | \"accent\" | \"info\" | \"success\" | \"warning\" | \"danger\"",
        "defaultLabel": "\"neutral\"",
        "description": "Semantic foreground/background pair."
      },
      {
        "name": "size",
        "typeLabel": "\"inherit\" | \"xs\" | \"sm\" | \"md\" | \"lg\"",
        "defaultLabel": "\"inherit\"",
        "description": "Inline typography size."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "One authored code host retaining semantics."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
