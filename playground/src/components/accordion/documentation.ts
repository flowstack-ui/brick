import {
  ownerSections,
  type OwnerExample,
} from "../../shared/OwnerDocumentation.js";
import { accordionParts } from "./parts.js";
import { AccordionControlled } from "./examples/AccordionControlled.js";
import ControlledSource from "./examples/AccordionControlled.tsx?raw";
import { AccordionMultiple } from "./examples/AccordionMultiple.js";
import MultipleSource from "./examples/AccordionMultiple.tsx?raw";
import { AccordionSizes } from "./examples/AccordionSizes.js";
import SizesSource from "./examples/AccordionSizes.tsx?raw";
import { AccordionVariants } from "./examples/AccordionVariants.js";
import VariantsSource from "./examples/AccordionVariants.tsx?raw";
import { AccordionDisabled } from "./examples/AccordionDisabled.js";
import DisabledSource from "./examples/AccordionDisabled.tsx?raw";
import { AccordionIcon } from "./examples/AccordionIcon.js";
import IconSource from "./examples/AccordionIcon.tsx?raw";
import { AccordionAvatar } from "./examples/AccordionAvatar.js";
import AvatarSource from "./examples/AccordionAvatar.tsx?raw";
import { AccordionSubtext } from "./examples/AccordionSubtext.js";
import SubtextSource from "./examples/AccordionSubtext.tsx?raw";
import { AccordionActions } from "./examples/AccordionActions.js";
import ActionsSource from "./examples/AccordionActions.tsx?raw";
import { AccordionExpanded } from "./examples/AccordionExpanded.js";
import ExpandedSource from "./examples/AccordionExpanded.tsx?raw";
import { AccordionStore } from "./examples/AccordionStore.js";
import StoreSource from "./examples/AccordionStore.tsx?raw";
import { AccordionLifecycle } from "./examples/AccordionLifecycle.js";
import LifecycleSource from "./examples/AccordionLifecycle.tsx?raw";
import { AccordionCustomIndicator } from "./examples/AccordionCustomIndicator.js";
import CustomIndicatorSource from "./examples/AccordionCustomIndicator.tsx?raw";
import { AccordionNested } from "./examples/AccordionNested.js";
import NestedSource from "./examples/AccordionNested.tsx?raw";
import { AccordionResponsive } from "./examples/AccordionResponsive.js";
import ResponsiveSource from "./examples/AccordionResponsive.tsx?raw";
import { AccordionHorizontal } from "./examples/AccordionHorizontal.js";
import HorizontalSource from "./examples/AccordionHorizontal.tsx?raw";
import { AccordionComposition } from "./examples/AccordionComposition.js";
import CompositionSource from "./examples/AccordionComposition.tsx?raw";
export const accordionExamples: OwnerExample[] = [
  {
    id: "controlled",
    title: "Controlled",
    description: "Own the expanded value with value and onValueChange.",
    Demo: AccordionControlled,
    source: ControlledSource,
  },
  {
    id: "multiple",
    title: "Multiple",
    description: "Allow several sections to remain open.",
    Demo: AccordionMultiple,
    source: MultipleSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Coordinate trigger height, typography, indicator and content spacing.",
    Demo: AccordionSizes,
    source: SizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description:
      "Subtle highlights expanded items; enclosed supplies a shared boundary. Existing recipes remain available.",
    Demo: AccordionVariants,
    source: VariantsSource,
  },
  {
    id: "disabled",
    title: "Disabled item",
    description: "Disable one item while keeping the other sections available.",
    Demo: AccordionDisabled,
    source: DisabledSource,
  },
  {
    id: "icon",
    title: "With icon",
    description: "Add decorative artwork before the section title.",
    Demo: AccordionIcon,
    source: IconSource,
  },
  {
    id: "avatar",
    title: "Avatar",
    description:
      "Compose an avatar beside a visible name without duplicating its accessible label.",
    Demo: AccordionAvatar,
    source: AvatarSource,
  },
  {
    id: "subtext",
    title: "Subtext",
    description: "Group a title and supporting description inside the trigger.",
    Demo: AccordionSubtext,
    source: SubtextSource,
  },
  {
    id: "actions",
    title: "Actions",
    description:
      "Keep independent actions beside Header, never inside Trigger.",
    Demo: AccordionActions,
    source: ActionsSource,
  },
  {
    id: "expanded",
    title: "Expanded styling",
    description: "Change the expanded surface through its component token.",
    Demo: AccordionExpanded,
    source: ExpandedSource,
  },
  {
    id: "store",
    title: "Store",
    description:
      "Use useAccordion and RootProvider for control outside the trigger.",
    Demo: AccordionStore,
    source: StoreSource,
  },
  {
    id: "lifecycle",
    title: "Retained content",
    description: "Mount on first opening and keep the draft after closing.",
    Demo: AccordionLifecycle,
    source: LifecycleSource,
  },
  {
    id: "custom-indicator",
    title: "Custom indicator",
    description: "Replace the decorative artwork using ItemContext.",
    Demo: AccordionCustomIndicator,
    source: CustomIndicatorSource,
  },
  {
    id: "nested",
    title: "Nested",
    description:
      "Each root owns its placement, recipes and keyboard collection.",
    Demo: AccordionNested,
    source: NestedSource,
  },
  {
    id: "responsive",
    title: "Responsive",
    description:
      "Change sizes and variants at Brick breakpoints without duplicating content.",
    Demo: AccordionResponsive,
    source: ResponsiveSource,
  },
  {
    id: "horizontal",
    title: "Horizontal",
    description: "Reveal along the inline axis; arrow keys follow direction.",
    Demo: AccordionHorizontal,
    source: HorizontalSource,
  },
  {
    id: "composition",
    title: "Composition",
    description:
      "Delegate visuals with unstyled, layout spacing with inset=none, and use motion=none for an immediate reveal.",
    Demo: AccordionComposition,
    source: CompositionSource,
  },
];
export const accordionSections = ownerSections(
  accordionExamples,
  accordionParts,
);
