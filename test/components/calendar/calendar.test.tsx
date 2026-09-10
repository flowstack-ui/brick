import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Calendar } from "../../../src/calendar.js";
import { parseDate } from "../../../src/date-value.js";
import { LocaleProvider } from "../../../src/locale-provider.js";
const referenceDate = parseDate("2026-09-05");
describe("Calendar", () => {
  it("allows an explicit size to override the compatible density shorthand", () => {
    render(<Calendar.Root referenceDate={referenceDate} density="compact" size="xl" data-testid="sized" />);
    expect(screen.getByTestId("sized")).toHaveAttribute("data-size", "xl");
    expect(screen.getByTestId("sized")).toHaveClass("brick-control-size");
  });
  it("renders the complete default anatomy and forwards root refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Calendar.Root ref={ref} referenceDate={referenceDate} data-testid="calendar" />);
    expect(ref.current).toBe(screen.getByTestId("calendar"));
    expect(ref.current).toHaveAttribute("data-density", "comfortable");
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Today. Choose Saturday, September 5, 2026" })).toHaveAttribute("data-today");
  });
  it("inherits locale and uses separate month grids", () => {
    render(<LocaleProvider locale="ar-EG"><Calendar.Root referenceDate={referenceDate} density="compact" numOfMonths={2} data-testid="calendar" /></LocaleProvider>);
    expect(screen.getByTestId("calendar")).toHaveAttribute("dir", "rtl");
    expect(screen.getAllByRole("grid")).toHaveLength(2);
    expect(screen.getAllByText("٥").length).toBeGreaterThan(0);
  });
});
