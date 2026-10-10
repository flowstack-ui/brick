import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DatePicker, useDatePicker } from "../../../src/date-picker.js";
import { parseDate } from "../../../src/date-value.js";
import { LocaleProvider } from "../../../src/locale-provider.js";
const referenceDate = parseDate("2026-09-05");
describe("DatePicker", () => {
  it("inherits field tone independently of calendar presentation", () => {
    render(<DatePicker.PropsProvider tone="accent"><DatePicker.Root referenceDate={referenceDate} data-testid="accent" /><DatePicker.Root referenceDate={referenceDate} tone="neutral" data-testid="neutral" /></DatePicker.PropsProvider>);
    expect(screen.getByTestId("accent")).toHaveAttribute("data-tone", "accent");
    expect(screen.getByTestId("neutral")).toHaveAttribute("data-tone", "neutral");
    expect(screen.getByTestId("accent")).not.toHaveAttribute("tone");
  });
  it("styles native text entry and sparse variants without creating duplicate form controls", () => {
    const { container } = render(<DatePicker.Root referenceDate={referenceDate} entryMode="text" defaultValue={referenceDate} name="date" variant={{ initial: "subtle", md: "underline" }} data-testid="text-date"><DatePicker.Label>Date</DatePicker.Label><DatePicker.Control><DatePicker.TextInput /><DatePicker.IndicatorGroup><DatePicker.Trigger /></DatePicker.IndicatorGroup></DatePicker.Control><DatePicker.HiddenInput /></DatePicker.Root>);
    expect(screen.getByRole("textbox", { name: "Date" })).toHaveClass("brick-date-picker__text-input");
    expect(screen.getByTestId("text-date")).toHaveAttribute("data-variant", "subtle");
    expect(screen.getByTestId("text-date")).toHaveAttribute("data-variant-md", "underline");
    expect(container.querySelectorAll('input[name="date"]')).toHaveLength(1);
  });
  it("inherits LocaleProvider labels through the external store path", () => {
    function Fixture() {
      const picker = useDatePicker({ referenceDate, entryMode: "text", selectionMode: "range" });
      return <DatePicker.RootProvider value={picker}><DatePicker.TextInput /><DatePicker.TextInput index={1} /></DatePicker.RootProvider>;
    }
    render(<LocaleProvider locale="fr" localeText={{ startDate: "Début", endDate: "Fin" }}><Fixture /></LocaleProvider>);
    expect(screen.getByRole("textbox", { name: "Début" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Fin" })).toBeInTheDocument();
  });
  it("preserves custom trigger geometry instead of applying the icon-action recipe", () => {
    render(<DatePicker.Root referenceDate={referenceDate}><DatePicker.Trigger asChild aria-label="Project date"><button>Project date</button></DatePicker.Trigger></DatePicker.Root>);
    expect(screen.getByRole("button", { name: "Project date" })).not.toHaveClass("brick-date-input__action");
    expect(screen.getByRole("button", { name: "Project date" })).toHaveClass("brick-date-picker__trigger");
  });
  it("provides named default icon actions without another input border", () => {
    render(<LocaleProvider locale="fr" localeText={{ chooseDate: "Choisir", clearDate: "Effacer" }}><DatePicker.Root referenceDate={referenceDate}><DatePicker.Label>Date</DatePicker.Label><DatePicker.Control><DatePicker.Input /><DatePicker.ClearTrigger /><DatePicker.Trigger /></DatePicker.Control></DatePicker.Root></LocaleProvider>);
    expect(screen.getByRole("button", { name: "Choisir" })).toHaveAttribute("aria-haspopup", "dialog");
    expect(screen.getByRole("button", { name: "Effacer" })).toHaveAttribute("type", "button");
    expect(screen.getByRole("group", { name: "Date" })).toBeInTheDocument();
  });
  it("uses repeated canonical mirrors for multiple selection", () => {
    const { container } = render(<DatePicker.Root referenceDate={referenceDate} selectionMode="multiple" defaultValue={[referenceDate, referenceDate.add({ days: 1 })]} name="dates"><DatePicker.ValueText /><DatePicker.HiddenInput /></DatePicker.Root>);
    expect(Array.from(container.querySelectorAll<HTMLInputElement>('input[name="dates"]'), item => item.value)).toEqual(["2026-09-05", "2026-09-06"]);
  });
});
