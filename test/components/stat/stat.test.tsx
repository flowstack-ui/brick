import { createRef, version } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Stat, StatRoot } from "../../../src/stat.js";

describe("Stat", () => {
  it("serializes responsive sizes and retains omitted inheritance", () => {
    render(<Stat.Group size={{ initial: "sm", md: "lg" }} data-testid="group">
      <Stat.Root data-testid="inherited" />
      <Stat.Root size={{ lg: "sm" }} data-testid="sparse" />
    </Stat.Group>);
    expect(screen.getByTestId("group")).toHaveAttribute("role", "group");
    expect(screen.getByTestId("group")).toHaveAttribute("data-size-md", "lg");
    expect(screen.getByTestId("inherited")).not.toHaveAttribute("data-size");
    expect(screen.getByTestId("sparse")).toHaveAttribute("data-size", "md");
    expect(screen.getByTestId("sparse")).toHaveAttribute("data-size-lg", "sm");
  });
  it("permits native group role override", () => {
    render(<Stat.Group role="presentation" data-testid="group" />);
    expect(screen.getByTestId("group")).toHaveAttribute("role", "presentation");
  });
  it("delegates projection merge to Atom, retaining child and owner refs and events", () => {
    const childRef = createRef<HTMLElement>();
    const ownerRef = createRef<HTMLElement>();
    const calls: string[] = [];
    const view = render(<Stat.HelpText asChild ref={ownerRef} className="outer" style={{ color: "red" }} onClick={() => calls.push("owner")}>
      <dd ref={childRef} className="inner" style={{ background: "blue" }} onClick={() => calls.push("child")}>Comparison</dd>
    </Stat.HelpText>);
    expect(childRef.current).toBe(ownerRef.current);
    expect(ownerRef.current).toHaveClass("inner", "outer", "brick-stat-help-text");
    expect(ownerRef.current).toHaveStyle({ color: "rgb(255, 0, 0)", background: "blue" });
    fireEvent.click(ownerRef.current!);
    expect(calls).toEqual(["owner", "child"]);
    view.unmount();
    expect(ownerRef.current).toBeNull();
    expect(childRef.current).toBeNull();
  });
  it.skipIf(Number(version.split(".")[0]) < 19)("preserves cleanup refs through projection", () => {
    const cleanup = vi.fn();
    const ref = vi.fn(() => cleanup);
    const view = render(<Stat.Root asChild><dl ref={ref} /></Stat.Root>);
    view.unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenCalledTimes(1);
  });
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
