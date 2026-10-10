import {
  ownerSections,
  type OwnerExample,
} from "../../shared/OwnerDocumentation.js";
import { parts } from "./parts.js";
import { DropdownMenuAvatar } from "./examples/DropdownMenuAvatar.js";
import avatarSource from "./examples/DropdownMenuAvatar.tsx?raw";
import { DropdownMenuArrow } from "./examples/DropdownMenuArrow.js";
import arrowSource from "./examples/DropdownMenuArrow.tsx?raw";
import { DropdownMenuDialogChain } from "./examples/DropdownMenuDialogChain.js";
import dialogChainSource from "./examples/DropdownMenuDialogChain.tsx?raw";
import { DropdownMenuPositioning } from "./examples/DropdownMenuPositioning.js";
import positioningSource from "./examples/DropdownMenuPositioning.tsx?raw";
import { DropdownMenuSameWidth } from "./examples/DropdownMenuSameWidth.js";
import sameWidthSource from "./examples/DropdownMenuSameWidth.tsx?raw";
import { DropdownMenuVirtual } from "./examples/DropdownMenuVirtual.js";
import virtualSource from "./examples/DropdownMenuVirtual.tsx?raw";
import { DropdownMenuDetached } from "./examples/DropdownMenuDetached.js";
import detachedSource from "./examples/DropdownMenuDetached.tsx?raw";
import { DropdownMenuMultiple } from "./examples/DropdownMenuMultiple.js";
import multipleSource from "./examples/DropdownMenuMultiple.tsx?raw";
import { DropdownMenuStore } from "./examples/DropdownMenuStore.js";
import storeSource from "./examples/DropdownMenuStore.tsx?raw";
import { DropdownMenuHighlight } from "./examples/DropdownMenuHighlight.js";
import highlightSource from "./examples/DropdownMenuHighlight.tsx?raw";
import { DropdownMenuLifecycle } from "./examples/DropdownMenuLifecycle.js";
import lifecycleSource from "./examples/DropdownMenuLifecycle.tsx?raw";
import { DropdownMenuCancellation } from "./examples/DropdownMenuCancellation.js";
import cancellationSource from "./examples/DropdownMenuCancellation.tsx?raw";
export { parts };
import { DropdownMenuBasic } from "./examples/DropdownMenuBasic.js";
import basicSourceText from "./examples/DropdownMenuBasic.tsx?raw";
import { DropdownMenuSizes } from "./examples/DropdownMenuSizes.js";
import sizesSource from "./examples/DropdownMenuSizes.tsx?raw";
import { DropdownMenuVariants } from "./examples/DropdownMenuVariants.js";
import variantsSource from "./examples/DropdownMenuVariants.tsx?raw";
import { DropdownMenuTones } from "./examples/DropdownMenuTones.js";
import tonesSource from "./examples/DropdownMenuTones.tsx?raw";
import { DropdownMenuAnatomy } from "./examples/DropdownMenuAnatomy.js";
import anatomySource from "./examples/DropdownMenuAnatomy.tsx?raw";
import { DropdownMenuGroups } from "./examples/DropdownMenuGroups.js";
import groupsSource from "./examples/DropdownMenuGroups.tsx?raw";
import { DropdownMenuDanger } from "./examples/DropdownMenuDanger.js";
import dangerSource from "./examples/DropdownMenuDanger.tsx?raw";
import { DropdownMenuChoices } from "./examples/DropdownMenuChoices.js";
import choicesSource from "./examples/DropdownMenuChoices.tsx?raw";
import { DropdownMenuRadio } from "./examples/DropdownMenuRadio.js";
import radioSource from "./examples/DropdownMenuRadio.tsx?raw";
import { DropdownMenuSubmenus } from "./examples/DropdownMenuSubmenus.js";
import submenusSource from "./examples/DropdownMenuSubmenus.tsx?raw";
import { DropdownMenuLinks } from "./examples/DropdownMenuLinks.js";
import linksSource from "./examples/DropdownMenuLinks.tsx?raw";
import { DropdownMenuInsets } from "./examples/DropdownMenuInsets.js";
import insetsSource from "./examples/DropdownMenuInsets.tsx?raw";
import { DropdownMenuMixed } from "./examples/DropdownMenuMixed.js";
import mixedSource from "./examples/DropdownMenuMixed.tsx?raw";
import { DropdownMenuControlled } from "./examples/DropdownMenuControlled.js";
import controlledSource from "./examples/DropdownMenuControlled.tsx?raw";
import { DropdownMenuOverflow } from "./examples/DropdownMenuOverflow.js";
import overflowSource from "./examples/DropdownMenuOverflow.tsx?raw";
import { DropdownMenuDialog } from "./examples/DropdownMenuDialog.js";
import dialogSource from "./examples/DropdownMenuDialog.tsx?raw";
export const Basic = DropdownMenuBasic;
export const basicSource = basicSourceText;
export const examples: OwnerExample[] = [
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Popup size coordinates typography, artwork and row spacing. Use lg for comfortable touch targets.",
    Demo: DropdownMenuSizes,
    source: sizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description:
      "Choose a quiet highlight, solid highlight or no decorative hover fill. Keyboard focus stays visible.",
    Demo: DropdownMenuVariants,
    source: variantsSource,
  },
  {
    id: "tones",
    title: "Tones",
    description:
      "Semantic palette choice is independent from size and variant.",
    Demo: DropdownMenuTones,
    source: tonesSource,
  },
  {
    id: "controlled",
    title: "Controlled state",
    description:
      "The application owns the accepted open state; the component owns focus and dismissal.",
    Demo: DropdownMenuControlled,
    source: controlledSource,
  },
  {
    id: "store",
    title: "External controller",
    description:
      "Control the menu outside its rendered tree while keeping finished presentation.",
    Demo: DropdownMenuStore,
    source: storeSource,
  },
  {
    id: "anatomy",
    title: "Icons and commands",
    description:
      "Leading artwork, supporting text and shortcuts use finished row slots. Shortcut text does not register application hotkeys.",
    Demo: DropdownMenuAnatomy,
    source: anatomySource,
  },
  {
    id: "groups",
    title: "Groups",
    description:
      "Separate related actions with labelled groups and a separator.",
    Demo: DropdownMenuGroups,
    source: groupsSource,
  },
  {
    id: "danger",
    title: "Danger item",
    description: "Give a destructive action its own semantic tone.",
    Demo: DropdownMenuDanger,
    source: dangerSource,
  },
  {
    id: "choices",
    title: "Checkbox items",
    description: "Toggle independent preferences without closing the menu.",
    Demo: DropdownMenuChoices,
    source: choicesSource,
  },
  {
    id: "radio-items",
    title: "Radio items",
    description:
      "Choose one option in a group. The selected indicator is separate from pointer highlight.",
    Demo: DropdownMenuRadio,
    source: radioSource,
  },
  {
    id: "submenus",
    title: "Submenus",
    description:
      "Organize related commands in a nested menu with its own keyboard and pointer navigation.",
    Demo: DropdownMenuSubmenus,
    source: submenusSource,
  },
  {
    id: "links",
    title: "Links",
    description:
      "Keep a real destination and preserve native modified-click behavior.",
    Demo: DropdownMenuLinks,
    source: linksSource,
  },
  {
    id: "avatar",
    title: "Avatar trigger",
    description:
      "Place Avatar directly inside the named menu trigger, without extra Button padding.",
    Demo: DropdownMenuAvatar,
    source: avatarSource,
  },
  {
    id: "positioning",
    title: "Placement",
    description:
      "Choose the preferred popup placement. Collision handling keeps it inside the viewport.",
    Demo: DropdownMenuPositioning,
    source: positioningSource,
  },
  {
    id: "virtual-anchor",
    title: "Virtual anchor",
    description:
      "Position against a supplied rectangle while the real trigger retains keyboard activation and focus restoration.",
    Demo: DropdownMenuVirtual,
    source: virtualSource,
  },
  {
    id: "same-width",
    title: "Same width",
    description:
      "Match the popup width to its trigger with positioning.sameWidth.",
    Demo: DropdownMenuSameWidth,
    source: sameWidthSource,
  },
  {
    id: "detached-anchor",
    title: "Detached anchor",
    description:
      "Hide the popup when its anchor scrolls out of its container, without replacing application open state.",
    Demo: DropdownMenuDetached,
    source: detachedSource,
  },
  {
    id: "mixed",
    title: "Mixed layout",
    description:
      "Use a row of vertically arranged command items without introducing nested buttons or grid keyboard behavior.",
    Demo: DropdownMenuMixed,
    source: mixedSource,
  },
  {
    id: "insets",
    title: "Panel inset",
    description:
      "Remove panel padding while preserving the menu items’ own padding.",
    Demo: DropdownMenuInsets,
    source: insetsSource,
  },
  {
    id: "overflow",
    title: "Overflow",
    description:
      "Long command lists scroll inside the popup and remain constrained to the available viewport.",
    Demo: DropdownMenuOverflow,
    source: overflowSource,
  },
  {
    id: "dialog",
    title: "Inside Dialog",
    description:
      "Nested commands retain their own dismissal and focus inside the modal boundary.",
    Demo: DropdownMenuDialog,
    source: dialogSource,
  },
  {
    id: "dialog-chain",
    title: "Opening a dialog",
    description:
      "OverlayManager coordinates a menu command opening a dialog that contains its own menu.",
    Demo: DropdownMenuDialogChain,
    source: dialogChainSource,
  },
  {
    id: "multiple",
    title: "Multiple triggers",
    description: "One popup follows the actual opener and returns focus to it.",
    Demo: DropdownMenuMultiple,
    source: multipleSource,
  },
  {
    id: "highlight",
    title: "Controlled highlight",
    description: "Accept highlight changes independently from open state.",
    Demo: DropdownMenuHighlight,
    source: highlightSource,
  },
  {
    id: "lifecycle",
    title: "Retained content",
    description:
      "Keep child state mounted between openings. Toggle Notifications, close, and reopen the menu.",
    Demo: DropdownMenuLifecycle,
    source: lifecycleSource,
  },
  {
    id: "cancellation",
    title: "Selection cancellation",
    description:
      "Prevent the selection event’s default action to keep the popup open.",
    Demo: DropdownMenuCancellation,
    source: cancellationSource,
  },
  {
    id: "arrow",
    title: "Arrow",
    description:
      "Add an optional popup arrow. Positioning automatically reserves space for its tip.",
    Demo: DropdownMenuArrow,
    source: arrowSource,
  },
];
export const sections = ownerSections(examples, parts, true);
sections.splice(
  sections.findIndex((section) => section.id === "guide") + 1,
  0,
  { id: "highlight-style", title: "Highlight style", level: 3 },
  { id: "trigger-composition", title: "Trigger composition", level: 3 },
);
export const usage = `<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item value="new">New file</DropdownMenu.Item>
    <DropdownMenu.Item value="open">Open file</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item value="delete" tone="danger">
      Delete file
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>`;
