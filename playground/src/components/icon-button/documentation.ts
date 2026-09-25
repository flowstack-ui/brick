import { IconButtonBasic } from "./examples/IconButtonBasic.js";
import basicSource from "./examples/IconButtonBasic.tsx?raw";
import { IconButtonSizes } from "./examples/IconButtonSizes.js";
import sizesSource from "./examples/IconButtonSizes.tsx?raw";
import { IconButtonVariants } from "./examples/IconButtonVariants.js";
import variantsSource from "./examples/IconButtonVariants.tsx?raw";
import { IconButtonTones } from "./examples/IconButtonTones.js";
import tonesSource from "./examples/IconButtonTones.tsx?raw";
import { IconButtonRadius } from "./examples/IconButtonRadius.js";
import radiusSource from "./examples/IconButtonRadius.tsx?raw";
import { IconButtonLoading } from "./examples/IconButtonLoading.js";
import loadingSource from "./examples/IconButtonLoading.tsx?raw";
import { IconButtonResponsive } from "./examples/IconButtonResponsive.js";
import responsiveSource from "./examples/IconButtonResponsive.tsx?raw";
import { IconButtonGroups } from "./examples/IconButtonGroups.js";
import groupsSource from "./examples/IconButtonGroups.tsx?raw";
import { IconButtonDisabled } from "./examples/IconButtonDisabled.js";
import disabledSource from "./examples/IconButtonDisabled.tsx?raw";
import { IconButtonLinks } from "./examples/IconButtonLinks.js";
import linksSource from "./examples/IconButtonLinks.tsx?raw";
import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
export const examples: OwnerExample[] = [{id:"sizes",title:"Sizes",description:"The shared seven-size scale keeps icon controls square.",Demo:IconButtonSizes,source:sizesSource},
{id:"variants",title:"Variants",description:"Seven action recipes, shared with Button.",Demo:IconButtonVariants,source:variantsSource},
{id:"tones",title:"Tones",description:"Semantic tones follow the active theme.",Demo:IconButtonTones,source:tonesSource},
{id:"radius",title:"Radius",description:"Core and semantic radius tokens preserve square dimensions.",Demo:IconButtonRadius,source:radiusSource},
{id:"loading",title:"Loading",description:"Loading preserves geometry and naming; custom spinners stay centered.",Demo:IconButtonLoading,source:loadingSource},
{id:"responsive",title:"Responsive",description:"Omitted initial values retain the normal lg size until the breakpoint.",Demo:IconButtonResponsive,source:responsiveSource},
{id:"groups",title:"Groups",description:"Shared group props coordinate text and icon actions; each child can override them.",Demo:IconButtonGroups,source:groupsSource},
{id:"disabled",title:"Disabled",description:"Unavailable actions retain the variant’s visual hierarchy.",Demo:IconButtonDisabled,source:disabledSource},
{id:"links",title:"Links",description:"Navigation keeps native anchor semantics.",Demo:IconButtonLinks,source:linksSource}];
export const parts: OwnerPart[] = [{id:"props-root",title:"IconButton",description:"One native action host; visual recipes are shared with Button.",rows:[
{name:"variant",typeLabel:'"solid" | "soft" | "subtle" | "surface" | "outline" | "ghost" | "plain"',defaultLabel:"ghost",description:"Visual hierarchy."},
{name:"tone",typeLabel:"ButtonTone",defaultLabel:"neutral",description:"Neutral, contrast, accent, info, success, warning or danger."},
{name:"size",typeLabel:"ResponsiveValue<ButtonSize>",defaultLabel:"lg",description:"2xs, xs, sm, md, lg, xl or 2xl."},
{name:"radius",typeLabel:"Radius",description:"Core or semantic radius; do not combine with shape."},
{name:"shape",typeLabel:'"rounded" | "circle"',defaultLabel:"rounded",description:"Legacy shape. Prefer radius."},
{name:"focusRing",typeLabel:'"outside" | "inside"',defaultLabel:"outside",description:"Visual focus placement."},
{name:"disabled / loading",typeLabel:"boolean",defaultLabel:"false",description:"Atom owns activation guards and busy state."},
{name:"spinner",typeLabel:"ReactNode",description:"Custom centered decorative loading indicator. Not supported with asChild."},
{name:"aria-label / aria-labelledby",typeLabel:"string",description:"Required accessible naming; the icon and tooltip do not replace a name."},
{name:"children",typeLabel:"ReactNode",description:"Decorative icon content."},
{name:"href",typeLabel:"string",description:"Native icon-only navigation."},{name:"asChild",typeLabel:"boolean",defaultLabel:"false",description:"One composed child host; excludes render and custom spinner."},{name:"render",typeLabel:"AtomButtonRootProps[\"render\"]",description:"Atom-owned host composition."},
]}];
export const sections=ownerSections(examples,parts);
export { IconButtonBasic, basicSource };
