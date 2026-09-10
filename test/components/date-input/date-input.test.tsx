import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DateInput } from "../../../src/date-input.js";
import { parseDate } from "../../../src/date-value.js";
import { LocaleProvider } from "../../../src/locale-provider.js";
const referenceDate = parseDate("2026-09-05");
describe("DateInput", () => {
  it("defaults to shared lg outline geometry and canonical form value", () => {
    const ref = createRef<HTMLDivElement>();
    render(<DateInput.Root ref={ref} referenceDate={referenceDate} defaultValue={referenceDate} name="date" aria-label="Date" />);
    expect(ref.current).toHaveAttribute("data-size", "lg");
    expect(ref.current).toHaveAttribute("data-variant", "outline");
    expect(ref.current?.querySelector('input[name="date"]')).toHaveValue("2026-09-05");
    expect(screen.getAllByRole("spinbutton")).toHaveLength(3);
  });
  it("resolves sparse sizing and locale endpoint names", () => {
    render(<LocaleProvider locale="fr" localeText={{ startDate: "Début", endDate: "Fin" }}><DateInput.Root referenceDate={referenceDate} size={{ lg: "xl" }} selectionMode="range" name="trip" defaultValue={{ start: referenceDate, end: referenceDate.add({ days: 1 }) }} data-testid="date" /></LocaleProvider>);
    expect(screen.getByTestId("date")).toHaveAttribute("data-size", "lg");
    expect(screen.getByRole("group", { name: "Début" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Fin" })).toBeInTheDocument();
    expect(screen.getByTestId("date").querySelector('input[name="trip[start]"]')).toHaveValue("2026-09-05");
    expect(screen.getByTestId("date").querySelector('input[name="trip[end]"]')).toHaveValue("2026-09-06");
  });
});
