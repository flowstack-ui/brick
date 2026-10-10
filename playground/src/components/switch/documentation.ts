import type { OwnerExample, OwnerPart } from "../../shared/OwnerDocumentation.js";
import { ownerSections } from "../../shared/OwnerDocumentation.js";
import { SwitchSizes } from "./examples/SwitchSizes.js";
import SwitchSizesSource from "./examples/SwitchSizes.tsx?raw";
import { SwitchVariants } from "./examples/SwitchVariants.js";
import SwitchVariantsSource from "./examples/SwitchVariants.tsx?raw";
import { SwitchTones } from "./examples/SwitchTones.js";
import SwitchTonesSource from "./examples/SwitchTones.tsx?raw";
import { SwitchControlled } from "./examples/SwitchControlled.js";
import SwitchControlledSource from "./examples/SwitchControlled.tsx?raw";
import { SwitchControllerExample } from "./examples/SwitchControllerExample.js";
import SwitchControllerExampleSource from "./examples/SwitchControllerExample.tsx?raw";
import { SwitchStates } from "./examples/SwitchStates.js";
import SwitchStatesSource from "./examples/SwitchStates.tsx?raw";
import { SwitchIndicators } from "./examples/SwitchIndicators.js";
import SwitchIndicatorsSource from "./examples/SwitchIndicators.tsx?raw";
import { SwitchLabelPlacement } from "./examples/SwitchLabelPlacement.js";
import SwitchLabelPlacementSource from "./examples/SwitchLabelPlacement.tsx?raw";
import { SwitchTooltip } from "./examples/SwitchTooltip.js";
import SwitchTooltipSource from "./examples/SwitchTooltip.tsx?raw";
import { SwitchHookForm } from "./examples/SwitchHookForm.js";
import SwitchHookFormSource from "./examples/SwitchHookForm.tsx?raw";
import { SwitchNativeForm } from "./examples/SwitchNativeForm.js";
import SwitchNativeFormSource from "./examples/SwitchNativeForm.tsx?raw";
import { SwitchResponsive } from "./examples/SwitchResponsive.js";
import SwitchResponsiveSource from "./examples/SwitchResponsive.tsx?raw";
import { SwitchCustomColors } from "./examples/SwitchCustomColors.js";
import SwitchCustomColorsSource from "./examples/SwitchCustomColors.tsx?raw";
import { SwitchRtlComposition } from "./examples/SwitchRtlComposition.js";
import SwitchRtlCompositionSource from "./examples/SwitchRtlComposition.tsx?raw";

export const examples: OwnerExample[] = [
  { id: "sizes", title: "Sizes", description: "Scale the visible track while retaining the minimum target.", Demo: SwitchSizes, source: SwitchSizesSource },
  { id: "variants", title: "Variants", description: "Solid fills the track; raised separates a softened rail from the selected thumb.", Demo: SwitchVariants, source: SwitchVariantsSource },
  { id: "tones", title: "Tones", description: "Selection tone is independent from invalid state.", Demo: SwitchTones, source: SwitchTonesSource },
  { id: "controlled", title: "Controlled state", description: "Keep one external boolean owner and receive the next boolean value.", Demo: SwitchControlled, source: SwitchControlledSource },
  { id: "controller", title: "Controller and provider", description: "useSwitch supplies one controller to RootProvider.", Demo: SwitchControllerExample, source: SwitchControllerExampleSource },
  { id: "states", title: "States", description: "Disabled, read-only, required and invalid states remain visually distinct.", Demo: SwitchStates, source: SwitchStatesSource },
  { id: "indicators", title: "Track and thumb indicators", description: "State-aware artwork remains decorative and never changes the setting name.", Demo: SwitchIndicators, source: SwitchIndicatorsSource },
  { id: "label-placement", title: "Label placement and description", description: "Use logical placement, wrapping text and an independent help link.", Demo: SwitchLabelPlacement, source: SwitchLabelPlacementSource },
  { id: "tooltip", title: "Tooltip", description: "Attach the tooltip to the actual control and retain an accessible name.", Demo: SwitchTooltip, source: SwitchTooltipSource },
  { id: "hook-form", title: "React Hook Form", description: "Optional Controller integration preserves one state owner, ref, blur, validation and reset.", Demo: SwitchHookForm, source: SwitchHookFormSource },
  { id: "native-form", title: "Native form", description: "HiddenInput is the compound path's single checkbox for serialization and reset.", Demo: SwitchNativeForm, source: SwitchNativeFormSource },
  { id: "responsive", title: "Responsive size and variant", description: "Sparse breakpoint values inherit through static data attributes.", Demo: SwitchResponsive, source: SwitchResponsiveSource },
  { id: "custom-colors", title: "Custom colors", description: "Documented checked-state tokens preserve the selected color family on hover and press.", Demo: SwitchCustomColors, source: SwitchCustomColorsSource },
  { id: "rtl-composition", title: "RTL and custom hosts", description: "Effective direction mirrors travel; render/asChild keeps Atom interaction semantics.", Demo: SwitchRtlComposition, source: SwitchRtlCompositionSource },
];

const presentationRows = [
  { name: "size", typeLabel: 'ResponsiveValue<"xs" | "sm" | "md" | "lg">', defaultLabel: '"md"', description: "Visible track scale; target remains at least 44px." },
  { name: "variant", typeLabel: 'ResponsiveValue<"solid" | "raised">', defaultLabel: '"solid"', description: "Track and thumb treatment." },
  { name: "tone", typeLabel: '"neutral" | "accent" | "contrast" | "info" | "success" | "warning" | "danger"', defaultLabel: '"accent"', description: "Selected paint, independent from invalid state." },
] as const;
const stateRows = [
  { name: "checked / defaultChecked", typeLabel: "boolean", defaultLabel: "false", description: "Controlled or initial uncontrolled state." },
  { name: "onCheckedChange", typeLabel: "(checked: boolean) => void", defaultLabel: "—", description: "Receives the next boolean state." },
  { name: "disabled / readOnly / invalid / required", typeLabel: "boolean", defaultLabel: "false", description: "Availability and validation state." },
] as const;

export const parts: OwnerPart[] = [
  { id: "props-field", title: "Field", description: "Noninteractive compound owner for state, IDs and native form metadata.", rows: [...presentationRows, ...stateRows, { name: "ids", typeLabel: 'Partial<Record<"control" | "label" | "input", string>>', defaultLabel: "generated", description: "Custom part IDs associated during SSR; also supported by RootProvider." }, { name: "name / value / form", typeLabel: "string", defaultLabel: 'value: "on"', description: "Metadata consumed by HiddenInput." }, { name: "labelPlacement", typeLabel: '"start" | "end"', defaultLabel: '"end"', description: "Logical label position." }] },
  { id: "props-root", title: "Root", description: "Compatible standalone button switch with automatic native proxy; ref targets HTMLButtonElement.", rows: [...presentationRows, ...stateRows, { name: "name / value / form", typeLabel: "string", defaultLabel: 'value: "on"', description: "Standalone native form participation." }] },
  { id: "props-control", title: "Control", description: "The compound path's single focusable button and interaction target.", rows: [...presentationRows, { name: "children", typeLabel: "ReactNode", defaultLabel: "Switch.Thumb", description: "Omit for the default thumb; explicit children own all artwork." }, { name: "render / asChild", typeLabel: "RenderProp / boolean", defaultLabel: "—", description: "Compose a compatible host without moving behavior into Brick." }] },
  { id: "props-thumb", title: "Thumb", description: "Decorative state-aware thumb; ref targets HTMLSpanElement.", rows: [{ name: "render / asChild", typeLabel: "RenderProp / boolean", defaultLabel: "—", description: "Customize the decorative host." }] },
  { id: "props-label", title: "Label", description: "Visible native label associated to Control, outside the button.", rows: [{ name: "children", typeLabel: "ReactNode", defaultLabel: "—", description: "Stable accessible setting name; links remain independent." }] },
  { id: "props-hidden-input", title: "HiddenInput", description: "Exactly one explicit native checkbox proxy in compound mode; ref targets HTMLInputElement.", rows: [{ name: "native input props", typeLabel: "InputHTMLAttributes", defaultLabel: "—", description: "Handlers and refs compose; owner state/type/form geometry remain authoritative." }] },
  { id: "props-indicator", title: "Indicator", description: "Decorative checked/fallback track content.", rows: [{ name: "children / fallback", typeLabel: "ReactNode", defaultLabel: "—", description: "Checked and unchecked artwork." }, { name: "forceMount", typeLabel: "boolean", defaultLabel: "false", description: "Keep an empty state host mounted." }] },
  { id: "props-thumb-indicator", title: "ThumbIndicator", description: "Decorative checked/fallback artwork inside Thumb.", rows: [{ name: "children / fallback", typeLabel: "ReactNode", defaultLabel: "—", description: "Checked and unchecked artwork." }] },
  { id: "props-root-provider", title: "RootProvider", description: "Compound owner supplied by useSwitch; value is the controller and inputValue is submitted.", rows: [...presentationRows, { name: "value", typeLabel: "SwitchController", defaultLabel: "required", description: "The single external controller." }, { name: "ids", typeLabel: 'Partial<Record<"control" | "label" | "input", string>>', defaultLabel: "generated", description: "Custom part IDs associated during SSR." }, { name: "inputValue", typeLabel: "string", defaultLabel: '"on"', description: "Submitted checkbox value." }] },
  { id: "props-context-controller", title: "Context and controller", description: "Read or own state without creating another switch.", rows: [{ name: "useSwitch", typeLabel: "(props) => SwitchController", defaultLabel: "—", description: "Controlled/uncontrolled state, availability, toggle and reset." }, { name: "useSwitchContext", typeLabel: "() => SwitchContextValue", defaultLabel: "—", description: "Reads the nearest owner's state and operations." }] },
];
export const sections = ownerSections(examples, parts, true);
