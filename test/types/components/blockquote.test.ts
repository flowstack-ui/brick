import { Blockquote, type BlockquoteAlign, type BlockquoteContentProps, type BlockquoteRootProps, type BlockquoteVariant } from "../../../src/blockquote.js";
const variant: BlockquoteVariant = "surface";
const align: BlockquoteAlign = "center";
const rootProps: BlockquoteRootProps = { children: null, variant, align };
const contentProps: BlockquoteContentProps = { children: "Quote", cite: "https://example.com" };
void Blockquote; void rootProps; void contentProps;
// @ts-expect-error Root owns a closed visual recipe.
const invalidVariant: BlockquoteRootProps = { variant: "ghost" };
// @ts-expect-error Root remains a fixed native figure.
const invalidHost: BlockquoteRootProps = { as: "div" };
void invalidVariant; void invalidHost;
const solid: BlockquoteRootProps = { variant: "solid", tone: "success" };
// @ts-expect-error asChild requires one element, not plain text.
const invalidChild: BlockquoteRootProps = { asChild: true, children: "quote" };
// @ts-expect-error Named palettes do not bypass the semantic tone model.
const invalidTone: BlockquoteRootProps = { tone: "purple" };
void solid; void invalidChild; void invalidTone;
