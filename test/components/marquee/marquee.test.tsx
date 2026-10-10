import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Marquee, useMarquee } from "../../../src/marquee.js";

describe("Marquee", () => {
  it("inherits defined presentation defaults, replaces maps and respects explicit unstyled overrides", () => {
    render(<Marquee.PropsProvider value={{ unstyled: true, spacing: { initial: 2, lg: 8 } }}>
      <Marquee.Root data-testid="raw"><Marquee.Viewport data-testid="viewport"><Marquee.Content><Marquee.Item>Raw item</Marquee.Item></Marquee.Content></Marquee.Viewport><Marquee.Edge data-testid="edge" /></Marquee.Root>
      <Marquee.RootPropsProvider value={{ spacing: { md: 6 }, unstyled: undefined }}><Marquee.Root unstyled={false} data-testid="styled" /></Marquee.RootPropsProvider>
    </Marquee.PropsProvider>);
    expect(screen.getByTestId("raw")).not.toHaveClass("brick-marquee");
    expect(screen.getByTestId("viewport")).not.toHaveClass("brick-marquee-viewport");
    expect(screen.getByTestId("edge")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("edge")).not.toHaveClass("brick-marquee-edge");
    expect(screen.getByTestId("styled")).toHaveClass("brick-marquee");
    expect(screen.getByTestId("styled").style.getPropertyValue("--brick-marquee-gap-md-input")).toContain("6");
    expect(screen.getByTestId("styled").style.getPropertyValue("--brick-marquee-gap-lg-input")).toBe("");
    expect(screen.getByTestId("raw")).not.toHaveAttribute("unstyled");
  });
  it("preserves Edge projected ref cleanup on replacement and unmount", () => {
    const cleanup = vi.fn();
    const childRef = vi.fn((node: HTMLElement | null) => node ? cleanup : undefined);
    const ref = createRef<HTMLElement>();
    const { rerender, unmount } = render(<Marquee.Edge asChild ref={ref}><i ref={childRef} /></Marquee.Edge>);
    expect(ref.current?.tagName).toBe("I");
    rerender(<Marquee.Edge asChild ref={ref}><span ref={childRef} /></Marquee.Edge>);
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(ref.current?.tagName).toBe("SPAN");
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(2);
    expect(childRef).not.toHaveBeenCalledWith(null);
    expect(ref.current).toBeNull();
  });
  it("forwards native attributes and refs while supplying Brick spacing", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Marquee.Root ref={ref} aria-label="Partners" className="custom"><Marquee.Viewport><Marquee.Content><Marquee.Item>One</Marquee.Item></Marquee.Content></Marquee.Viewport></Marquee.Root>);
    expect(ref.current).toHaveClass("brick-marquee", "custom");
    expect(ref.current?.style.getPropertyValue("--atom-marquee-spacing")).toBe("calc(var(--brick-space-1) * 4)");
    expect(screen.getByText("One")).toHaveClass("brick-marquee-item");
    expect(ref.current).toHaveAttribute("data-static");
  });
  it("preserves numeric and legacy token spacing semantics", () => {
    const { rerender } = render(<Marquee.Root spacing={5} data-testid="root" />);
    expect(screen.getByTestId("root").style.getPropertyValue("--atom-marquee-spacing")).toBe("calc(var(--brick-space-1) * 5)");
    rerender(<Marquee.Root spacing="5" data-testid="root" />);
    expect(screen.getByTestId("root").style.getPropertyValue("--atom-marquee-spacing")).toBe("var(--brick-space-5)");
  });
  it("provides store context and decorative logical edge projection", () => {
    function Example() { const value = useMarquee({ defaultPaused: true, spacing: 2 }); return <Marquee.RootProvider value={value}><Marquee.Context>{state => <span>{state.requestedPaused ? "Requested pause" : "Running"}</span>}</Marquee.Context><Marquee.Edge side="end" asChild><i data-testid="edge" /></Marquee.Edge></Marquee.RootProvider>; }
    render(<Example />);
    expect(screen.getByText("Requested pause")).toBeInTheDocument();
    expect(screen.getByTestId("edge")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("edge")).toHaveAttribute("data-side", "end");
    expect(screen.getByTestId("edge")).toHaveClass("brick-marquee-edge");
  });
});
