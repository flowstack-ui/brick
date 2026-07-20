import { createElement, createRef } from "react";
import {
  Field,
  Fieldset,
  Form,
  type FieldDescriptionProps,
  type FieldErrorProps,
  type FieldLabelProps,
  type FieldOrientation,
  type FieldRequiredIndicatorProps,
  type FieldRootProps,
  type FieldsetDescriptionProps,
  type FieldsetErrorProps,
  type FieldsetLegendProps,
  type FieldsetRootProps,
  type FormProps,
} from "@flowstack-ui/brick";
import { Form as SubpathForm } from "@flowstack-ui/brick/form";
import { Field as SubpathField } from "@flowstack-ui/brick/field";
import { Fieldset as SubpathFieldset } from "@flowstack-ui/brick/fieldset";

const orientation: FieldOrientation = "horizontal";
const formProps: FormProps = {
  "aria-label": "Profile",
  action: async () => {},
  children: createElement("button", { type: "submit" }, "Save"),
  method: "post",
  preventDefaultOnSubmit: false,
};
const composedForm: FormProps = {
  asChild: true,
  children: createElement("form", null),
};
const renderedForm: FormProps = {
  children: "Contents",
  render: createElement("form", { "data-adapter": "render" }),
};
const fieldRootProps: FieldRootProps = {
  "aria-label": "Email field",
  children: createElement(Field.Label, null, "Email"),
  invalid: true,
  orientation,
};
const fieldLabelProps: FieldLabelProps = {
  children: "Email",
  optionalIndicator: " optional",
};
const fieldDescriptionProps: FieldDescriptionProps = {
  children: "Use a work address.",
};
const fieldErrorProps: FieldErrorProps = {
  "aria-live": "polite",
  children: "Invalid address.",
  match: true,
};
const fieldIndicatorProps: FieldRequiredIndicatorProps = {
  children: "Required",
  fallback: "Optional",
};
const fieldsetRootProps: FieldsetRootProps = {
  children: createElement(Fieldset.Legend, null, "Topics"),
  disabled: true,
  required: true,
};
const fieldsetLegendProps: FieldsetLegendProps = {
  children: "Topics",
  optionalIndicator: " optional",
};
const fieldsetDescriptionProps: FieldsetDescriptionProps = {
  children: "Choose one.",
};
const fieldsetErrorProps: FieldsetErrorProps = {
  children: "Selection required.",
  forceMatch: true,
  role: "alert",
};

const formRef = createRef<HTMLFormElement>();
const fieldRef = createRef<HTMLDivElement>();
const labelRef = createRef<HTMLLabelElement>();
const descriptionRef = createRef<HTMLParagraphElement>();
const errorRef = createRef<HTMLParagraphElement>();
const indicatorRef = createRef<HTMLSpanElement>();
const fieldsetRef = createRef<HTMLFieldSetElement>();
const legendRef = createRef<HTMLLegendElement>();

const refs = (
  <Form ref={formRef}>
    <Field.Root ref={fieldRef}>
      <Field.Label ref={labelRef}>Email</Field.Label>
      <Field.Description ref={descriptionRef}>Help</Field.Description>
      <Field.Error ref={errorRef}>Error</Field.Error>
      <Field.RequiredIndicator ref={indicatorRef}>Required</Field.RequiredIndicator>
    </Field.Root>
    <Fieldset.Root ref={fieldsetRef}>
      <Fieldset.Legend ref={legendRef}>Topics</Fieldset.Legend>
    </Fieldset.Root>
  </Form>
);

void Form;
void Field;
void Fieldset;
void SubpathForm;
void SubpathField;
void SubpathFieldset;
void formProps;
void composedForm;
void renderedForm;
void fieldRootProps;
void fieldLabelProps;
void fieldDescriptionProps;
void fieldErrorProps;
void fieldIndicatorProps;
void fieldsetRootProps;
void fieldsetLegendProps;
void fieldsetDescriptionProps;
void fieldsetErrorProps;
void refs;

// @ts-expect-error Form render and asChild are mutually exclusive.
const invalidFormComposition: FormProps = { asChild: true, children: createElement("form"), render: createElement("form") };
// @ts-expect-error Form asChild requires one React element.
const invalidFormChild: FormProps = { asChild: true, children: "form" };
// @ts-expect-error Field Root render and asChild are mutually exclusive.
const invalidFieldComposition: FieldRootProps = { asChild: true, children: createElement("section"), render: createElement("section") };
// @ts-expect-error Field Label asChild requires an element.
const invalidLabelChild: FieldLabelProps = { asChild: true, children: "Email" };
// @ts-expect-error RequiredIndicator asChild requires element content.
const invalidIndicatorChild: FieldRequiredIndicatorProps = { asChild: true, children: "Required" };
// @ts-expect-error RequiredIndicator asChild fallback must also be composable.
const invalidIndicatorFallback: FieldRequiredIndicatorProps = { asChild: true, children: createElement("strong"), fallback: "Optional" };
// @ts-expect-error Fieldset Root asChild requires an element.
const invalidFieldsetChild: FieldsetRootProps = { asChild: true, children: "Topics" };
// @ts-expect-error Native ARIA is used instead of a custom ariaLabel alias.
const invalidAriaAlias: FieldRootProps = { ariaLabel: "Email", children: createElement(Field.Label, null, "Email") };
// @ts-expect-error Field has no flat label convenience prop.
const invalidFlatFieldProp: FieldRootProps = { children: null, label: "Email" };
// @ts-expect-error Field owns no visual variant.
const invalidFieldVariant: FieldRootProps = { children: null, variant: "outline" };
// @ts-expect-error Form owns no schema policy.
const invalidFormSchema: FormProps = { children: null, schema: {} };
// @ts-expect-error Field is a namespace, not a callable component.
const invalidFlatField = createElement(Field, null);
// @ts-expect-error Fieldset is a namespace, not a callable component.
const invalidFlatFieldset = createElement(Fieldset, null);
// @ts-expect-error Form has no Root namespace.
const invalidFormRoot = Form.Root;

void invalidFormComposition;
void invalidFormChild;
void invalidFieldComposition;
void invalidLabelChild;
void invalidIndicatorChild;
void invalidIndicatorFallback;
void invalidFieldsetChild;
void invalidAriaAlias;
void invalidFlatFieldProp;
void invalidFieldVariant;
void invalidFormSchema;
void invalidFlatField;
void invalidFlatFieldset;
void invalidFormRoot;
