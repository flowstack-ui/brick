import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { TimelineSizes } from "./examples/TimelineSizes.js";
import TimelineSizesSource from "./examples/TimelineSizes.tsx?raw";
import { TimelineVariants } from "./examples/TimelineVariants.js";
import TimelineVariantsSource from "./examples/TimelineVariants.tsx?raw";
import { TimelineDates } from "./examples/TimelineDates.js";
import TimelineDatesSource from "./examples/TimelineDates.tsx?raw";
import { TimelineAlternating } from "./examples/TimelineAlternating.js";
import TimelineAlternatingSource from "./examples/TimelineAlternating.tsx?raw";
import { TimelineTones } from "./examples/TimelineTones.js";
import TimelineTonesSource from "./examples/TimelineTones.tsx?raw";
import { TimelineContinuation } from "./examples/TimelineContinuation.js";
import TimelineContinuationSource from "./examples/TimelineContinuation.tsx?raw";
import { TimelineResponsive } from "./examples/TimelineResponsive.js";
import TimelineResponsiveSource from "./examples/TimelineResponsive.tsx?raw";
import { TimelineCustomization } from "./examples/TimelineCustomization.js";
import TimelineCustomizationSource from "./examples/TimelineCustomization.tsx?raw";
import { TimelineDefaults } from "./examples/TimelineDefaults.js";
import TimelineDefaultsSource from "./examples/TimelineDefaults.tsx?raw";
import { TimelineUnstyled } from "./examples/TimelineUnstyled.js";
import TimelineUnstyledSource from "./examples/TimelineUnstyled.tsx?raw";
import { TimelineComposition } from "./examples/TimelineComposition.js";
import TimelineCompositionSource from "./examples/TimelineComposition.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "sizes",
    title: "Sizes",
    description: "Scale markers and typography together with four sizes.",
    Demo: TimelineSizes,
    source: TimelineSizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description:
      "Choose solid, subtle, outline or plain; soft remains an additional tone-colored option.",
    Demo: TimelineVariants,
    source: TimelineVariantsSource,
  },
  {
    id: "dates",
    title: "Content before",
    description:
      "Use compact layout for a shared date column beside the event content.",
    Demo: TimelineDates,
    source: TimelineDatesSource,
  },
  {
    id: "alternating",
    title: "Alternating",
    description:
      "Place content on logical sides without empty placeholders or reordered events.",
    Demo: TimelineAlternating,
    source: TimelineAlternatingSource,
  },
  {
    id: "composition",
    title: "Composition",
    description:
      "Combine avatars, links, a card and a comment field inside the event content.",
    Demo: TimelineComposition,
    source: TimelineCompositionSource,
  },
  {
    id: "tones",
    title: "Event tones",
    description:
      "Use semantic colors for real event status and repeat the meaning in text.",
    Demo: TimelineTones,
    source: TimelineTonesSource,
  },
  {
    id: "continuation",
    title: "Last separator",
    description:
      "Keep the final separator visible when the chronology continues.",
    Demo: TimelineContinuation,
    source: TimelineContinuationSource,
  },
  {
    id: "responsive",
    title: "Responsive",
    description:
      "Change size and variant at CSS breakpoints without remounting events.",
    Demo: TimelineResponsive,
    source: TimelineResponsiveSource,
  },
  {
    id: "customization",
    title: "Customization",
    description:
      "Inherit documented marker color pairs and spacing from a surrounding scope.",
    Demo: TimelineCustomization,
    source: TimelineCustomizationSource,
  },
  {
    id: "defaults",
    title: "Shared defaults",
    description:
      "Use PropsProvider for common recipes, with explicit per-root overrides.",
    Demo: TimelineDefaults,
    source: TimelineDefaultsSource,
  },
  {
    id: "unstyled",
    title: "Unstyled and composition",
    description:
      "Keep native chronology and project onto one custom host without Timeline styling.",
    Demo: TimelineUnstyled,
    source: TimelineUnstyledSource,
  },
];
const host = {
  name: "asChild",
  typeLabel: "boolean",
  defaultLabel: "false",
  description:
    "Project onto one element that forwards props and ref; preserve native list grammar.",
};
const unstyled = {
  name: "unstyled",
  typeLabel: "boolean",
  defaultLabel: "false / inherited",
  description:
    "Remove this part's recipe classes; root choice is inherited by parts, not nested roots.",
};
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description:
      "Ordered list owning visual defaults and logical column layout.",
    rows: [
      {
        name: "size",
        typeLabel: 'ResponsiveValue<"sm" | "md" | "lg" | "xl">',
        defaultLabel: '"md"',
        description: "16, 20, 24 and 32px marker sizes.",
      },
      {
        name: "variant",
        typeLabel:
          'ResponsiveValue<"solid" | "subtle" | "soft" | "outline" | "plain">',
        defaultLabel: '"solid"',
        description: "Marker surface recipe.",
      },
      {
        name: "tone",
        typeLabel:
          '"neutral" | "accent" | "info" | "success" | "warning" | "danger"',
        defaultLabel: '"neutral"',
        description:
          "Semantic marker palette. Neutral solid is already high contrast.",
      },
      {
        name: "layout",
        typeLabel: 'ResponsiveValue<"balanced" | "compact">',
        defaultLabel: '"balanced"',
        description:
          "Balanced alternating columns or a shared content-sized leading metadata column.",
      },
      {
        name: "showLastSeparator",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Retain final separator and event spacing.",
      },
      host,
      unstyled,
    ],
  },
  {
    id: "props-item",
    title: "Item",
    description: "One native list item in chronological DOM order.",
    rows: [
      {
        name: "tone",
        typeLabel: "TimelineTone",
        defaultLabel: "inherited",
        description: "Override the marker's semantic event palette.",
      },
      host,
      unstyled,
    ],
  },
  {
    id: "props-connector",
    title: "Connector",
    description:
      "Decorative column for Indicator and Separator; never place actions here.",
    rows: [host, unstyled],
  },
  {
    id: "props-indicator",
    title: "Indicator",
    description:
      "Decorative circular marker containing an icon, avatar or short text.",
    rows: [host, unstyled],
  },
  {
    id: "props-separator",
    title: "Separator",
    description:
      "Decorative line stretching between markers with real clearances.",
    rows: [host, unstyled],
  },
  {
    id: "props-content",
    title: "Content",
    description:
      "Accessible event text, dates and rich interactive composition.",
    rows: [
      {
        name: "side",
        typeLabel: '"before" | "after"',
        defaultLabel: '"after"',
        description:
          "Logical placement mirrors in RTL without changing reading order.",
      },
      host,
      unstyled,
    ],
  },
  {
    id: "props-title",
    title: "Title",
    description:
      "Event title; projects onto a heading or time element when needed.",
    rows: [host, unstyled],
  },
  {
    id: "props-description",
    title: "Description",
    description: "Supporting event text with muted typography.",
    rows: [host, unstyled],
  },
  {
    id: "props-provider",
    title: "PropsProvider",
    description:
      "Shared visual defaults; RootPropsProvider is an alias. No DOM wrapper.",
    rows: [
      {
        name: "value",
        typeLabel: "TimelineRecipeProps",
        defaultLabel: "required",
        description:
          "size, variant, tone, layout, showLastSeparator and unstyled. Defined fields inherit; responsive maps replace whole.",
      },
    ],
  },
];
export const sections = ownerSections(examples, parts);
