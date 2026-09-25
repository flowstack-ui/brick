import { ToggleBasic } from "./examples/ToggleBasic.js";
import basicSource from "./examples/ToggleBasic.tsx?raw";
import { ToggleVariants } from "./examples/ToggleVariants.js";
import variantsSource from "./examples/ToggleVariants.tsx?raw";
import { ToggleSizes } from "./examples/ToggleSizes.js";
import sizesSource from "./examples/ToggleSizes.tsx?raw";
import { ToggleTones } from "./examples/ToggleTones.js";
import tonesSource from "./examples/ToggleTones.tsx?raw";
import { ToggleResponsive } from "./examples/ToggleResponsive.js";
import responsiveSource from "./examples/ToggleResponsive.tsx?raw";
import { ToggleRadius } from "./examples/ToggleRadius.js";
import radiusSource from "./examples/ToggleRadius.tsx?raw";
import { ToggleDisabled } from "./examples/ToggleDisabled.js";
import disabledSource from "./examples/ToggleDisabled.tsx?raw";
import { ToggleFocus } from "./examples/ToggleFocus.js";
import focusSource from "./examples/ToggleFocus.tsx?raw";
import { ToggleIcons } from "./examples/ToggleIcons.js";
import iconsSource from "./examples/ToggleIcons.tsx?raw";
import { ToggleControlled } from "./examples/ToggleControlled.js";
import controlledSource from "./examples/ToggleControlled.tsx?raw";
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
    Demo: ToggleVariants,
    source: variantsSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Seven sizes align with Button; omitted size remains md.",
    Demo: ToggleSizes,
    source: sizesSource,
  },
  {
    id: "tones",
    title: "Tones",
    description: "Neutral, accent and contrast selected-command emphasis.",
    Demo: ToggleTones,
    source: tonesSource,
  },
  {
    id: "responsive",
    title: "Responsive",
    description: "A complete size recipe changes at the breakpoint.",
    Demo: ToggleResponsive,
    source: responsiveSource,
  },
  {
    id: "radius",
    title: "Radius",
    description: "Use the shared radius tokens rather than custom CSS.",
    Demo: ToggleRadius,
    source: radiusSource,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Selected commands remain identifiable when unavailable.",
    Demo: ToggleDisabled,
    source: disabledSource,
  },
  {
    id: "focus",
    title: "Focus",
    description:
      "Inside focus presentation is available for clipping compositions.",
    Demo: ToggleFocus,
    source: focusSource,
  },
  {
    id: "icons",
    title: "Icons",
    description: "Icon-only commands have stable accessible labels.",
    Demo: ToggleIcons,
    source: iconsSource,
  },
  {
    id: "controlled",
    title: "Controlled",
    description: "Application state controls selection; Atom owns interaction.",
    Demo: ToggleControlled,
    source: controlledSource,
  },
];
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Toggle",
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
        name: "pressed / defaultPressed",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Controlled or initial state.",
      },
      {
        name: "onPressedChange",
        typeLabel: "(pressed: boolean) => void",
        description: "Receives the next state.",
      },
      {
        name: "iconOnly",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Square icon geometry; supply an accessible name.",
      },
      {
        name: "asChild / render",
        typeLabel: "composition",
        description: "Preserve one host with Atom behavior and refs.",
      },
    ],
  },
];
export const sections = ownerSections(examples, parts);
export { ToggleBasic, basicSource };
