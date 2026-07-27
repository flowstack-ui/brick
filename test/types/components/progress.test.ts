import { createElement, createRef } from "react";
import {
  Progress,
  type ProgressOrientation,
  type ProgressRootProps,
  type ProgressShape,
  type ProgressSize,
  type ProgressTone,
} from "../../../src/progress.js";
import { Progress as RootProgress } from "../../../src/index.js";

const ref = createRef<HTMLDivElement>();
const orientations: ProgressOrientation[] = ["horizontal", "vertical"];
const sizes: ProgressSize[] = ["xs", "sm", "md", "lg", "xl"];
const shapes: ProgressShape[] = ["square", "rounded", "pill"];
const tones: ProgressTone[] = ["neutral", "accent", "info", "success", "warning", "danger"];
const props: ProgressRootProps = { value: 40, bufferValue: 70, orientation: "vertical", size: "lg", shape: "pill", tone: "info" };
createElement(Progress.Root, { ...props, ref }, createElement(Progress.Track, null, createElement(Progress.Buffer), createElement(Progress.Indicator)));
createElement(RootProgress.Root, { "aria-label": "Loading" });
// @ts-expect-error closed size
createElement(Progress.Root, { size: "2xl" });
// @ts-expect-error closed orientation
createElement(Progress.Root, { orientation: "diagonal" });
// @ts-expect-error Label owns its relationship id
createElement(Progress.Label, { id: "custom" });
void orientations; void sizes; void shapes; void tones;
