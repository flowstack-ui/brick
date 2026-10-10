import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DateInput } from "../../../src/date-input.js";
import { parseDate } from "../../../src/date-value.js";
import { LocaleProvider } from "../../../src/locale-provider.js";
const referenceDate = parseDate("2026-09-05");
describe("DateInput", () => {
  it("defaults to neutral and inherits or overrides tone without native prop leakage", () => {
    render(<><DateInput.Root referenceDate={referenceDate} data-testid="neutral" /><DateInput.PropsProvider tone="accent"><DateInput.Root referenceDate={referenceDate} data-testid="accent" /><DateInput.Root referenceDate={referenceDate} tone="neutral" data-testid="override" /></DateInput.PropsProvider></>);
    expect(screen.getByTestId("neutral")).toHaveAttribute("data-tone", "neutral");
    expect(screen.getByTestId("accent")).toHaveAttribute("data-tone", "accent");
    expect(screen.getByTestId("override")).toHaveAttribute("data-tone", "neutral");
    expect(screen.getByTestId("accent")).not.toHaveAttribute("tone");
  });
  it("inherits recipe defaults without retaining conflicting radius choices", () => {
    render(<DateInput.PropsProvider size="sm" variant="soft" shape="pill"><DateInput.Root referenceDate={referenceDate} data-testid="inherited" /><DateInput.PropsProvider variant="underline"><DateInput.Root referenceDate={referenceDate} data-testid="underline" /></DateInput.PropsProvider></DateInput.PropsProvider>);
    expect(screen.getByTestId("inherited")).toHaveAttribute("data-size", "sm");
    expect(screen.getByTestId("inherited")).toHaveAttribute("data-shape", "pill");
    expect(screen.getByTestId("underline")).toHaveAttribute("data-variant", "underline");
    expect(screen.getByTestId("underline")).not.toHaveAttribute("data-shape", "pill");
  });
  it("keeps the field variants responsive and preserves composed clear-action styling", () => {
    render(<DateInput.Root referenceDate={referenceDate} variant={{ initial: "subtle", lg: "underline" }} data-testid="responsive-date"><DateInput.Control><DateInput.SegmentGroup aria-label="Date"><DateInput.Segments /></DateInput.SegmentGroup><DateInput.ClearTrigger asChild><button>Clear date</button></DateInput.ClearTrigger></DateInput.Control></DateInput.Root>);
    expect(screen.getByTestId("responsive-date")).toHaveAttribute("data-variant", "subtle");
    expect(screen.getByTestId("responsive-date")).toHaveAttribute("data-variant-lg", "underline");
    expect(screen.getByRole("button", { name: "Clear date" })).not.toHaveClass("brick-date-input__action");
  });
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
