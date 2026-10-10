import {
  ownerSections,
  type OwnerExample,
} from "../../shared/OwnerDocumentation.js";
import { parts } from "./parts.js";
export { parts };
import { SegmentGroupBasic } from "./examples/SegmentGroupBasic.js";
import basicSource from "./examples/SegmentGroupBasic.tsx?raw";
import { SegmentGroupSizes } from "./examples/SegmentGroupSizes.js";
import sizesSource from "./examples/SegmentGroupSizes.tsx?raw";
import { SegmentGroupTones } from "./examples/SegmentGroupTones.js";
import tonesSource from "./examples/SegmentGroupTones.tsx?raw";
import { SegmentGroupControlled } from "./examples/SegmentGroupControlled.js";
import controlledSource from "./examples/SegmentGroupControlled.tsx?raw";
import { SegmentGroupVertical } from "./examples/SegmentGroupVertical.js";
import verticalSource from "./examples/SegmentGroupVertical.tsx?raw";
import { SegmentGroupDisabled } from "./examples/SegmentGroupDisabled.js";
import disabledSource from "./examples/SegmentGroupDisabled.tsx?raw";
import { SegmentGroupReadOnly } from "./examples/SegmentGroupReadOnly.js";
import readonlySource from "./examples/SegmentGroupReadOnly.tsx?raw";
import { SegmentGroupIcons } from "./examples/SegmentGroupIcons.js";
import iconsSource from "./examples/SegmentGroupIcons.tsx?raw";
import { SegmentGroupWidth } from "./examples/SegmentGroupWidth.js";
import widthSource from "./examples/SegmentGroupWidth.tsx?raw";
import { SegmentGroupCustom } from "./examples/SegmentGroupCustom.js";
import customSource from "./examples/SegmentGroupCustom.tsx?raw";
import { SegmentGroupForm } from "./examples/SegmentGroupForm.js";
import formSource from "./examples/SegmentGroupForm.tsx?raw";
import { SegmentGroupCard } from "./examples/SegmentGroupCard.js";
import cardSource from "./examples/SegmentGroupCard.tsx?raw";
import { SegmentGroupRadius } from "./examples/SegmentGroupRadius.js";
import radiusSource from "./examples/SegmentGroupRadius.tsx?raw";
export const Basic = SegmentGroupBasic;
export { basicSource };
export const examples: OwnerExample[] = [
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Shared control heights, with typography and spacing sized together.",
    Demo: SegmentGroupSizes,
    source: sizesSource,
  },
  {
    id: "tones",
    title: "Tones",
    description:
      "Only the selected surface changes; its text and icons stay readable.",
    Demo: SegmentGroupTones,
    source: tonesSource,
  },
  {
    id: "controlled",
    title: "Controlled",
    description:
      "Let application state own the selected value. Form controllers can bind the same value and onValueChange pair.",
    Demo: SegmentGroupControlled,
    source: controlledSource,
  },
  {
    id: "vertical",
    title: "Vertical",
    description: "Arrange the same mutually exclusive choices vertically.",
    Demo: SegmentGroupVertical,
    source: verticalSource,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Disable the group or individual unavailable choices.",
    Demo: SegmentGroupDisabled,
    source: disabledSource,
  },
  {
    id: "readonly",
    title: "Read-only",
    description:
      "Keep the selected value focusable and submitted without allowing changes.",
    Demo: SegmentGroupReadOnly,
    source: readonlySource,
  },
  {
    id: "icons",
    title: "Icons",
    description:
      "Compose icons with text, or give icon-only choices complete accessible names.",
    Demo: SegmentGroupIcons,
    source: iconsSource,
  },
  {
    id: "width",
    title: "Full width",
    description: "Distribute options across a deliberately bounded parent.",
    Demo: SegmentGroupWidth,
    source: widthSource,
  },
  {
    id: "custom",
    title: "Custom indicator",
    description:
      "Use scoped component variables for a custom indicator and matching foreground.",
    Demo: SegmentGroupCustom,
    source: customSource,
  },
  {
    id: "form",
    title: "Form",
    description:
      "Native named values, required validation, submission and reset retain the same dividers.",
    Demo: SegmentGroupForm,
    source: formSource,
  },
  {
    id: "card",
    title: "Card",
    description: "Compose a short mode choice inside a Card.",
    Demo: SegmentGroupCard,
    source: cardSource,
  },
  {
    id: "radius",
    title: "Radius",
    description: "Use shared radius tokens without changing control geometry.",
    Demo: SegmentGroupRadius,
    source: radiusSource,
  },
];
export const sections = ownerSections(examples, parts);
export const usage = `<SegmentGroup.Root aria-label="View" defaultValue="List">
  <SegmentGroup.Indicator />
  <SegmentGroup.Items items={["List", "Grid", "Board"]} />
</SegmentGroup.Root>`;
