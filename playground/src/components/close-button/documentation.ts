import { CloseButtonBasic } from "./examples/CloseButtonBasic.js";
import basicSource from "./examples/CloseButtonBasic.tsx?raw";
import { CloseButtonSizes } from "./examples/CloseButtonSizes.js";
import sizesSource from "./examples/CloseButtonSizes.tsx?raw";
import { CloseButtonVariants } from "./examples/CloseButtonVariants.js";
import variantsSource from "./examples/CloseButtonVariants.tsx?raw";
import { CloseButtonTones } from "./examples/CloseButtonTones.js";
import tonesSource from "./examples/CloseButtonTones.tsx?raw";
import { CloseButtonRadius } from "./examples/CloseButtonRadius.js";
import radiusSource from "./examples/CloseButtonRadius.tsx?raw";
import { CloseButtonLoading } from "./examples/CloseButtonLoading.js";
import loadingSource from "./examples/CloseButtonLoading.tsx?raw";
import { CloseButtonResponsive } from "./examples/CloseButtonResponsive.js";
import responsiveSource from "./examples/CloseButtonResponsive.tsx?raw";
import { CloseButtonGroups } from "./examples/CloseButtonGroups.js";
import groupsSource from "./examples/CloseButtonGroups.tsx?raw";
import { CloseButtonDisabled } from "./examples/CloseButtonDisabled.js";
import disabledSource from "./examples/CloseButtonDisabled.tsx?raw";
import { CloseButtonNaming } from "./examples/CloseButtonNaming.js";
import namingSource from "./examples/CloseButtonNaming.tsx?raw";
import { CloseButtonCustomIcon } from "./examples/CloseButtonCustomIcon.js";
import customiconSource from "./examples/CloseButtonCustomIcon.tsx?raw";
import { CloseButtonDialog } from "./examples/CloseButtonDialog.js";
import dialogSource from "./examples/CloseButtonDialog.tsx?raw";
import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
export const examples: OwnerExample[] = [{id:"sizes",title:"Sizes",description:"The shared seven-size scale keeps icon controls square.",Demo:CloseButtonSizes,source:sizesSource},
{id:"variants",title:"Variants",description:"Seven action recipes, shared with Button.",Demo:CloseButtonVariants,source:variantsSource},
{id:"tones",title:"Tones",description:"Semantic tones follow the active theme.",Demo:CloseButtonTones,source:tonesSource},
{id:"radius",title:"Radius",description:"Core and semantic radius tokens preserve square dimensions.",Demo:CloseButtonRadius,source:radiusSource},
{id:"loading",title:"Loading",description:"Loading preserves geometry and naming; custom spinners stay centered.",Demo:CloseButtonLoading,source:loadingSource},
{id:"responsive",title:"Responsive",description:"Omitted initial values retain the normal lg size until the breakpoint.",Demo:CloseButtonResponsive,source:responsiveSource},
{id:"groups",title:"Groups",description:"Shared group props coordinate text and icon actions; each child can override them.",Demo:CloseButtonGroups,source:groupsSource},
{id:"disabled",title:"Disabled",description:"Unavailable actions retain the variant’s visual hierarchy.",Demo:CloseButtonDisabled,source:disabledSource},
{id:"naming",title:"Naming",description:"The default close label is localized; explicit names remain available.",Demo:CloseButtonNaming,source:namingSource},
{id:"customicon",title:"CustomIcon",description:"Supply a decorative glyph with the appropriate dismissal label.",Demo:CloseButtonCustomIcon,source:customiconSource},
{id:"dialog",title:"Dialog",description:"The overlay Close owner handles dismissal and focus return.",Demo:CloseButtonDialog,source:dialogSource}];
export const parts: OwnerPart[] = [{id:"props-root",title:"CloseButton",description:"One native action host; visual recipes are shared with Button.",rows:[
{name:"variant",typeLabel:'"solid" | "soft" | "subtle" | "surface" | "outline" | "ghost" | "plain"',defaultLabel:"ghost",description:"Visual hierarchy."},
{name:"tone",typeLabel:"ButtonTone",defaultLabel:"neutral",description:"Neutral, contrast, accent, info, success, warning or danger."},
{name:"size",typeLabel:"ResponsiveValue<ButtonSize>",defaultLabel:"lg",description:"2xs, xs, sm, md, lg, xl or 2xl."},
{name:"radius",typeLabel:"Radius",description:"Core or semantic radius; do not combine with shape."},
{name:"shape",typeLabel:'"rounded" | "circle"',defaultLabel:"rounded",description:"Legacy shape. Prefer radius."},
{name:"focusRing",typeLabel:'"outside" | "inside"',defaultLabel:"outside",description:"Visual focus placement."},
{name:"disabled / loading",typeLabel:"boolean",defaultLabel:"false",description:"Atom owns activation guards and busy state."},
{name:"spinner",typeLabel:"ReactNode",description:"Custom centered decorative loading indicator. Not supported with asChild."},
{name:"aria-label / aria-labelledby",typeLabel:"string",description:"Explicit names override the localized Close fallback."},
{name:"children",typeLabel:"ReactNode",description:"Optional decorative replacement for the default X."},

]}];
export const sections=ownerSections(examples,parts);
export { CloseButtonBasic, basicSource };
