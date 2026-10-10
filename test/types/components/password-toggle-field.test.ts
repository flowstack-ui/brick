import { createElement, createRef } from "react";
import {
  PasswordToggleField,
  type PasswordToggleFieldRootProps,
  type PasswordToggleFieldShape,
  type PasswordToggleFieldSize,
  type PasswordToggleFieldVariant,
} from "../../../src/password-toggle-field.js";
const inputRef = createRef<HTMLInputElement>();
const props: PasswordToggleFieldRootProps = {
  children: null,
  showLabel: "Show secret",
  hideLabel: "Hide secret",
  shape: "pill",
  size: { lg: "xl" },
  variant: "soft",
};
createElement(
  PasswordToggleField.Root,
  props,
  createElement(PasswordToggleField.Input, {
    ref: inputRef,
    autoComplete: "current-password",
  }),
  createElement(PasswordToggleField.Toggle),
);
const variants: PasswordToggleFieldVariant[] = [
  "outline",
  "surface",
  "soft",
  "subtle",
  "ghost",
  "plain",
  "underline",
];
const sizes: PasswordToggleFieldSize[] = [
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
];
const shapes: PasswordToggleFieldShape[] = ["sharp", "rounded", "pill"];
createElement(PasswordToggleField.Root, {
  children: null,
  variant: "underline",
  // @ts-expect-error underline has fixed geometry
  shape: "rounded",
});
void variants;
void sizes;
void shapes;

const surfaceRecipe: Pick<
  import("react").ComponentProps<typeof PasswordToggleField.Root>,
  "variant"
> = { variant: "surface" };
void surfaceRecipe;
