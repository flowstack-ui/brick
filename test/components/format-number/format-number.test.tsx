import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { FormatNumber, formatNumber } from "../../../src/format-number.js";
import { LocaleProvider } from "../../../src/locale-provider.js";

describe("FormatNumber", () => {
  it("inherits locale and accepts native span props and refs", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <LocaleProvider locale="de-DE">
        <FormatNumber className="price" formatOptions={{ minimumFractionDigits: 2 }} ref={ref} value={1450.45} />
      </LocaleProvider>,
    );
    expect(screen.getByText("1.450,45")).toHaveClass("price");
    expect(ref.current).toHaveAttribute("data-slot", "format-number");
  });

  it("supports the complete Intl option object through formatOptions", () => {
    expect(formatNumber(0.145, "en-US", { style: "percent", minimumFractionDigits: 2 })).toBe("14.50%");
    expect(formatNumber(1234.45, "en-US", { style: "currency", currency: "USD" })).toBe("$1,234.45");
  });
});
