import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { HoverCardBasic } from "./examples/HoverCardBasic.js";
import basicSource from "./examples/HoverCardBasic.tsx?raw";
export { basicSource };
export const Basic = HoverCardBasic;
import { HoverCardControlled } from "./examples/HoverCardControlled.js";
import ControlledSource from "./examples/HoverCardControlled.tsx?raw";
import { HoverCardMultiple } from "./examples/HoverCardMultiple.js";
import MultipleSource from "./examples/HoverCardMultiple.tsx?raw";
import { HoverCardDelays } from "./examples/HoverCardDelays.js";
import DelaysSource from "./examples/HoverCardDelays.tsx?raw";
import { HoverCardPlacement } from "./examples/HoverCardPlacement.js";
import PlacementSource from "./examples/HoverCardPlacement.tsx?raw";
import { HoverCardDisabled } from "./examples/HoverCardDisabled.js";
import DisabledSource from "./examples/HoverCardDisabled.tsx?raw";
import { HoverCardDialog } from "./examples/HoverCardDialog.js";
import DialogSource from "./examples/HoverCardDialog.tsx?raw";
import { HoverCardSizes } from "./examples/HoverCardSizes.js";
import SizesSource from "./examples/HoverCardSizes.tsx?raw";
import { HoverCardInsets } from "./examples/HoverCardInsets.js";
import InsetsSource from "./examples/HoverCardInsets.tsx?raw";
import { HoverCardRadius } from "./examples/HoverCardRadius.js";
import RadiusSource from "./examples/HoverCardRadius.tsx?raw";
import { HoverCardStore } from "./examples/HoverCardStore.js";
import StoreSource from "./examples/HoverCardStore.tsx?raw";
import { HoverCardRetained } from "./examples/HoverCardRetained.js";
import RetainedSource from "./examples/HoverCardRetained.tsx?raw";
import { HoverCardPositioning } from "./examples/HoverCardPositioning.js";
import PositioningSource from "./examples/HoverCardPositioning.tsx?raw";
import { HoverCardDismissal } from "./examples/HoverCardDismissal.js";
import DismissalSource from "./examples/HoverCardDismissal.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "controlled",
    title: "Controlled",
    description: "Keep disclosure state in the application.",
    Demo: HoverCardControlled,
    source: ControlledSource,
  },
  {
    id: "multiple",
    title: "Multiple triggers",
    description: "Unique values let one preview move between subjects.",
    Demo: HoverCardMultiple,
    source: MultipleSource,
  },
  {
    id: "delays",
    title: "Delays",
    description: "Choose independent opening and closing delays.",
    Demo: HoverCardDelays,
    source: DelaysSource,
  },
  {
    id: "placement",
    title: "Placement",
    description: "The arrow follows the collision-resolved side.",
    Demo: HoverCardPlacement,
    source: PlacementSource,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Disable the preview without disabling its link.",
    Demo: HoverCardDisabled,
    source: DisabledSource,
  },
  {
    id: "dialog",
    title: "Open from Dialog",
    description:
      "Use a managed HoverCard Portal to escape the dialog body's scrolling boundary while preserving nested dismissal.",
    Demo: HoverCardDialog,
    source: DialogSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Width is independent from padding and typography.",
    Demo: HoverCardSizes,
    source: SizesSource,
  },
  {
    id: "insets",
    title: "Insets",
    description: "Choose 12, 16, 20 or 24px content padding.",
    Demo: HoverCardInsets,
    source: InsetsSource,
  },
  {
    id: "radius",
    title: "Radius",
    description: "Use shared core or semantic theme radii.",
    Demo: HoverCardRadius,
    source: RadiusSource,
  },
  {
    id: "store",
    title: "Controller",
    description:
      "Coordinate the preview through useHoverCard and RootProvider.",
    Demo: HoverCardStore,
    source: StoreSource,
  },
  {
    id: "retained",
    title: "Retained content",
    description: "Mount once and retain the hidden content between openings.",
    Demo: HoverCardRetained,
    source: RetainedSource,
  },
  {
    id: "positioning",
    title: "Positioning options",
    description:
      "Match the trigger's width while constraining the preview to the viewport.",
    Demo: HoverCardPositioning,
    source: PositioningSource,
  },
  {
    id: "dismissal",
    title: "Outside events",
    description:
      "Prevent an individual dismissal source without disabling Escape or hover behavior.",
    Demo: HoverCardDismissal,
    source: DismissalSource,
  },
];
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description:
      "Owns passive disclosure; these options also work with useHoverCard.",
    rows: [
      {
        name: "open / defaultOpen",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Controlled or initial disclosure state.",
      },
      {
        name: "onOpenChange",
        typeLabel: "(open: boolean) => void",
        defaultLabel: "—",
        description: "Accept or reject a proposed state.",
      },
      {
        name: "openDelay / closeDelay",
        typeLabel: "number",
        defaultLabel: "600 / 300",
        description: "Delays in milliseconds.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Cancel opening and close the preview without disabling its link.",
      },
      {
        name: "triggerValue / defaultTriggerValue",
        typeLabel: "string",
        defaultLabel: "—",
        description: "Controlled or initial active trigger.",
      },
      {
        name: "onTriggerValueChange",
        typeLabel: "(value: string | undefined) => void",
        defaultLabel: "—",
        description: "Observe or control the active subject.",
      },
      {
        name: "id / ids",
        typeLabel: "string / HoverCardIds",
        defaultLabel: "Generated",
        description: "Stable content, arrow and value-aware trigger IDs.",
      },
      {
        name: "positioning",
        typeLabel: "HoverCardPositioningOptions",
        defaultLabel: "bottom / absolute",
        description:
          "Placement, strategy, gutter, offset, shift, flip, slide, overlap, boundary, overflowPadding, sameWidth, fitViewport, hideWhenDetached, listeners, animationFrame, sizeMiddleware, arrowPadding, getAnchorRect, getAnchorElement and onPositioned.",
      },
      {
        name: "lazyMount / unmountOnExit",
        typeLabel: "boolean",
        defaultLabel: "true / true",
        description: "Control first mounting and retention after exit.",
      },
      {
        name: "present / immediate",
        typeLabel: "boolean",
        defaultLabel: "open / true",
        description: "Override presence or defer its synchronization.",
      },
      {
        name: "skipAnimationOnMount",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Skip initial entry motion.",
      },
      {
        name: "hideMode",
        typeLabel: "'display-none' | 'activity'",
        defaultLabel: "display-none",
        description:
          "Activity pauses effects when supported by React; otherwise uses display-none.",
      },
      {
        name: "onExitComplete",
        typeLabel: "() => void",
        defaultLabel: "—",
        description: "Called after completed exit.",
      },
      {
        name: "onPointerDownOutside / onInteractOutside / onFocusOutside / onEscapeKeyDown / onRequestDismiss",
        typeLabel: "Event callbacks",
        defaultLabel: "—",
        description: "Prevent default to cancel that dismissal source.",
      },
      {
        name: "persistentElements",
        typeLabel: "Array<() => HTMLElement | null>",
        defaultLabel: "—",
        description: "Exclude known external elements from outside dismissal.",
      },
    ],
  },
  {
    id: "props-trigger",
    title: "Trigger",
    description: "Use asChild with a meaningful native link.",
    rows: [
      {
        name: "value",
        typeLabel: "string",
        defaultLabel: "Generated",
        description: "Unique identity for a shared preview.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description: "Preserve the host's semantics, handlers and ref.",
      },
    ],
  },
  {
    id: "props-content",
    title: "Content",
    description:
      "The positioned surface owns a private padded, bounded scrolling viewport.",
    rows: [
      {
        name: "size",
        typeLabel: "'sm' | 'md' | 'lg'",
        defaultLabel: "md",
        description: "Maximum width: 16, 20 or 24rem.",
      },
      {
        name: "inset",
        typeLabel: "'xs' | 'sm' | 'md' | 'lg'",
        defaultLabel: "md",
        description: "Independent padding: 12, 16, 20 or 24px.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "overlay",
        description: "Shared core or semantic corner selection.",
      },
      {
        name: "side / align",
        typeLabel: "HoverCardSide / HoverCardAlign",
        defaultLabel: "bottom / center",
        description:
          "Preferred placement when Root positioning does not override it.",
      },
      {
        name: "sideOffset",
        typeLabel: "number",
        defaultLabel: "8",
        description:
          "Gap in pixels unless positioning gutter/offset overrides it.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "Replace the positioned host while preserving the viewport.",
      },
    ],
  },
  {
    id: "props-portal",
    title: "Portal",
    description:
      "Optional portal to the trigger's document or an explicit container.",
    rows: [
      {
        name: "container",
        typeLabel: "HTMLElement | null",
        defaultLabel: "Trigger document body",
        description:
          "Choose a container inside a local appearance scope when needed.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Render in place.",
      },
    ],
  },
  {
    id: "props-arrow",
    title: "Arrow",
    description: "Optional decorative SVG; keep it directly inside Content.",
    rows: [
      {
        name: "width / height",
        typeLabel: "number",
        defaultLabel: "10 / 5",
        description: "Triangle spread and protrusion.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description: "Custom SVG composition.",
      },
    ],
  },
  {
    id: "props-rootprovider",
    title: "RootProvider",
    description: "Use an externally created controller instead of Root.",
    rows: [
      {
        name: "value",
        typeLabel: "UseHoverCardReturn",
        defaultLabel: "Required",
        description:
          "The unchanged controller from useHoverCard. Exposes open, triggerValue, setOpen, setTriggerValue and reposition.",
      },
    ],
  },
  {
    id: "props-context",
    title: "Context",
    description: "Read the current subject without a second state owner.",
    rows: [
      {
        name: "children",
        typeLabel: "({ open, triggerValue }) => ReactNode",
        defaultLabel: "Required",
        description: "Render passive content for the active trigger.",
      },
    ],
  },
];
export const sections = ownerSections(examples, parts);
export const usage = `<HoverCard.Root>
  <HoverCard.Trigger asChild><Link href="/people/ada">Ada Lovelace</Link></HoverCard.Trigger>
  <HoverCard.Portal>
    <HoverCard.Content>Supplementary preview<HoverCard.Arrow /></HoverCard.Content>
  </HoverCard.Portal>
</HoverCard.Root>`;
