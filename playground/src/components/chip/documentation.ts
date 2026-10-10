import {
  ownerSections,
  type OwnerExample,
} from "../../shared/OwnerDocumentation.js";
import { parts } from "./parts.js";
export { parts } from "./parts.js";
export { ChipBasic as Basic } from "./examples/ChipBasic.js";
import basicSource from "./examples/ChipBasic.tsx?raw";
export { basicSource };
import { ChipReferenceCompact } from "./examples/ChipReferenceCompact.js";
import ReferenceCompactSource from "./examples/ChipReferenceCompact.tsx?raw";
import { ChipVariants } from "./examples/ChipVariants.js";
import VariantsSource from "./examples/ChipVariants.tsx?raw";
import { ChipSizes } from "./examples/ChipSizes.js";
import SizesSource from "./examples/ChipSizes.tsx?raw";
import { ChipDensity } from "./examples/ChipDensity.js";
import DensitySource from "./examples/ChipDensity.tsx?raw";
import { ChipColors } from "./examples/ChipColors.js";
import ColorsSource from "./examples/ChipColors.tsx?raw";
import { ChipIcons } from "./examples/ChipIcons.js";
import IconsSource from "./examples/ChipIcons.tsx?raw";
import { ChipAvatar } from "./examples/ChipAvatar.js";
import AvatarSource from "./examples/ChipAvatar.tsx?raw";
import { ChipClosable } from "./examples/ChipClosable.js";
import ClosableSource from "./examples/ChipClosable.tsx?raw";
import { ChipCustomRemove } from "./examples/ChipCustomRemove.js";
import CustomRemoveSource from "./examples/ChipCustomRemove.tsx?raw";
import { ChipOverflow } from "./examples/ChipOverflow.js";
import OverflowSource from "./examples/ChipOverflow.tsx?raw";
import { ChipActions } from "./examples/ChipActions.js";
import ActionsSource from "./examples/ChipActions.tsx?raw";
import { ChipDisabled } from "./examples/ChipDisabled.js";
import DisabledSource from "./examples/ChipDisabled.tsx?raw";
import { ChipResponsive } from "./examples/ChipResponsive.js";
import ResponsiveSource from "./examples/ChipResponsive.tsx?raw";
import { ChipRadius } from "./examples/ChipRadius.js";
import RadiusSource from "./examples/ChipRadius.tsx?raw";
import { ChipCustomPalette } from "./examples/ChipCustomPalette.js";
import CustomPaletteSource from "./examples/ChipCustomPalette.tsx?raw";
import { ChipComposition } from "./examples/ChipComposition.js";
import CompositionSource from "./examples/ChipComposition.tsx?raw";
import { ChipRTL } from "./examples/ChipRTL.js";
import RTLSource from "./examples/ChipRTL.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "reference-compact",
    title: "Reference-like compact",
    description:
      "Use compact density, surface and the theme control radius for a compact rounded tag.",
    Demo: ChipReferenceCompact,
    source: ReferenceCompactSource,
  },
  {
    id: "variants",
    title: "Variants",
    description: "Subtle is an alias of soft; surface adds a visible border.",
    Demo: ChipVariants,
    source: VariantsSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Size coordinates text, artwork and minimum height.",
    Demo: ChipSizes,
    source: SizesSource,
  },
  {
    id: "density",
    title: "Density",
    description:
      "Compact reduces passive geometry. Actions still reserve at least a 24px target.",
    Demo: ChipDensity,
    source: DensitySource,
  },
  {
    id: "colors",
    title: "Colors",
    description:
      "Use semantic tones for categorized values; tones do not add status announcements.",
    Demo: ChipColors,
    source: ColorsSource,
  },
  {
    id: "icons",
    title: "Icons",
    description: "Place decorative artwork in StartElement or EndElement.",
    Demo: ChipIcons,
    source: IconsSource,
  },
  {
    id: "avatar",
    title: "Avatar",
    description:
      "The slot sizes the image to match the token. Keep a visible name beside it.",
    Demo: ChipAvatar,
    source: AvatarSource,
  },
  {
    id: "closable",
    title: "Closable",
    description:
      "The parent removes values and moves focus to the next available action.",
    Demo: ChipClosable,
    source: ClosableSource,
  },
  {
    id: "custom-remove",
    title: "Custom removal artwork",
    description:
      "Replace the glyph while keeping a value-specific accessible name.",
    Demo: ChipCustomRemove,
    source: CustomRemoveSource,
  },
  {
    id: "overflow",
    title: "Overflow",
    description:
      "Constrain the token; the label truncates without hiding its removal control.",
    Demo: ChipOverflow,
    source: OverflowSource,
  },
  {
    id: "actions",
    title: "Primary action",
    description:
      "Keep primary and removal actions as siblings, never nested buttons.",
    Demo: ChipActions,
    source: ActionsSource,
  },
  {
    id: "disabled",
    title: "Disabled actions",
    description:
      "Disable the unavailable action without fading the entire value.",
    Demo: ChipDisabled,
    source: DisabledSource,
  },
  {
    id: "responsive",
    title: "Responsive",
    description:
      "Change size, density and variant at shared breakpoints without remounting content.",
    Demo: ChipResponsive,
    source: ResponsiveSource,
  },
  {
    id: "radius",
    title: "Radius",
    description:
      "These examples use radius=control to follow the theme radius. Set shape=pill explicitly for permanently rounded ends; omitting both also retains the library's pill default.",
    Demo: ChipRadius,
    source: RadiusSource,
  },
  {
    id: "custom-palette",
    title: "Custom palettes",
    description:
      "Bind the six palette tokens to paired semantic colors that adapt to appearance.",
    Demo: ChipCustomPalette,
    source: CustomPaletteSource,
  },
  {
    id: "composition",
    title: "Composition",
    description:
      "Project a static part with asChild; unstyled delegates presentation to your composed component.",
    Demo: ChipComposition,
    source: CompositionSource,
  },
  {
    id: "rtl",
    title: "Right-to-left",
    description: "Logical spacing follows reading direction.",
    Demo: ChipRTL,
    source: RTLSource,
  },
];
export const sections = ownerSections(examples, parts);
