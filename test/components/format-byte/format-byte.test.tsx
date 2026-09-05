import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormatByte, formatByte } from "../../../src/format-byte.js";
import { LocaleProvider } from "../../../src/locale-provider.js";

describe("FormatByte", () => {
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
