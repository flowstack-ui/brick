import { createElement, createRef } from "react";
import { FormatNumber, formatNumber, type FormatNumberProps } from "../../../src/format-number.js";

const ref = createRef<HTMLSpanElement>();
const props: FormatNumberProps = { value: 42, locale: "en-US", formatOptions: { style: "currency", currency: "USD" } };
createElement(FormatNumber, { ...props, ref });
formatNumber(42, "en-US", { notation: "compact" });
// @ts-expect-error Value is required.
createElement(FormatNumber, {});
// @ts-expect-error Intl options belong in formatOptions so native style remains available.
createElement(FormatNumber, { value: 42, currency: "USD" });
