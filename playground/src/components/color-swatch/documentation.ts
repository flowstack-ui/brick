import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { ColorSwatchBasic } from "./examples/ColorSwatchBasic.js";
import basicSource from "./examples/ColorSwatchBasic.tsx?raw";
import { ColorSwatchSizes } from "./examples/ColorSwatchSizes.js";
import SizesSource from "./examples/ColorSwatchSizes.tsx?raw";
import { ColorSwatchAlpha } from "./examples/ColorSwatchAlpha.js";
import AlphaSource from "./examples/ColorSwatchAlpha.tsx?raw";
import { ColorSwatchBadge } from "./examples/ColorSwatchBadge.js";
import BadgeSource from "./examples/ColorSwatchBadge.tsx?raw";
import { ColorSwatchMix } from "./examples/ColorSwatchMix.js";
import MixSource from "./examples/ColorSwatchMix.tsx?raw";
import { ColorSwatchRadius } from "./examples/ColorSwatchRadius.js";
import RadiusSource from "./examples/ColorSwatchRadius.tsx?raw";
import { ColorSwatchPalette } from "./examples/ColorSwatchPalette.js";
import PaletteSource from "./examples/ColorSwatchPalette.tsx?raw";
import { ColorSwatchSizing } from "./examples/ColorSwatchSizing.js";
import SizingSource from "./examples/ColorSwatchSizing.tsx?raw";
export const examples: OwnerExample[] = [
{id:"sizes",title:"Seven sizes",description:"Seven sizes scale the complete recipe.",Demo:ColorSwatchSizes,source:SizesSource},
{id:"alpha",title:"Transparency",description:"The checker reveals alpha without changing the footprint.",Demo:ColorSwatchAlpha,source:AlphaSource},
{id:"badge",title:"Inside a badge",description:"Use a small passive swatch beside a visible color name.",Demo:ColorSwatchBadge,source:BadgeSource},
{id:"mix",title:"Mixed colors",description:"Equal segments represent multiple colors, not a gradient editor.",Demo:ColorSwatchMix,source:MixSource},
{id:"radius",title:"Radius",description:"Use the same core and semantic radius tokens as other Brick components.",Demo:ColorSwatchRadius,source:RadiusSource},
{id:"palette",title:"Palette",description:"Show a palette with visible color values.",Demo:ColorSwatchPalette,source:PaletteSource},
{id:"sizing",title:"Parent sizing",description:"Full and inherit require a parent with definite dimensions.",Demo:ColorSwatchSizing,source:SizingSource},
];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "A passive color preview, decorative unless labeled.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Required CSS color; alpha reveals the transparency checker."
      },
      {
        "name": "size",
        "typeLabel": "\"2xs\" | \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\" | \"2xl\" | \"inherit\" | \"full\"",
        "defaultLabel": "\"md\"",
        "description": "Fixed squares from 14 to 32px, or dimensions inherited from a sized parent."
      },
      {
        "name": "shape",
        "typeLabel": "\"sharp\" | \"rounded\" | \"circle\"",
        "defaultLabel": "\"rounded\"",
        "description": "Shape preset; choose radius instead when specifying a token."
      },
      {
        "name": "radius",
        "typeLabel": "Radius",
        "defaultLabel": "theme subtle",
        "description": "Core or semantic radius. Mutually exclusive with shape."
      },
      {
        "name": "label",
        "typeLabel": "string",
        "defaultLabel": "—",
        "description": "Accessible image name; omit beside equivalent visible text."
      }
    ]
  },
  {
    "id": "props-mix",
    "title": "Mix",
    "description": "Uses Root's presentation props with two or more segments.",
    "rows": [
      {
        "name": "values",
        "typeLabel": "readonly [string, string, ...string[]]",
        "defaultLabel": "—",
        "description": "CSS colors rendered as equal segments; replaces value."
      }
    ]
  }
];
export const sections = ownerSections(examples,parts);
export { ColorSwatchBasic, basicSource };
