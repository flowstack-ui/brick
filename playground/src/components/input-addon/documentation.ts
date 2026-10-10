import type { OwnerExample } from "../../shared/OwnerDocumentation.js";
import { ownerSections } from "../../shared/OwnerDocumentation.js";
import { InputAddonSuffix } from "./examples/InputAddonSuffix.js";
import suffixSource from "./examples/InputAddonSuffix.tsx?raw";
import { InputAddonPaired } from "./examples/InputAddonPaired.js";
import pairedSource from "./examples/InputAddonPaired.tsx?raw";
import { InputAddonResponsive } from "./examples/InputAddonResponsive.js";
import responsiveSource from "./examples/InputAddonResponsive.tsx?raw";
import { InputAddonVariants } from "./examples/InputAddonVariants.js";
import variantsSource from "./examples/InputAddonVariants.tsx?raw";

export const examples: OwnerExample[] = [
  { id: "suffix", title: "Suffix", description: "Attach a noneditable unit after the input. Include its meaning in the field description.", Demo: InputAddonSuffix, source: suffixSource },
  { id: "paired", title: "Prefix and suffix", description: "Group joins both segments to the input and removes their inner corners.", Demo: InputAddonPaired, source: pairedSource },
  { id: "variants", title: "Matching variants", description: "Set the same variant on InputAddon and Input. Group owns attachment, not recipe inheritance.", Demo: InputAddonVariants, source: variantsSource },
  { id: "responsive", title: "Responsive sizing", description: "Pass the same responsive size to both parts so their heights stay aligned.", Demo: InputAddonResponsive, source: responsiveSource },
];
export const sections = ownerSections(examples, []);
