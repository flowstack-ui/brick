import { createElement, createRef } from "react";
import { Stat, type StatRootProps, type StatIndicatorProps } from "../../../src/stat.js";
createElement(Stat.Root, { size: "lg", ref: createRef<HTMLElement>() });
createElement(Stat.DownIndicator, { tone: "success" });
// @ts-expect-error Closed visual sizes.
const size: StatRootProps = { size: "huge" };
// @ts-expect-error Formatting composes through FormatNumber.
const value: StatRootProps = { value: 120 };
// @ts-expect-error Semantic tones, not arbitrary colors.
const tone: StatIndicatorProps = { tone: "red" };
// @ts-expect-error Projection needs one element.
const host: StatRootProps = { asChild: true };
void [size, value, tone, host];
