import { createElement } from "react";
import {
  Button,
  type ButtonProps,
  type ButtonShape,
  type ButtonSize,
  type ButtonTone,
  type ButtonVariant,
} from "@flowstack-ui/brick";
import { Button as SubpathButton } from "@flowstack-ui/brick/button";

const variant: ButtonVariant = "soft";
const tone: ButtonTone = "success";
const size: ButtonSize = "xl";
const shape: ButtonShape = "pill";
const props: ButtonProps = {
  children: "Save",
  endIcon: createElement("svg"),
  fullWidth: true,
  shape,
  size,
  tone,
  variant,
};
const composed: ButtonProps = {
  asChild: true,
  children: createElement("a", { href: "/account" }, "Account"),
};
const rendered: ButtonProps = {
  children: "Router",
  render: createElement("a", { href: "/router" }),
};

void Button;
void SubpathButton;
void props;
void composed;
void rendered;

// @ts-expect-error Brick exposes semantic tone instead of the native color attribute.
const nativeColor: ButtonProps = { children: "Invalid", color: "red" };
// @ts-expect-error asChild owns its content and does not accept icon props.
const composedIcon: ButtonProps = {
  asChild: true,
  children: createElement("a", null, "Invalid"),
  startIcon: createElement("svg"),
};
// @ts-expect-error asChild and render are mutually exclusive.
const doubleComposition: ButtonProps = {
  asChild: true,
  children: createElement("a", null, "Invalid"),
  render: createElement("button"),
};
// @ts-expect-error Button variants are a closed recipe set.
const invalidVariant: ButtonProps = { children: "Invalid", variant: "link" };

void nativeColor;
void composedIcon;
void doubleComposition;
void invalidVariant;
