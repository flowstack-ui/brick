import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { BlockquoteBasic } from "./examples/BlockquoteBasic.js";
import BasicSource from "./examples/BlockquoteBasic.tsx?raw";
import { BlockquoteCitation } from "./examples/BlockquoteCitation.js";
import CitationSource from "./examples/BlockquoteCitation.tsx?raw";
import { BlockquoteTones } from "./examples/BlockquoteTones.js";
import TonesSource from "./examples/BlockquoteTones.tsx?raw";
import { BlockquoteVariants } from "./examples/BlockquoteVariants.js";
import VariantsSource from "./examples/BlockquoteVariants.tsx?raw";
import { BlockquoteIcon } from "./examples/BlockquoteIcon.js";
import IconSource from "./examples/BlockquoteIcon.tsx?raw";
import { BlockquoteCustomIcon } from "./examples/BlockquoteCustomIcon.js";
import CustomIconSource from "./examples/BlockquoteCustomIcon.tsx?raw";
import { BlockquoteAlignment } from "./examples/BlockquoteAlignment.js";
import AlignmentSource from "./examples/BlockquoteAlignment.tsx?raw";
import { BlockquoteAvatar } from "./examples/BlockquoteAvatar.js";
import AvatarSource from "./examples/BlockquoteAvatar.tsx?raw";
import { BlockquoteTypography } from "./examples/BlockquoteTypography.js";
import TypographySource from "./examples/BlockquoteTypography.tsx?raw";
import { BlockquoteComposition } from "./examples/BlockquoteComposition.js";
import CompositionSource from "./examples/BlockquoteComposition.tsx?raw";
export const Basic = BlockquoteBasic;
export const basicSource = BasicSource;
export const examples: OwnerExample[] = [
{"id":"with-cite","title":"With Cite","description":"Keep attribution outside the quotation; cite points to the source URL.",Demo:BlockquoteCitation,source:CitationSource},
{"id":"tones","title":"Tones","description":"Choose semantic rule and icon colors without recoloring the quote text.",Demo:BlockquoteTones,source:TonesSource},
{"id":"variants","title":"Variants","description":"Subtle and solid change the rule strength. Surface adds paint; plain removes the inset. Accent is the compatibility option.",Demo:BlockquoteVariants,source:VariantsSource},
{"id":"icon","title":"Icon","description":"Compose Float for an edge-mounted decorative quote mark.",Demo:BlockquoteIcon,source:IconSource},
{"id":"custom-icon","title":"Custom Icon","description":"Project the icon recipe onto an authored decorative SVG.",Demo:BlockquoteCustomIcon,source:CustomIconSource},
{"id":"alignment","title":"Alignment","description":"Align the content, caption and icon logically.",Demo:BlockquoteAlignment,source:AlignmentSource},
{"id":"with-avatar","title":"With Avatar","description":"Compose an avatar and author name inside the caption.",Demo:BlockquoteAvatar,source:AvatarSource},
{"id":"typography","title":"Typography","description":"Use Paragraph for explicit responsive quotation typography.",Demo:BlockquoteTypography,source:TypographySource},
{"id":"composition","title":"Composition","description":"Project each part onto its corresponding native semantic host.",Demo:BlockquoteComposition,source:CompositionSource}
];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "The figure groups quotation and attribution.",
    "rows": [
      {
        "name": "variant",
        "typeLabel": "\"subtle\" | \"solid\" | \"surface\" | \"plain\" | \"accent\"",
        "defaultLabel": "\"subtle\"",
        "description": "Rule and surface treatment."
      },
      {
        "name": "tone",
        "typeLabel": "\"neutral\" | \"accent\" | \"info\" | \"success\" | \"warning\" | \"danger\"",
        "defaultLabel": "\"neutral\"",
        "description": "Semantic rule/icon color. Legacy accent variant defaults to accent tone."
      },
      {
        "name": "align",
        "typeLabel": "\"start\" | \"center\" | \"end\"",
        "defaultLabel": "\"start\"",
        "description": "Logical content and caption alignment."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Use one authored element that preserves this part’s native semantics."
      }
    ]
  },
  {
    "id": "props-content",
    "title": "Content",
    "description": "The native blockquote contains only the quoted material.",
    "rows": [
      {
        "name": "cite",
        "typeLabel": "string",
        "description": "Source URL; not a visible author label."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Use one authored element that preserves this part’s native semantics."
      }
    ]
  },
  {
    "id": "props-icon",
    "title": "Icon",
    "description": "Decorative quote mark; SVG children share the same 20px geometry.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "description": "Custom icon; defaults to a quotation SVG."
      },
      {
        "name": "aria-hidden",
        "typeLabel": "boolean",
        "defaultLabel": "true",
        "description": "Keep decorative artwork out of accessible text."
      },
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Use one authored element that preserves this part’s native semantics."
      }
    ]
  },
  {
    "id": "props-caption",
    "title": "Caption",
    "description": "A sibling figcaption holds author attribution.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Use one authored element that preserves this part’s native semantics."
      }
    ]
  },
  {
    "id": "props-cite",
    "title": "Cite",
    "description": "Native cite marks the title of a referenced work, not a person’s name.",
    "rows": [
      {
        "name": "asChild",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Use one authored element that preserves this part’s native semantics."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
