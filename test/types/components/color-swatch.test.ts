import { createElement, createRef } from "react";
import { ColorSwatch, type ColorSwatchShape, type ColorSwatchSize } from "../../../src/color-swatch.js";
import { ColorSwatch as RootColorSwatch } from "../../../src/index.js";

const sizes: ColorSwatchSize[] = ["sm", "md", "lg"];
const shapes: ColorSwatchShape[] = ["sharp", "rounded", "circle"];
createElement(ColorSwatch.Root, { ref: createRef<HTMLSpanElement>(), shape: "circle", value: "#fff" });
createElement(ColorSwatch.Mix, { values: ["red", "blue"], label: "Team colors", shape: "sharp" });
createElement(RootColorSwatch.Root, { value: "var(--brand-color)" });
// @ts-expect-error Root requires a color value
createElement(ColorSwatch.Root, {});
// @ts-expect-error Mix requires at least two values
createElement(ColorSwatch.Mix, { values: ["red"] });
// @ts-expect-error closed size
createElement(ColorSwatch.Root, { size: "xl", value: "red" });
// @ts-expect-error closed shape
createElement(ColorSwatch.Root, { shape: "pill", value: "red" });
void sizes;
void shapes;
