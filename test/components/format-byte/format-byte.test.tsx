import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormatByte, formatByte } from "../../../src/format-byte.js";
import { LocaleProvider } from "../../../src/locale-provider.js";

describe("FormatByte", () => {
  it("validates precision and preserves localized zero and negative units", () => {
    for (const precision of [0, -1, 1.5, 101, NaN, Infinity]) expect(() => formatByte(0, "en-US", { precision })).toThrow(RangeError);
    expect(formatByte(0, "ar-EG", { unit: "bit", unitDisplay: "long" })).toBe(new Intl.NumberFormat("ar-EG", { style: "unit", unit: "bit", unitDisplay: "long" }).format(0));
    expect(formatByte(-1450)).toBe("-1.45 kB");
    expect(formatByte(0.0000123, "en-US", { precision: 3, formatOptions: { maximumSignificantDigits: 3 } })).toContain("0.0000123");
  });
  it("formats decimal and binary byte values", () => {
    expect(formatByte(1450, "en-US")).toBe("1.45 kB");
    expect(formatByte(1024, "en-US", { unitSystem: "binary" })).toBe("1 kB");
    expect(formatByte(0, "en-US")).toBe("0 byte");
    expect(formatByte(Number.NaN, "en-US")).toBe("");
  });

  it("inherits locale and supports bits", () => {
    render(<LocaleProvider locale="de-DE"><FormatByte unit="bit" value={1450} /></LocaleProvider>);
    expect(screen.getByText("1,45 kb")).toHaveAttribute("data-slot", "format-byte");
  });
});
