import { createElement, createRef } from "react";
import {
  RadioCard,
  RadioCardItem,
  RadioCardRoot,
  type RadioCardAlign,
  type RadioCardItemProps,
  type RadioCardJustify,
  type RadioCardRootProps,
  type RadioCardSize,
  type RadioCardVariant,
} from "../../../src/radio-card.js";
import { RadioCard as RootRadioCard } from "../../../src/index.js";

const rootRef = createRef<HTMLDivElement>();
const itemRef = createRef<HTMLButtonElement>();
const sizes: RadioCardSize[] = ["sm", "md", "lg"];
const variants: RadioCardVariant[] = ["outline", "surface", "subtle", "solid"];
const aligns: RadioCardAlign[] = ["start", "center", "end"];
const justifies: RadioCardJustify[] = ["start", "center", "end"];
const item: RadioCardItemProps = { value: "annual", children: createElement(RadioCard.Title, null, "Annual") };
const root: RadioCardRootProps = { "aria-label": "Billing", children: createElement(RadioCard.Item, item), defaultValue: "annual", size: "lg", variant: "surface" };
createElement(RadioCard.Root, { ...root, ref: rootRef });
createElement(RootRadioCard.Root, root);
createElement(RadioCardRoot, root);
createElement(RadioCardItem, { ...item, ref: itemRef });
// @ts-expect-error Radio Card has a closed three-size scale
createElement(RadioCard.Root, { ...root, size: "xl" });
// @ts-expect-error Radio Card has a closed variant set
createElement(RadioCard.Root, { ...root, variant: "ghost" });
// @ts-expect-error Item requires a value
createElement(RadioCard.Item, { children: "Annual" });
void [sizes, variants, aligns, justifies];
