import { Blockquote, type BlockquoteAlign, type BlockquoteContentProps, type BlockquoteRootProps, type BlockquoteVariant } from "../../../src/blockquote.js";
const variant: BlockquoteVariant = "surface";
const align: BlockquoteAlign = "center";
const rootProps: BlockquoteRootProps = { children: null, variant, align };
const contentProps: BlockquoteContentProps = { children: "Quote", cite: "https://example.com" };
void Blockquote; void rootProps; void contentProps;
// @ts-expect-error Root owns a closed visual recipe.
const invalidVariant: BlockquoteRootProps = { variant: "solid" };
// @ts-expect-error Root remains a fixed native figure.
const invalidHost: BlockquoteRootProps = { as: "div" };
void invalidVariant; void invalidHost;
