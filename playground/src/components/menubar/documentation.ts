import { MenubarPositioning } from "./examples/MenubarPositioning.js";
import positioningSource from "./examples/MenubarPositioning.tsx?raw";
import { MenubarArrow } from "./examples/MenubarArrow.js";
import arrowSource from "./examples/MenubarArrow.tsx?raw";
import { MenubarRadio } from "./examples/MenubarRadio.js";
import radioSource from "./examples/MenubarRadio.tsx?raw";
import {
  ownerSections,
  type OwnerExample,
} from "../../shared/OwnerDocumentation.js";
import { parts } from "./parts.js";
import { MenubarRadius } from "./examples/MenubarRadius.js";
import radiusSource from "./examples/MenubarRadius.tsx?raw";
import { MenubarRtl } from "./examples/MenubarRtl.js";
import rtlSource from "./examples/MenubarRtl.tsx?raw";
import { MenubarDialogChain } from "./examples/MenubarDialogChain.js";
import dialogchainSource from "./examples/MenubarDialogChain.tsx?raw";
import { MenubarResponsive } from "./examples/MenubarResponsive.js";
import responsiveSource from "./examples/MenubarResponsive.tsx?raw";
import { MenubarRail } from "./examples/MenubarRail.js";
import railSource from "./examples/MenubarRail.tsx?raw";
import { MenubarOrientation } from "./examples/MenubarOrientation.js";
import orientationSource from "./examples/MenubarOrientation.tsx?raw";
export { parts };
import { MenubarBasic } from "./examples/MenubarBasic.js";
import basicSourceText from "./examples/MenubarBasic.tsx?raw";
import { MenubarSizes } from "./examples/MenubarSizes.js";
import sizesSource from "./examples/MenubarSizes.tsx?raw";
import { MenubarVariants } from "./examples/MenubarVariants.js";
import variantsSource from "./examples/MenubarVariants.tsx?raw";
import { MenubarTones } from "./examples/MenubarTones.js";
import tonesSource from "./examples/MenubarTones.tsx?raw";
import { MenubarAnatomy } from "./examples/MenubarAnatomy.js";
import anatomySource from "./examples/MenubarAnatomy.tsx?raw";
import { MenubarChoices } from "./examples/MenubarChoices.js";
import choicesSource from "./examples/MenubarChoices.tsx?raw";
import { MenubarSubmenus } from "./examples/MenubarSubmenus.js";
import submenusSource from "./examples/MenubarSubmenus.tsx?raw";
import { MenubarLinks } from "./examples/MenubarLinks.js";
import linksSource from "./examples/MenubarLinks.tsx?raw";
import { MenubarInsets } from "./examples/MenubarInsets.js";
import insetsSource from "./examples/MenubarInsets.tsx?raw";
import { MenubarMixed } from "./examples/MenubarMixed.js";
import mixedSource from "./examples/MenubarMixed.tsx?raw";
import { MenubarControlled } from "./examples/MenubarControlled.js";
import controlledSource from "./examples/MenubarControlled.tsx?raw";
import { MenubarOverflow } from "./examples/MenubarOverflow.js";
import overflowSource from "./examples/MenubarOverflow.tsx?raw";
import { MenubarDialog } from "./examples/MenubarDialog.js";
import dialogSource from "./examples/MenubarDialog.tsx?raw";
export const Basic = MenubarBasic;
export const basicSource = basicSourceText;
export const examples: OwnerExample[] = [
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Popup size coordinates typography, artwork and row spacing. Use lg for comfortable touch targets.",
    Demo: MenubarSizes,
    source: sizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description:
      "Choose a quiet highlight, solid highlight or no decorative hover fill. Keyboard focus stays visible.",
    Demo: MenubarVariants,
    source: variantsSource,
  },
  {
    id: "tones",
    title: "Tones",
    description:
      "Semantic palette choice is independent from size and variant.",
    Demo: MenubarTones,
    source: tonesSource,
  },
  {
    id: "controlled",
    title: "Controlled state",
    description:
      "The application owns the accepted open state; the component owns focus and dismissal.",
    Demo: MenubarControlled,
    source: controlledSource,
  },
  {
    id: "anatomy",
    title: "Groups and commands",
    description:
      "Leading artwork, supporting text and shortcuts use finished row slots. Shortcut text does not register application hotkeys.",
    Demo: MenubarAnatomy,
    source: anatomySource,
  },
  {
    id: "submenus",
    title: "Submenus and indicators",
    description:
      "Default, replaced and suppressed submenu artwork never doubles the indicator.",
    Demo: MenubarSubmenus,
    source: submenusSource,
  },
  {
    id: "links",
    title: "Links",
    description:
      "Keep a real destination and preserve native modified-click behavior.",
    Demo: MenubarLinks,
    source: linksSource,
  },
  {
    id: "radio",
    title: "Radio items",
    description: "Choose one setting without closing the menu.",
    Demo: MenubarRadio,
    source: radioSource,
  },
  {
    id: "choices",
    title: "Checkbox items",
    description: "Toggle an independent preference without closing the menu.",
    Demo: MenubarChoices,
    source: choicesSource,
  },
  {
    id: "placement",
    title: "Placement",
    description:
      "Align a popup to the end of its trigger while retaining collision handling.",
    Demo: MenubarPositioning,
    source: positioningSource,
  },
  {
    id: "mixed",
    title: "Mixed layout",
    description:
      "Use a row of vertically arranged command items without introducing nested buttons or grid keyboard behavior.",
    Demo: MenubarMixed,
    source: mixedSource,
  },
  {
    id: "insets",
    title: "Panel inset",
    description: "Remove panel padding without also removing row padding.",
    Demo: MenubarInsets,
    source: insetsSource,
  },
  {
    id: "arrow",
    title: "Arrow",
    description:
      "Compose the optional shared arrow only when a pointer is useful.",
    Demo: MenubarArrow,
    source: arrowSource,
  },
  {
    id: "overflow",
    title: "Overflow",
    description:
      "Long command lists scroll inside the popup and remain constrained to the available viewport.",
    Demo: MenubarOverflow,
    source: overflowSource,
  },
  {
    id: "dialog",
    title: "Inside Dialog",
    description:
      "Nested commands retain their own dismissal and focus inside the modal boundary.",
    Demo: MenubarDialog,
    source: dialogSource,
  },
  {
    id: "dialog-chain",
    title: "Open a Dialog",
    description:
      "A command opens a managed dialog while menu and modal dismissal remain independent.",
    Demo: MenubarDialogChain,
    source: dialogchainSource,
  },
  {
    id: "rail",
    title: "Strip and popup density",
    description:
      "Choose plain or surface rail, with large strip controls and compact popup rows.",
    Demo: MenubarRail,
    source: railSource,
  },
  {
    id: "orientation",
    title: "Vertical and plain triggers",
    description:
      "Vertical command navigation with no decorative open/hover fill.",
    Demo: MenubarOrientation,
    source: orientationSource,
  },
  {
    id: "radius",
    title: "Radius",
    description:
      "Use core or semantic radius choices for the command strip and popup.",
    Demo: MenubarRadius,
    source: radiusSource,
  },
  {
    id: "rtl",
    title: "Right-to-left",
    description:
      "Direction controls strip arrow navigation and the submenu opening key.",
    Demo: MenubarRtl,
    source: rtlSource,
  },
  {
    id: "responsive",
    title: "Narrow-screen alternative",
    description:
      "Use a command bar from md and a Drawer on smaller screens. An already open drawer remains usable after resizing; closing returns focus to the visible entry point.",
    Demo: MenubarResponsive,
    source: responsiveSource,
  },
];
export const sections = ownerSections(examples, parts, true).flatMap(
  (section) =>
    section.id === "guide"
      ? [
          section,
          { id: "strip-style", title: "Strip style", level: 3 as const },
          { id: "popup-style", title: "Popup style", level: 3 as const },
        ]
      : [section],
);
export const usage = `<Menubar.Root aria-label="Actions">
  <Menubar.Menu value="file">
    <Menubar.Trigger>Actions</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item value="new">New file</Menubar.Item>
      <Menubar.Item value="open">Open file</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item value="delete" tone="danger">
        Delete file
      </Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu value="edit">
    <Menubar.Trigger>Edit</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item value="undo">Undo</Menubar.Item>
      <Menubar.Item disabled value="redo">
        Redo
      </Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>`;
