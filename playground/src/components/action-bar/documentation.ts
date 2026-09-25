import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { ActionBarClose } from "./examples/ActionBarClose.js";
import CloseSource from "./examples/ActionBarClose.tsx?raw";
import { ActionBarDialog } from "./examples/ActionBarDialog.js";
import DialogSource from "./examples/ActionBarDialog.tsx?raw";
import { ActionBarPlacement } from "./examples/ActionBarPlacement.js";
import PlacementSource from "./examples/ActionBarPlacement.tsx?raw";
import { ActionBarController } from "./examples/ActionBarController.js";
import ControllerSource from "./examples/ActionBarController.tsx?raw";
import { ActionBarPopover } from "./examples/ActionBarPopover.js";
import PopoverSource from "./examples/ActionBarPopover.tsx?raw";
import { ActionBarRetained } from "./examples/ActionBarRetained.js";
import RetainedSource from "./examples/ActionBarRetained.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "close",
    title: "Close trigger",
    description:
      "Compose CloseButton for dismissal. Closing this bar leaves application selection policy to its owner.",
    Demo: ActionBarClose,
    source: CloseSource,
  },
  {
    id: "dialog",
    title: "Confirmation dialog",
    description: "Open a confirmation dialog from a contextual action.",
    Demo: ActionBarDialog,
    source: DialogSource,
  },
  {
    id: "placement",
    title: "Placement",
    description:
      "Switch the bar between bottom start, center and end. Start and end follow writing direction.",
    Demo: ActionBarPlacement,
    source: PlacementSource,
  },
  {
    id: "controller",
    title: "External controller",
    description:
      "Use useActionBar with RootProvider to control the bar from outside its content.",
    Demo: ActionBarController,
    source: ControllerSource,
  },
  {
    id: "selection",
    title: "Selection details",
    description:
      "Compose the dashed SelectionTrigger with Popover to display details about the selected projects.",
    Demo: ActionBarPopover,
    source: PopoverSource,
  },
  {
    id: "retained",
    title: "Retain content",
    description:
      "Set unmountOnExit to false to preserve a draft between openings.",
    Demo: ActionBarRetained,
    source: RetainedSource,
  },
];
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description:
      "Owns disclosure, lifecycle and dismissal; selection remains application-owned.",
    rows: [
      {
        name: "open / defaultOpen",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Controlled or initial visibility.",
      },
      {
        name: "onOpenChange",
        typeLabel: "(open: boolean, reason?) => void",
        defaultLabel: "—",
        description: "Handle requests to change visibility.",
      },
      {
        name: "closeOnEscape / closeOnInteractOutside",
        typeLabel: "boolean",
        defaultLabel: "true",
        description:
          "Configure dismissal. Disable outside dismissal while selecting records.",
      },
      {
        name: "onFocusOutside / onInteractOutside / onPointerDownOutside / onEscapeKeyDown",
        typeLabel: "event callbacks",
        defaultLabel: "—",
        description: "Cancel dismissal with preventDefault.",
      },
      {
        name: "persistentElements",
        typeLabel: "Array<() => HTMLElement | null>",
        defaultLabel: "—",
        description: "Regions whose interaction does not dismiss the bar.",
      },
      {
        name: "modal / disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Opt into modal isolation or disable disclosure.",
      },
      {
        name: "lazyMount / unmountOnExit",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Control mounting before first open and after exit.",
      },
      {
        name: "present",
        typeLabel: "boolean",
        defaultLabel: "—",
        description: "Override presence independently of disclosure.",
      },
      {
        name: "immediate",
        typeLabel: "boolean",
        defaultLabel: "true",
        description:
          "Synchronize presence immediately; false defers to a frame.",
      },
      {
        name: "skipAnimationOnMount",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Skip the entrance animation when initially open.",
      },
      {
        name: "hideMode",
        typeLabel: '"display-none" | "activity"',
        defaultLabel: '"display-none"',
        description:
          "Activity pauses hidden effects where the React runtime supports it.",
      },
      {
        name: "onExitComplete",
        typeLabel: "() => void",
        defaultLabel: "—",
        description: "Called after exit finishes.",
      },
      {
        name: "id / ids",
        typeLabel: "string / PopoverIds",
        defaultLabel: "—",
        description: "Stable content and accessible relationship IDs.",
      },
    ],
  },
  {
    id: "props-provider",
    title: "RootProvider",
    description:
      "Provides an external controller. Legacy Root state props remain supported.",
    rows: [
      {
        name: "value",
        typeLabel: "UseActionBarReturn",
        defaultLabel: "—",
        description: "Pass the unchanged value returned by useActionBar.",
      },
    ],
  },
  {
    id: "props-positioner",
    title: "Positioner",
    description: "Fixed viewport placement and the shared overlay layer host.",
    rows: [
      {
        name: "placement",
        typeLabel: '"bottom" | "bottom-start" | "bottom-end"',
        defaultLabel: '"bottom"',
        description: "Logical viewport placement.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description:
          "Compose one host without losing layer registration or refs.",
      },
    ],
  },
  {
    id: "props-content",
    title: "Content",
    description: "The named dialog region, its presentation and focus targets.",
    rows: [
      {
        name: "aria-label / aria-labelledby",
        typeLabel: "string",
        defaultLabel: "—",
        description: "Name the action region, or compose Title.",
      },
      {
        name: "initialFocus",
        typeLabel: "FocusTarget",
        defaultLabel: "false",
        description: "Preserve current focus by default; opt into a target.",
      },
      {
        name: "finalFocus",
        typeLabel: "FocusTarget",
        defaultLabel: "—",
        description: "Override restoration or pass false.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: '"md"',
        description: "Override token-owned panel corners.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description: "Compose the content host.",
      },
    ],
  },
  {
    id: "props-selection",
    title: "SelectionTrigger",
    description: "A dashed, non-submit button for a selection-related action.",
    rows: [
      {
        name: "onPress",
        typeLabel: 'ButtonRootProps["onPress"]',
        defaultLabel: "—",
        description: "Perform the application-owned action.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Disable activation.",
      },
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description: "Compose an existing control without nesting buttons.",
      },
    ],
  },
  {
    id: "props-close",
    title: "CloseTrigger",
    description: "Requests dismissal; does not clear application selection.",
    rows: [
      {
        name: "asChild / render",
        typeLabel: "boolean / RenderProp",
        defaultLabel: "false / —",
        description: "Compose CloseButton for a styled close action.",
      },
    ],
  },
  {
    id: "props-portal",
    title: "Portal",
    description: "Controls where the overlay mounts.",
    rows: [
      {
        name: "container",
        typeLabel: "HTMLElement | null",
        defaultLabel: "document body",
        description:
          "Use a target in the desired document or appearance scope.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Render inline while retaining fixed placement.",
      },
    ],
  },
  {
    id: "props-separator",
    title: "Separator",
    description:
      "A decorative vertical divider. Native div props and refs are forwarded.",
    rows: [
      {
        name: "Native div props / ref",
        typeLabel: "HTMLAttributes<HTMLDivElement>",
        defaultLabel: "—",
        description:
          "Forwards native attributes and the rendered divider ref; orientation and compact height are owned by ActionBar.",
      },
    ],
  },
];
export const sections = ownerSections(examples, parts);
