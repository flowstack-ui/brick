import { createElement, createRef } from "react";
import { Float, type FloatRootProps, type FloatAnchorProps } from "../../../src/float.js";
import { Float as PublicFloat } from "../../../src/index.js";
const props: FloatRootProps = { placement: { md: "middle-center" }, offset: { lg: -2 }, offsetInline: "10%" };
const anchor: FloatAnchorProps = { inline: true, as: "section" };
createElement(Float.Root, { ...props, ref: createRef<HTMLElement>() });
createElement(Float.Anchor, anchor);
createElement(PublicFloat.Root, { asChild: true, children: createElement("button") });
// @ts-expect-error Empty responsive values have no meaning.
const empty: FloatRootProps = { placement: {} };
// @ts-expect-error Logical placement is closed.
const physical: FloatRootProps = { placement: "top-right" };
// @ts-expect-error Float does not own paint.
const paint: FloatRootProps = { tone: "accent" };
// @ts-expect-error Physical offset aliases are not Brick API.
const x: FloatRootProps = { offsetX: 2 };
// @ts-expect-error as and asChild are mutually exclusive.
const invalid: FloatRootProps = { as: "span", asChild: true, children: createElement("span") };
void [empty, physical, paint, x, invalid];
