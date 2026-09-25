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
  elevation: "medium",
  offset: { initial: 0, md: 4 },
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
const responsiveToolbar = createElement(AppBar.Toolbar, {
  density: { md: "compact" }, layout: { initial: "balanced", lg: "flex" },
  inset: { sm: "none" }, gap: { initial: 2, md: 4 },
}, createElement(AppBar.Start, { gap: { lg: 3 } }, "Brand"));
void responsiveToolbar;

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

// Surface effect parameters preserve exact CSS lengths without a styling runtime.
createElement(AppBar.Root, { treatment: "translucent", backgroundOpacity: 0.8, backdropBlur: "18px", backdropSaturate: 1.1, borderColor: "white", borderOpacity: 0.5 });
// @ts-expect-error Blur percentages are not lengths.
createElement(AppBar.Root, { backdropBlur: "20%" });
// @ts-expect-error No universal responsive paint API.
createElement(AppBar.Root, { backgroundOpacity: { initial: 0.8 } });
