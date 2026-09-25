import {
  ownerSections,
  type OwnerExample,
} from "../../shared/OwnerDocumentation.js";
import { parts } from "./parts.js";
export { parts };
import { NavigationMenuBasic } from "./examples/NavigationMenuBasic.js";
import { NavigationMenuHeader } from "./examples/NavigationMenuHeader.js";
import headerSource from "./examples/NavigationMenuHeader.tsx?raw";
import basicSource from "./examples/NavigationMenuBasic.tsx?raw";
import { NavigationMenuInline } from "./examples/NavigationMenuInline.js";
import inlineSource from "./examples/NavigationMenuInline.tsx?raw";
import { NavigationMenuSizes } from "./examples/NavigationMenuSizes.js";
import sizesSource from "./examples/NavigationMenuSizes.tsx?raw";
import { NavigationMenuVariants } from "./examples/NavigationMenuVariants.js";
import variantsSource from "./examples/NavigationMenuVariants.tsx?raw";
import { NavigationMenuTones } from "./examples/NavigationMenuTones.js";
import tonesSource from "./examples/NavigationMenuTones.tsx?raw";
import { NavigationMenuVertical } from "./examples/NavigationMenuVertical.js";
import verticalSource from "./examples/NavigationMenuVertical.tsx?raw";
import { NavigationMenuRich } from "./examples/NavigationMenuRich.js";
import richSource from "./examples/NavigationMenuRich.tsx?raw";
import { NavigationMenuControlled } from "./examples/NavigationMenuControlled.js";
import controlledSource from "./examples/NavigationMenuControlled.tsx?raw";
import { NavigationMenuDelays } from "./examples/NavigationMenuDelays.js";
import delaysSource from "./examples/NavigationMenuDelays.tsx?raw";
import { NavigationMenuClick } from "./examples/NavigationMenuClick.js";
import clickSource from "./examples/NavigationMenuClick.tsx?raw";
import { NavigationMenuHover } from "./examples/NavigationMenuHover.js";
import hoverSource from "./examples/NavigationMenuHover.tsx?raw";
import { NavigationMenuPersistent } from "./examples/NavigationMenuPersistent.js";
import persistentSource from "./examples/NavigationMenuPersistent.tsx?raw";
import { NavigationMenuIndicators } from "./examples/NavigationMenuIndicators.js";
import indicatorsSource from "./examples/NavigationMenuIndicators.tsx?raw";
import { NavigationMenuInsets } from "./examples/NavigationMenuInsets.js";
import insetsSource from "./examples/NavigationMenuInsets.tsx?raw";
import { NavigationMenuOverflow } from "./examples/NavigationMenuOverflow.js";
import overflowSource from "./examples/NavigationMenuOverflow.tsx?raw";
import { NavigationMenuRetained } from "./examples/NavigationMenuRetained.js";
import retainedSource from "./examples/NavigationMenuRetained.tsx?raw";
import { NavigationMenuLinkPolicy } from "./examples/NavigationMenuLinkPolicy.js";
import linkPolicySource from "./examples/NavigationMenuLinkPolicy.tsx?raw";
import { NavigationMenuDialog } from "./examples/NavigationMenuDialog.js";
import dialogSource from "./examples/NavigationMenuDialog.tsx?raw";
import { NavigationMenuController } from "./examples/NavigationMenuController.js";
import controllerSource from "./examples/NavigationMenuController.tsx?raw";
import { NavigationMenuAlignment } from "./examples/NavigationMenuAlignment.js";
import alignmentSource from "./examples/NavigationMenuAlignment.tsx?raw";
import { NavigationMenuNested } from "./examples/NavigationMenuNested.js";
import nestedSource from "./examples/NavigationMenuNested.tsx?raw";
import { NavigationMenuRadius } from "./examples/NavigationMenuRadius.js";
import radiusSource from "./examples/NavigationMenuRadius.tsx?raw";
import { NavigationMenuComposition } from "./examples/NavigationMenuComposition.js";
import compositionSource from "./examples/NavigationMenuComposition.tsx?raw";
import { NavigationMenuRtl } from "./examples/NavigationMenuRtl.js";
import rtlSource from "./examples/NavigationMenuRtl.tsx?raw";
import { NavigationMenuResponsive } from "./examples/NavigationMenuResponsive.js";
import responsiveSource from "./examples/NavigationMenuResponsive.tsx?raw";
export const Basic = NavigationMenuBasic;
export { basicSource };
export const examples: OwnerExample[] = [
  {
    id: "header",
    title: "Header integration",
    description: "List is transparent by default inside an existing header. Use surface=raised for a standalone bar matching the floating panel, as in the basic example.",
    Demo: NavigationMenuHeader,
    source: headerSource,
  },
  {
    id: "composition",
    title: "Composition and disabled state",
    description:
      "Compose an unstyled button or anchor; NavigationMenu owns the styling and refs reach that same host.",
    Demo: NavigationMenuComposition,
    source: compositionSource,
  },
  {
    id: "rtl",
    title: "Right-to-left",
    description:
      "Logical placement and keyboard navigation follow the root direction.",
    Demo: NavigationMenuRtl,
    source: rtlSource,
  },
  {
    id: "responsive",
    title: "Narrow navigation alternative",
    description:
      "Below md, the application shows a Drawer and NavList instead of desktop disclosures. Resize the window to compare; NavigationMenu does not own the replacement policy.",
    Demo: NavigationMenuResponsive,
    source: responsiveSource,
  },
  {
    id: "radius",
    title: "Radius",
    description:
      "Choose square, core-token or semantic corners independently on controls and the shared viewport.",
    Demo: NavigationMenuRadius,
    source: radiusSource,
  },
  {
    id: "alignment",
    title: "Viewport alignment",
    description:
      "Align a wider panel to the logical end of its trigger. Start and center are also supported; collision shifting keeps the panel visible.",
    Demo: NavigationMenuAlignment,
    source: alignmentSource,
  },
  {
    id: "inline",
    title: "Inline disclosure",
    description:
      "Set viewport={false} and omit Viewport and Indicator. The panel stays in its item's DOM without moving the navigation row; use Viewport for collision-aware placement.",
    Demo: NavigationMenuInline,
    source: inlineSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Small, medium and large adjust control height, horizontal padding and typography together.",
    Demo: NavigationMenuSizes,
    source: sizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description:
      "Neutral subtle hover/open state or unchanged plain paint; keyboard focus remains visible.",
    Demo: NavigationMenuVariants,
    source: variantsSource,
  },
  {
    id: "tones",
    title: "Tone",
    description:
      "Neutral, accent and contrast apply to trigger and destination interactions. The panel background remains neutral.",
    Demo: NavigationMenuTones,
    source: tonesSource,
  },
  {
    id: "vertical",
    title: "Vertical",
    description:
      "An explicit orientation changes logical navigation keys without changing native link semantics.",
    Demo: NavigationMenuVertical,
    source: verticalSource,
  },
  {
    id: "rich",
    title: "Rich links",
    description:
      "Compose a Surface for rich-link paint; NavigationMenu retains the native anchor.",
    Demo: NavigationMenuRich,
    source: richSource,
  },
  {
    id: "controlled",
    title: "Controlled",
    description:
      "Control the active disclosure value without replacing its interaction model.",
    Demo: NavigationMenuControlled,
    source: controlledSource,
  },
  {
    id: "delays",
    title: "Independent delays",
    description: "Opening and closing delays can be tuned independently.",
    Demo: NavigationMenuDelays,
    source: delaysSource,
  },
  {
    id: "controller",
    title: "External controller",
    description:
      "Use the public hook and RootProvider for external actions; Context reads the same live state.",
    Demo: NavigationMenuController,
    source: controllerSource,
  },
  {
    id: "nested",
    title: "Nested disclosures",
    description:
      "Sub keeps independent state and inherits policy. Here the nested scope overrides hover and renders inline.",
    Demo: NavigationMenuNested,
    source: nestedSource,
  },
  {
    id: "click",
    title: "Click-only pointer interaction",
    description:
      "Disable mouse hover opening; click and keyboard can still disclose.",
    Demo: NavigationMenuClick,
    source: clickSource,
  },
  {
    id: "hover",
    title: "Hover-only pointer interaction",
    description:
      "Disable pointer click toggling while retaining keyboard access.",
    Demo: NavigationMenuHover,
    source: hoverSource,
  },
  {
    id: "persistent",
    title: "Pointer leave policy",
    description:
      "Keep the panel open after leaving with the pointer; Escape and outside interaction still dismiss.",
    Demo: NavigationMenuPersistent,
    source: persistentSource,
  },
  {
    id: "indicators",
    title: "Custom indicators",
    description:
      "Replace the chevron through indicator, or pass null to remove it. The moving marker is separate.",
    Demo: NavigationMenuIndicators,
    source: indicatorsSource,
  },
  {
    id: "insets",
    title: "Content inset",
    description:
      "Choose no padding when the content owns its own surface; other insets stay component-owned.",
    Demo: NavigationMenuInsets,
    source: insetsSource,
  },
  {
    id: "overflow",
    title: "Long content",
    description:
      "Frame establishes a definite block size and ScrollArea owns the one inner scrolling region.",
    Demo: NavigationMenuOverflow,
    source: overflowSource,
  },
  {
    id: "retained",
    title: "Retained content",
    description:
      "Mount once and keep inactive content hidden and unfocusable between openings.",
    Demo: NavigationMenuRetained,
    source: retainedSource,
  },
  {
    id: "linkPolicy",
    title: "Link close policy",
    description:
      "Prevent internal close independently from the destination's native navigation.",
    Demo: NavigationMenuLinkPolicy,
    source: linkPolicySource,
  },
  {
    id: "dialog",
    title: "Inside Dialog",
    description:
      "Navigation disclosures keep dismissal and focus within the parent modal.",
    Demo: NavigationMenuDialog,
    source: dialogSource,
  },
];
// Core usage before optional integrations, matching the shared docs convention.
const exampleOrder = ["sizes", "variants", "tones", "rich", "inline", "vertical", "alignment", "controlled", "indicators", "radius", "insets", "delays", "click", "hover", "persistent", "nested", "retained", "linkPolicy", "overflow", "header", "composition", "controller", "dialog", "responsive", "rtl"];
examples.sort((a, b) => exampleOrder.indexOf(a.id) - exampleOrder.indexOf(b.id));
export const sections = ownerSections(examples, parts, true);
export const usage = `<NavigationMenu.Root aria-label="Documentation">
  <NavigationMenu.List>
    <NavigationMenu.Item value="learn">
      <NavigationMenu.Trigger>Learn</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <VStack gap="1">
          <NavigationMenu.Link href="#usage">
            Getting started
          </NavigationMenu.Link>
          <NavigationMenu.Link href="#examples">
            Examples
          </NavigationMenu.Link>
          <NavigationMenu.Link href="#props">
            API reference
          </NavigationMenu.Link>
        </VStack>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="community">
      <NavigationMenu.Trigger>Community</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link
          href="https://github.com/flowstack-ui/brick"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="home">
      <NavigationMenu.Link active href="#usage">
        Overview
      </NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Indicator />
  </NavigationMenu.List>
  <NavigationMenu.Viewport />
</NavigationMenu.Root>`;
