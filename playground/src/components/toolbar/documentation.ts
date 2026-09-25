import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { ToolbarSurfaces } from "./examples/ToolbarSurfaces.js";
import surfaces from "./examples/ToolbarSurfaces.tsx?raw";
import { ToolbarSizes } from "./examples/ToolbarSizes.js";
import sizes from "./examples/ToolbarSizes.tsx?raw";
import { ToolbarActions } from "./examples/ToolbarActions.js";
import actions from "./examples/ToolbarActions.tsx?raw";
import { ToolbarSelection } from "./examples/ToolbarSelection.js";
import selection from "./examples/ToolbarSelection.tsx?raw";
import { ToolbarToggleRecipes } from "./examples/ToolbarToggleRecipes.js";
import togglerecipes from "./examples/ToolbarToggleRecipes.tsx?raw";
import { ToolbarStates } from "./examples/ToolbarStates.js";
import states from "./examples/ToolbarStates.tsx?raw";
import { ToolbarOrientation } from "./examples/ToolbarOrientation.js";
import orientation from "./examples/ToolbarOrientation.tsx?raw";
import { ToolbarInput } from "./examples/ToolbarInput.js";
import input from "./examples/ToolbarInput.tsx?raw";
import { ToolbarComposition } from "./examples/ToolbarComposition.js";
import composition from "./examples/ToolbarComposition.tsx?raw";
import { ToolbarResponsive } from "./examples/ToolbarResponsive.js";
import responsive from "./examples/ToolbarResponsive.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "surfaces",
    title: "Surfaces",
    description: "Choose a transparent, soft or filled bordered container.",
    Demo: ToolbarSurfaces,
    source: surfaces,
  },
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Seven coordinated sizes inherit from Root; individual controls can override them.",
    Demo: ToolbarSizes,
    source: sizes,
  },
  {
    id: "actions",
    title: "Action recipes and loading",
    description:
      "Use the shared Button variants, tones, artwork and loading presentation.",
    Demo: ToolbarActions,
    source: actions,
  },
  {
    id: "selection",
    title: "Single and multiple selection",
    description: "Control one view or keep several formatting options pressed.",
    Demo: ToolbarSelection,
    source: selection,
  },
  {
    id: "toggle-recipes",
    title: "Selection tones",
    description:
      "Neutral, accent and contrast share Toggle recipes without changing keyboard behavior.",
    Demo: ToolbarToggleRecipes,
    source: togglerecipes,
  },
  {
    id: "states",
    title: "Disabled controls",
    description:
      "Skip unavailable actions or keep a disabled action focusable for discovery. Root can disable the whole group.",
    Demo: ToolbarStates,
    source: states,
  },
  {
    id: "orientation",
    title: "Vertical and right-to-left",
    description:
      "Keyboard navigation follows the toolbar axis and text direction.",
    Demo: ToolbarOrientation,
    source: orientation,
  },
  {
    id: "input",
    title: "Groups and input",
    description:
      "Name a subgroup without another focus scope. Keep a horizontal text input last so editing keys remain native.",
    Demo: ToolbarInput,
    source: input,
  },
  {
    id: "composition",
    title: "Tooltip and menu composition",
    description:
      "Compose triggers on the same button; portalled content stays outside the scrolling toolbar.",
    Demo: ToolbarComposition,
    source: composition,
  },
  {
    id: "responsive",
    title: "Responsive sizes and overflow",
    description:
      "Use responsive sizes while preserving all controls in a bounded, scrollable row.",
    Demo: ToolbarResponsive,
    source: responsive,
  },
];
const row = (
  name: string,
  typeLabel: string,
  defaultLabel: string,
  description: string,
) => ({ name, typeLabel, defaultLabel, description });
export const parts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description: "Root owns its corresponding Toolbar host.",
    rows: [
      row(
        "size",
        "ResponsiveValue<2xs | xs | sm | md | lg | xl | 2xl>",
        "md",
        "Inherited Button, ToggleItem and Input size.",
      ),
      row(
        "variant",
        "plain | soft | outline | surface",
        "soft",
        "Container treatment; outline is transparent.",
      ),
      row(
        "radius",
        "none | 2xs | xs | sm | md | lg | xl | 2xl | 3xl | 4xl | subtle | control | surface | overlay | full",
        "control",
        "Shared Radius token, independent from child corners.",
      ),
      row(
        "orientation",
        "horizontal | vertical",
        "horizontal",
        "Keyboard axis and layout.",
      ),
      row("dir", "ltr | rtl", "Inherited", "Logical keyboard order."),
      row("loop", "boolean", "true", "Wrap arrow-key focus."),
      row(
        "disabled",
        "boolean",
        "false",
        "Disable descendant actions and input.",
      ),
      row(
        "ariaLabel",
        "string",
        "—",
        "Accessible name; native aria-label also works.",
      ),
      row(
        "asChild / render",
        "boolean / RenderProp",
        "false / —",
        "Preserve behavior on a compatible host.",
      ),
    ],
  },
  {
    id: "props-button",
    title: "Button",
    description: "Button owns its corresponding Toolbar host.",
    rows: [
      row(
        "variant / tone",
        "ButtonVariant / ButtonTone",
        "ghost / neutral",
        "Shared Button recipes, including semantic action tones.",
      ),
      row(
        "size",
        "ResponsiveValue<ButtonSize>",
        "Root size",
        "Seven-size Button scale.",
      ),
      row(
        "disabled / loading",
        "boolean",
        "false",
        "Prevent activation and expose state.",
      ),
      row(
        "focusableWhenDisabled",
        "boolean",
        "false",
        "Keep disabled command discoverable without activation.",
      ),
      row(
        "loadingText / spinner / spinnerPlacement",
        "ReactNode / ReactNode / start | end",
        "— / — / start",
        "Shared Button loading presentation.",
      ),
      row("startIcon / endIcon", "ReactNode", "—", "Optional action artwork."),
      row(
        "radius / shape",
        "Radius / ButtonShape",
        "control / rounded",
        "Shared Button geometry; choose radius or shape.",
      ),
      row(
        "focusRing",
        "outside | inside",
        "inside",
        "Focus placement within the scrolling container.",
      ),
      row(
        "asChild / render",
        "boolean / RenderProp",
        "false / —",
        "Explicit child owns presentation. Compose IconButton with its own size and inside focus ring.",
      ),
    ],
  },
  {
    id: "props-link",
    title: "Link",
    description: "Link owns its corresponding Toolbar host.",
    rows: [
      row("href", "string", "—", "Native navigation destination."),
      row(
        "variant / tone / size",
        "ButtonVariant / ButtonTone / ResponsiveValue<ButtonSize>",
        "ghost / neutral / Root size",
        "Action-like link appearance.",
      ),
      row(
        "disabled",
        "boolean",
        "false",
        "Remove destination and block activation.",
      ),
      row(
        "radius / shape / focusRing",
        "Radius / ButtonShape / outside | inside",
        "control / rounded / inside",
        "Shared geometry and focus presentation.",
      ),
      row("startIcon / endIcon", "ReactNode", "—", "Link artwork."),
      row(
        "asChild / render",
        "boolean / RenderProp",
        "false / —",
        "Compose a compatible anchor host.",
      ),
    ],
  },
  {
    id: "props-group",
    title: "Group",
    description: "Group owns its corresponding Toolbar host.",
    rows: [
      row(
        "ariaLabel",
        "string",
        "—",
        "Name a subgroup; native aria-label is supported.",
      ),
      row(
        "asChild / render",
        "boolean / RenderProp",
        "false / —",
        "Grouping host without another roving scope.",
      ),
    ],
  },
  {
    id: "props-input",
    title: "Input",
    description: "Input owns its corresponding Toolbar host.",
    rows: [
      row(
        "size / variant",
        "ResponsiveValue<InputSize> / InputVariant",
        "Root size / outline",
        "Shared Input presentation.",
      ),
      row("disabled", "boolean", "false", "Root disabled also applies."),
      row("value / defaultValue", "string", "—", "Native text input value."),
      row(
        "fullWidth",
        "boolean",
        "true",
        "Set false for intrinsic input width.",
      ),
      row(
        "radius / shape",
        "Radius / InputShape",
        "control / rounded",
        "Shared Input geometry, except underline variant.",
      ),
      row(
        "aria-label",
        "string",
        "—",
        "Use a visible label or accessible name.",
      ),
    ],
  },
  {
    id: "props-separator",
    title: "Separator",
    description: "Separator owns its corresponding Toolbar host.",
    rows: [
      row(
        "orientation",
        "horizontal | vertical",
        "Perpendicular to Root",
        "The separator line direction.",
      ),
      row(
        "decorative",
        "boolean",
        "false",
        "Hide decorative separators from accessibility APIs.",
      ),
      row(
        "asChild / render",
        "boolean / RenderProp",
        "false / —",
        "Compatible separator host.",
      ),
    ],
  },
  {
    id: "props-togglegroup",
    title: "ToggleGroup",
    description: "ToggleGroup owns its corresponding Toolbar host.",
    rows: [
      row(
        "type",
        "single | multiple",
        "single",
        "Determines string or array selection.",
      ),
      row(
        "value / defaultValue",
        "string | string[]",
        "— / empty",
        "Match value type to selection mode.",
      ),
      row("onValueChange", "(value) => void", "—", "Typed selection callback."),
      row(
        "variant / tone",
        "ToggleVariant / neutral | accent | contrast",
        "ghost / neutral",
        "Shared Toggle recipes.",
      ),
      row(
        "size / radius / focusRing",
        "ResponsiveValue<ButtonSize> / Radius / outside | inside",
        "Root size / control / inside",
        "Inherited item presentation defaults.",
      ),
      row("disabled", "boolean", "false", "Disable this group."),
      row("ariaLabel", "string", "—", "Accessible group name."),
      row(
        "asChild / render",
        "boolean / RenderProp",
        "false / —",
        "Group host, not a separate ToggleGroup focus owner.",
      ),
    ],
  },
  {
    id: "props-toggleitem",
    title: "ToggleItem",
    description: "ToggleItem owns its corresponding Toolbar host.",
    rows: [
      row("value", "string", "Required", "Stable selection value."),
      row(
        "disabled",
        "boolean",
        "false",
        "Disable this item; Root and group also apply.",
      ),
      row(
        "variant / tone / size / radius / focusRing",
        "Toggle presentation props",
        "Group defaults",
        "Override one item's visual presentation.",
      ),
      row(
        "iconOnly",
        "boolean",
        "false",
        "Square geometry for a named icon-only choice.",
      ),
      row(
        "asChild / render",
        "boolean / RenderProp",
        "false / —",
        "Explicit child owns presentation; preserve Toolbar state and focus.",
      ),
    ],
  },
];
export const sections = ownerSections(examples, parts);
