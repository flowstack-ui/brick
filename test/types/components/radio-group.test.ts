import { createElement, createRef } from "react";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupRoot,
  type RadioGroupItemProps,
  type RadioGroupRootProps,
  type RadioGroupSize,
} from "../../../src/radio-group.js";
import { RadioGroup as RootRadioGroup } from "../../../src/index.js";

const rootRef = createRef<HTMLDivElement>();
const itemRef = createRef<HTMLButtonElement>();
const sizes: RadioGroupSize[] = ["sm", "md", "lg"];
const item: RadioGroupItemProps = { children: "Email", value: "email" };
const root: RadioGroupRootProps = { "aria-label": "Channel", children: createElement(RadioGroup.Item, item), defaultValue: "email", readOnly: true, size: "lg" };
createElement(RadioGroup.Root, { ...root, ref: rootRef });
createElement(RootRadioGroup.Root, root);
createElement(RadioGroupRoot, root);
createElement(RadioGroupItem, { ...item, ref: itemRef });
// @ts-expect-error Brick has a closed three-size scale
createElement(RadioGroup.Root, { ...root, size: "xl" });
// @ts-expect-error Item requires a visible label
createElement(RadioGroup.Item, { value: "email" });
// @ts-expect-error variant is intentionally excluded
createElement(RadioGroup.Root, { ...root, variant: "soft" });
void sizes;
