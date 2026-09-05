import { createElement } from "react";
import {
  Dialog,
  type DialogClosePlacement,
  type DialogCloseProps,
  type DialogContentProps,
  type DialogFooterProps,
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
const footerProps: DialogFooterProps = { children: "Actions", justify: "start" };
const closePlacement: DialogClosePlacement = "corner";
const closeProps: DialogCloseProps = {
  children: "Close",
  placement: closePlacement,
};

void Dialog;
void rootProps;
void contentProps;
void titleProps;
void footerProps;
void closeProps;

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
// @ts-expect-error Dialog Footer distribution is a closed set.
const invalidFooter: DialogFooterProps = { justify: "stretch" };
// @ts-expect-error Dialog Close placement is a closed set.
const invalidClosePlacement: DialogCloseProps = { placement: "header" };

void invalidSize;
void invalidFlatDialog;
void invalidVariant;
void invalidTone;
void invalidPlacement;
void invalidFullscreen;
void invalidTitle;
void invalidFooter;
void invalidClosePlacement;
