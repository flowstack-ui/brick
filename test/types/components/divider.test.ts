import { createElement, createRef } from "react";
import { Divider, type DividerElement, type DividerInset, type DividerLabelAlign, type DividerOrientation, type DividerProps, type DividerThickness, type DividerVariant } from "../../../src/divider.js";
import { Divider as RootDivider } from "../../../src/index.js";

const ref = createRef<DividerElement>();
const orientations: DividerOrientation[] = ["horizontal", "vertical"];
const variants: DividerVariant[] = ["solid", "dashed", "dotted"];
const thicknesses: DividerThickness[] = ["subtle", "regular", "strong"];
const insets: DividerInset[] = ["none", "start", "both"];
const alignments: DividerLabelAlign[] = ["start", "center", "end"];
const props: DividerProps = { decorative: false, inset: "both", orientation: "vertical", stretch: true, thickness: "regular", variant: "dashed" };
createElement(Divider, { ...props, ref });
createElement(RootDivider, null);
createElement(Divider, { children: "or continue with", labelAlign: "start" });
createElement(Divider, { asChild: true, children: createElement("div") });
// @ts-expect-error closed variant
createElement(Divider, { variant: "double" });
// @ts-expect-error closed thickness
createElement(Divider, { thickness: "xl" });
// @ts-expect-error physical inset is excluded
createElement(Divider, { inset: "left" });
// @ts-expect-error vertical labels are excluded
createElement(Divider, { children: "Label", orientation: "vertical" });
// @ts-expect-error asChild does not create labeled anatomy
createElement(Divider, { asChild: true, children: createElement("div"), labelAlign: "center" });
void orientations; void variants; void thicknesses; void insets; void alignments;
