import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stat, StatRoot } from "../../../src/stat.js";

describe("Stat", () => {
  it("renders valid native metric grammar and decorative directional indicators", () => {
    render(<Stat.Root data-testid="metric"><Stat.Label>Revenue</Stat.Label><Stat.ValueText>120<Stat.ValueUnit>USD</Stat.ValueUnit></Stat.ValueText>
      <Stat.HelpText><Stat.UpIndicator />Up 12 percent</Stat.HelpText></Stat.Root>);
    const root = screen.getByTestId("metric");
    expect(root.tagName).toBe("DL");
    expect(Array.from(root.children, child => child.tagName)).toEqual(["DT", "DD", "DD"]);
    expect(screen.getByText("USD").tagName).toBe("SPAN");
    expect(root.querySelector("[data-slot='stat-up-indicator']")).toHaveAttribute("aria-hidden", "true");
    expect(root).not.toHaveAttribute("role");
    expect(root).not.toHaveAttribute("aria-live");
  });
  it("preserves refs, projection, native attributes and explicit size overrides", () => {
    const ref = createRef<HTMLElement>();
    render(<Stat.Group size="lg"><StatRoot size="sm" ref={ref} className="custom" aria-label="Usage">
      <Stat.Label>Files</Stat.Label><Stat.ValueText>0</Stat.ValueText><Stat.HelpText asChild><dd>Available</dd></Stat.HelpText>
    </StatRoot></Stat.Group>);
    expect(ref.current).toHaveAttribute("data-size", "sm");
    expect(ref.current).not.toHaveAttribute("size");
    expect(ref.current).toHaveClass("brick-stat", "custom");
    expect(ref.current).toHaveAttribute("aria-label", "Usage");
    expect(screen.getByText("Available")).toHaveClass("brick-stat-help-text");
  });
  it("keeps direction independent of semantic tone and permits custom artwork", () => {
    render(<Stat.DownIndicator tone="success" data-testid="trend"><svg data-testid="custom" /></Stat.DownIndicator>);
    expect(screen.getByTestId("trend")).toHaveAttribute("data-tone", "success");
    expect(screen.getByTestId("trend")).not.toHaveAttribute("tone");
    expect(screen.getByTestId("custom")).toBeInTheDocument();
  });
  it("does not turn missing authored values into zero", () => {
    render(<Stat.Root><Stat.Label>Pending</Stat.Label><Stat.ValueText data-testid="value">{null}</Stat.ValueText></Stat.Root>);
    expect(screen.getByTestId("value")).toBeEmptyDOMElement();
  });
});
