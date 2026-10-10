import {
  Tree,
  type TreeRootProps,
  type TreeBorderTone,
  type TreeSize,
  type TreeVariant,
} from "../../../src/tree.js";

const size: TreeSize = "sm";
const variant: TreeVariant = "outline";
const borderTone: TreeBorderTone = "strong";
const props: TreeRootProps = {
  "aria-label": "Repository",
  children: null,
  defaultValue: "src",
  showGuide: true,
  size,
  variant,
  borderTone,
};
void Tree;
void props;

const responsive: TreeRootProps = { size: { initial: "xs", md: "md" }, density: { lg: "compact" }, tone: "neutral", selectionVariant: "solid", selectionMode: "none" };
void responsive;
void Tree.RootProvider;
void Tree.Trigger;
void Tree.Checkbox;

// @ts-expect-error Tree variants are closed.
const badVariant: TreeVariant = "solid";
// @ts-expect-error Brick Tree is vertical-only and omits Atom orientation.
const badProps: TreeRootProps = { children: null, orientation: "horizontal" };
void badVariant;
void badProps;
