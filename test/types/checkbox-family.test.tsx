import { createElement, createRef } from "react";
import {
  Checkbox,
  CheckboxGroup,
  type CheckboxGroupItemDescriptionProps,
  type CheckboxGroupItemLabelProps,
  type CheckboxGroupItemProps,
  type CheckboxGroupParentProps,
  type CheckboxGroupRootProps,
  type CheckboxProps,
  type CheckboxSize,
} from "@flowstack-ui/brick";
import { Checkbox as SubpathCheckbox } from "@flowstack-ui/brick/checkbox";
import { CheckboxGroup as SubpathGroup } from "@flowstack-ui/brick/checkbox-group";

const size: CheckboxSize = "lg";
const checkboxProps: CheckboxProps = {
  "aria-label": "Terms",
  defaultChecked: "indeterminate",
  name: "terms",
  size,
  validationBehavior: "inline",
  value: "accepted",
};
const checkboxChildProps: CheckboxProps = {
  asChild: true,
  children: createElement("button", null, "Terms"),
};
const rootProps: CheckboxGroupRootProps = {
  "aria-label": "Channels",
  allValues: ["email", "sms"],
  defaultValue: ["email"],
  name: "channels",
  orientation: "horizontal",
  size: "sm",
  validationBehavior: "native",
};
const itemProps: CheckboxGroupItemProps = {
  children: "Email",
  value: "email",
};
const labelProps: CheckboxGroupItemLabelProps = { children: "Email" };
const descriptionProps: CheckboxGroupItemDescriptionProps = {
  children: "Weekly summary",
};
const parentProps: CheckboxGroupParentProps = { children: "All" };
const checkboxRef = createRef<HTMLButtonElement>();
const rootRef = createRef<HTMLDivElement>();
const itemRef = createRef<HTMLButtonElement>();
const labelRef = createRef<HTMLSpanElement>();
const descriptionRef = createRef<HTMLSpanElement>();

const refs = (
  <>
    <Checkbox ref={checkboxRef}>Terms</Checkbox>
    <CheckboxGroup.Root ref={rootRef}>
      <CheckboxGroup.Parent>All</CheckboxGroup.Parent>
      <CheckboxGroup.Item ref={itemRef} value="email">
        <CheckboxGroup.ItemLabel ref={labelRef}>Email</CheckboxGroup.ItemLabel>
        <CheckboxGroup.ItemDescription ref={descriptionRef}>Help</CheckboxGroup.ItemDescription>
      </CheckboxGroup.Item>
    </CheckboxGroup.Root>
  </>
);

void Checkbox;
void CheckboxGroup;
void SubpathCheckbox;
void SubpathGroup;
void checkboxProps;
void checkboxChildProps;
void rootProps;
void itemProps;
void labelProps;
void descriptionProps;
void parentProps;
void refs;

// @ts-expect-error Checkbox render and asChild are mutually exclusive.
const invalidCheckboxComposition: CheckboxProps = { asChild: true, children: createElement("button"), render: createElement("button") };
// @ts-expect-error Checkbox asChild requires one element.
const invalidCheckboxChild: CheckboxProps = { asChild: true, children: "Terms" };
// @ts-expect-error Checkbox has no variant.
const invalidCheckboxVariant: CheckboxProps = { children: "Terms", variant: "soft" };
// @ts-expect-error Checkbox size is constrained.
const invalidCheckboxSize: CheckboxProps = { children: "Terms", size: "xl" };
// @ts-expect-error Validation presentation is inline or native.
const invalidCheckboxValidation: CheckboxProps = { children: "Terms", validationBehavior: "auto" };
// @ts-expect-error Native aria-label replaces custom aliases.
const invalidAriaAlias: CheckboxProps = { ariaLabel: "Terms" };
// @ts-expect-error Root asChild requires one element.
const invalidRootChild: CheckboxGroupRootProps = { asChild: true, children: "Channels" };
// @ts-expect-error Items do not accept per-item size.
const invalidItemSize: CheckboxGroupItemProps = { value: "email", size: "sm" };
// @ts-expect-error Item value is required.
const invalidItemValue: CheckboxGroupItemProps = { children: "Email" };
// @ts-expect-error Label children are required.
const invalidLabel: CheckboxGroupItemLabelProps = {};
// @ts-expect-error Parent checked state is derived from allValues.
const invalidParentChecked: CheckboxGroupParentProps = { checked: true };
// @ts-expect-error CheckboxGroup is a namespace, not callable.
const invalidFlatGroup = createElement(CheckboxGroup, null);

void invalidCheckboxComposition;
void invalidCheckboxChild;
void invalidCheckboxVariant;
void invalidCheckboxSize;
void invalidCheckboxValidation;
void invalidAriaAlias;
void invalidRootChild;
void invalidItemSize;
void invalidItemValue;
void invalidLabel;
void invalidParentChecked;
void invalidFlatGroup;
