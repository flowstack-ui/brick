import { createElement } from "react";
import {
  LinkBox,
  type LinkBoxActionProps,
  type LinkBoxLinkProps,
  type LinkBoxRootElement,
  type LinkBoxRootProps,
} from "../../../src/link-box.js";

const element: LinkBoxRootElement = "article";
const root: LinkBoxRootProps = {
  as: element,
  children: createElement(LinkBox.Link, {
    children: "Stride",
    href: "/products/stride",
  }),
};
const link: LinkBoxLinkProps = { href: "/products/stride", children: "Stride" };
const action: LinkBoxActionProps = {
  children: createElement("button", { type: "button" }, "Save"),
};

void LinkBox;
void root;
void link;
void action;

// @ts-expect-error Root semantic hosts are a closed noninteractive set.
const invalidRoot: LinkBoxRootElement = "button";
// @ts-expect-error A default Link still requires a real href.
const missingDestination: LinkBoxLinkProps = { children: "Missing" };
// @ts-expect-error Root deliberately has no Pressable composition mode.
const invalidPressableRoot: LinkBoxRootProps = { asChild: true };

void invalidRoot;
void missingDestination;
void invalidPressableRoot;
