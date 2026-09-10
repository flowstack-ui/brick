import type {
  TableOfContentsRootProps,
  TableOfContentsLinkProps,
  TableOfContentsOptions,
} from "../../../src/table-of-contents.js";
const options: TableOfContentsOptions = {
  items: [{ id: "intro", depth: 2 }],
  navigation: "managed",
  history: "none",
};
const root: TableOfContentsRootProps = {
  ...options,
  size: "md",
  variant: "line",
  tone: "accent",
};
// @ts-expect-error TOC is not a button surface
const invalid: TableOfContentsRootProps = { ...options, variant: "solid" };
// @ts-expect-error delegated host must be an element
const invalidChild: TableOfContentsLinkProps = {
  asChild: true,
  children: "text",
};
void [root, invalid, invalidChild];
