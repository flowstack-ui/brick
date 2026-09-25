import { AvatarBasic } from "./examples/AvatarBasic.js";
import AvatarBasicSource from "./examples/AvatarBasic.tsx?raw";
import { AvatarSizes } from "./examples/AvatarSizes.js";
import AvatarSizesSource from "./examples/AvatarSizes.tsx?raw";
import { AvatarRecipes } from "./examples/AvatarRecipes.js";
import AvatarRecipesSource from "./examples/AvatarRecipes.tsx?raw";
import { AvatarRadius } from "./examples/AvatarRadius.js";
import AvatarRadiusSource from "./examples/AvatarRadius.tsx?raw";
import { AvatarNativeImage } from "./examples/AvatarNativeImage.js";
import AvatarNativeImageSource from "./examples/AvatarNativeImage.tsx?raw";
import { AvatarStatus } from "./examples/AvatarStatus.js";
import AvatarStatusSource from "./examples/AvatarStatus.tsx?raw";
import { AvatarFull } from "./examples/AvatarFull.js";
import AvatarFullSource from "./examples/AvatarFull.tsx?raw";
import { AvatarLoading } from "./examples/AvatarLoading.js";
import AvatarLoadingSource from "./examples/AvatarLoading.tsx?raw";
import { ownerSections, type OwnerExample } from "../../shared/OwnerDocumentation.js";
import { parts } from "./parts.js";
export { parts };
export const Basic = AvatarBasic;
export const basicSource = AvatarBasicSource;
export const usage = "<Avatar.Root alt=\"Ada Lovelace\" src=\"/ada.png\">\n  <Avatar.Image />\n  <Avatar.Fallback>AL</Avatar.Fallback>\n</Avatar.Root>";
export const examples: OwnerExample[] = [
  { id: "sizes", title: "Sizes", description: "Compact identities and larger profile sizes use coordinated frame and fallback typography.", Demo: AvatarSizes, source: AvatarSizesSource },
  { id: "recipes", title: "Variants and tones", description: "Use subtle, solid or transparent outline paint with paired theme colors.", Demo: AvatarRecipes, source: AvatarRecipesSource },
  { id: "radius", title: "Radius", description: "Choose a shared core or semantic radius token.", Demo: AvatarRadius, source: AvatarRadiusSource },
  { id: "nativeimage", title: "Native image", description: "Compound parts expose browser loading and request attributes without detached preloads.", Demo: AvatarNativeImage, source: AvatarNativeImageSource },
  { id: "status", title: "Status", description: "Keep meaningful availability in text; the ring is supplementary.", Demo: AvatarStatus, source: AvatarStatusSource },
  { id: "full", title: "Full size", description: "Constrain both parent dimensions when filling a square frame.", Demo: AvatarFull, source: AvatarFullSource },
  { id: "loading", title: "Loading", description: "Observe native load/error state and restore the fallback when the source changes.", Demo: AvatarLoading, source: AvatarLoadingSource },
];
export const sections = ownerSections(examples, parts);
