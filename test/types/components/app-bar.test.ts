import { createElement } from "react";
import {
  AppBar,
  type AppBarRootProps,
  type AppBarTone,
  type AppBarToolbarInset,
  type AppBarVariant,
} from "../../../src/app-bar.js";

const tone: AppBarTone = "accent";
const variant: AppBarVariant = "solid";
const toolbarInset: AppBarToolbarInset = "none";
const rootProps: AppBarRootProps = {
  "aria-label": "Application",
  blurred: true,
  children: createElement(AppBar.Toolbar, { density: "compact", inset: toolbarInset }, [
    createElement(AppBar.Start, { key: "start" }, "Brand"),
    createElement(AppBar.Center, { key: "center" }, "Projects"),
    createElement(AppBar.End, { key: "end" }, "Actions"),
  ]),
  elevated: true,
  position: "sticky",
  tone,
  variant,
};
const composedRoot: AppBarRootProps = {
  "aria-label": "Composed application",
  asChild: true,
  children: createElement("header", null, "Application"),
};

void AppBar;
void rootProps;
void composedRoot;

// @ts-expect-error AppBar tones are a closed recipe set.
const invalidTone: AppBarTone = "danger";
// @ts-expect-error AppBar variants are a closed recipe set.
const invalidVariant: AppBarVariant = "soft";
// @ts-expect-error Toolbar inset is a closed recipe set.
const invalidToolbarInset: AppBarToolbarInset = "page";
// @ts-expect-error AppBar is a namespace and not a callable flat component.
const invalidFlatAppBar = createElement(AppBar, null, "Application");

void invalidTone;
void invalidVariant;
void invalidToolbarInset;
void invalidFlatAppBar;
