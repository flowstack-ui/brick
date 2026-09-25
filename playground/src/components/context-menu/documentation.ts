import { ContextMenuHighlight } from "./examples/ContextMenuHighlight.js";
import highlightSource from "./examples/ContextMenuHighlight.tsx?raw";
import { ContextMenuCancellation } from "./examples/ContextMenuCancellation.js";
import cancellationSource from "./examples/ContextMenuCancellation.tsx?raw";
import { ContextMenuRadio } from "./examples/ContextMenuRadio.js";
import radioSource from "./examples/ContextMenuRadio.tsx?raw";
import { ContextMenuPositioning } from "./examples/ContextMenuPositioning.js";
import positioningSource from "./examples/ContextMenuPositioning.tsx?raw";
import { ContextMenuArrow } from "./examples/ContextMenuArrow.js";
import arrowSource from "./examples/ContextMenuArrow.tsx?raw";
import {
  ownerSections,
  type OwnerExample,
} from "../../shared/OwnerDocumentation.js";
import { parts } from "./parts.js";
import { ContextMenuLifecycle } from "./examples/ContextMenuLifecycle.js";
import lifecycleSource from "./examples/ContextMenuLifecycle.tsx?raw";
import { ContextMenuDialogChain } from "./examples/ContextMenuDialogChain.js";
import dialogchainSource from "./examples/ContextMenuDialogChain.tsx?raw";
import { ContextMenuMultiple } from "./examples/ContextMenuMultiple.js";
import multipleSource from "./examples/ContextMenuMultiple.tsx?raw";
import { ContextMenuStore } from "./examples/ContextMenuStore.js";
import storeSource from "./examples/ContextMenuStore.tsx?raw";
export { parts };
import { ContextMenuBasic } from "./examples/ContextMenuBasic.js";
import basicSourceText from "./examples/ContextMenuBasic.tsx?raw";
import { ContextMenuSizes } from "./examples/ContextMenuSizes.js";
import sizesSource from "./examples/ContextMenuSizes.tsx?raw";
import { ContextMenuVariants } from "./examples/ContextMenuVariants.js";
import variantsSource from "./examples/ContextMenuVariants.tsx?raw";
import { ContextMenuTones } from "./examples/ContextMenuTones.js";
import tonesSource from "./examples/ContextMenuTones.tsx?raw";
import { ContextMenuAnatomy } from "./examples/ContextMenuAnatomy.js";
import anatomySource from "./examples/ContextMenuAnatomy.tsx?raw";
import { ContextMenuChoices } from "./examples/ContextMenuChoices.js";
import choicesSource from "./examples/ContextMenuChoices.tsx?raw";
import { ContextMenuSubmenus } from "./examples/ContextMenuSubmenus.js";
import submenusSource from "./examples/ContextMenuSubmenus.tsx?raw";
import { ContextMenuLinks } from "./examples/ContextMenuLinks.js";
import linksSource from "./examples/ContextMenuLinks.tsx?raw";
import { ContextMenuInsets } from "./examples/ContextMenuInsets.js";
import insetsSource from "./examples/ContextMenuInsets.tsx?raw";
import { ContextMenuMixed } from "./examples/ContextMenuMixed.js";
import mixedSource from "./examples/ContextMenuMixed.tsx?raw";
import { ContextMenuControlled } from "./examples/ContextMenuControlled.js";
import controlledSource from "./examples/ContextMenuControlled.tsx?raw";
import { ContextMenuOverflow } from "./examples/ContextMenuOverflow.js";
import overflowSource from "./examples/ContextMenuOverflow.tsx?raw";
import { ContextMenuDialog } from "./examples/ContextMenuDialog.js";
import dialogSource from "./examples/ContextMenuDialog.tsx?raw";
export const Basic = ContextMenuBasic;
export const basicSource = basicSourceText;
export const examples: OwnerExample[] = [
  {
    id: "highlight",
    title: "Controlled highlight",
    description:
      "Accept highlighted-value changes without confusing hover or keyboard focus with checked state.",
    Demo: ContextMenuHighlight,
    source: highlightSource,
  },
  {
    id: "cancellation",
    title: "Cancel selection",
    description:
      "Prevent a command from closing the menu with its selection event.",
    Demo: ContextMenuCancellation,
    source: cancellationSource,
  },
  {
    id: "radio",
    title: "Radio items",
    description: "Choose one setting while keeping the contextual menu open.",
    Demo: ContextMenuRadio,
    source: radioSource,
  },
  {
    id: "placement",
    title: "Placement",
    description:
      "Position commands beside the invocation point; collision handling still keeps them visible.",
    Demo: ContextMenuPositioning,
    source: positioningSource,
  },
  {
    id: "arrow",
    title: "Arrow",
    description:
      "Add the optional shared arrow when the popup should point at its invocation anchor.",
    Demo: ContextMenuArrow,
    source: arrowSource,
  },
  {
    id: "lifecycle",
    title: "Retained content",
    description:
      "Retain hidden content between openings and observe completed exits.",
    Demo: ContextMenuLifecycle,
    source: lifecycleSource,
  },
  {
    id: "dialog-chain",
    title: "Open a Dialog",
    description:
      "A menu command opens a managed dialog without application focus timers.",
    Demo: ContextMenuDialogChain,
    source: dialogchainSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Popup size coordinates typography, artwork and row spacing. Use lg for comfortable touch targets.",
    Demo: ContextMenuSizes,
    source: sizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description:
      "Choose a quiet highlight, solid highlight or no decorative hover fill. Keyboard focus stays visible.",
    Demo: ContextMenuVariants,
    source: variantsSource,
  },
  {
    id: "tones",
    title: "Tones",
    description:
      "Semantic palette choice is independent from size and variant.",
    Demo: ContextMenuTones,
    source: tonesSource,
  },
  {
    id: "controlled",
    title: "Controlled state",
    description:
      "The application owns the accepted open state; the component owns focus and dismissal.",
    Demo: ContextMenuControlled,
    source: controlledSource,
  },
  {
    id: "store",
    title: "External controller and visible alternative",
    description:
      "Expose the same commands through a visible button as well as the contextual gesture.",
    Demo: ContextMenuStore,
    source: storeSource,
  },
  {
    id: "anatomy",
    title: "Groups and commands",
    description:
      "Leading artwork, supporting text and shortcuts use finished row slots. Shortcut text does not register application hotkeys.",
    Demo: ContextMenuAnatomy,
    source: anatomySource,
  },
  {
    id: "choices",
    title: "Checkbox items",
    description: "Toggle an independent preference without closing the menu.",
    Demo: ContextMenuChoices,
    source: choicesSource,
  },
  {
    id: "submenus",
    title: "Submenus and indicators",
    description:
      "Default, replaced and suppressed submenu artwork never doubles the indicator.",
    Demo: ContextMenuSubmenus,
    source: submenusSource,
  },
  {
    id: "links",
    title: "Links",
    description:
      "Keep a real destination and preserve native modified-click behavior.",
    Demo: ContextMenuLinks,
    source: linksSource,
  },
  {
    id: "mixed",
    title: "Mixed layout",
    description:
      "Use a row of vertically arranged command items without introducing nested buttons or grid keyboard behavior.",
    Demo: ContextMenuMixed,
    source: mixedSource,
  },
  {
    id: "insets",
    title: "Panel inset",
    description:
      "Remove panel padding while preserving the item padding and complete click targets.",
    Demo: ContextMenuInsets,
    source: insetsSource,
  },
  {
    id: "overflow",
    title: "Overflow",
    description:
      "Long command lists scroll inside the popup and remain constrained to the available viewport.",
    Demo: ContextMenuOverflow,
    source: overflowSource,
  },
  {
    id: "dialog",
    title: "Inside Dialog",
    description:
      "Nested commands retain their own dismissal and focus inside the modal boundary.",
    Demo: ContextMenuDialog,
    source: dialogSource,
  },
  {
    id: "multiple",
    title: "Multiple targets",
    description:
      "Each focusable target has its own identity and invocation point.",
    Demo: ContextMenuMultiple,
    source: multipleSource,
  },
];
const exampleOrder = [
  "sizes",
  "variants",
  "tones",
  "controlled",
  "store",
  "anatomy",
  "submenus",
  "links",
  "radio",
  "choices",
  "placement",
  "mixed",
  "insets",
  "overflow",
  "arrow",
  "dialog",
  "dialog-chain",
  "multiple",
  "highlight",
  "cancellation",
  "lifecycle",
];
examples.sort(
  (a, b) => exampleOrder.indexOf(a.id) - exampleOrder.indexOf(b.id),
);
export const sections = ownerSections(examples, parts, true).flatMap(
  (section) =>
    section.id === "guide"
      ? [
          section,
          {
            id: "highlight-style",
            title: "Highlight style",
            level: 3 as const,
          },
          {
            id: "target-composition",
            title: "Target composition",
            level: 3 as const,
          },
        ]
      : [section],
);
export const usage = `<ContextMenu.Root>
  <ContextMenu.Trigger asChild>
    <Surface bordered inset="lg" radius="sm" tabIndex={0}>
      Actions: right-click or press Shift+F10
    </Surface>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item value="new">New file</ContextMenu.Item>
    <ContextMenu.Item value="open">Open file</ContextMenu.Item>
    <ContextMenu.Separator />
    <ContextMenu.Item value="delete" tone="danger">
      Delete file
    </ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>`;
