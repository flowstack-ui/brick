import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { ToggleTipBasic } from "./examples/ToggleTipBasic.js";
import ToggleTipBasicSource from "./examples/ToggleTipBasic.tsx?raw";
import { ToggleTipInfo } from "./examples/ToggleTipInfo.js";
import ToggleTipInfoSource from "./examples/ToggleTipInfo.tsx?raw";
import { ToggleTipSizes } from "./examples/ToggleTipSizes.js";
import ToggleTipSizesSource from "./examples/ToggleTipSizes.tsx?raw";
import { ToggleTipArrow } from "./examples/ToggleTipArrow.js";
import ToggleTipArrowSource from "./examples/ToggleTipArrow.tsx?raw";
import { ToggleTipEscape } from "./examples/ToggleTipEscape.js";
import ToggleTipEscapeSource from "./examples/ToggleTipEscape.tsx?raw";
import { ToggleTipOutside } from "./examples/ToggleTipOutside.js";
import ToggleTipOutsideSource from "./examples/ToggleTipOutside.tsx?raw";
import { ToggleTipControlled } from "./examples/ToggleTipControlled.js";
import ToggleTipControlledSource from "./examples/ToggleTipControlled.tsx?raw";
import { ToggleTipPlacement } from "./examples/ToggleTipPlacement.js";
import ToggleTipPlacementSource from "./examples/ToggleTipPlacement.tsx?raw";
import { ToggleTipRadius } from "./examples/ToggleTipRadius.js";
import ToggleTipRadiusSource from "./examples/ToggleTipRadius.tsx?raw";
import { ToggleTipLink } from "./examples/ToggleTipLink.js";
import ToggleTipLinkSource from "./examples/ToggleTipLink.tsx?raw";
import { ToggleTipInline } from "./examples/ToggleTipInline.js";
import ToggleTipInlineSource from "./examples/ToggleTipInline.tsx?raw";
import { ToggleTipLifecycle } from "./examples/ToggleTipLifecycle.js";
import ToggleTipLifecycleSource from "./examples/ToggleTipLifecycle.tsx?raw";
import { ToggleTipDialog } from "./examples/ToggleTipDialog.js";
import ToggleTipDialogSource from "./examples/ToggleTipDialog.tsx?raw";
import { ToggleTipStore } from "./examples/ToggleTipStore.js";
import ToggleTipStoreSource from "./examples/ToggleTipStore.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "info",
    title: "Info tip",
    description: "Compose an independently named information IconButton.",
    Demo: ToggleTipInfo,
    source: ToggleTipInfoSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Size changes typography and both padding axes together.",
    Demo: ToggleTipSizes,
    source: ToggleTipSizesSource,
  },
  {
    id: "arrow",
    title: "Arrow",
    description: "Add an optional decorative pointer.",
    Demo: ToggleTipArrow,
    source: ToggleTipArrowSource,
  },
  {
    id: "escape",
    title: "Escape",
    description: "Keep the tip open on Escape with an explicit close action.",
    Demo: ToggleTipEscape,
    source: ToggleTipEscapeSource,
  },
  {
    id: "outside",
    title: "Outside",
    description: "Keep the tip open after outside interaction.",
    Demo: ToggleTipOutside,
    source: ToggleTipOutsideSource,
  },
  {
    id: "controlled",
    title: "Controlled",
    description: "Control the open state from your application.",
    Demo: ToggleTipControlled,
    source: ToggleTipControlledSource,
  },
  {
    id: "placement",
    title: "Placement",
    description: "Choose a preferred side and override the default gap.",
    Demo: ToggleTipPlacement,
    source: ToggleTipPlacementSource,
  },
  {
    id: "radius",
    title: "Radius",
    description: "Choose core or semantic radius tokens.",
    Demo: ToggleTipRadius,
    source: ToggleTipRadiusSource,
  },
  {
    id: "link",
    title: "Link",
    description: "Short interactive help retains dialog semantics.",
    Demo: ToggleTipLink,
    source: ToggleTipLinkSource,
  },
  {
    id: "inline",
    title: "Inline",
    description: "Keep the content inside the local DOM and appearance scope.",
    Demo: ToggleTipInline,
    source: ToggleTipInlineSource,
  },
  {
    id: "lifecycle",
    title: "Lifecycle",
    description: "Retain hidden content after its first opening.",
    Demo: ToggleTipLifecycle,
    source: ToggleTipLifecycleSource,
  },
  {
    id: "dialog",
    title: "Dialog",
    description: "Keep nested help in the dialog scope.",
    Demo: ToggleTipDialog,
    source: ToggleTipDialogSource,
  },
  {
    id: "store",
    title: "Store",
    description: "Reuse the original public controller without copying it.",
    Demo: ToggleTipStore,
    source: ToggleTipStoreSource,
  },
];
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description: "Popover-owned state, positioning and lifecycle.",
    rows: [
      {
        name: "open / defaultOpen",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Controlled or initial open state.",
      },
      {
        name: "onOpenChange",
        typeLabel: "(open: boolean) => void",
        defaultLabel: "—",
        description: "Accept requested state changes.",
      },
      {
        name: "positioning",
        typeLabel: "PopoverPositioningOptions",
        defaultLabel: "gutter: 4",
        description:
          "Placement, collision, offsets, viewport constraints and virtual anchors.",
      },
      {
        name: "closeOnEscape / closeOnInteractOutside",
        typeLabel: "boolean",
        defaultLabel: "true",
        description:
          "Dismissal switches; keep an explicit close path when disabled.",
      },
      {
        name: "modal / disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Prefer regular Popover for modal workflows.",
      },
      {
        name: "lazyMount / unmountOnExit / immediate",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Popover lifecycle defaults.",
      },
      {
        name: "portalled",
        typeLabel: "boolean",
        defaultLabel: "true",
        description:
          "Tab-order policy; Portal separately controls DOM relocation.",
      },
      {
        name: "remaining Popover.Root props",
        typeLabel: "PopoverRootProps",
        defaultLabel: "inherited",
        description:
          "IDs, focus restoration, presence, trigger values and preventable outside callbacks.",
      },
    ],
  },
  {
    id: "props-content",
    title: "Content",
    description: "Positioned dialog with compact visual recipes.",
    rows: [
      {
        name: "size",
        typeLabel: '"xs" | "sm" | "md" | "lg"',
        defaultLabel: '"xs"',
        description: "Typography and internal padding.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: '"sm"',
        description: "Core or semantic radius.",
      },
      {
        name: "aria-label / aria-labelledby",
        typeLabel: "string",
        defaultLabel: "—",
        description: "Required unless a Title supplies the accessible name.",
      },
      {
        name: "initialFocus / finalFocus",
        typeLabel: "ref | callback | false",
        defaultLabel: "automatic",
        description: "Inherited focus destinations.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean | RenderProp",
        defaultLabel: "—",
        description: "Preserve positioning and viewport when composing.",
      },
      {
        name: "remaining Popover.Content props",
        typeLabel: "native and positioning props",
        defaultLabel: "inherited",
        description:
          "Includes side, align and sideOffset; excludes density and inset.",
      },
    ],
  },
  {
    id: "props-trigger",
    title: "Trigger, Anchor, Close and Indicator",
    description: "Reuse Popover controls and decorative state.",
    rows: [
      {
        name: "asChild / render",
        typeLabel: "boolean | RenderProp",
        defaultLabel: "—",
        description:
          "Preserve native interaction and refs. Trigger must be named.",
      },
      {
        name: "value",
        typeLabel: "string",
        defaultLabel: "generated",
        description: "Trigger identity for shared tips.",
      },
    ],
  },
  {
    id: "props-body",
    title: "Body, Title and Description",
    description:
      "Body pads and scrolls. Title names the dialog; Description describes it.",
    rows: [
      {
        name: "native props / asChild / render",
        typeLabel: "inherited Popover part props",
        defaultLabel: "—",
        description:
          "Place Title and Description inside Body to preserve compact spacing.",
      },
    ],
  },
  {
    id: "props-portal",
    title: "Portal",
    description: "Optional DOM relocation.",
    rows: [
      {
        name: "container",
        typeLabel: "HTMLElement | null",
        defaultLabel: "owner document body",
        description: "Use a local container for scoped appearance.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Render inline; pair with Root portalled=false.",
      },
    ],
  },
  {
    id: "props-arrow",
    title: "Arrow",
    description: "Optional direct Content child, never inside Body.",
    rows: [
      {
        name: "width / height",
        typeLabel: "number",
        defaultLabel: "10 / 5",
        description: "Decorative pointer geometry.",
      },
    ],
  },
  {
    id: "props-state",
    title: "RootProvider and State",
    description: "External controller and state access.",
    rows: [
      {
        name: "value",
        typeLabel: "UseToggleTipReturn",
        defaultLabel: "required",
        description: "Original useToggleTip result.",
      },
      {
        name: "children",
        typeLabel: "(state) => ReactNode",
        defaultLabel: "—",
        description: "State exposes open, triggerValue and actions.",
      },
    ],
  },
];
export const sections = ownerSections(examples, parts);
export { ToggleTipBasic, ToggleTipBasicSource };
