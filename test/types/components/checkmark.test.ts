import { createElement, createRef } from "react";
import { Checkmark, type CheckmarkProps, type CheckmarkSize, type CheckmarkTone, type CheckmarkVariant } from "../../../src/checkmark.js";

const props: CheckmarkProps = { checked: true, disabled: false, size: "md", tone: "success", variant: "outline" };
createElement(Checkmark, { ...props, ref: createRef<SVGSVGElement>() });
const sizes: CheckmarkSize[] = ["xs", "sm", "md", "lg"];
const tones: CheckmarkTone[] = ["neutral", "accent", "info", "success", "warning", "danger"];
const variants: CheckmarkVariant[] = ["solid", "outline", "soft", "plain"];
// @ts-expect-error Checkmark is visual and does not accept interaction children.
createElement(Checkmark, { children: "Checked" });
void sizes; void tones; void variants;
