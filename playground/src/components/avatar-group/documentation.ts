import { AvatarGroupBasic } from "./examples/AvatarGroupBasic.js";
import AvatarGroupBasicSource from "./examples/AvatarGroupBasic.tsx?raw";
import { AvatarGroupOverflow } from "./examples/AvatarGroupOverflow.js";
import AvatarGroupOverflowSource from "./examples/AvatarGroupOverflow.tsx?raw";
import { AvatarGroupPresentation } from "./examples/AvatarGroupPresentation.js";
import AvatarGroupPresentationSource from "./examples/AvatarGroupPresentation.tsx?raw";
import { AvatarGroupStacking } from "./examples/AvatarGroupStacking.js";
import AvatarGroupStackingSource from "./examples/AvatarGroupStacking.tsx?raw";
import { ownerSections, type OwnerExample } from "../../shared/OwnerDocumentation.js";
import { parts } from "./parts.js";
import { AvatarGroupMenu } from "./examples/AvatarGroupMenu.js";
import menuSource from "./examples/AvatarGroupMenu.tsx?raw";
export { parts };
export const Basic = AvatarGroupBasic;
export const basicSource = AvatarGroupBasicSource;
export const usage = "<AvatarGroup>\n  <Avatar alt=\"Ada Lovelace\" fallback=\"AL\" />\n  <Avatar alt=\"Grace Hopper\" fallback=\"GH\" />\n</AvatarGroup>";
export const examples: OwnerExample[] = [
  { id: "menu", title: "Overflow menu", description: "The menu owns interaction and focus; AvatarGroup only calculates the hidden count.", Demo: AvatarGroupMenu, source: menuSource },
  { id: "overflow", title: "Overflow", description: "Bound visible identities and supply a localized overflow label.", Demo: AvatarGroupOverflow, source: AvatarGroupOverflowSource },
  { id: "presentation", title: "Presentation and borderless", description: "Group recipes are inherited defaults; explicit child choices win. Borderless removes separation rings.", Demo: AvatarGroupPresentation, source: AvatarGroupPresentationSource },
  { id: "stacking", title: "Stacking", description: "Change paint order without changing reading order.", Demo: AvatarGroupStacking, source: AvatarGroupStackingSource },
];
export const sections = ownerSections(examples, parts);
