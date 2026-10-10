import { createElement, createRef } from "react";
import { NativeSelect, type NativeSelectRootProps, type NativeSelectFieldProps } from "../../../src/native-select.js";
createElement(NativeSelect.Root, { size: { lg: "xl" }, multiple: true, rows: 4 });
createElement(NativeSelect.Field, { ref: createRef<HTMLSelectElement>(), value: ["a"], name: "tags" });
// @ts-expect-error Underline has no shape.
const shape: NativeSelectRootProps = { variant: "underline", shape: "pill" };
// @ts-expect-error Native row count belongs on Root.rows, not visual size.
const rows: NativeSelectRootProps = { size: 4 };
// @ts-expect-error Native multiple belongs on Root to synchronize the indicator.
const multiple: NativeSelectFieldProps = { multiple: true };
// @ts-expect-error Native select has no readonly.
const readonly: NativeSelectFieldProps = { readOnly: true };
void [shape, rows, multiple, readonly];

const surfaceRecipe: Pick<import("react").ComponentProps<typeof NativeSelect.Root>, "variant"> = { variant: "surface" };
void surfaceRecipe;
