import { createElement, createRef } from "react";
import {
  ProgressCircle,
  type ProgressCircleCap,
  type ProgressCircleRootProps,
  type ProgressCircleSize,
  type ProgressCircleThickness,
  type ProgressCircleTone,
} from "../../../src/progress-circle.js";
import { ProgressCircle as RootProgressCircle } from "../../../src/index.js";

const ref = createRef<HTMLDivElement>();
const sizes: ProgressCircleSize[] = ["xs", "sm", "md", "lg", "xl"];
const thicknesses: ProgressCircleThickness[] = ["thin", "regular", "thick"];
const caps: ProgressCircleCap[] = ["round", "butt"];
const tones: ProgressCircleTone[] = ["neutral", "accent", "info", "success", "warning", "danger"];
const props: ProgressCircleRootProps = { value: 64, size: "lg", thickness: "thick", cap: "butt", tone: "success" };
createElement(ProgressCircle.Root, { ...props, ref }, createElement(ProgressCircle.Circle, null, createElement(ProgressCircle.Track), createElement(ProgressCircle.Indicator)));
createElement(RootProgressCircle.Root, { "aria-label": "Loading" });
// @ts-expect-error closed thickness
createElement(ProgressCircle.Root, { thickness: "extra" });
// @ts-expect-error circle geometry is component-owned
createElement(ProgressCircle.Track, { r: 30 });
// @ts-expect-error indicator progress geometry is component-owned
createElement(ProgressCircle.Indicator, { strokeDashoffset: 20 });
// @ts-expect-error Label owns its relationship id
createElement(ProgressCircle.Label, { id: "custom" });
void sizes; void thicknesses; void caps; void tones;

createElement(ProgressCircle.Root, { defaultValue: 20, size: { md: "xl" }, valueFormat: "value", ids: { label: "task" } });
createElement(ProgressCircle.Circle, { asChild: true }, createElement("svg"));
// @ts-expect-error no arbitrary responsive sizes
createElement(ProgressCircle.Root, { size: { md: "huge" } });
// @ts-expect-error no string task values
createElement(ProgressCircle.Root, { defaultValue: "20" });
