import { createElement, createRef } from "react";
import {
  Appearance,
  type AppearanceProps,
  type AppearanceValue,
} from "../../../src/appearance.js";
import { Appearance as RootAppearance } from "../../../src/index.js";
import { AppBar } from "../../../src/app-bar.js";

const ref = createRef<HTMLElement>();
const value: AppearanceValue = "dark";
const props: AppearanceProps = {
  children: createElement(AppBar.Root),
  value,
};

createElement(Appearance, { ...props, ref });
createElement(RootAppearance, {
  children: createElement("section"),
  value: "light",
});

// @ts-expect-error appearance values are closed.
createElement(Appearance, { children: createElement("div"), value: "system" });
// @ts-expect-error exactly one React element host is required.
createElement(Appearance, { children: "text", value: "dark" });
// @ts-expect-error Appearance never creates a selected native host.
createElement(Appearance, { as: "section", children: createElement("div") });
// @ts-expect-error wrapper-free composition is the only behavior.
createElement(Appearance, { asChild: true, children: createElement("div") });

void ref;
