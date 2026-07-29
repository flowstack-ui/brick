import { createElement, createRef } from "react";
import {
  SkipLink,
  SkipLinkRoot,
  SkipLinkTarget,
  type SkipLinkRootProps,
  type SkipLinkTargetProps,
} from "../../../src/skip-link.js";

const rootRef = createRef<HTMLAnchorElement>();
const targetRef = createRef<HTMLElement>();

const rootProps: SkipLinkRootProps = {
  children: "Skip to reports",
  href: "#reports",
  focusTarget: true,
};
const targetProps: SkipLinkTargetProps = {
  children: "Reports",
  id: "reports",
  tabIndex: -1,
};

createElement(SkipLink.Root, { ...rootProps, ref: rootRef });
createElement(SkipLink.Target, { ...targetProps, ref: targetRef });
createElement(SkipLinkRoot, rootProps);
createElement(SkipLinkTarget, targetProps);
createElement(SkipLink.Root, { asChild: true }, createElement("a", { href: "#reports" }));
createElement(SkipLink.Target, { render: createElement("section", { "aria-label": "Reports" }) });

// @ts-expect-error Skip Link accepts same-page hash destinations only
const externalHref: SkipLinkRootProps = { href: "https://example.com" };
// @ts-expect-error Skip Link has no visual recipe variants
const visualVariant: SkipLinkRootProps = { variant: "soft" };
void externalHref;
void visualVariant;

