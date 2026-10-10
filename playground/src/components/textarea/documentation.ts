import type { TextareaCountProps, TextareaRootProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import type { DocsSectionMetadata } from "../../shared/DocsTableOfContents.js";
import { TextareaBasic } from "./examples/TextareaBasic.js";
import basicSource from "./examples/TextareaBasic.tsx?raw";
import { TextareaVariants } from "./examples/TextareaVariants.js";
import variantsSource from "./examples/TextareaVariants.tsx?raw";
import { TextareaSizes } from "./examples/TextareaSizes.js";
import sizesSource from "./examples/TextareaSizes.tsx?raw";
import { TextareaHelperText } from "./examples/TextareaHelperText.js";
import helperSource from "./examples/TextareaHelperText.tsx?raw";
import { TextareaErrorText } from "./examples/TextareaErrorText.js";
import errorSource from "./examples/TextareaErrorText.tsx?raw";
import { TextareaField } from "./examples/TextareaField.js";
import fieldSource from "./examples/TextareaField.tsx?raw";
import { TextareaRef } from "./examples/TextareaRef.js";
import refSource from "./examples/TextareaRef.tsx?raw";
import { TextareaRadius } from "./examples/TextareaRadius.js";
import radiusSource from "./examples/TextareaRadius.tsx?raw";
import { TextareaStates } from "./examples/TextareaStates.js";
import statesSource from "./examples/TextareaStates.tsx?raw";
import { TextareaControlled } from "./examples/TextareaControlled.js";
import controlledSource from "./examples/TextareaControlled.tsx?raw";
import { TextareaCount } from "./examples/TextareaCount.js";
import countSource from "./examples/TextareaCount.tsx?raw";
import { TextareaResize } from "./examples/TextareaResize.js";
import resizeSource from "./examples/TextareaResize.tsx?raw";
import { TextareaAutoResize } from "./examples/TextareaAutoResize.js";
import autoResizeSource from "./examples/TextareaAutoResize.tsx?raw";
import { TextareaResponsive } from "./examples/TextareaResponsive.js";
import responsiveSource from "./examples/TextareaResponsive.tsx?raw";
import { TextareaNativeForm } from "./examples/TextareaNativeForm.js";
import nativeFormSource from "./examples/TextareaNativeForm.tsx?raw";
import { TextareaHookForm } from "./examples/TextareaHookForm.js";
import hookFormSource from "./examples/TextareaHookForm.tsx?raw";

export const Basic = TextareaBasic;
export { basicSource };
export const examples = [
  { id: "variants", title: "Variants", description: "Use variant to change the appearance of the textarea.", Demo: TextareaVariants, source: variantsSource },
  { id: "sizes", title: "Sizes", description: "Use size to change text size and padding. Use rows to set the initial number of lines.", Demo: TextareaSizes, source: sizesSource },
  { id: "messages", title: "Helper text", description: "Add instructions with Field.Description.", Demo: TextareaHelperText, source: helperSource },
  { id: "error-text", title: "Error text", description: "Combine Field.Error with invalid to explain what needs correcting.", Demo: TextareaErrorText, source: errorSource },
  { id: "field", title: "Field", description: "Compose a required label and helper text with Field.", Demo: TextareaField, source: fieldSource },
  { id: "hook-form", title: "React Hook Form", description: "Use register for validation and reset. Install react-hook-form separately.", Demo: TextareaHookForm, source: hookFormSource },
  { id: "resize", title: "Manual resize", description: "Use resize to choose the drag direction, or none to disable it. Root style constrains the whole field; textareaStyle targets only the editor.", Demo: TextareaResize, source: resizeSource },
  { id: "auto-resize", title: "Auto-resize", description: "Use autoResize to grow as you type. maxRows limits growth before scrolling; do not combine autoResize with resize.", Demo: TextareaAutoResize, source: autoResizeSource },
  { id: "ref", title: "Ref", description: "Use ref to access and focus the native textarea, not its wrapper.", Demo: TextareaRef, source: refSource },
  { id: "radius", title: "Radius", description: "Use radius to change the corners. Do not combine it with shape, underline or a responsive variant.", Demo: TextareaRadius, source: radiusSource },
  { id: "states", title: "Disabled and read-only", description: "Disable editing when unavailable, or use readOnly to keep the value focusable and selectable.", Demo: TextareaStates, source: statesSource },
  { id: "controlled", title: "Controlled value", description: "Pair value with onValueChange to update or reset the text from React state.", Demo: TextareaControlled, source: controlledSource },
  { id: "count", title: "Character count", description: "Add Count to show the current length. maxLength limits how much text can be entered.", Demo: TextareaCount, source: countSource },
  { id: "responsive", title: "Responsive presentation", description: "Change size and variant at breakpoints. Omit shape and radius when variant is responsive.", Demo: TextareaResponsive, source: responsiveSource },
  { id: "native-form", title: "Native form", description: "Use name for form submission and a reset button to restore the initial value.", Demo: TextareaNativeForm, source: nativeFormSource },
];

export const rootRows: DocsPropDefinition<TextareaRootProps>[] = [
  { name: "variant", typeLabel: "ResponsiveValue<TextareaVariant>", defaultLabel: '"outline"', description: "outline, surface, soft, subtle, ghost, plain or underline. Responsive variants exclude explicit radius/shape." },
  { name: "size", typeLabel: "ResponsiveValue<ControlSize>", defaultLabel: '"lg"', description: "2xs, xs, sm, md, lg, xl or 2xl." },
  { name: "radius", typeLabel: "Radius", description: "Token-based wrapper corners; unavailable with underline or responsive variants." },
  { name: "shape", typeLabel: '"sharp" | "rounded"', defaultLabel: '"rounded"', description: "Legacy corner choice. Use either shape or radius; unavailable with underline or responsive variants." },
  { name: "value", typeLabel: "string", description: "Controlled text; pair with onValueChange." },
  { name: "defaultValue", typeLabel: "string", description: "Initial uncontrolled text, restored by native form reset." },
  { name: "onValueChange", typeLabel: "(value: string) => void", description: "Called with the updated text. Native onChange is also supported." },
  { name: "fullWidth", typeLabel: "boolean", defaultLabel: "true", description: "Begin at the available inline width." },
  { name: "resize", typeLabel: '"none" | "vertical" | "horizontal" | "both"', defaultLabel: '"vertical"', description: "Manual resizing of the complete visual boundary; unavailable with autoResize." },
  { name: "autoResize", typeLabel: "boolean", defaultLabel: "false", description: "Grow with content; cannot be combined with manual resize." },
  { name: "minRows", typeLabel: "number", defaultLabel: "3", description: "Minimum content rows and fallback native rows when rows is omitted." },
  { name: "maxRows", typeLabel: "number", description: "Maximum auto-resize rows before scrolling." },
  { name: "textareaClassName", typeLabel: "string", description: "Class for the native textarea; className targets the wrapper." },
  { name: "textareaStyle", typeLabel: "CSSProperties", description: "Style for the native textarea; style targets the wrapper." },
];
export const countRows: DocsPropDefinition<TextareaCountProps>[] = [
  { name: "children", typeLabel: "ReactNode", description: "Custom content; otherwise renders count or count/maxLength." },
  { name: "aria-live", typeLabel: '"off" | "polite" | "assertive"', defaultLabel: '"polite"', description: "Set off when automatic announcements are unnecessary." },
  { name: "render", typeLabel: "RenderProp", description: "Replace the native span while preserving Count props and ref composition." },
];
export const sections: DocsSectionMetadata[] = [
  { id: "usage", title: "Usage", level: 2 }, { id: "examples", title: "Examples", level: 2 },
  ...examples.map(({ id, title }) => ({ id, title, level: 3 as const })),
  { id: "props", title: "Props", level: 2 }, { id: "props-root", title: "Root", level: 3 }, { id: "props-count", title: "Count", level: 3 },
];
