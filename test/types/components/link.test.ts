import { createElement, createRef, forwardRef } from "react";
import {
  Link,
  type LinkProps,
  type LinkRenderProp,
  type LinkSize,
  type LinkTone,
  type LinkVariant,
} from "../../../src/link.js";
import { Link as RootLink } from "../../../src/index.js";

const ref = createRef<HTMLAnchorElement>();
const variants: LinkVariant[] = ["underline", "plain"];
const tones: LinkTone[] = ["accent", "neutral", "inherit"];
const sizes: LinkSize[] = ["inherit", "sm", "md", "lg"];
const render: LinkRenderProp = (props) => createElement("a", props);
const props: LinkProps = {
  children: "Read the guides",
  href: "/guides",
  rel: "help",
  tone: "accent",
};

createElement(Link, { ...props, ref });
createElement(RootLink, { ...props, ref });
createElement(Link, { children: "Reports", render });
createElement(Link, {
  asChild: true,
  children: createElement(
    forwardRef<HTMLAnchorElement, { to: string }>(function RouterLink({ to }, routerRef) {
      return createElement("a", { href: to, ref: routerRef });
    }),
    { to: "/account" },
  ),
});

// @ts-expect-error Native rendering requires href.
createElement(Link, { children: "Missing destination" });
// @ts-expect-error Link has no disabled visual or semantic prop.
createElement(Link, { children: "Unavailable", disabled: true, href: "/later" });
// @ts-expect-error Link has no loading state.
createElement(Link, { children: "Loading", href: "/later", loading: true });
// @ts-expect-error Link has no status tones.
createElement(Link, { children: "Danger", href: "/danger", tone: "danger" });
// @ts-expect-error Link has no Button variants.
createElement(Link, { children: "Solid", href: "/solid", variant: "solid" });
createElement(Link, {
  asChild: true,
  children: createElement("a", { href: "/next" }),
  // @ts-expect-error asChild owns its complete anatomy and excludes icons.
  endIcon: createElement("svg"),
});
createElement(Link, {
  asChild: true,
  children: createElement("a", { href: "/next" }),
  // @ts-expect-error render and asChild are mutually exclusive.
  render: "a",
});

void variants;
void tones;
void sizes;
