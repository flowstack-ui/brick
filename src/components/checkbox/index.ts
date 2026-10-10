import { Checkbox as StandaloneCheckbox } from "./Checkbox.js";
import { CheckboxRootProvider, CheckboxIndicator } from "./CheckboxController.js";
export * from "./CheckboxController.js";
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxLabel,
  CheckboxDescription,
  CheckboxError,
} from "./CheckboxParts.js";

export const Checkbox = Object.assign(StandaloneCheckbox, {
  Root: CheckboxRoot,
  RootProvider: CheckboxRootProvider,
  Indicator: CheckboxIndicator,
  Control: CheckboxControl,
  Label: CheckboxLabel,
  Description: CheckboxDescription,
  Error: CheckboxError,
});
export { type CheckboxProps, type CheckboxSize, type CheckboxVariant, type CheckboxTone, type CheckboxPresentationProps } from "./Checkbox.js";
export {
  CheckboxRoot,
  CheckboxControl,
  CheckboxLabel,
  CheckboxDescription,
  CheckboxError,
  type CheckboxRootProps,
  type CheckboxControlProps,
  type CheckboxLabelProps,
  type CheckboxDescriptionProps,
  type CheckboxErrorProps,
} from "./CheckboxParts.js";
