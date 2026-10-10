import {
  NavList,
  type NavListLinkProps,
  type NavListRootProps,
  type NavListSectionProps,
  type NavListSize,
  type NavListDensity,
  type NavListInset,
  type NavListIndent,
  type NavListSectionContentProps,
  type NavListTone,
  type NavListVariant,
} from "../../../src/nav-list.js";

const variant: NavListVariant = "ghost";
const tone: NavListTone = "accent";
const size: NavListSize = "md";
const density: NavListDensity = "compact";
const compactRoot: NavListRootProps = { density, children: null };
void compactRoot;
const inset: NavListInset = "none";
const indent: NavListIndent = "none";
const flush: NavListRootProps = { inset, children: null };
const flat: NavListSectionContentProps = { indent, children: null };
void flush; void flat;
// @ts-expect-error closed inset
const badInset: NavListInset = "sm";
// @ts-expect-error closed indent
const badIndent: NavListIndent = 2;
void badInset; void badIndent;
// @ts-expect-error unsupported density
const badDensity: NavListDensity = "dense";
void badDensity;
const root: NavListRootProps = { children: null, variant, tone, size };
const spacedRoot: NavListRootProps = { gap: "6" };
const spacedSection: NavListSectionProps = { gap: 0 };
const cssGap: NavListSectionProps = { gap: "1rem" };
// @ts-expect-error gap is scalar spacing, not a responsive object
const invalidGap: NavListRootProps = { gap: { lg: "6" } };
void spacedRoot; void spacedSection; void cssGap; void invalidGap;
const link: NavListLinkProps = { children: "Input", href: "/input", description: "Text entry" };
void NavList;
void root;
void link;

// @ts-expect-error unsupported recipe
const badVariant: NavListVariant = "danger";
// @ts-expect-error asChild delegates anatomy
const badChild: NavListLinkProps = { asChild: true, children: {} as JSX.Element, startIcon: "x" };
void badVariant;
void badChild;

const plainRoot: NavListRootProps = { variant: "plain", radius: "control" };
const countLink: NavListLinkProps = { children: "Inbox", trailingContent: "12 unread" };
// @ts-expect-error shared radius is a closed token contract
const invalidRadius: NavListRootProps = { radius: "17px" };
// @ts-expect-error composed child owns all content
const invalidTrailing: NavListLinkProps = { asChild: true, children: {} as JSX.Element, trailingContent: "12" };
void plainRoot; void countLink; void invalidRadius; void invalidTrailing;
