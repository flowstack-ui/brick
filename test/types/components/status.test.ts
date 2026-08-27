import { createElement, createRef } from "react";
import { Status, type StatusRootProps, type StatusSize, type StatusTone } from "../../../src/status.js";
import { Status as RootStatus } from "../../../src/index.js";

const sizes: StatusSize[] = ["sm", "md", "lg"];
const tones: StatusTone[] = ["neutral", "accent", "info", "success", "warning", "danger"];
const props: StatusRootProps = { size: "sm", tone: "success" };
createElement(Status.Root, { ...props, ref: createRef<HTMLSpanElement>() }, createElement(Status.Indicator), createElement(Status.Label, null, "Available"));
createElement(RootStatus.Root, null);
// @ts-expect-error closed size
createElement(Status.Root, { size: "xl" });
// @ts-expect-error closed tone
createElement(Status.Root, { tone: "positive" });
void sizes; void tones;
