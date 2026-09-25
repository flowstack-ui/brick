import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressCircle } from "../../../src/progress-circle.js";
import { useProgress } from "../../../src/progress.js";
import { fireEvent } from "@testing-library/react";

function Example({ value = 72 }: { value?: number | null }) {
  return (
    <ProgressCircle.Root value={value}>
      <ProgressCircle.Circle data-testid="circle">
        <ProgressCircle.Track data-testid="track" />
        <ProgressCircle.Indicator data-testid="indicator" />
      </ProgressCircle.Circle>
      <ProgressCircle.Value />
      <ProgressCircle.Label>Export report</ProgressCircle.Label>
    </ProgressCircle.Root>
  );
}

describe("ProgressCircle", () => {
  it("supports sparse responsive geometry and matching SVG host projection", () => {
    render(<ProgressCircle.Root aria-label="Export" size={{ md: "xl" }} value={0}><ProgressCircle.Circle asChild><svg><ProgressCircle.Track asChild><circle /></ProgressCircle.Track><ProgressCircle.Indicator asChild><circle /></ProgressCircle.Indicator></svg></ProgressCircle.Circle></ProgressCircle.Root>);
    const root = screen.getByRole("progressbar");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-size-md", "xl");
    expect(root.querySelectorAll("svg")).toHaveLength(1);
    expect(root.querySelectorAll("circle")).toHaveLength(2);
    expect(root.querySelector(".brick-progress-circle__indicator")).toHaveAttribute("data-percent", "0");
  });
  it("adapts the shared controller, explicit IDs and raw formatted values", () => {
    function Example() {
      const progress = useProgress({ defaultValue: 2, max: 5, ids: { label: "export-name" } });
      return <><ProgressCircle.RootProvider value={progress} valueFormat="value"><ProgressCircle.Circle><ProgressCircle.Track /><ProgressCircle.Indicator /></ProgressCircle.Circle><ProgressCircle.Label asChild><span>Export</span></ProgressCircle.Label><ProgressCircle.Value /><ProgressCircle.Context>{state => <span>{state.percent}% completed</span>}</ProgressCircle.Context></ProgressCircle.RootProvider><button onClick={() => progress.setValue(3)}>Advance</button></>;
    }
    render(<Example />);
    fireEvent.click(screen.getByText("Advance"));
    const root = screen.getByRole("progressbar", { name: "Export" });
    expect(root).toHaveAttribute("aria-labelledby", "export-name");
    expect(root.querySelector(".brick-progress-circle__value")).toHaveTextContent("3");
    expect(root).toHaveAttribute("aria-valuenow", "3");
    expect(screen.getByText("60% completed")).toBeVisible();
  });
  it("renders accessible defaults and deterministic SVG anatomy", () => {
    const { rerender } = render(<Example />);
    const root = screen.getByRole("progressbar", { name: "Export report" });
    expect(root).toHaveClass("brick-progress-circle");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-thickness", "regular");
    expect(root).toHaveAttribute("data-cap", "round");
    expect(root).toHaveAttribute("data-tone", "accent");
    expect(screen.getByTestId("circle")).toHaveAttribute("viewBox", "0 0 100 100");
    expect(screen.getByTestId("circle")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("indicator")).toHaveAttribute("data-percent", "72");
    expect(Number(screen.getByTestId("indicator").getAttribute("stroke-dashoffset"))).toBeCloseTo(79.17, 1);
    expect(root.querySelector(".brick-progress-circle__value")).toHaveTextContent("72%");

    rerender(<Example value={100} />);
    expect(screen.getByTestId("indicator")).toHaveAttribute("stroke-dashoffset", "0");
    expect(screen.getByRole("progressbar").querySelector(".brick-progress-circle__value")).toHaveTextContent("100%");
  });

  it("supports every visual recipe and indeterminate state without reversing for RTL", () => {
    const { rerender } = render(
      <div dir="rtl">
        <ProgressCircle.Root aria-label="Loading" cap="butt" size="xl" thickness="thick" tone="warning" value={null}>
          <ProgressCircle.Circle><ProgressCircle.Track /><ProgressCircle.Indicator data-testid="indicator" /></ProgressCircle.Circle>
        </ProgressCircle.Root>
      </div>,
    );
    const root = screen.getByRole("progressbar", { name: "Loading" });
    expect(root).not.toHaveAttribute("aria-valuenow");
    expect(root).toHaveAttribute("data-cap", "butt");
    expect(root).toHaveAttribute("data-size", "xl");
    expect(root).toHaveAttribute("data-thickness", "thick");
    expect(root).toHaveAttribute("data-tone", "warning");
    expect(screen.getByTestId("indicator")).toHaveAttribute("data-state", "indeterminate");

    for (const size of ["xs", "sm", "md", "lg", "xl"] as const) {
      rerender(<ProgressCircle.Root aria-label="Status" size={size}><ProgressCircle.Circle><ProgressCircle.Track /><ProgressCircle.Indicator /></ProgressCircle.Circle></ProgressCircle.Root>);
      expect(screen.getByRole("progressbar")).toHaveAttribute("data-size", size);
    }
  });

  it("formats custom ranges and custom value content", () => {
    render(
      <ProgressCircle.Root value={3} min={1} max={5}>
        <ProgressCircle.Circle><ProgressCircle.Track /><ProgressCircle.Indicator /></ProgressCircle.Circle>
        <ProgressCircle.Value>{({ value, max }) => `${value}/${max}`}</ProgressCircle.Value>
        <ProgressCircle.Label>Setup</ProgressCircle.Label>
      </ProgressCircle.Root>,
    );
    expect(screen.getByText("3/5")).toBeVisible();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "3");
  });

  it("suppresses normalized zero with a nonzero minimum and formats localized units", () => {
    const { rerender } = render(<ProgressCircle.Root aria-label="Tasks" min={5} max={10} value={5}><ProgressCircle.Circle><ProgressCircle.Indicator data-testid="range" /></ProgressCircle.Circle></ProgressCircle.Root>);
    expect(screen.getByTestId("range")).toHaveAttribute("data-percent", "0");
    rerender(<ProgressCircle.Root aria-label="Tasks" min={5} max={10} value={10} locale="ar-EG" valueFormat="value"><ProgressCircle.Circle><ProgressCircle.Indicator data-testid="range" /></ProgressCircle.Circle><ProgressCircle.Value /></ProgressCircle.Root>);
    expect(screen.getByTestId("range")).toHaveAttribute("data-percent", "100");
    expect(screen.getByText(new Intl.NumberFormat("ar-EG").format(10))).toBeVisible();
  });

  it("forwards native props, class, style, slots, and refs on every part", () => {
    const rootRef = createRef<HTMLDivElement>();
    const circleRef = createRef<SVGSVGElement>();
    const trackRef = createRef<SVGCircleElement>();
    const indicatorRef = createRef<SVGCircleElement>();
    const labelRef = createRef<HTMLSpanElement>();
    const valueRef = createRef<HTMLSpanElement>();
    render(
      <ProgressCircle.Root ref={rootRef} className="consumer-root" style={{ margin: 2 }} value={50}>
        <ProgressCircle.Circle ref={circleRef} className="consumer-circle">
          <ProgressCircle.Track ref={trackRef} />
          <ProgressCircle.Indicator ref={indicatorRef} data-slot="custom-indicator" />
        </ProgressCircle.Circle>
        <ProgressCircle.Value ref={valueRef} />
        <ProgressCircle.Label ref={labelRef}>Sync</ProgressCircle.Label>
      </ProgressCircle.Root>,
    );
    expect(rootRef.current).toHaveClass("brick-progress-circle", "consumer-root");
    expect(circleRef.current).toHaveClass("brick-progress-circle__circle", "consumer-circle");
    expect(trackRef.current).toHaveAttribute("r", "45");
    expect(indicatorRef.current).toHaveAttribute("data-slot", "custom-indicator");
    expect(labelRef.current).toHaveTextContent("Sync");
    expect(valueRef.current).toHaveTextContent("50%");
  });
});
