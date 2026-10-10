import { createElement, createRef } from "react";
import { Spinner, type SpinnerProps } from "../../../src/spinner.js";
createElement(Spinner, { ref: createRef<HTMLSpanElement>(), size: "inherit", thickness: "thin" });
const named: SpinnerProps = { label: "Loading", emphasis: "solid", tone: "accent" };
void named;
// @ts-expect-error A graphic has one naming source.
const duplicate: SpinnerProps = { label: "Loading", "aria-labelledby": "label" };
// @ts-expect-error Spinner is not a progress value owner.
const progress: SpinnerProps = { value: 50 };
// @ts-expect-error Spinner has no projected content.
const children: SpinnerProps = { children: "Loading" };
// @ts-expect-error Loading state belongs to the application.
const loading: SpinnerProps = { loading: true };
void [duplicate, progress, children, loading];
createElement(Spinner, { size: { md: "lg", xl: "inherit" } });
createElement(Spinner, { asChild: true, ref: createRef<SVGSVGElement>(), children: createElement("svg") });
// @ts-expect-error Projected artwork must supply one element.
createElement(Spinner, { asChild: true });
// @ts-expect-error Spinner is not a tab stop.
createElement(Spinner, { tabIndex: 0 });
