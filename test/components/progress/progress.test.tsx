import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress, useProgress } from "../../../src/progress.js";
import { fireEvent } from "@testing-library/react";

function Example({ value = 40, ...props }: { value?: number | null; bufferValue?: number; orientation?: "horizontal" | "vertical" }) {
  return (
    <Progress.Root value={value} {...props}>
      <Progress.Label>Upload files</Progress.Label>
      <Progress.Value />
      <Progress.Track>
        <Progress.Buffer />
        <Progress.Indicator />
      </Progress.Track>
    </Progress.Root>
  );
}

describe("Progress", () => {
  it("exposes responsive recipes, inline layout and animated stripes", () => {
    render(<Progress.Root aria-label="Upload" size={{ md: "lg" }} variant={{ initial: "outline", lg: "subtle" }} layout="inline" animated><Progress.Track><Progress.Indicator /></Progress.Track></Progress.Root>);
    const root = screen.getByRole("progressbar");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-size-md", "lg");
    expect(root).toHaveAttribute("data-variant-lg", "subtle");
    expect(root).toHaveAttribute("data-layout", "inline");
    expect(root).toHaveAttribute("data-striped", "");
    expect(root).toHaveAttribute("data-animated", "");
  });
  it("projects parts and formats raw values without extra announcements", () => {
    render(<Progress.Root defaultValue={3} max={5} valueFormat="value" ids={{ label: "task-label" }}><Progress.Label asChild><span>Upload</span></Progress.Label><Progress.Value asChild>{({ formattedValue }) => <span>{formattedValue}</span>}</Progress.Value><Progress.Track asChild><div><Progress.Indicator /></div></Progress.Track></Progress.Root>);
    const root = screen.getByRole("progressbar", { name: "Upload" });
    expect(root).toHaveAttribute("aria-labelledby", "task-label");
    expect(root.querySelector(".brick-progress__value")).toHaveTextContent("3");
    expect(root.querySelector(".brick-progress__value")).toHaveAttribute("aria-hidden", "true");
    expect(root.querySelectorAll("[aria-live]")).toHaveLength(0);
    expect(root.children).toHaveLength(3);
  });
  it("shares the external controller and exposes Context", () => {
    function Controlled() {
      const progress = useProgress({ defaultValue: 20 });
      return <><Progress.RootProvider value={progress} aria-label="Upload"><Progress.Track><Progress.Indicator /></Progress.Track><Progress.Context>{state => <span>{state.percent}</span>}</Progress.Context></Progress.RootProvider><button onClick={() => progress.setValue(50)}>Advance</button></>;
    }
    render(<Controlled />);
    fireEvent.click(screen.getByText("Advance"));
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "50");
    expect(screen.getByText("50")).toBeVisible();
  });
  it("renders the complete default linear anatomy and visible-label relationship", () => {
    render(<Example />);
    const root = screen.getByRole("progressbar", { name: "Upload files" });
    expect(root).toHaveClass("brick-progress");
    expect(root).toHaveAttribute("data-orientation", "horizontal");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-shape", "rounded");
    expect(root).toHaveAttribute("data-tone", "accent");
    expect(root).toHaveAttribute("aria-valuenow", "40");
    expect(root).not.toHaveAttribute("aria-orientation");
    expect(root).toHaveAttribute("data-orientation", "horizontal");
    expect(root.querySelector(".brick-progress__value")).toHaveTextContent("40%");
  });

  it("supports vertical orientation, every recipe, buffer clamping, and explicit naming", () => {
    const { rerender } = render(
      <Progress.Root
        aria-label="Transfer status"
        bufferValue={125}
        orientation="vertical"
        shape="pill"
        size="xl"
        tone="success"
        value={60}
      >
        <Progress.Track>
          <Progress.Buffer data-testid="buffer" />
          <Progress.Indicator data-testid="indicator" />
        </Progress.Track>
      </Progress.Root>,
    );
    const root = screen.getByRole("progressbar", { name: "Transfer status" });
    expect(root).toHaveAttribute("data-orientation", "vertical");
    expect(root).toHaveAttribute("data-shape", "pill");
    expect(root).toHaveAttribute("data-size", "xl");
    expect(root).toHaveAttribute("data-tone", "success");
    expect(screen.getByTestId("buffer").style.getPropertyValue("--brick-progress-buffer-percent")).toBe("100");
    expect(screen.getByTestId("indicator").style.getPropertyValue("--brick-progress-percent")).toBe("60");

    for (const size of ["xs", "sm", "md", "lg", "xl"] as const) {
      rerender(<Progress.Root aria-label="Status" size={size}><Progress.Track><Progress.Indicator /></Progress.Track></Progress.Root>);
      expect(screen.getByRole("progressbar")).toHaveAttribute("data-size", size);
    }
  });

  it("preserves indeterminate semantics and supports localized and custom visible values", () => {
    const { rerender } = render(<Example value={null} />);
    const root = screen.getByRole("progressbar", { name: "Upload files" });
    expect(root).not.toHaveAttribute("aria-valuenow");
    expect(root).toHaveAttribute("data-state", "indeterminate");
    expect(root.querySelector(".brick-progress__value")).toHaveTextContent("");

    rerender(
      <Progress.Root value={3} max={5} locale="en-US">
        <Progress.Label>Setup</Progress.Label>
        <Progress.Value>{({ value, max }) => `${value} of ${max}`}</Progress.Value>
        <Progress.Track><Progress.Indicator /></Progress.Track>
      </Progress.Root>,
    );
    expect(screen.getByText("3 of 5")).toBeVisible();
  });

  it("forwards native props, classes, styles, slots, and refs on every public part", () => {
    const rootRef = createRef<HTMLDivElement>();
    const labelRef = createRef<HTMLSpanElement>();
    const valueRef = createRef<HTMLSpanElement>();
    const trackRef = createRef<HTMLDivElement>();
    const bufferRef = createRef<HTMLDivElement>();
    const indicatorRef = createRef<HTMLDivElement>();
    render(
      <Progress.Root ref={rootRef} className="consumer-root" style={{ margin: 2 }} value={25} bufferValue={50}>
        <Progress.Label ref={labelRef} className="consumer-label">Build</Progress.Label>
        <Progress.Value ref={valueRef} data-slot="custom-value" />
        <Progress.Track ref={trackRef} title="Track">
          <Progress.Buffer ref={bufferRef} />
          <Progress.Indicator ref={indicatorRef} />
        </Progress.Track>
      </Progress.Root>,
    );
    expect(rootRef.current).toHaveClass("brick-progress", "consumer-root");
    expect(rootRef.current).toHaveStyle({ margin: "2px" });
    expect(labelRef.current).toHaveClass("brick-progress__label", "consumer-label");
    expect(valueRef.current).toHaveAttribute("data-slot", "custom-value");
    expect(trackRef.current).toHaveAttribute("title", "Track");
    expect(bufferRef.current).toHaveAttribute("data-present", "");
    expect(indicatorRef.current).toHaveAttribute("data-percent", "25");
  });
});
