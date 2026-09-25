import { EditableActivation } from "./examples/EditableActivation.js";
import ActivationSource from "./examples/EditableActivation.tsx?raw";
import { EditableDisabled } from "./examples/EditableDisabled.js";
import DisabledSource from "./examples/EditableDisabled.tsx?raw";
import { EditableTextarea } from "./examples/EditableTextarea.js";
import TextareaSource from "./examples/EditableTextarea.tsx?raw";
import { EditableControls } from "./examples/EditableControls.js";
import ControlsSource from "./examples/EditableControls.tsx?raw";
import { EditableControlled } from "./examples/EditableControlled.js";
import ControlledSource from "./examples/EditableControlled.tsx?raw";
import { EditableStore } from "./examples/EditableStore.js";
import StoreSource from "./examples/EditableStore.tsx?raw";
import { EditableSizes } from "./examples/EditableSizes.js";
import SizesSource from "./examples/EditableSizes.tsx?raw";
import { EditableTypography } from "./examples/EditableTypography.js";
import TypographySource from "./examples/EditableTypography.tsx?raw";
import { EditableInherited } from "./examples/EditableInherited.js";
import InheritedSource from "./examples/EditableInherited.tsx?raw";
import { EditableComposition } from "./examples/EditableComposition.js";
import CompositionSource from "./examples/EditableComposition.tsx?raw";
import { EditableHighlight } from "./examples/EditableHighlight.js";
import HighlightSource from "./examples/EditableHighlight.tsx?raw";
import { EditableSubmit } from "./examples/EditableSubmit.js";
import SubmitSource from "./examples/EditableSubmit.tsx?raw";
import { EditablePlaceholder } from "./examples/EditablePlaceholder.js";
import PlaceholderSource from "./examples/EditablePlaceholder.tsx?raw";
import {
  ownerSections,
  type OwnerExample,
} from "../../shared/OwnerDocumentation.js";
import { editableParts } from "./parts.js";
export const editableExamples: OwnerExample[] = [
  {
    id: "activation",
    title: "Activation modes",
    description: "Choose focus, click, double-click or explicit activation.",
    Demo: EditableActivation,
    source: ActivationSource,
  },
  {
    id: "disabled",
    title: "Disabled and read only",
    description: "Prevent editing while preserving the displayed value.",
    Demo: EditableDisabled,
    source: DisabledSource,
  },
  {
    id: "textarea",
    title: "Textarea",
    description:
      "Grow with the content. Enter inserts a newline; Ctrl/Meta+Enter commits.",
    Demo: EditableTextarea,
    source: TextareaSource,
  },
  {
    id: "controls",
    title: "With controls",
    description: "Delegate visual styling to IconButton with unstyled asChild.",
    Demo: EditableControls,
    source: ControlsSource,
  },
  {
    id: "controlled",
    title: "Controlled",
    description:
      "Own the draft value; persist completed edits through onValueCommit.",
    Demo: EditableControlled,
    source: ControlledSource,
  },
  {
    id: "store",
    title: "Store",
    description: "Use the controller outside RootProvider.",
    Demo: EditableStore,
    source: StoreSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Density controls minimum height, independently of custom typography.",
    Demo: EditableSizes,
    source: SizesSource,
  },
  {
    id: "typography",
    title: "Typography",
    description:
      "Share responsive typography, weight and tone between preview and editor.",
    Demo: EditableTypography,
    source: TypographySource,
  },
  {
    id: "inherited",
    title: "Inherited typography",
    description:
      "Use an existing text context without duplicating its style on the editor.",
    Demo: EditableInherited,
    source: InheritedSource,
  },
  {
    id: "composition",
    title: "Custom preview",
    description:
      "Project one host and keep authored preview text synchronized with valueText.",
    Demo: EditableComposition,
    source: CompositionSource,
  },
  {
    id: "highlight",
    title: "Hover feedback",
    description: "Remove the hover fill without removing keyboard focus.",
    Demo: EditableHighlight,
    source: HighlightSource,
  },
  {
    id: "submit",
    title: "Submission modes",
    description: "Choose the commit gesture; Escape cancels the edit.",
    Demo: EditableSubmit,
    source: SubmitSource,
  },
  {
    id: "placeholder",
    title: "Placeholder and limit",
    description: "Provide separate preview/edit hints and a maximum length.",
    Demo: EditablePlaceholder,
    source: PlaceholderSource,
  },
];
export const editableSections = ownerSections(editableExamples, editableParts);
