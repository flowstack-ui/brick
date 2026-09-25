import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { MarqueeReversed } from "./examples/MarqueeReversed.js";
import ReversedSource from "./examples/MarqueeReversed.tsx?raw";
import { MarqueeVertical } from "./examples/MarqueeVertical.js";
import VerticalSource from "./examples/MarqueeVertical.tsx?raw";
import { MarqueeSpeed } from "./examples/MarqueeSpeed.js";
import SpeedSource from "./examples/MarqueeSpeed.tsx?raw";
import { MarqueeInteraction } from "./examples/MarqueeInteraction.js";
import InteractionSource from "./examples/MarqueeInteraction.tsx?raw";
import { MarqueeStore } from "./examples/MarqueeStore.js";
import StoreSource from "./examples/MarqueeStore.tsx?raw";
import { MarqueeFinite } from "./examples/MarqueeFinite.js";
import FiniteSource from "./examples/MarqueeFinite.tsx?raw";
import { MarqueeEdges } from "./examples/MarqueeEdges.js";
import EdgesSource from "./examples/MarqueeEdges.tsx?raw";
import { MarqueeMultiple } from "./examples/MarqueeMultiple.js";
import MultipleSource from "./examples/MarqueeMultiple.tsx?raw";
import { MarqueeDiagonal } from "./examples/MarqueeDiagonal.js";
import DiagonalSource from "./examples/MarqueeDiagonal.tsx?raw";
import { MarqueeNews } from "./examples/MarqueeNews.js";
import NewsSource from "./examples/MarqueeNews.tsx?raw";
import { MarqueeGallery } from "./examples/MarqueeGallery.js";
import GallerySource from "./examples/MarqueeGallery.tsx?raw";
import { MarqueeTestimonials } from "./examples/MarqueeTestimonials.js";
import TestimonialsSource from "./examples/MarqueeTestimonials.tsx?raw";
import { MarqueeResponsive } from "./examples/MarqueeResponsive.js";
import ResponsiveSource from "./examples/MarqueeResponsive.tsx?raw";
import { MarqueeDefaults } from "./examples/MarqueeDefaults.js";
import DefaultsSource from "./examples/MarqueeDefaults.tsx?raw";
export const examples: OwnerExample[] = [
{ id: "reversed", title: "Reversed", description: "Reverse the direction with reverse.", Demo: MarqueeReversed, source: ReversedSource },
{ id: "vertical", title: "Vertical animation", description: "Use side=\"bottom\" and a bounded height for vertical movement.", Demo: MarqueeVertical, source: VerticalSource },
{ id: "speed", title: "Speed", description: "Set speed in pixels per second; this lane travels at 100px/s.", Demo: MarqueeSpeed, source: SpeedSource },
{ id: "interaction", title: "Pause on interaction", description: "pauseOnInteraction pauses on hover. The pause button also works with keyboard and touch.", Demo: MarqueeInteraction, source: InteractionSource },
{ id: "store", title: "Store and controlled pause", description: "Control paused through useMarquee and share the controller with RootProvider and Context.", Demo: MarqueeStore, source: StoreSource },
{ id: "finite", title: "Finite loops", description: "Use loopCount and callbacks to observe three completed iterations.", Demo: MarqueeFinite, source: FiniteSource },
{ id: "edges", title: "Edge gradient", description: "Add optional start/end Edge parts. Their color should match the surrounding surface.", Demo: MarqueeEdges, source: EdgesSource },
{ id: "multiple", title: "Multiple lanes", description: "Compose independent lanes with alternating directions.", Demo: MarqueeMultiple, source: MultipleSource },
{ id: "diagonal", title: "Diagonal", description: "Rotate the artwork container; Marquee continues to own track movement.", Demo: MarqueeDiagonal, source: DiagonalSource },
{ id: "news", title: "News ticker", description: "Only original items are links. Focus exposes stationary originals.", Demo: MarqueeNews, source: NewsSource },
{ id: "gallery", title: "Image gallery", description: "Bound two vertical image lanes and reverse one for alternating movement.", Demo: MarqueeGallery, source: GallerySource },
{ id: "testimonials", title: "Testimonials", description: "Compose passive cards and keep their visual replicas free of interactive state.", Demo: MarqueeTestimonials, source: TestimonialsSource },
{ id: "responsive", title: "AutoFill and responsive spacing", description: "autoFill covers short tracks. Change spacing at CSS breakpoints without remounting content.", Demo: MarqueeResponsive, source: ResponsiveSource },
{ id: "defaults", title: "Shared defaults and unstyled", description: "PropsProvider supplies presentation defaults. This unstyled example deliberately keeps originals stationary.", Demo: MarqueeDefaults, source: DefaultsSource }];
export const parts: OwnerPart[] = [
  {
    "id": "props-root",
    "title": "Root",
    "description": "Measured motion owner; native div with optional region name.",
    "rows": [
      {
        "name": "side",
        "typeLabel": "start | end | top | bottom",
        "defaultLabel": "start",
        "description": "Logical motion direction."
      },
      {
        "name": "reverse",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Reverse resolved movement."
      },
      {
        "name": "spacing",
        "typeLabel": "ResponsiveValue<number | string>",
        "defaultLabel": "4",
        "description": "Numeric factors and legacy string spacing tokens; sparse breakpoint maps supported."
      },
      {
        "name": "speed",
        "typeLabel": "number",
        "defaultLabel": "50",
        "description": "Pixels per second; must be finite and positive."
      },
      {
        "name": "delay",
        "typeLabel": "number",
        "defaultLabel": "0",
        "description": "Initial delay in seconds."
      },
      {
        "name": "loopCount",
        "typeLabel": "number",
        "defaultLabel": "0",
        "description": "Zero means infinite; positive integers stop after that many loops."
      },
      {
        "name": "autoFill",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Fill a short track with safe replicas, within the copy limit."
      },
      {
        "name": "paused / defaultPaused",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Controlled or initial requested pause; safety reasons remain independent."
      },
      {
        "name": "pauseOnInteraction",
        "typeLabel": "boolean",
        "defaultLabel": "false",
        "description": "Hover pauses. Focus always reveals stationary originals."
      },
      {
        "name": "onPauseChange",
        "typeLabel": "(paused: boolean) => void",
        "defaultLabel": "—",
        "description": "Requested pause callback."
      },
      {
        "name": "onLoopComplete / onComplete",
        "typeLabel": "callbacks",
        "defaultLabel": "—",
        "description": "Receive {iteration} or {iterations}; only originals count."
      },
      {
        "name": "id / ids",
        "typeLabel": "string / {viewport?, content?}",
        "defaultLabel": "generated",
        "description": "Configure original IDs; replicas remain ID-free."
      },
      {
        "name": "dir / translations",
        "typeLabel": "ltr | rtl / {regionLabel?}",
        "defaultLabel": "inherited / —",
        "description": "Direction and optional localized region name."
      },
      {
        "name": "asChild / render",
        "typeLabel": "boolean / RenderProp",
        "defaultLabel": "false / —",
        "description": "Project onto a host that forwards props and refs."
      },
      {
        "name": "unstyled",
        "typeLabel": "boolean",
        "defaultLabel": "false / inherited",
        "description": "Remove this part's recipe; preserve Atom behavior. Explicit part values override the root."
      }
    ]
  },
  {
    "id": "props-rootprovider",
    "title": "RootProvider",
    "description": "Use instead of Root when useMarquee owns behavior.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "ReturnType<typeof useMarquee>",
        "defaultLabel": "required",
        "description": "Controller from Brick's hook, including responsive presentation spacing."
      },
      {
        "name": "asChild / render",
        "typeLabel": "boolean / RenderProp",
        "defaultLabel": "false / —",
        "description": "Project onto a host that forwards props and refs."
      },
      {
        "name": "unstyled",
        "typeLabel": "boolean",
        "defaultLabel": "false / inherited",
        "description": "Remove this part's recipe; preserve Atom behavior. Explicit part values override the root."
      }
    ]
  },
  {
    "id": "props-propsprovider",
    "title": "PropsProvider",
    "description": "No host. RootPropsProvider is an alias.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "MarqueeRecipeProps",
        "defaultLabel": "required",
        "description": "spacing and unstyled defaults. Nested defined values merge; responsive maps replace."
      }
    ]
  },
  {
    "id": "props-viewport",
    "title": "Viewport",
    "description": "Clipped moving track; static state permits native scrolling.",
    "rows": [
      {
        "name": "asChild / render",
        "typeLabel": "boolean / RenderProp",
        "defaultLabel": "false / —",
        "description": "Project onto a host that forwards props and refs."
      },
      {
        "name": "unstyled",
        "typeLabel": "boolean",
        "defaultLabel": "false / inherited",
        "description": "Remove this part's recipe; preserve Atom behavior. Explicit part values override the root."
      }
    ]
  },
  {
    "id": "props-content",
    "title": "Content",
    "description": "One original plus explicit passive visual replicas.",
    "rows": [
      {
        "name": "renderReplica",
        "typeLabel": "(index: number) => ReactNode",
        "defaultLabel": "—",
        "description": "Pure, ID-free, noninteractive artwork. Missing or unsafe copies keep originals stationary."
      },
      {
        "name": "asChild / render",
        "typeLabel": "boolean / RenderProp",
        "defaultLabel": "false / —",
        "description": "Project onto a host that forwards props and refs."
      },
      {
        "name": "unstyled",
        "typeLabel": "boolean",
        "defaultLabel": "false / inherited",
        "description": "Remove this part's recipe; preserve Atom behavior. Explicit part values override the root."
      }
    ]
  },
  {
    "id": "props-item",
    "title": "Item",
    "description": "Passive content item. Content components own its visual recipe.",
    "rows": [
      {
        "name": "asChild / render",
        "typeLabel": "boolean / RenderProp",
        "defaultLabel": "false / —",
        "description": "Project onto a host that forwards props and refs."
      },
      {
        "name": "unstyled",
        "typeLabel": "boolean",
        "defaultLabel": "false / inherited",
        "description": "Remove this part's recipe; preserve Atom behavior. Explicit part values override the root."
      }
    ]
  },
  {
    "id": "props-edge",
    "title": "Edge",
    "description": "Decorative span above the viewport, never intercepting pointers.",
    "rows": [
      {
        "name": "side",
        "typeLabel": "start | end | top | bottom",
        "defaultLabel": "start",
        "description": "Logical edge receiving the fade."
      },
      {
        "name": "asChild / render",
        "typeLabel": "boolean / RenderProp",
        "defaultLabel": "false / —",
        "description": "Project onto a host that forwards props and refs."
      },
      {
        "name": "unstyled",
        "typeLabel": "boolean",
        "defaultLabel": "false / inherited",
        "description": "Remove this part's recipe; preserve Atom behavior. Explicit part values override the root."
      }
    ]
  },
  {
    "id": "props-context",
    "title": "Context",
    "description": "No host; read current controller state.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "(controller) => ReactNode",
        "defaultLabel": "required",
        "description": "Read pauseReasons, requestedPaused, paused, static, iteration, completed, geometry and pause/resume/togglePause/restart."
      }
    ]
  }
];
export const sections = ownerSections(examples, parts, true);
