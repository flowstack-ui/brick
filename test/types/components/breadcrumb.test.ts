import { createElement, createRef } from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbRoot,
  BreadcrumbSeparator,
  type BreadcrumbRootProps,
  type BreadcrumbSize,
  type BreadcrumbVariant,
} from "../../../src/breadcrumb.js";
import { Breadcrumb as RootBreadcrumb } from "../../../src/index.js";

const rootRef = createRef<HTMLElement>();
const linkRef = createRef<HTMLAnchorElement>();
const sizes: BreadcrumbSize[] = ["sm", "md", "lg"];
const variants: BreadcrumbVariant[] = ["plain", "underline", "subtle"];
const root: BreadcrumbRootProps = {
  ariaLabel: "Path",
  size: "lg",
  variant: "underline",
  children: createElement(Breadcrumb.List),
};
createElement(Breadcrumb.Root, { ...root, ref: rootRef });
createElement(RootBreadcrumb.Root, root);
createElement(BreadcrumbRoot, root);
createElement(BreadcrumbList);
createElement(BreadcrumbItem);
createElement(BreadcrumbLink, { href: "/docs", ref: linkRef }, "Docs");
createElement(BreadcrumbPage, null, "Current");
createElement(BreadcrumbSeparator, null, "›");
createElement(BreadcrumbEllipsis, { "aria-label": "Collapsed pages" });
// @ts-expect-error Breadcrumb uses a closed three-size scale
createElement(Breadcrumb.Root, { ...root, size: "xl" });
// @ts-expect-error Breadcrumb uses only plain and underline recipes
createElement(Breadcrumb.Root, { ...root, variant: "soft" });
createElement(Breadcrumb.Root, {
  ...root,
  tone: "accent",
  "aria-label": "Native",
  size: { initial: "sm", md: "lg" },
  variant: { lg: "subtle" },
});
createElement(Breadcrumb.Trigger, { disabled: true, ref: rootRef }, "Menu");
// @ts-expect-error a breadcrumb trigger is an action, not a destination
createElement(Breadcrumb.Trigger, { href: "/bad" });
// @ts-expect-error recipe values remain closed inside responsive objects
createElement(Breadcrumb.Root, { size: { md: "xl" } });
void sizes;
void variants;
createElement(Breadcrumb.Root, { tone: "inherit" });
// @ts-expect-error status is not a navigation tone
createElement(Breadcrumb.Root, { tone: "danger" });
// @ts-expect-error status is not a navigation tone
createElement(Breadcrumb.Root, { tone: "success" });
// @ts-expect-error status is not a navigation tone
createElement(Breadcrumb.Root, { tone: "warning" });
// @ts-expect-error status is not a navigation tone
createElement(Breadcrumb.Root, { tone: "info" });
