import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { ImageBasic } from "./examples/ImageBasic.js";
import basicSource from "./examples/ImageBasic.tsx?raw";
import { ImageHeight } from "./examples/ImageHeight.js";
import sourceHeight from "./examples/ImageHeight.tsx?raw";
import { ImageCircular } from "./examples/ImageCircular.js";
import sourceCircular from "./examples/ImageCircular.tsx?raw";
import { ImageRatio } from "./examples/ImageRatio.js";
import sourceRatio from "./examples/ImageRatio.tsx?raw";
import { ImageFit } from "./examples/ImageFit.js";
import sourceFit from "./examples/ImageFit.tsx?raw";
import { ImageDimensions } from "./examples/ImageDimensions.js";
import sourceDimensions from "./examples/ImageDimensions.tsx?raw";
import { ImagePosition } from "./examples/ImagePosition.js";
import sourcePosition from "./examples/ImagePosition.tsx?raw";
import { ImageResponsive } from "./examples/ImageResponsive.js";
import sourceResponsive from "./examples/ImageResponsive.tsx?raw";
import { ImageSources } from "./examples/ImageSources.js";
import sourceSources from "./examples/ImageSources.tsx?raw";
import { ImageFill } from "./examples/ImageFill.js";
import sourceFill from "./examples/ImageFill.tsx?raw";
import { ImageFrame } from "./examples/ImageFrame.js";
import sourceFrame from "./examples/ImageFrame.tsx?raw";
import { ImageStates } from "./examples/ImageStates.js";
import sourceStates from "./examples/ImageStates.tsx?raw";
import { ImagePicture } from "./examples/ImagePicture.js";
import sourcePicture from "./examples/ImagePicture.tsx?raw";
export const examples: OwnerExample[] = [
{id:"height",title:"Height",description:"Frame supplies a definite display height; explicit fill consumes it.",Demo:ImageHeight,source:sourceHeight},
{id:"circular",title:"Circular",description:"A square ratio and full radius make a circle; radius alone does not.",Demo:ImageCircular,source:sourceCircular},
{id:"aspect-ratio",title:"Aspect ratio",description:"An authored numeric ratio reserves a stable crop.",Demo:ImageRatio,source:sourceRatio},
{id:"fit",title:"Fit",description:"Contain keeps the complete artwork visible in a square box.",Demo:ImageFit,source:sourceFit},
{id:"html-dimensions",title:"HTML width/height",description:"Content width and height describe intrinsic pixels. Frame constrains display width.",Demo:ImageDimensions,source:sourceDimensions},
{id:"position",title:"Position",description:"An authored focal point stays physical; start/end follow effective direction.",Demo:ImagePosition,source:sourcePosition},
{id:"responsive-presentation",title:"Responsive presentation",description:"Crop changes through CSS at Brick breakpoints. Sparse fit starts cover, position center, and supplied ratio 16/9.",Demo:ImageResponsive,source:sourceResponsive},
{id:"responsive-sources",title:"Responsive sources",description:"Genuine 384w and 768w candidates with sizes matching this bounded slot. Root knows candidates during SSR.",Demo:ImageSources,source:sourceSources},
{id:"parent-fill",title:"Parent fill",description:"The enclosing Frame owns both dimensions. Image fill does not invent parent geometry.",Demo:ImageFill,source:sourceFill},
{id:"frame-radius",title:"Frame/radius",description:"Frame and radius remain scalar presentation choices.",Demo:ImageFrame,source:sourceFrame},
{id:"source-states",title:"Loading, error and replacement",description:"Loading overlays are opt-in. Errors hide Content; author meaningful fallback and restore or clear the source.",Demo:ImageStates,source:sourceStates},
{id:"picture",title:"Picture composition",description:"Compose Root as picture, source before Content, and phrasing fallback as span. Avoid a nested picture wrapper for ratio/fill.",Demo:ImagePicture,source:sourcePicture}
];
export const parts: OwnerPart[] = [{"id": "props-root", "title": "Root", "description": "Atom owns sources/status and root composition; Brick owns presentation on the same div or composed host.", "rows": [{"name": "src / srcSet", "typeLabel": "string", "defaultLabel": "\u2014", "description": "Canonical source metadata; native output belongs to Content."}, {"name": "fit", "typeLabel": "ResponsiveImageFit", "defaultLabel": "cover", "description": "cover, contain, fill, none, scale-down; initial/sm/md/lg/xl."}, {"name": "position", "typeLabel": "ResponsiveImagePosition", "defaultLabel": "center", "description": "Logical presets or authored CSS object-position."}, {"name": "ratio", "typeLabel": "ResponsiveImageRatio", "defaultLabel": "intrinsic", "description": "Positive numeric width/height. Supplied sparse objects start 16/9."}, {"name": "fill", "typeLabel": "boolean", "defaultLabel": "false", "description": "Consume a definite parent size."}, {"name": "radius / frame", "typeLabel": "Radius / ImageFrame", "defaultLabel": "none / none", "description": "Shared radius; none or subtle frame."}, {"name": "onLoadingStatusChange", "typeLabel": "(status) => void", "defaultLabel": "\u2014", "description": "idle, loading, loaded, error."}, {"name": "asChild / render / ref", "typeLabel": "Atom composition", "defaultLabel": "div", "description": "Preserve one host and forwarded ref."}]}, {"id": "props-content", "title": "Content", "description": "One native img; forwards its actual HTMLImageElement ref and native event handlers.", "rows": [{"name": "alt", "typeLabel": "string", "defaultLabel": "required", "description": "Contextual description, or empty for decoration."}, {"name": "width / height", "typeLabel": "number | string", "defaultLabel": "\u2014", "description": "Intrinsic dimensions, not Frame display dimensions."}, {"name": "srcSet", "typeLabel": "string", "defaultLabel": "Root srcSet", "description": "Compatibility override; cannot supply Root SSR knowledge."}, {"name": "sizes / loading / decoding / fetchPriority", "typeLabel": "native img props", "defaultLabel": "browser defaults", "description": "Truthful slot size and explicit application scheduling."}, {"name": "crossOrigin / referrerPolicy / onLoad / onError", "typeLabel": "native img props", "defaultLabel": "\u2014", "description": "Native request policy and event composition."}, {"name": "asChild / render / ref", "typeLabel": "Atom composition", "defaultLabel": "img", "description": "Forward all props/ref to the actual img."}]}, {"id": "props-fallback", "title": "Fallback", "description": "Authored conditional div, or a phrasing span when inside picture. No automatic live region.", "rows": [{"name": "when", "typeLabel": "idle | loading | error | readonly array", "defaultLabel": "idle/error", "description": "Multiple state-specific parts are supported."}, {"name": "children", "typeLabel": "ReactNode", "defaultLabel": "\u2014", "description": "Meaningful replacement content. Errors without fallback are empty."}, {"name": "asChild / render / ref", "typeLabel": "Atom composition", "defaultLabel": "div", "description": "Use span under picture."}]}];
export const sections = ownerSections(examples, parts, true);
sections.splice(sections.findIndex(section => section.id === "html-dimensions") + 1, 0, {id: "framework-integration", title: "Framework integration", level: 3});
export { ImageBasic, basicSource };
