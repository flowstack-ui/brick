import {
  Tree,
  type TreeRootProps,
  type TreeSize,
  type TreeVariant,
} from "../../../src/tree.js";

const size: TreeSize = "sm";
const variant: TreeVariant = "outline";
const props: TreeRootProps = {
  "aria-label": "Repository",
  children: null,
  defaultValue: "src",
  showGuide: true,
  size,
  variant,
};
void Tree;
void props;

// @ts-expect-error Tree variants are closed.
const badVariant: TreeVariant = "solid";
// @ts-expect-error Brick Tree is vertical-only and omits Atom orientation.
const badProps: TreeRootProps = { children: null, orientation: "horizontal" };
void badVariant;
void badProps;
