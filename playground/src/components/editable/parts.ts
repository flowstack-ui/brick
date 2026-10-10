import type { OwnerPart } from "../../shared/OwnerDocumentation.js";
export const editableParts: OwnerPart[] = [
  {
    id: "props-root",
    title: "Root",
    description: "State, behavior and shared typography.",
    rows: [
      {
        name: "size",
        typeLabel: '"sm" | "md" | "lg"',
        defaultLabel: "md",
        description: "Minimum-height density, independent of typography.",
      },
      {
        name: "textStyle",
        typeLabel: 'ResponsiveValue<TextVariant> | "inherit"',
        defaultLabel: "size default",
        description:
          "Shared preview/editor typography; inherit uses the surrounding text context.",
      },
      {
        name: "weight",
        typeLabel: "TextWeight",
        defaultLabel: "recipe",
        description: "Shared text weight for preview and editor.",
      },
      {
        name: "tone",
        typeLabel: "TextTone",
        defaultLabel: "primary",
        description: "Semantic text color for both states.",
      },
      {
        name: "align",
        typeLabel: "ResponsiveValue<TextAlign>",
        defaultLabel: "start",
        description: "Logical text alignment.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "control",
        description: "Shared radius token for preview and editor.",
      },
      {
        name: "unstyled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Remove Brick presentation, preserving behavior.",
      },
      {
        name: "value",
        typeLabel: "string",
        description: "Controlled draft value; apply onValueChange requests.",
      },
      {
        name: "defaultValue",
        typeLabel: "string",
        defaultLabel: '""',
        description: "Initial uncontrolled value and native reset baseline.",
      },
      {
        name: "edit",
        typeLabel: "boolean",
        description: "Controlled editing state; apply onEditChange requests.",
      },
      {
        name: "defaultEdit",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Start directly in edit mode.",
      },
      {
        name: "activationMode",
        typeLabel: '"focus" | "click" | "dblclick" | "none"',
        defaultLabel: "focus",
        description:
          "Focus, click, double-click or programmatic-only activation.",
      },
      {
        name: "submitMode",
        typeLabel: '"both" | "enter" | "blur" | "none"',
        defaultLabel: "both",
        description:
          "Commit on Enter, outside blur, both, or explicit Save only.",
      },
      {
        name: "selectOnFocus",
        typeLabel: "boolean",
        defaultLabel: "true",
        description:
          "Select the current native editor text when editing begins.",
      },
      {
        name: "autoResize",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Size the editor against its preview.",
      },
      {
        name: "placeholder",
        typeLabel: "string | { edit: string; preview: string }",
        description: "Empty preview and editor hints; may differ.",
      },
      {
        name: "maxLength",
        typeLabel: "number",
        description: "Maximum native text-entry length.",
      },
      {
        name: "disabled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Disable activation and mutation; inherits Field unless explicitly overridden.",
      },
      {
        name: "readOnly",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Keep the value readable without allowing editing.",
      },
      {
        name: "invalid",
        typeLabel: "boolean",
        defaultLabel: "false",
        description:
          "Show invalid state and expose it to assistive technology.",
      },
      {
        name: "required",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Participate in native required validation.",
      },
      {
        name: "name",
        typeLabel: "string",
        description: "Include the editor once in native form data.",
      },
      {
        name: "form",
        typeLabel: "string",
        description: "Associate with an external form by its ID.",
      },
      {
        name: "id",
        typeLabel: "string",
        description: "Base identity for generated part IDs.",
      },
      {
        name: "ids",
        typeLabel: "EditableOptions['ids']",
        description: "Override individual part IDs for composition.",
      },
      {
        name: "dir",
        typeLabel: '"ltr" | "rtl"',
        description: "Reading and text direction, inherited by default.",
      },
      {
        name: "translations",
        typeLabel: "EditableOptions['translations']",
        description: "Accessible control labels.",
      },
      {
        name: "finalFocusEl",
        typeLabel: "() => HTMLElement | null",
        description: "Focus destination after explicit completion.",
      },
      {
        name: "getRootNode",
        typeLabel: "() => Document | ShadowRoot",
        description: "Owner document or shadow root.",
      },
      {
        name: "onValueChange",
        typeLabel: "(details: EditableValueChangeDetails) => void",
        description: "Draft changes; do not persist each keystroke.",
      },
      {
        name: "onValueCommit",
        typeLabel: "(details: EditableValueChangeDetails) => void",
        description: "Accepted commit; application owns persistence.",
      },
      {
        name: "onValueRevert",
        typeLabel: "(details: EditableValueChangeDetails) => void",
        description: "Accepted cancellation; restores session baseline.",
      },
      {
        name: "onEditChange",
        typeLabel: "(details: EditableEditChangeDetails) => void",
        description:
          "Requested editing-state change; controlled parents must apply it.",
      },
      {
        name: "onFocusOutside",
        typeLabel: "(event: EditableOutsideEvent) => void",
        description: "Cancellable focus leaving the component.",
      },
      {
        name: "onPointerDownOutside",
        typeLabel: "(event: EditableOutsideEvent) => void",
        description: "Cancellable pointer interaction outside.",
      },
      {
        name: "onInteractOutside",
        typeLabel: "(event: EditableOutsideEvent) => void",
        description: "Combined cancellable outside interaction.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Project one structural host.",
      },
    ],
  },
  {
    id: "props-provider",
    title: "RootProvider",
    description: "A useEditable controller plus the same visual props as Root.",
    rows: [
      {
        name: "value",
        typeLabel: "EditableController",
        description:
          "value option; see the Editable public guide for behavior and native integration.",
      },
      {
        name: "size",
        typeLabel: '"sm" | "md" | "lg"',
        defaultLabel: "md",
        description: "Minimum-height density, independent of typography.",
      },
      {
        name: "textStyle",
        typeLabel: 'ResponsiveValue<TextVariant> | "inherit"',
        defaultLabel: "size default",
        description:
          "Shared preview/editor typography; inherit uses the surrounding text context.",
      },
      {
        name: "weight",
        typeLabel: "TextWeight",
        defaultLabel: "recipe",
        description:
          "weight option; see the Editable public guide for behavior and native integration.",
      },
      {
        name: "tone",
        typeLabel: "TextTone",
        defaultLabel: "primary",
        description:
          "tone option; see the Editable public guide for behavior and native integration.",
      },
      {
        name: "align",
        typeLabel: "ResponsiveValue<TextAlign>",
        defaultLabel: "start",
        description: "Logical text alignment.",
      },
      {
        name: "radius",
        typeLabel: "Radius",
        defaultLabel: "control",
        description:
          "radius option; see the Editable public guide for behavior and native integration.",
      },
      {
        name: "unstyled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Remove Brick presentation, preserving behavior.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Project one structural host.",
      },
    ],
  },
  {
    id: "props-area",
    title: "Area",
    description: "Owns the corresponding native structural part.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Project one structural host.",
      },
    ],
  },
  {
    id: "props-preview",
    title: "Preview",
    description:
      "Display live valueText; keep custom children synchronized via Context.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Project one structural host.",
      },
      {
        name: "highlight",
        typeLabel: '"hover" | "none"',
        defaultLabel: "hover",
        description: "Disable hover fill without removing focus.",
      },
    ],
  },
  {
    id: "props-input",
    title: "Input",
    description: "One native editor per root; typography inherits from Root.",
    rows: [
      {
        name: "Native attributes",
        typeLabel: "EditableInputProps",
        description:
          "Native attributes and refs. Input, Textarea and Label retain invariant hosts.",
      },
    ],
  },
  {
    id: "props-textarea",
    title: "Textarea",
    description: "One native editor per root; typography inherits from Root.",
    rows: [
      {
        name: "Native attributes",
        typeLabel: "EditableTextareaProps",
        description:
          "Native attributes and refs. Input, Textarea and Label retain invariant hosts.",
      },
    ],
  },
  {
    id: "props-label",
    title: "Label",
    description: "Owns the corresponding native structural part.",
    rows: [
      {
        name: "Native attributes",
        typeLabel: "EditableLabelProps",
        description:
          "Native attributes and refs. Input, Textarea and Label retain invariant hosts.",
      },
    ],
  },
  {
    id: "props-control",
    title: "Control",
    description: "Owns the corresponding native structural part.",
    rows: [
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Project one structural host.",
      },
    ],
  },
  {
    id: "props-edittrigger",
    title: "EditTrigger",
    description: "Compose Button/IconButton using unstyled asChild.",
    rows: [
      {
        name: "unstyled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Remove Brick presentation, preserving behavior.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Project one structural host.",
      },
      {
        name: "render",
        typeLabel: "RenderProp",
        description: "Alternate trigger host with merged behavior and refs.",
      },
    ],
  },
  {
    id: "props-submittrigger",
    title: "SubmitTrigger",
    description: "Compose Button/IconButton using unstyled asChild.",
    rows: [
      {
        name: "unstyled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Remove Brick presentation, preserving behavior.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Project one structural host.",
      },
      {
        name: "render",
        typeLabel: "RenderProp",
        description:
          "render option; see the Editable public guide for behavior and native integration.",
      },
    ],
  },
  {
    id: "props-canceltrigger",
    title: "CancelTrigger",
    description: "Compose Button/IconButton using unstyled asChild.",
    rows: [
      {
        name: "unstyled",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Remove Brick presentation, preserving behavior.",
      },
      {
        name: "asChild",
        typeLabel: "boolean",
        defaultLabel: "false",
        description: "Project one structural host.",
      },
      {
        name: "render",
        typeLabel: "RenderProp",
        description:
          "render option; see the Editable public guide for behavior and native integration.",
      },
    ],
  },
  {
    id: "props-context",
    title: "Context",
    description: "Read the live controller.",
    rows: [
      {
        name: "children",
        typeLabel: "(controller: EditableController) => ReactNode",
        description: "Use valueText for custom preview content.",
      },
    ],
  },
  {
    id: "props-hook",
    title: "useEditable",
    description: "Create an external controller from EditableOptions.",
    rows: [
      {
        name: "return",
        typeLabel: "EditableController",
        description:
          "editing, empty, value, valueText, setValue, clearValue, edit, submit and cancel.",
      },
    ],
  },
];
