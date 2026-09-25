"use client";
import { forwardRef, type ReactNode } from "react";
import {
  useCheckboxContext,
  type CheckboxController,
} from "@flowstack-ui/atom/checkbox";
import { Checkbox, type CheckboxProps } from "./Checkbox.js";
export { useCheckbox, useCheckboxContext } from "@flowstack-ui/atom/checkbox";
export type {
  CheckboxController,
  UseCheckboxProps,
} from "@flowstack-ui/atom/checkbox";

type ProviderBase<T> = T extends unknown
  ? Omit<T, "value" | "checked" | "defaultChecked" | "onCheckedChange">
  : never;
export type CheckboxRootProviderProps = ProviderBase<CheckboxProps> & {
  value: CheckboxController;
  inputValue?: string;
};
export const CheckboxRootProvider = forwardRef<
  HTMLButtonElement,
  CheckboxRootProviderProps
>(function CheckboxRootProvider(
  { value, inputValue, disabled, readOnly, ...props },
  ref,
) {
  return (
    <Checkbox
      {...(props as CheckboxProps)}
      ref={ref}
      value={inputValue}
      checked={value.checked}
      onCheckedChange={value.setChecked}
      disabled={disabled || value.disabled}
      readOnly={readOnly || value.readOnly}
    />
  );
});
export interface CheckboxIndicatorProps {
  children?: ReactNode;
  indeterminate?: ReactNode;
}
export function CheckboxIndicator({
  children,
  indeterminate,
}: CheckboxIndicatorProps) {
  const { state } = useCheckboxContext();
  if (state === "indeterminate" && indeterminate !== undefined)
    return <>{indeterminate}</>;
  if (state !== "indeterminate" && children !== undefined)
    return <>{children}</>;
  return (
    <svg
      aria-hidden="true"
      className="brick-checkbox-mark"
      focusable="false"
      viewBox="0 0 16 16"
    >
      <path
        className="brick-checkbox-check"
        d="m3.25 8.1 3.05 3.05 6.45-6.45"
      />
      <path className="brick-checkbox-mixed" d="M3.5 8h9" />
    </svg>
  );
}
