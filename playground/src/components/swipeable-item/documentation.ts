import type {
  SwipeableItemRootProps,
  SwipeableItemRootProviderProps,
  SwipeableItemContentProps,
  SwipeableItemActionsProps,
} from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import { SwipeableItemBasic } from "./examples/SwipeableItemBasic.js";
import basicSource from "./examples/SwipeableItemBasic.tsx?raw";
import { SwipeableItemSides } from "./examples/SwipeableItemSides.js";
import sidesSource from "./examples/SwipeableItemSides.tsx?raw";
import { SwipeableItemPresentation } from "./examples/SwipeableItemPresentation.js";
import presentationSource from "./examples/SwipeableItemPresentation.tsx?raw";
import { SwipeableItemControlled } from "./examples/SwipeableItemControlled.js";
import controlledSource from "./examples/SwipeableItemControlled.tsx?raw";
import { SwipeableItemController } from "./examples/SwipeableItemController.js";
import controllerSource from "./examples/SwipeableItemController.tsx?raw";
import { SwipeableItemDismissal } from "./examples/SwipeableItemDismissal.js";
import dismissalSource from "./examples/SwipeableItemDismissal.tsx?raw";
import { SwipeableItemMotion } from "./examples/SwipeableItemMotion.js";
import motionSource from "./examples/SwipeableItemMotion.tsx?raw";
import { SwipeableItemFullSwipe } from "./examples/SwipeableItemFullSwipe.js";
import fullswipeSource from "./examples/SwipeableItemFullSwipe.tsx?raw";
import { SwipeableItemAsync } from "./examples/SwipeableItemAsync.js";
import asyncSource from "./examples/SwipeableItemAsync.tsx?raw";
import { SwipeableItemStates } from "./examples/SwipeableItemStates.js";
import statesSource from "./examples/SwipeableItemStates.tsx?raw";
import { SwipeableItemComposition } from "./examples/SwipeableItemComposition.js";
import compositionSource from "./examples/SwipeableItemComposition.tsx?raw";
export const Basic = SwipeableItemBasic;
export { basicSource };
export const examples = [
  {
    id: "composition",
    title: "Icons and links",
    description:
      "Actions preserve ordinary IconButton sizing and Link navigation.",
    Demo: SwipeableItemComposition,
    source: compositionSource,
  },
  {
    id: "sides",
    title: "Start and end actions",
    description: "Reveal named actions on either logical side.",
    Demo: SwipeableItemSides,
    source: sidesSource,
  },
  {
    id: "presentation",
    title: "Variants and radius",
    description:
      "Use square rows inside lists and rounded rows for standalone items.",
    Demo: SwipeableItemPresentation,
    source: presentationSource,
  },
  {
    id: "controlled",
    title: "Single-open list",
    description: "Coordinate open rows with stable record IDs.",
    Demo: SwipeableItemControlled,
    source: controlledSource,
  },
  {
    id: "controller",
    title: "External controller",
    description: "Use one controller for external buttons and the row.",
    Demo: SwipeableItemController,
    source: controllerSource,
  },
  {
    id: "dismissal",
    title: "Dismissal",
    description: "Opt into outside or content-click dismissal.",
    Demo: SwipeableItemDismissal,
    source: dismissalSource,
  },
  {
    id: "motion",
    title: "Motion and thresholds",
    description: "Compare bounded resistance with immediate settlement.",
    Demo: SwipeableItemMotion,
    source: motionSource,
  },
  {
    id: "fullswipe",
    title: "Full swipe",
    description:
      "Enable only the intended side and retain the same command as a visible button.",
    Demo: SwipeableItemFullSwipe,
    source: fullswipeSource,
  },
  {
    id: "async",
    title: "Async actions",
    description: "Keep save progress and recovery in application state.",
    Demo: SwipeableItemAsync,
    source: asyncSource,
  },
  {
    id: "states",
    title: "States and direction",
    description:
      "Disabled blocks interaction; read-only remains focusable; RTL mirrors logical sides.",
    Demo: SwipeableItemStates,
    source: statesSource,
  },
];
export const rootRows: DocsPropDefinition<SwipeableItemRootProps>[] = [
  {
    name: "variant",
    typeLabel: '"plain" | "outline"',
    defaultLabel: '"plain"',
    description: "The row boundary recipe.",
  },
  {
    name: "radius",
    typeLabel:
      '"none" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "subtle" | "control" | "surface" | "overlay" | "full"',
    defaultLabel: '"surface"',
    description: "Shared Radius values for the clipped boundary.",
  },
  {
    name: "openSide",
    typeLabel: '"start" | "end" | null',
    description: "Controlled logical side.",
  },
  {
    name: "defaultOpenSide",
    typeLabel: '"start" | "end" | null',
    defaultLabel: "null",
    description: "Initial uncontrolled side.",
  },
  {
    name: "onOpenSideChange",
    typeLabel: "(side) => void",
    description: "Requests a new logical side; not animation completion.",
  },
  {
    name: "threshold",
    typeLabel: "number",
    defaultLabel: "0.35",
    description: "Fraction of measured action width required to reveal.",
  },
  {
    name: "thresholds",
    typeLabel: "Partial<Record<Side, number>>",
    description: "Per-side reveal thresholds, falling back to threshold.",
  },
  {
    name: "activationDistance",
    typeLabel: "number",
    defaultLabel: "8",
    description: "Horizontal intent distance in CSS pixels.",
  },
  {
    name: "velocityThreshold",
    typeLabel: "number",
    defaultLabel: "0.5",
    description:
      "Recent velocity in px/ms that influences reveal, not full-swipe execution.",
  },
  {
    name: "resistance",
    typeLabel: "number",
    defaultLabel: "0",
    description: "Optional bounded overtravel from 0 to 1.",
  },
  {
    name: "fullSwipeSides",
    typeLabel: 'readonly ("start" | "end")[]',
    defaultLabel: "[]",
    description: "Explicit eligible full-swipe sides; disabled by default.",
  },
  {
    name: "fullSwipeThreshold",
    typeLabel: "number",
    defaultLabel: "0.6",
    description:
      "Fraction of content width required for deliberate full-swipe release.",
  },
  {
    name: "onFullSwipe",
    typeLabel: "(side) => void",
    description: "Application-owned command; requires an enabled side.",
  },
  {
    name: "closeOnOutsideClick",
    typeLabel: "boolean",
    defaultLabel: "false",
    description:
      "Dismiss outside while preserving an action popup's focus ownership.",
  },
  {
    name: "closeOnContentClick",
    typeLabel: "boolean",
    defaultLabel: "false",
    description: "Consume a click on the row to close it.",
  },
  {
    name: "motion",
    typeLabel: '"default" | "none"',
    defaultLabel: '"default"',
    description: "Theme-driven settlement or immediate position changes.",
  },
  {
    name: "onSettle",
    typeLabel: "({ openSide, offset }) => void",
    description:
      "Reports completion of the accepted target; interrupted motion does not complete.",
  },
  {
    name: "disabled",
    typeLabel: "boolean",
    defaultLabel: "false",
    description: "Disable gestures and remove Content from the tab order.",
  },
  {
    name: "readOnly",
    typeLabel: "boolean",
    defaultLabel: "false",
    description: "Prevent changes while Content remains focusable.",
  },
  {
    name: "dir",
    typeLabel: '"ltr" | "rtl"',
    description: "Override inherited direction.",
  },
  {
    name: "asChild",
    typeLabel: "boolean",
    defaultLabel: "false",
    description: "Merge onto a single child, preserving refs and handlers.",
  },
  {
    name: "render",
    typeLabel: "RenderProp",
    description: "Customize the native host.",
  },
];
export const providerRows: DocsPropDefinition<SwipeableItemRootProviderProps>[] =
  [
    {
      name: "value",
      typeLabel: "SwipeableItemController",
      description:
        "Controller from useSwipeableItem; pass behavior options to the hook. Root presentation props are also supported.",
    },
  ];
export const contentRows: DocsPropDefinition<SwipeableItemContentProps>[] = [
  {
    name: "tabIndex",
    typeLabel: "number",
    defaultLabel: "0",
    description: "Focusable moving surface; disabled forces -1.",
  },
  {
    name: "asChild",
    typeLabel: "boolean",
    defaultLabel: "false",
    description: "Merge onto one foreground host.",
  },
  {
    name: "render",
    typeLabel: "RenderProp",
    description: "Customize the foreground host.",
  },
];
export const actionsRows: DocsPropDefinition<SwipeableItemActionsProps>[] = [
  {
    name: "side",
    typeLabel: '"start" | "end"',
    description: "Logical action side.",
  },
  {
    name: "aria-label",
    typeLabel: "string",
    description: "Required localized action group name.",
  },
  {
    name: "closeOnClick",
    typeLabel: "boolean",
    defaultLabel: "true",
    description:
      "Close after an unprevented action activation, not panel padding.",
  },
  {
    name: "gap",
    typeLabel: "SpacingValue",
    defaultLabel: "2",
    description: "Spacing between authored controls.",
  },
  {
    name: "inset",
    typeLabel: "SpacingValue",
    defaultLabel: "2",
    description: "Logical inline inset.",
  },
  {
    name: "asChild",
    typeLabel: "boolean",
    defaultLabel: "false",
    description: "Merge onto one action panel host.",
  },
];
export const parts = [
  { id: "props-root", title: "Root", level: 3, description: "Configure behavior and the row boundary here." },
  { id: "props-rootprovider", title: "RootProvider", level: 3, description: "Supply an external controller instead of configuring behavior on Root." },
  { id: "props-content", title: "Content", level: 3, description: "The moving, focusable foreground surface." },
  { id: "props-actions", title: "Actions", level: 3, description: "A named group of ordinary controls on one logical side." },
] as const;
export const sections: DocsSectionMetadata[] = [
  { id: "usage", title: "Usage", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  ...examples.map(({ id, title }) => ({ id, title, level: 3 as const })),
  { id: "guide", title: "Guide", level: 2 },
  { id: "props", title: "Props", level: 2 },
  ...parts,
];
