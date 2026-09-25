import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { NotificationBadgeOuterAnchor } from "./examples/NotificationBadgeOuterAnchor.js";
import OuterAnchorSource from "./examples/NotificationBadgeOuterAnchor.tsx?raw";
import { NotificationBadgeSizes } from "./examples/NotificationBadgeSizes.js";
import SizesSource from "./examples/NotificationBadgeSizes.tsx?raw";
import { NotificationBadgeTones } from "./examples/NotificationBadgeTones.js";
import TonesSource from "./examples/NotificationBadgeTones.tsx?raw";
import { NotificationBadgeDot } from "./examples/NotificationBadgeDot.js";
import DotSource from "./examples/NotificationBadgeDot.tsx?raw";
import { NotificationBadgeVisibility } from "./examples/NotificationBadgeVisibility.js";
import VisibilitySource from "./examples/NotificationBadgeVisibility.tsx?raw";
import { NotificationBadgeOffsets } from "./examples/NotificationBadgeOffsets.js";
import OffsetsSource from "./examples/NotificationBadgeOffsets.tsx?raw";
import { NotificationBadgeBorder } from "./examples/NotificationBadgeBorder.js";
import BorderSource from "./examples/NotificationBadgeBorder.tsx?raw";
import { NotificationBadgeLocale } from "./examples/NotificationBadgeLocale.js";
import LocaleSource from "./examples/NotificationBadgeLocale.tsx?raw";
export const examples: OwnerExample[] = [
{id:"outer-anchor",title:"Outer anchor",description:"Attach to the entire button boundary instead of its inner icon.",Demo:NotificationBadgeOuterAnchor,source:OuterAnchorSource},
{id:"sizes",title:"Sizes",description:"Choose badge size independently from its target.",Demo:NotificationBadgeSizes,source:SizesSource},
{id:"tones",title:"Tones",description:"Use semantic color without changing the anchor or size.",Demo:NotificationBadgeTones,source:TonesSource},
{id:"dot",title:"Dot and circular overlap",description:"Mark presence on a circular avatar; keep its meaning accessible.",Demo:NotificationBadgeDot,source:DotSource},
{id:"visibility",title:"Count and visibility",description:"Control overflow, zero and visibility without changing target geometry.",Demo:NotificationBadgeVisibility,source:VisibilitySource},
{id:"offsets",title:"Responsive placement and offsets",description:"Use logical inset offsets and CSS-only responsive sizing.",Demo:NotificationBadgeOffsets,source:OffsetsSource},
{id:"border",title:"Border",description:"Remove the separating seam without changing badge dimensions.",Demo:NotificationBadgeBorder,source:BorderSource},
{id:"locale",title:"Locale",description:"Inherit localized digits or override the locale for one count.",Demo:NotificationBadgeLocale,source:LocaleSource}
];
export const parts: OwnerPart[] = [{id:"props-notification-badge",title:"NotificationBadge",description:"A passive span wrapper and private visual indicator.",rows:[{"name":"count","typeLabel":"number","defaultLabel":"—","description":"Required in count mode; finite nonnegative integer. Mutually exclusive with dot."},{"name":"dot","typeLabel":"boolean","defaultLabel":"false","description":"Show a dot; excludes count, max and showZero."},{"name":"max","typeLabel":"number","defaultLabel":"99","description":"Maximum visible count; larger values append +."},{"name":"showZero","typeLabel":"boolean","defaultLabel":"false","description":"Display zero rather than hiding."},{"name":"invisible","typeLabel":"boolean","defaultLabel":"false","description":"Hide the indicator without removing its anchor."},{"name":"size","typeLabel":"ResponsiveValue<\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\">","defaultLabel":"\"md\"","description":"Indicator geometry and typography, independent of the target."},{"name":"tone","typeLabel":"\"neutral\" | \"contrast\" | \"accent\" | \"info\" | \"success\" | \"warning\" | \"danger\"","defaultLabel":"\"danger\"","description":"Semantic indicator paint."},{"name":"placement","typeLabel":"ResponsiveValue<\"top-start\" | \"top-end\" | \"bottom-start\" | \"bottom-end\">","defaultLabel":"\"top-end\"","description":"Logical corner; mirrors in RTL."},{"name":"overlap","typeLabel":"\"rectangular\" | \"circular\"","defaultLabel":"\"rectangular\"","description":"Default edge inset for the target shape."},{"name":"offset","typeLabel":"ResponsiveValue<number | string>","defaultLabel":"0 / 14.6447%","description":"Both-axis inset; numbers are spacing factors. Explicit zero replaces circular inset."},{"name":"offsetInline","typeLabel":"ResponsiveValue<number | string>","defaultLabel":"—","description":"Logical inline-axis override, including zero."},{"name":"offsetBlock","typeLabel":"ResponsiveValue<number | string>","defaultLabel":"—","description":"Logical block-axis override, including zero."},{"name":"bordered","typeLabel":"boolean","defaultLabel":"true","description":"Show the separating seam; dimensions stay unchanged."},{"name":"locale","typeLabel":"string","defaultLabel":"LocaleProvider / en-US","description":"Locale override for digits, not translated accessible text."},{"name":"children","typeLabel":"ReactElement","defaultLabel":"—","description":"One anchor element. No asChild; root ref targets the wrapper span."}]}];
export const sections = ownerSections(examples, parts, true);
