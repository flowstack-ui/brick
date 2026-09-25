import type {
  OwnerExample,
  OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import { CarouselBasic } from "./examples/CarouselBasic.js";
import basicSource from "./examples/CarouselBasic.tsx?raw";
export { basicSource };
export const Basic = CarouselBasic;
import { CarouselArrows } from "./examples/CarouselArrows.js";
import ArrowsSource from "./examples/CarouselArrows.tsx?raw";
import { CarouselIndicators } from "./examples/CarouselIndicators.js";
import IndicatorsSource from "./examples/CarouselIndicators.tsx?raw";
import { CarouselMultiple } from "./examples/CarouselMultiple.js";
import MultipleSource from "./examples/CarouselMultiple.tsx?raw";
import { CarouselSpacing } from "./examples/CarouselSpacing.js";
import SpacingSource from "./examples/CarouselSpacing.tsx?raw";
import { CarouselVariable } from "./examples/CarouselVariable.js";
import VariableSource from "./examples/CarouselVariable.tsx?raw";
import { CarouselVertical } from "./examples/CarouselVertical.js";
import VerticalSource from "./examples/CarouselVertical.tsx?raw";
import { CarouselDrag } from "./examples/CarouselDrag.js";
import DragSource from "./examples/CarouselDrag.tsx?raw";
import { CarouselAutoplay } from "./examples/CarouselAutoplay.js";
import AutoplaySource from "./examples/CarouselAutoplay.tsx?raw";
import { CarouselInteraction } from "./examples/CarouselInteraction.js";
import InteractionSource from "./examples/CarouselInteraction.tsx?raw";
import { CarouselResponsive } from "./examples/CarouselResponsive.js";
import ResponsiveSource from "./examples/CarouselResponsive.tsx?raw";
import { CarouselRtl } from "./examples/CarouselRtl.js";
import RtlSource from "./examples/CarouselRtl.tsx?raw";
import { CarouselControlled } from "./examples/CarouselControlled.js";
import ControlledSource from "./examples/CarouselControlled.tsx?raw";
import { CarouselStore } from "./examples/CarouselStore.js";
import StoreSource from "./examples/CarouselStore.tsx?raw";
import { CarouselThumbnails } from "./examples/CarouselThumbnails.js";
import ThumbnailsSource from "./examples/CarouselThumbnails.tsx?raw";
import { CarouselImages } from "./examples/CarouselImages.js";
import ImagesSource from "./examples/CarouselImages.tsx?raw";
import { CarouselCards } from "./examples/CarouselCards.js";
import CardsSource from "./examples/CarouselCards.tsx?raw";
import { CarouselLightbox } from "./examples/CarouselLightbox.js";
import LightboxSource from "./examples/CarouselLightbox.tsx?raw";
import { CarouselDynamic } from "./examples/CarouselDynamic.js";
import DynamicSource from "./examples/CarouselDynamic.tsx?raw";
import { CarouselFill } from "./examples/CarouselFill.js";
import FillSource from "./examples/CarouselFill.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "arrows",
    title: "Arrows",
    description: "Use shared action recipes for navigation.",
    Demo: CarouselArrows,
    source: ArrowsSource,
  },
  {
    id: "indicators",
    title: "Indicators",
    description: "Indicators select pages, not individual visible items.",
    Demo: CarouselIndicators,
    source: IndicatorsSource,
  },
  {
    id: "multiple",
    title: "Multiple",
    description: "Two visible slides move together.",
    Demo: CarouselMultiple,
    source: MultipleSource,
  },
  {
    id: "spacing",
    title: "Spacing",
    description: "Spacing and padding reveal neighboring slides.",
    Demo: CarouselSpacing,
    source: SpacingSource,
  },
  {
    id: "variable",
    title: "Variable",
    description: "Each slide keeps its authored width.",
    Demo: CarouselVariable,
    source: VariableSource,
  },
  {
    id: "vertical",
    title: "Vertical",
    description: "Vertical carousels need a bounded height.",
    Demo: CarouselVertical,
    source: VerticalSource,
  },
  {
    id: "drag",
    title: "Drag",
    description: "Drag the surface, or use its navigation buttons.",
    Demo: CarouselDrag,
    source: DragSource,
  },
  {
    id: "autoplay",
    title: "Autoplay",
    description:
      "A visible rotation control lets people stop automatic movement.",
    Demo: CarouselAutoplay,
    source: AutoplaySource,
  },
  {
    id: "interaction",
    title: "Interaction",
    description: "Arrows appear on hover, focus or touch interaction.",
    Demo: CarouselInteraction,
    source: InteractionSource,
  },
  {
    id: "responsive",
    title: "Responsive",
    description: "Controls adapt without remounting slides.",
    Demo: CarouselResponsive,
    source: ResponsiveSource,
  },
  {
    id: "rtl",
    title: "Rtl",
    description: "Navigation follows the reading direction.",
    Demo: CarouselRtl,
    source: RtlSource,
  },
  {
    id: "controlled",
    title: "Controlled",
    description: "Control the active page through page and onPageChange.",
    Demo: CarouselControlled,
    source: ControlledSource,
  },
  {
    id: "store",
    title: "Store",
    description:
      "Use the public controller to navigate from an external button.",
    Demo: CarouselStore,
    source: StoreSource,
  },
  {
    id: "thumbnails",
    title: "Thumbnails",
    description: "Compose Image inside a thumbnail indicator.",
    Demo: CarouselThumbnails,
    source: ThumbnailsSource,
  },
  {
    id: "images",
    title: "Images",
    description: "Showcase images with a stable viewport.",
    Demo: CarouselImages,
    source: ImagesSource,
  },
  {
    id: "cards",
    title: "Cards",
    description: "Show several composed cards in the viewport.",
    Demo: CarouselCards,
    source: CardsSource,
  },
  {
    id: "lightbox",
    title: "Lightbox",
    description:
      "Compose Dialog with Carousel; closing restores trigger focus.",
    Demo: CarouselLightbox,
    source: LightboxSource,
  },
  {
    id: "dynamic",
    title: "Dynamic",
    description: "Keep slide identity when adding or removing items.",
    Demo: CarouselDynamic,
    source: DynamicSource,
  },
  {
    id: "fill",
    title: "Fill",
    description:
      "The parent owns height; fill propagates it through the viewport.",
    Demo: CarouselFill,
    source: FillSource,
  },
];
export const parts: OwnerPart[] = [
  {
    title: "Root",
    description:
      "Owns selection and measured geometry; visual props customize the finished presentation.",
    rows: [
      {
        name: "value / defaultValue / onValueChange",
        typeLabel: "string / callback",
        description:
          "Stable slide-value selection. Do not combine with page control.",
      },
      {
        name: "page / defaultPage / onPageChange",
        typeLabel: "number / callback",
        description: "Page-based controlled or initial selection.",
        defaultLabel: "0",
      },
      {
        name: "orientation",
        typeLabel: "horizontal | vertical",
        description: "Vertical requires an explicitly bounded height.",
        defaultLabel: "horizontal",
      },
      {
        name: "slidesPerPage / slidesPerMove",
        typeLabel: "number / number | auto",
        description: "Visible item count and movement groups.",
        defaultLabel: "1 / auto",
      },
      {
        name: "autoSize",
        typeLabel: "boolean",
        description: "Preserve authored slide dimensions.",
        defaultLabel: "false",
      },
      {
        name: "spacing / padding",
        typeLabel: "spacing token | CSS length",
        description: "Gap between items and edge peeking.",
        defaultLabel: "0",
      },
      {
        name: "snapType",
        typeLabel: "mandatory | proximity",
        description: "Native scroll-snap behavior.",
        defaultLabel: "mandatory",
      },
      {
        name: "loop",
        typeLabel: "boolean",
        description: "Wrap boundaries without cloned content.",
        defaultLabel: "true",
      },
      {
        name: "allowMouseDrag",
        typeLabel: "boolean",
        description: "Opt into mouse dragging; native touch remains available.",
        defaultLabel: "false",
      },
      {
        name: "autoPlay / defaultAutoPlay / interval",
        typeLabel: "boolean / boolean / number",
        description: "Playback state and delay, with visible pause control.",
        defaultLabel: "false / 7000ms",
      },
      {
        name: "onAutoPlayChange / onAutoplayStatusChange / onDragStatusChange",
        typeLabel: "callbacks",
        description:
          "Observe requested playback, effective playback and drag state.",
      },
      {
        name: "inViewThreshold",
        typeLabel: "number | number[]",
        description:
          "Threshold-qualified in-view state; distinct from visibility.",
        defaultLabel: "0.6",
      },
      {
        name: "slideCount",
        typeLabel: "number",
        description: "Optional server-rendered item-count hint.",
      },
      {
        name: "translations / ids / dir",
        typeLabel: "object / object / ltr | rtl",
        description: "Localized labels, stable relationship IDs and direction.",
      },
      {
        name: "previousAriaLabel / nextAriaLabel / startAriaLabel / stopAriaLabel",
        typeLabel: "string",
        description: "Override action labels.",
      },
      {
        name: "size",
        typeLabel: "ResponsiveValue<sm | md | lg>",
        description: "Coordinated control and indicator scale.",
        defaultLabel: "md",
      },
      {
        name: "tone",
        typeLabel: "neutral | contrast | accent",
        description: "Indicator palette.",
        defaultLabel: "accent",
      },
      {
        name: "controlPlacement",
        typeLabel: "overlay | outside",
        description: "Controls over content or in flow.",
        defaultLabel: "overlay",
      },
      {
        name: "controlVariant / controlTone / controlShape / controlSize",
        typeLabel: "shared action recipes",
        description: "Root defaults for actions, overridden per control.",
      },
      {
        name: "fill / radius",
        typeLabel: "boolean / Radius",
        description:
          "Fill a definite parent height and use shared viewport corners.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description: "Preserve one host, behavior and composed refs.",
      },
      {
        name: "children / className / style / ref",
        typeLabel: "native props",
        description: "Authored content and supported customization.",
      },
    ],
    id: "props-root",
  },
  {
    title: "RootProvider",
    description: "Renders a root backed by useCarousel.",
    rows: [
      {
        name: "value",
        typeLabel: "ReturnType<typeof useCarousel>",
        description:
          "The single controller instance; supports Root visual props.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description: "Preserve one host, behavior and composed refs.",
      },
      {
        name: "children / className / style / ref",
        typeLabel: "native props",
        description: "Authored content and supported customization.",
      },
    ],
    id: "props-rootprovider",
  },
  {
    title: "PropsProvider",
    description: "Supplies visual defaults, not behavior.",
    rows: [
      {
        name: "value",
        typeLabel: "CarouselRecipeProps",
        description: "Nested defaults merge; explicit root props win.",
      },
    ],
    id: "props-propsprovider",
  },
  {
    title: "Viewport",
    description: "Owns native scrolling, keyboard entry and mouse dragging.",
    rows: [
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description: "Preserve one host, behavior and composed refs.",
      },
      {
        name: "children / className / style / ref",
        typeLabel: "native props",
        description: "Authored content and supported customization.",
      },
    ],
    id: "props-viewport",
  },
  {
    title: "Track",
    description:
      "Contains the authored slides and noninteractive loop spacers.",
    rows: [
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description: "Preserve one host, behavior and composed refs.",
      },
      {
        name: "children / className / style / ref",
        typeLabel: "native props",
        description: "Authored content and supported customization.",
      },
    ],
    id: "props-track",
  },
  {
    title: "Slide",
    description: "A stable content item; visible peers remain interactive.",
    rows: [
      {
        name: "value / label",
        typeLabel: "string",
        description: "Unique stable value and accessible slide description.",
      },
      {
        name: "snapAlign",
        typeLabel: "start | center | end",
        description: "Item snap alignment.",
        defaultLabel: "start",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description: "Preserve one host, behavior and composed refs.",
      },
      {
        name: "children / className / style / ref",
        typeLabel: "native props",
        description: "Authored content and supported customization.",
      },
    ],
    id: "props-slide",
  },
  {
    title: "Previous",
    description:
      "A single Atom action host using shared Button/IconButton presentation.",
    rows: [
      {
        name: "unstyled",
        typeLabel: "boolean",
        description: "Use with asChild and Button for a text action without square IconButton presentation.",
        defaultLabel: "false",
      },
      {
        name: "size / variant / tone / shape / radius / focusRing",
        typeLabel: "shared action recipes",
        description:
          "Local props override root defaults, with responsive size support.",
      },
      {
        name: "disabled / aria-label",
        typeLabel: "native props",
        description: "Disable or name the action.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description: "Preserve one host, behavior and composed refs.",
      },
      {
        name: "children / className / style / ref",
        typeLabel: "native props",
        description: "Authored content and supported customization.",
      },
    ],
    id: "props-previous",
  },
  {
    title: "Next",
    description:
      "A single Atom action host using shared Button/IconButton presentation.",
    rows: [
      {
        name: "unstyled",
        typeLabel: "boolean",
        description: "Use with asChild and Button for a text action without square IconButton presentation.",
        defaultLabel: "false",
      },
      {
        name: "size / variant / tone / shape / radius / focusRing",
        typeLabel: "shared action recipes",
        description:
          "Local props override root defaults, with responsive size support.",
      },
      {
        name: "disabled / aria-label",
        typeLabel: "native props",
        description: "Disable or name the action.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description: "Preserve one host, behavior and composed refs.",
      },
      {
        name: "children / className / style / ref",
        typeLabel: "native props",
        description: "Authored content and supported customization.",
      },
    ],
    id: "props-next",
  },
  {
    title: "RotationControl",
    description:
      "A single Atom action host using shared Button/IconButton presentation.",
    rows: [
      {
        name: "unstyled",
        typeLabel: "boolean",
        description: "Use with asChild and Button for a text action without square IconButton presentation.",
        defaultLabel: "false",
      },
      {
        name: "size / variant / tone / shape / radius / focusRing",
        typeLabel: "shared action recipes",
        description:
          "Local props override root defaults, with responsive size support.",
      },
      {
        name: "disabled / aria-label",
        typeLabel: "native props",
        description: "Disable or name the action.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description: "Preserve one host, behavior and composed refs.",
      },
      {
        name: "children / className / style / ref",
        typeLabel: "native props",
        description: "Authored content and supported customization.",
      },
    ],
    id: "props-rotationcontrol",
  },
  {
    title: "Navigation",
    description: "Optional arrow arrangement.",
    rows: [
      {
        name: "visibility",
        typeLabel: "always | interaction",
        description: "Reveal arrows through focus, pointer and touch.",
        defaultLabel: "always",
      },
    ],
    id: "props-navigation",
  },
  {
    title: "Controls",
    description: "Arrange navigation, playback, indicators and progress.",
    rows: [
      {
        name: "children / className / style / ref",
        typeLabel: "native div props",
        description: "Choose only the controls the composition needs.",
      },
    ],
    id: "props-controls",
  },
  {
    title: "Picker",
    description: "Group explicitly authored indicators.",
    rows: [
      {
        name: "variant",
        typeLabel: "surface | bare",
        description: "Capsule or unpainted group.",
        defaultLabel: "surface",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description: "Preserve one host, behavior and composed refs.",
      },
      {
        name: "children / className / style / ref",
        typeLabel: "native props",
        description: "Authored content and supported customization.",
      },
    ],
    id: "props-picker",
  },
  {
    title: "PickerItem",
    description: "Direct selection of a value or page.",
    rows: [
      {
        name: "value / page",
        typeLabel: "string / number",
        description: "Choose one targeting mode.",
      },
      {
        name: "variant / indicatorShape / radius",
        typeLabel: "dot | thumbnail / circle | pill / Radius",
        description: "Indicator artwork and thumbnail corners.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        description: "Preserve one host, behavior and composed refs.",
      },
      {
        name: "children / className / style / ref",
        typeLabel: "native props",
        description: "Authored content and supported customization.",
      },
    ],
    id: "props-pickeritem",
  },
  {
    title: "Indicators",
    description: "Generate one picker item per reachable page.",
    rows: [
      {
        name: "itemProps",
        typeLabel: "CarouselPickerItemProps",
        description:
          "Customize generated indicator artwork; accepts Picker props.",
      },
    ],
    id: "props-indicators",
  },
  {
    title: "AutoplayIndicator",
    description: "Custom play and pause artwork.",
    rows: [
      {
        name: "play / paused",
        typeLabel: "ReactNode",
        description: "Decorative content for the action state.",
      },
    ],
    id: "props-autoplayindicator",
  },
  {
    title: "ProgressText",
    description: "Visible page progress without a second live region.",
    rows: [
      {
        name: "format",
        typeLabel: "(page, count) => ReactNode",
        description: "Customize or localize the displayed progress.",
      },
    ],
    id: "props-progresstext",
  },
  {
    title: "Context",
    description: "Read the active controller in compound content.",
    rows: [
      {
        name: "children",
        typeLabel: "(controller) => ReactNode",
        description: "Access pageSnapPoints, selection and playback commands.",
      },
    ],
    id: "props-context",
  },
];
export const sections: DocsSectionMetadata[] = [
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  ...examples.map(({ id, title }) => ({ id, title, level: 3 as const })),
  { id: "props", title: "Props", level: 2 },
  ...parts.map(({ id, title }) => ({ id, title, level: 3 as const })),
];
