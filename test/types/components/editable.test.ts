import type {
  EditableRootProps,
  EditableInputProps,
  EditableTextareaProps,
  EditableTriggerProps,
} from "../../../src/editable.js";
const root: EditableRootProps = {
  size: "sm",
  textStyle: { lg: "title-lg" },
  weight: "medium",
  tone: "secondary",
  radius: "none",
  align: { md: "center" },
  asChild: true,
  activationMode: "dblclick",
  submitMode: "none",
  autoResize: true,
  placeholder: { edit: "Write", preview: "Empty" },
};
const input: EditableInputProps = { autoComplete: "off", "aria-label": "Name" };
const textarea: EditableTextareaProps = { rows: 3 };
const trigger: EditableTriggerProps = { asChild: true, unstyled: true };
// @ts-expect-error typography remains token-only
const arbitraryText: EditableRootProps = { textStyle: "38px" };
// @ts-expect-error native editors cannot be replaced
const projectedInput: EditableInputProps = { asChild: true };
// @ts-expect-error closed size contract
const invalid: EditableRootProps = { size: "huge" };
void [root, input, textarea, trigger, invalid, arbitraryText, projectedInput];
