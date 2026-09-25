import { CollapsibleInitialOpen } from "./examples/CollapsibleInitialOpen.js";
import InitialOpenSource from "./examples/CollapsibleInitialOpen.tsx?raw";
import { CollapsiblePartialHeight } from "./examples/CollapsiblePartialHeight.js";
import PartialHeightSource from "./examples/CollapsiblePartialHeight.tsx?raw";
import { CollapsibleDisabled } from "./examples/CollapsibleDisabled.js";
import DisabledSource from "./examples/CollapsibleDisabled.tsx?raw";
import { CollapsibleControlled } from "./examples/CollapsibleControlled.js";
import ControlledSource from "./examples/CollapsibleControlled.tsx?raw";
import { CollapsibleStore } from "./examples/CollapsibleStore.js";
import StoreSource from "./examples/CollapsibleStore.tsx?raw";
import { CollapsibleLazyMounted } from "./examples/CollapsibleLazyMounted.js";
import LazyMountedSource from "./examples/CollapsibleLazyMounted.tsx?raw";
import { CollapsibleHighlights } from "./examples/CollapsibleHighlights.js";
import HighlightsSource from "./examples/CollapsibleHighlights.tsx?raw";
import { CollapsibleComposed } from "./examples/CollapsibleComposed.js";
import ComposedSource from "./examples/CollapsibleComposed.tsx?raw";
import { CollapsibleVariants } from "./examples/CollapsibleVariants.js";
import VariantsSource from "./examples/CollapsibleVariants.tsx?raw";
import { CollapsibleSizes } from "./examples/CollapsibleSizes.js";
import SizesSource from "./examples/CollapsibleSizes.tsx?raw";
import { CollapsibleRadius } from "./examples/CollapsibleRadius.js";
import RadiusSource from "./examples/CollapsibleRadius.tsx?raw";
import { CollapsibleHorizontal } from "./examples/CollapsibleHorizontal.js";
import HorizontalSource from "./examples/CollapsibleHorizontal.tsx?raw";
import { CollapsibleNested } from "./examples/CollapsibleNested.js";
import NestedSource from "./examples/CollapsibleNested.tsx?raw";
import { CollapsibleCustomIndicator } from "./examples/CollapsibleCustomIndicator.js";
import CustomIndicatorSource from "./examples/CollapsibleCustomIndicator.tsx?raw";
import { CollapsibleInset } from "./examples/CollapsibleInset.js";
import InsetSource from "./examples/CollapsibleInset.tsx?raw";
import { CollapsibleActivity } from "./examples/CollapsibleActivity.js";
import ActivitySource from "./examples/CollapsibleActivity.tsx?raw";
import { CollapsibleResponsive } from "./examples/CollapsibleResponsive.js";
import ResponsiveSource from "./examples/CollapsibleResponsive.tsx?raw";
import {
  ownerSections,
  type OwnerExample,
} from "../../shared/OwnerDocumentation.js";
import { collapsibleParts } from "./parts.js";
export const collapsibleExamples: OwnerExample[] = [
  { id: "responsive", title: "Responsive", description: "Adapt size and variant at shared breakpoints without remounting content.", Demo: CollapsibleResponsive, source: ResponsiveSource },
  {
    id: "initial-open",
    title: "Initial open",
    description: "Use defaultOpen to reveal the content initially.",
    Demo: CollapsibleInitialOpen,
    source: InitialOpenSource,
  },
  {
    id: "partial-height",
    title: "Partial height",
    description:
      "Keep a non-interactive preview visible while closed. The trigger remains outside the inert region.",
    Demo: CollapsiblePartialHeight,
    source: PartialHeightSource,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Prevent activation without removing the trigger.",
    Demo: CollapsibleDisabled,
    source: DisabledSource,
  },
  {
    id: "controlled",
    title: "Controlled",
    description: "Own the boolean state and close programmatically.",
    Demo: CollapsibleControlled,
    source: ControlledSource,
  },
  {
    id: "store",
    title: "Store",
    description:
      "Share a controller with RootProvider and read it through Context.",
    Demo: CollapsibleStore,
    source: StoreSource,
  },
  {
    id: "lazy-mounted",
    title: "Lazy mounted",
    description:
      "Mount on first opening, then retain the input value between openings.",
    Demo: CollapsibleLazyMounted,
    source: LazyMountedSource,
  },
  {
    id: "highlight",
    title: "Highlight",
    description:
      "Choose hover, open, both or no background feedback independently of the containing surface.",
    Demo: CollapsibleHighlights,
    source: HighlightsSource,
  },
  {
    id: "composed",
    title: "Button composition",
    description:
      "Use Trigger unstyled asChild so Button or IconButton is the single visual owner.",
    Demo: CollapsibleComposed,
    source: ComposedSource,
  },
  {
    id: "variants",
    title: "Variants",
    description: "Choose plain, soft or outline.",
    Demo: CollapsibleVariants,
    source: VariantsSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Coordinate trigger typography, target size and content padding.",
    Demo: CollapsibleSizes,
    source: SizesSource,
  },
  {
    id: "radius",
    title: "Radius",
    description: "Choose a shared radius token or retain the theme role.",
    Demo: CollapsibleRadius,
    source: RadiusSource,
  },
  {
    id: "horizontal",
    title: "Horizontal",
    description: "Expand horizontally and hide the content completely when closed.",
    Demo: CollapsibleHorizontal,
    source: HorizontalSource,
  },
  {
    id: "nested",
    title: "Nested",
    description: "Each disclosure owns its state, orientation and indicator.",
    Demo: CollapsibleNested,
    source: NestedSource,
  },
  {
    id: "custom-indicator",
    title: "Custom indicator",
    description: "Replace the default chevron with a single plus or minus indicator.",
    Demo: CollapsibleCustomIndicator,
    source: CustomIndicatorSource,
  },
  {
    id: "inset",
    title: "Content spacing and motion",
    description:
      "Use inset=none for layout-owned padding and motion=none for an immediate reveal.",
    Demo: CollapsibleInset,
    source: InsetSource,
  },
  {
    id: "activity",
    title: "Activity",
    description:
      "React 19.2+ can retain hidden state while pausing effects. React 18 uses display-none.",
    Demo: CollapsibleActivity,
    source: ActivitySource,
  },
];
export const collapsibleSections = [
  ...ownerSections(collapsibleExamples, collapsibleParts),
  { id: "guide", title: "Guide", level: 2 as const },
];
