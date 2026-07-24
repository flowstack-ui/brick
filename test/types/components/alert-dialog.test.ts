import { createElement } from "react";
import {
  AlertDialog,
  type AlertDialogContentProps,
  type AlertDialogOverlayProps,
  type AlertDialogRootProps,
  type AlertDialogSize,
  type AlertDialogTitleProps,
} from "../../../src/alert-dialog.js";

const size: AlertDialogSize = "sm";
const rootProps: AlertDialogRootProps = {
  children: createElement(AlertDialog.Trigger, null, "Open decision"),
  closeOnEscape: false,
  defaultOpen: true,
  keepMounted: true,
};
const contentProps: AlertDialogContentProps = {
  "aria-label": "Remove workspace",
  "aria-describedby": "remove-message",
  children: "Removal is permanent",
  initialFocus: false,
  size,
};
const overlayProps: AlertDialogOverlayProps = {
  "aria-label": "Decision backdrop",
};
const titleProps: AlertDialogTitleProps = {
  as: "h1",
  children: "Remove workspace?",
};

void AlertDialog;
void rootProps;
void contentProps;
void overlayProps;
void titleProps;

// @ts-expect-error AlertDialog sizes are a closed set.
const invalidSize: AlertDialogSize = "lg";
// @ts-expect-error AlertDialog is a namespace and not a flat callable component.
const invalidFlatAlert = createElement(AlertDialog, null, "Remove");
// @ts-expect-error Backdrop dismissal is permanently blocked.
const invalidBackdropRoot: AlertDialogRootProps = { children: "Decision", closeOnBackdropClick: true };
// @ts-expect-error Overlay exposes no meaningless dismissal toggle.
const invalidOverlay: AlertDialogOverlayProps = { disabled: true };
// @ts-expect-error AlertDialog has no semantic tone prop.
const invalidTone: AlertDialogContentProps = { tone: "danger" };
// @ts-expect-error AlertDialog has no placement prop.
const invalidPlacement: AlertDialogContentProps = { placement: "bottom" };
// @ts-expect-error AlertDialog has no loading workflow prop.
const invalidLoading: AlertDialogContentProps = { loading: true };
// @ts-expect-error AlertDialog Title accepts heading elements only.
const invalidTitle: AlertDialogTitleProps = { as: "div", children: "Remove?" };

void invalidSize;
void invalidFlatAlert;
void invalidBackdropRoot;
void invalidOverlay;
void invalidTone;
void invalidPlacement;
void invalidLoading;
void invalidTitle;
