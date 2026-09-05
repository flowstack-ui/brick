import { createElement } from "react";
import { FormatByte, formatByte, type FormatByteOptions, type FormatByteProps } from "../../../src/format-byte.js";

const options: FormatByteOptions = { precision: 4, unit: "bit", unitDisplay: "long", unitSystem: "binary" };
const props: FormatByteProps = { ...options, value: 2048 };
createElement(FormatByte, props);
formatByte(2048, "en-US", options);
// @ts-expect-error Value is required.
createElement(FormatByte, { unit: "byte" });
// @ts-expect-error Unit systems are closed.
createElement(FormatByte, { value: 1, unitSystem: "metric" });
