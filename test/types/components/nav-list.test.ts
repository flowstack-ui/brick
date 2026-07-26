import {
  NavList,
  type NavListLinkProps,
  type NavListRootProps,
  type NavListSize,
  type NavListTone,
  type NavListVariant,
} from "../../../src/nav-list.js";

const variant: NavListVariant = "soft";
const tone: NavListTone = "accent";
const size: NavListSize = "md";
const root: NavListRootProps = { children: null, variant, tone, size };
const link: NavListLinkProps = { children: "Input", href: "/input", description: "Text entry" };
void NavList;
void root;
void link;

// @ts-expect-error unsupported recipe
const badVariant: NavListVariant = "ghost";
// @ts-expect-error asChild delegates anatomy
const badChild: NavListLinkProps = { asChild: true, children: {} as JSX.Element, startIcon: "x" };
void badVariant;
void badChild;
