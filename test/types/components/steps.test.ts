import { createElement, createRef } from "react";
import { Steps, type StepsRootProps, type StepsSize, type StepsTone, type StepsVariant } from "../../../src/steps.js";
const props: StepsRootProps = { count: 3, step: 1, onStepChange: value => void value, size: "sm", linear: true, isStepValid: index => index > 0 };
createElement(Steps.Root, { ...props, ref: createRef<HTMLDivElement>() });
const sizes: StepsSize[] = ["xs", "sm", "md", "lg"];
const tones: StepsTone[] = ["neutral", "accent"];
const variants: StepsVariant[] = ["solid", "subtle"];
// @ts-expect-error count is required
createElement(Steps.Root, {});
// @ts-expect-error responsive orientation is not a scalar Steps API
createElement(Steps.Root, { count: 2, orientation: { md: "horizontal" } });
void sizes; void tones; void variants;
