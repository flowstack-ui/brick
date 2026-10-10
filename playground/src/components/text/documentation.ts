import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { TextBasic } from "./examples/TextBasic.js";
import TextBasicSource from "./examples/TextBasic.tsx?raw";
import { TextSizes } from "./examples/TextSizes.js";
import TextSizesSource from "./examples/TextSizes.tsx?raw";
import { TextSemantics } from "./examples/TextSemantics.js";
import TextSemanticsSource from "./examples/TextSemantics.tsx?raw";
import { TextWeights } from "./examples/TextWeights.js";
import TextWeightsSource from "./examples/TextWeights.tsx?raw";
import { TextTone } from "./examples/TextTone.js";
import TextToneSource from "./examples/TextTone.tsx?raw";
import { TextStyle } from "./examples/TextStyle.js";
import TextStyleSource from "./examples/TextStyle.tsx?raw";
import { TextAlignment } from "./examples/TextAlignment.js";
import TextAlignmentSource from "./examples/TextAlignment.tsx?raw";
import { TextOverflow } from "./examples/TextOverflow.js";
import TextOverflowSource from "./examples/TextOverflow.tsx?raw";
import { TextResponsive } from "./examples/TextResponsive.js";
import TextResponsiveSource from "./examples/TextResponsive.tsx?raw";
import { TextWrap } from "./examples/TextWrap.js";
import TextWrapSource from "./examples/TextWrap.tsx?raw";
import { TextCustomization } from "./examples/TextCustomization.js";
import TextCustomizationSource from "./examples/TextCustomization.tsx?raw";
export const Basic = TextBasic;
export const basicSource = TextBasicSource;
export const examples: OwnerExample[] = [
{ id: "sizes", title: "Sizes", description: "Compare the available visual recipes without changing semantics.", Demo: TextSizes, source: TextSizesSource },
{ id: "semantics", title: "Semantics", description: "Heading level follows structure, independently of size and weight.", Demo: TextSemantics, source: TextSemanticsSource },
{ id: "weights", title: "Weights", description: "The loaded font must support the selected weight.", Demo: TextWeights, source: TextWeightsSource },
{ id: "tone", title: "Tone", description: "Choose a foreground role without changing the type scale.", Demo: TextTone, source: TextToneSource },
{ id: "style", title: "Style", description: "Visual styling is separate from semantic emphasis and number formatting.", Demo: TextStyle, source: TextStyleSource },
{ id: "alignment", title: "Alignment", description: "Logical alignment follows direction. Use justified text deliberately.", Demo: TextAlignment, source: TextAlignmentSource },
{ id: "overflow", title: "Overflow", description: "Clipping does not provide an alternative way to read essential hidden content.", Demo: TextOverflow, source: TextOverflowSource },
{ id: "responsive", title: "Responsive", description: "Change presentation at shared breakpoints without replacing the content tree.", Demo: TextResponsive, source: TextResponsiveSource },
{ id: "wrap", title: "Wrap", description: "Wrapping and casing affect presentation, not the authored text.", Demo: TextWrap, source: TextWrapSource },
{ id: "customization", title: "Customization", description: "Use native style for deliberate exceptions; recipes remain the everyday default.", Demo: TextCustomization, source: TextCustomizationSource },
];
export const parts: OwnerPart[] = [
  {
    "id": "props-text",
    "title": "Text",
    "description": "Shared text presentation controls.",
    "rows": [
      {
        "name": "as",
        "typeLabel": "\"span\" | \"p\" | \"div\" | \"h1\" … \"h6\"",
        "defaultLabel": "\"span\"",
        "description": "Native semantic host; independent of visual recipe."
      },
      {
        "name": "variant",
        "typeLabel": "ResponsiveValue<TextVariant>",
        "defaultLabel": "\"body-md\"",
        "description": "Display, title, body, caption or eyebrow recipe."
      },
      {
        "name": "tone",
        "typeLabel": "TextTone",
        "defaultLabel": "\"primary\"",
        "description": "Semantic foreground; inherit for parent-owned color."
      },
      {
        "name": "weight",
        "typeLabel": "TextWeight",
        "defaultLabel": "recipe",
        "description": "Nine named weights from thin to black, plus inherit."
      },
      {
        "name": "align",
        "typeLabel": "ResponsiveValue<\"start\" | \"center\" | \"end\" | \"justify\">",
        "defaultLabel": "—",
        "description": "Logical text alignment."
      },
      {
        "name": "fontStyle",
        "typeLabel": "\"normal\" | \"italic\" | \"oblique\"",
        "defaultLabel": "—",
        "description": "Visual font style; does not add emphasis semantics."
      },
      {
        "name": "numeric",
        "typeLabel": "CSSProperties['fontVariantNumeric']",
        "defaultLabel": "—",
        "description": "Numeric glyph choices such as tabular-nums."
      },
      {
        "name": "decoration",
        "typeLabel": "\"none\" | \"underline\" | \"overline\" | \"line-through\"",
        "defaultLabel": "—",
        "description": "Visual text decoration."
      },
      {
        "name": "decorationStyle",
        "typeLabel": "\"solid\" | \"double\" | \"dotted\" | \"dashed\" | \"wavy\"",
        "defaultLabel": "—",
        "description": "Decoration stroke style."
      },
      {
        "name": "wrap",
        "typeLabel": "\"wrap\" | \"nowrap\" | \"balance\" | \"pretty\"",
        "defaultLabel": "\"wrap\"",
        "description": "Line-breaking presentation."
      },
      {
        "name": "transform",
        "typeLabel": "\"none\" | \"uppercase\" | \"lowercase\" | \"capitalize\"",
        "defaultLabel": "recipe",
        "description": "Visual casing, not localization or content repair."
      },
      {
        "name": "truncate",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Single-line ellipsis; mutually exclusive with lineClamp."
      },
      {
        "name": "lineClamp",
        "typeLabel": "ResponsiveValue<number | \"none\">",
        "defaultLabel": "—",
        "description": "Positive integer clamp or reset. Important clipped content needs another reading path."
      },
      {
        "name": "style",
        "typeLabel": "CSSProperties",
        "defaultLabel": "—",
        "description": "Native CSS escape hatch, including font size, family, leading and tracking."
      }
    ]
  },
  {
    "id": "props-heading-part",
    "title": "Heading",
    "description": "Shares Text controls with a required heading level and heading-only recipes.",
    "rows": [
      {
        "name": "level",
        "typeLabel": "1 | 2 | 3 | 4 | 5 | 6",
        "defaultLabel": "required",
        "description": "Native heading level."
      },
      {
        "name": "variant",
        "typeLabel": "ResponsiveValue<HeadingVariant>",
        "defaultLabel": "\"title-md\"",
        "description": "Display or title recipe."
      }
    ]
  },
  {
    "id": "props-paragraph",
    "title": "Paragraph",
    "description": "Shares Text controls and renders p.",
    "rows": [
      {
        "name": "variant",
        "typeLabel": "ResponsiveValue<ParagraphVariant>",
        "defaultLabel": "\"body-md\"",
        "description": "body-sm, body-md, body-lg or body-xl."
      }
    ]
  },
  {
    "id": "props-caption",
    "title": "Caption",
    "description": "Shares Text controls; renders span with the fixed caption recipe.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "required",
        "description": "Caption content."
      }
    ]
  },
  {
    "id": "props-eyebrow",
    "title": "Eyebrow",
    "description": "Shares Text controls; renders span with the fixed eyebrow recipe.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "defaultLabel": "required",
        "description": "Short introductory label, not a paragraph or status badge."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts);
