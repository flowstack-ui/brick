import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Calendar, useCalendar } from "../../../src/calendar.js";
import { parseDate } from "../../../src/date-value.js";
import { LocaleProvider } from "../../../src/locale-provider.js";
const referenceDate = parseDate("2026-09-05");
describe("Calendar", () => {
  it("composes single hosts while preserving trigger refs and handlers", async () => {
    const rootRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const onClick = vi.fn();
    render(<Calendar.Root referenceDate={referenceDate} asChild ref={rootRef}>
      <section data-testid="composed-root">
        <Calendar.NextTrigger asChild ref={triggerRef}><button onClick={onClick}>Next</button></Calendar.NextTrigger>
        <Calendar.RangeText />
        <Calendar.Grid />
      </section>
    </Calendar.Root>);
    expect(rootRef.current).toBe(screen.getByTestId("composed-root"));
    expect(rootRef.current?.tagName).toBe("SECTION");
    expect(rootRef.current?.querySelector("button button")).toBeNull();
    fireEvent.click(triggerRef.current!);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(await screen.findByText("October 2026")).toBeInTheDocument();
  });
  it("renders every visible month when using the external controller", () => {
    function Fixture() { const value = useCalendar({ referenceDate, numOfMonths: 2 }); return <Calendar.RootProvider value={value} />; }
    render(<Fixture />);
    expect(screen.getAllByRole("grid")).toHaveLength(2);
  });
  it("supports independent responsive geometry and selection tone", () => {
    render(<Calendar.Root referenceDate={referenceDate} size={{ initial: "sm", md: "lg" }} tone="contrast" data-testid="responsive-calendar" />);
    expect(screen.getByTestId("responsive-calendar")).toHaveAttribute("data-size", "sm");
    expect(screen.getByTestId("responsive-calendar")).toHaveAttribute("data-size-md", "lg");
    expect(screen.getByTestId("responsive-calendar")).toHaveAttribute("data-tone", "contrast");
  });
  it("keeps the styled provider locale-aware", () => {
    function Fixture() { const value = useCalendar({ referenceDate }); return <Calendar.RootProvider value={value} data-testid="provided-calendar" />; }
    render(<LocaleProvider locale="ar-EG"><Fixture /></LocaleProvider>);
    expect(screen.getByTestId("provided-calendar")).toHaveAttribute("dir", "rtl");
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });
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
