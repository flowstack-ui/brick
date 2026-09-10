import type {
  EditableRootProps,
  EditableInputProps,
  EditableTextareaProps,
  EditableTriggerProps,
} from "../../../src/editable.js";
const root: EditableRootProps = {
  size: "sm",
  activationMode: "dblclick",
  submitMode: "none",
  autoResize: true,
  placeholder: { edit: "Write", preview: "Empty" },
};
const input: EditableInputProps = { autoComplete: "off", "aria-label": "Name" };
const textarea: EditableTextareaProps = { rows: 3 };
const trigger: EditableTriggerProps = { asChild: true };
// @ts-expect-error closed size contract
const invalid: EditableRootProps = { size: "huge" };
void [root, input, textarea, trigger, invalid];
