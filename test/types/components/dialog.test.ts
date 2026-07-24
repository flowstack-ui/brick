import { createElement } from "react";
import {
  Dialog,
  type DialogContentProps,
  type DialogRootProps,
  type DialogSize,
  type DialogTitleProps,
} from "../../../src/dialog.js";

const size: DialogSize = "lg";
const rootProps: DialogRootProps = {
  children: createElement(Dialog.Trigger, null, "Open settings"),
  closeOnBackdropClick: false,
  closeOnEscape: true,
  defaultOpen: true,
  keepMounted: true,
};
const contentProps: DialogContentProps = {
  "aria-label": "Project settings",
  children: "Settings content",
  initialFocus: false,
  size,
};
const titleProps: DialogTitleProps = {
  as: "h1",
  children: "Project settings",
};

void Dialog;
void rootProps;
void contentProps;
void titleProps;

// @ts-expect-error Dialog sizes are a closed set.
const invalidSize: DialogSize = "xl";
// @ts-expect-error Dialog is a namespace and not a callable flat component.
const invalidFlatDialog = createElement(Dialog, null, "Settings");
// @ts-expect-error Dialog deliberately has no visual variant prop.
const invalidVariant: DialogContentProps = { variant: "outline" };
// @ts-expect-error Dialog deliberately has no tone prop.
const invalidTone: DialogContentProps = { tone: "accent" };
// @ts-expect-error Dialog deliberately has no placement prop.
const invalidPlacement: DialogContentProps = { placement: "end" };
// @ts-expect-error Dialog deliberately has no fullscreen prop.
const invalidFullscreen: DialogContentProps = { fullscreen: true };
// @ts-expect-error Dialog Title accepts heading elements only.
const invalidTitle: DialogTitleProps = { as: "div", children: "Settings" };

void invalidSize;
void invalidFlatDialog;
void invalidVariant;
void invalidTone;
void invalidPlacement;
void invalidFullscreen;
void invalidTitle;
