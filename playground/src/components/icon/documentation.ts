import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { IconBasic } from "./examples/IconBasic.js";
import basicSource from "./examples/IconBasic.tsx?raw";
import { IconLibrary } from "./examples/IconLibrary.js";
import librarySource from "./examples/IconLibrary.tsx?raw";
import { IconCustom } from "./examples/IconCustom.js";
import customSource from "./examples/IconCustom.tsx?raw";
import { IconFactory } from "./examples/IconFactory.js";
import factorySource from "./examples/IconFactory.tsx?raw";
import { IconSizes } from "./examples/IconSizes.js";
import sizesSource from "./examples/IconSizes.tsx?raw";
import { IconResponsive } from "./examples/IconResponsive.js";
import responsiveSource from "./examples/IconResponsive.tsx?raw";
import { IconTones } from "./examples/IconTones.js";
import tonesSource from "./examples/IconTones.tsx?raw";
import { IconProvider } from "./examples/IconProvider.js";
import providerSource from "./examples/IconProvider.tsx?raw";
import { IconAccessibility } from "./examples/IconAccessibility.js";
import accessibilitySource from "./examples/IconAccessibility.tsx?raw";
import { IconControls } from "./examples/IconControls.js";
import controlsSource from "./examples/IconControls.tsx?raw";
import { IconDirection } from "./examples/IconDirection.js";
import directionSource from "./examples/IconDirection.tsx?raw";
export const examples: OwnerExample[] = [
{id:"library",title:"Icon library",description:"Consumer-owned Lucide SVGs retain their paths. Lucide is a playground-only dependency, locked at 0.468.0.",Demo:IconLibrary,source:librarySource},
{id:"custom",title:"Custom SVG",description:"Use asChild for a direct SVG root with an authored viewBox.",Demo:IconCustom,source:customSource},
{id:"factory",title:"Create icon",description:"Define reusable artwork once at module scope. For a single filled path, the d shortcut defaults to currentColor.",Demo:IconFactory,source:factorySource},
{id:"sizes",title:"Sizes",description:"2xs=12, xs=16, sm=20, md=24, lg=28, xl=32 and 2xl=40 pixels at a 16px root. inherit follows local typography. These size names differ from Chakra.",Demo:IconSizes,source:sizesSource},
{id:"responsive",title:"Responsive size",description:"Initial sm, md breakpoint xl, lg breakpoint md, and xl breakpoint inherit. Omitted breakpoints retain the last active value.",Demo:IconResponsive,source:responsiveSource},
{id:"tones",title:"Tones and emphasis",description:"Use readable text paint or stronger solid paint with adjacent status text. Authored fixed fills remain unchanged.",Demo:IconTones,source:tonesSource},
{id:"provider",title:"Provider defaults",description:"Share size, tone and emphasis without a wrapper. Instance props override the nearest provider; undefined falls through outer providers.",Demo:IconProvider,source:providerSource},
{id:"accessibility",title:"Accessibility",description:"Decorative by default. Use one contextual label or label reference for informative icons. Name the enclosing action.",Demo:IconAccessibility,source:accessibilitySource},
{id:"controls",title:"Button and IconButton",description:"The action slot owns artwork dimensions even when provider defaults are larger. No redundant Icon size is needed.",Demo:IconControls,source:controlsSource},
{id:"direction",title:"Direction",description:"Opt in only for directional graphics. Effective RTL mirrors the arrow; the clock remains unchanged.",Demo:IconDirection,source:directionSource},
];
export const parts: OwnerPart[] = [
{"id": "props-icon", "title": "Icon", "description": "Default span; asChild composes one noninteractive SVG.", "rows": [{"name": "children", "typeLabel": "ReactElement", "defaultLabel": "", "description": "One SVG or a custom component forwarding all props/ref to one SVG."}, {"name": "size", "typeLabel": "ResponsiveIconSize", "defaultLabel": "md", "description": "inherit, 2xs, xs, sm, md, lg, xl, 2xl; responsive initial/sm/md/lg/xl."}, {"name": "tone", "typeLabel": "IconTone", "defaultLabel": "inherit", "description": "inherit, primary, secondary, muted, accent, info, success, warning, danger."}, {"name": "emphasis", "typeLabel": "\"text\" | \"solid\"", "defaultLabel": "text", "description": "Semantic foreground strength."}, {"name": "label / aria-labelledby", "typeLabel": "string", "defaultLabel": "", "description": "Mutually exclusive nonempty contextual name; omitted means decorative."}, {"name": "asChild", "typeLabel": "boolean", "defaultLabel": "false", "description": "Direct SVG; both refs and handlers are preserved by Atom."}, {"name": "directional", "typeLabel": "boolean", "defaultLabel": "false", "description": "Mirror only under effective RTL; nested LTR stays unmirrored."}, {"name": "slot / className / style", "typeLabel": "string / string / CSSProperties", "defaultLabel": "icon", "description": "Public slot and local styling hooks."}, {"name": "ref", "typeLabel": "Ref<HTMLElement | SVGSVGElement>", "defaultLabel": "", "description": "Actual wrapper or composed SVG."}]},
{"id": "props-factory", "title": "createIcon", "description": "Call at module scope in a client module. Output is a forwardRef SVG component.", "rows": [{"name": "d / path", "typeLabel": "string / ReactElement | ReactElement[]", "defaultLabel": "", "description": "Exactly one geometry source. Fragments and multiple paths are supported."}, {"name": "viewBox", "typeLabel": "string", "defaultLabel": "0 0 24 24", "description": "Factory SVG coordinate system; each instance may override."}, {"name": "displayName", "typeLabel": "string", "defaultLabel": "CreatedIcon", "description": "Debugging name, never an accessible label."}, {"name": "defaultProps", "typeLabel": "SVG defaults & IconPresentationProps", "defaultLabel": "", "description": "No refs, children, host substitution or accessible names."}, {"name": "instance props", "typeLabel": "CreatedIconProps", "defaultLabel": "", "description": "Icon presentation, contextual naming and SVG-native props. No children, asChild, raw role/aria-hidden/aria-label or tab stops."}, {"name": "ref", "typeLabel": "Ref<SVGSVGElement>", "defaultLabel": "", "description": "One SVG root, no wrapper or nested SVG."}, {"name": "precedence", "typeLabel": "instance > provider > factory > library", "defaultLabel": "", "description": "Presentation only. SVG defaults use instance > factory."}]},
{"id": "props-provider", "title": "IconPropsProvider", "description": "Wrapper-free visual defaults; context introduces a client boundary while preserving React SSR and hydration.", "rows": [{"name": "value", "typeLabel": "IconPresentationProps", "defaultLabel": "", "description": "Only size, tone and emphasis. Undefined inherits each outer property; nearer responsive size replaces the entire value."}, {"name": "children", "typeLabel": "ReactNode", "defaultLabel": "", "description": "Names, IDs, refs, handlers, styles and direction are never inherited."}]},
];
export const sections = ownerSections(examples, parts);
export { IconBasic, basicSource };
