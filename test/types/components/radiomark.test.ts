import { createElement, createRef } from "react";
import { Radiomark, type RadiomarkProps, type RadiomarkSize, type RadiomarkTone, type RadiomarkVariant } from "../../../src/radiomark.js";

const props: RadiomarkProps = { checked: true, disabled: false, size: "md", tone: "accent", variant: "solid" };
createElement(Radiomark, { ...props, ref: createRef<HTMLSpanElement>() });
const sizes: RadiomarkSize[] = ["xs", "sm", "md", "lg"];
const tones: RadiomarkTone[] = ["neutral", "accent", "info", "success", "warning", "danger"];
const variants: RadiomarkVariant[] = ["solid", "outline", "soft"];
// @ts-expect-error Radiomark is visual and does not accept interaction children.
createElement(Radiomark, { children: "Selected" });
void sizes; void tones; void variants;
