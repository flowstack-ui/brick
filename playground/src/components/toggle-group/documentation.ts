import { ToggleGroupBasic } from "./examples/ToggleGroupBasic.js";
import basicSource from "./examples/ToggleGroupBasic.tsx?raw";
import { ToggleGroupVariants } from "./examples/ToggleGroupVariants.js";
import variantsSource from "./examples/ToggleGroupVariants.tsx?raw";
import { ToggleGroupSizes } from "./examples/ToggleGroupSizes.js";
import sizesSource from "./examples/ToggleGroupSizes.tsx?raw";
import { ToggleGroupTones } from "./examples/ToggleGroupTones.js";
import tonesSource from "./examples/ToggleGroupTones.tsx?raw";
import { ToggleGroupResponsive } from "./examples/ToggleGroupResponsive.js";
import responsiveSource from "./examples/ToggleGroupResponsive.tsx?raw";
import { ToggleGroupRadius } from "./examples/ToggleGroupRadius.js";
import radiusSource from "./examples/ToggleGroupRadius.tsx?raw";
import { ToggleGroupDisabled } from "./examples/ToggleGroupDisabled.js";
import disabledSource from "./examples/ToggleGroupDisabled.tsx?raw";
import { ToggleGroupFocus } from "./examples/ToggleGroupFocus.js";
import focusSource from "./examples/ToggleGroupFocus.tsx?raw";
import { ToggleGroupIcons } from "./examples/ToggleGroupIcons.js";
import iconsSource from "./examples/ToggleGroupIcons.tsx?raw";
import { ToggleGroupControlled } from "./examples/ToggleGroupControlled.js";
import controlledSource from "./examples/ToggleGroupControlled.tsx?raw";
import { ToggleGroupMultiple } from "./examples/ToggleGroupMultiple.js";
import multipleSource from "./examples/ToggleGroupMultiple.tsx?raw";
import { ToggleGroupAttached } from "./examples/ToggleGroupAttached.js";
import attachedSource from "./examples/ToggleGroupAttached.tsx?raw";
import { ToggleGroupVertical } from "./examples/ToggleGroupVertical.js";
import verticalSource from "./examples/ToggleGroupVertical.tsx?raw";
import { ToggleGroupFullWidth } from "./examples/ToggleGroupFullWidth.js";
import fullwidthSource from "./examples/ToggleGroupFullWidth.tsx?raw";
import { ToggleGroupDisabledSelection } from "./examples/ToggleGroupDisabledSelection.js";
import disabledselectionSource from "./examples/ToggleGroupDisabledSelection.tsx?raw";
import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
export const examples: OwnerExample[] = [
  {
    id: "variants",
    title: "Variants",
    description: "Off and on treatments for every shared action variant.",
    Demo: ToggleGroupVariants,
    source: variantsSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Seven sizes align with Button; omitted size remains md.",
    Demo: ToggleGroupSizes,
    source: sizesSource,
  },
  {
    id: "tones",
    title: "Tones",
    description: "Neutral, accent and contrast selected-command emphasis.",
    Demo: ToggleGroupTones,
    source: tonesSource,
  },
  {
    id: "responsive",
    title: "Responsive",
    description: "A complete size recipe changes at the breakpoint.",
    Demo: ToggleGroupResponsive,
    source: responsiveSource,
  },
  {
    id: "radius",
    title: "Radius",
    description: "Use the shared radius tokens rather than custom CSS.",
    Demo: ToggleGroupRadius,
    source: radiusSource,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Selected commands remain identifiable when unavailable.",
    Demo: ToggleGroupDisabled,
    source: disabledSource,
  },
  {
    id: "focus",
    title: "Focus",
    description:
      "Inside focus presentation is available for clipping compositions.",
    Demo: ToggleGroupFocus,
    source: focusSource,
  },
  {
    id: "icons",
    title: "Icons",
    description: "Icon-only commands have stable accessible labels.",
    Demo: ToggleGroupIcons,
    source: iconsSource,
  },
  {
    id: "controlled",
    title: "Controlled",
    description: "Application state controls selection; Atom owns interaction.",
    Demo: ToggleGroupControlled,
    source: controlledSource,
  },
  {
    id: "multiple",
    title: "Multiple",
    description: "Select independent formatting commands.",
    Demo: ToggleGroupMultiple,
    source: multipleSource,
  },
  {
    id: "attached",
    title: "Attached",
    description: "Joined items retain independent focus and selection.",
    Demo: ToggleGroupAttached,
    source: attachedSource,
  },
  {
    id: "vertical",
    title: "Vertical",
    description: "Vertical orientation controls arrow-key navigation.",
    Demo: ToggleGroupVertical,
    source: verticalSource,
  },
  {
    id: "fullwidth",
    title: "FullWidth",
    description: "Distribute text items across available inline space.",
    Demo: ToggleGroupFullWidth,
    source: fullwidthSource,
  },
  {
    id: "disabledselection",
    title: "DisabledSelection",
    description:
      "A disabled selected item does not capture the entry tab stop.",
    Demo: ToggleGroupDisabledSelection,
    source: disabledselectionSource,
  },
];
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description:
      "Atom owns pressed state and interaction; Brick owns presentation.",
    rows: [
      {
        name: "variant",
        typeLabel: "ToggleVariant",
        defaultLabel: "ghost",
        description: "solid, soft, subtle, surface, outline, ghost or plain.",
      },
      {
        name: "tone",
        typeLabel: '"neutral" | "accent" | "contrast"',
        defaultLabel: "neutral",
        description: "Selected-command emphasis.",
      },
      {
        name: "size",
        typeLabel: "ResponsiveValue<ToggleSize>",
        defaultLabel: "md",
        description: "2xs through 2xl; md matches Button md.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        description: "Core or semantic radius; excludes legacy shape.",
      },
      {
        name: "shape",
        typeLabel: '"rounded" | "pill"',
        defaultLabel: "rounded",
        description: "Legacy corner recipe.",
      },
      {
        name: "focusRing",
        typeLabel: '"outside" | "inside"',
        defaultLabel: "outside",
        description: "Focus placement.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Prevents activation.",
      },
      {
        name: "type",
        typeLabel: '"single" | "multiple"',
        defaultLabel: "single",
        description: "String or string-array selection.",
      },
      {
        name: "value / defaultValue",
        typeLabel: "string | string[]",
        description: "Controlled or initial selection, according to type.",
      },
      {
        name: "onValueChange",
        typeLabel: "callback",
        description: "Receives the next selection.",
      },
      {
        name: "orientation",
        typeLabel: '"horizontal" | "vertical"',
        defaultLabel: "horizontal",
        description: "Keyboard navigation axis.",
      },
      {
        name: "loop",
        typeLabel: "boolean",
        defaultLabel: "true",
        description: "Wrap arrow navigation.",
      },
      {
        name: "attached / fullWidth",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Joined boundaries or distributed items.",
      },
      {
        name: "asChild / render",
        typeLabel: "composition",
        description: "Preserve one host with Atom behavior and refs.",
      },
    ],
  },
  {
    id: "props-item",
    title: "Item",
    description: "One named selectable command.",
    rows: [
      {
        name: "value",
        typeLabel: "string",
        description: "Stable unique identifier.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Disable this command.",
      },
      {
        name: "iconOnly",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Square icon geometry with a complete name.",
      },
      {
        name: "asChild / render",
        typeLabel: "composition",
        description: "Atom-owned host composition.",
      },
    ],
  },
];
export const sections = ownerSections(examples, parts);
export { ToggleGroupBasic, basicSource };
