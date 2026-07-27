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
const variants: BreadcrumbVariant[] = ["plain", "underline"];
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
// @ts-expect-error tone is intentionally not a Breadcrumb recipe
createElement(Breadcrumb.Root, { ...root, tone: "accent" });
void sizes;
void variants;
