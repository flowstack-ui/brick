import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Float } from "../../../src/float.js";
describe("Float", () => {
  it("server-renders responsive layout and native hidden without client measurement", () => {
    const html = renderToString(<Float.Anchor><span>Target</span><Float.Root hidden offset={{ sm: 1 }} placement={{ lg: "bottom-center" }}>New</Float.Root></Float.Anchor>);
    expect(html).toContain('data-placement="top-end"');
    expect(html).toContain('data-placement-lg="bottom-center"');
    expect(html).toContain("--brick-float-offset-sm");
    expect(html).toContain('hidden=""');
  });
  it("renders independent passive hosts and defaults", () => {
    const ref = createRef<HTMLElement>();
    render(<Float.Anchor data-testid="anchor"><span>Target</span><Float.Root ref={ref} data-testid="float">New</Float.Root></Float.Anchor>);
    expect(screen.getByTestId("anchor")).toHaveClass("brick-float-anchor");
    const root = screen.getByTestId("float");
    expect(root).toBe(ref.current);
    expect(root).toHaveAttribute("data-placement", "top-end");
    expect(root).not.toHaveAttribute("role");
    expect(root).not.toHaveAttribute("aria-hidden");
  });
  it("forwards semantics, inline, styles and slots without leaking props", () => {
    render(<Float.Anchor as="section" inline slot="custom" aria-label="Profile" style={{ color: "red" }}><Float.Root placement={{ md: "bottom-start" }} offset={{ lg: 3 }} offsetInline={0} offsetBlock="-3" data-testid="float">Online</Float.Root></Float.Anchor>);
    const anchor = screen.getByRole("region", { name: "Profile" });
    expect(anchor).toHaveAttribute("data-inline", "true");
    expect(anchor).toHaveAttribute("data-slot", "custom");
    const root = screen.getByTestId("float");
    expect(root).toHaveAttribute("data-placement", "top-end");
    expect(root).toHaveAttribute("data-placement-md", "bottom-start");
    expect(root.style.getPropertyValue("--brick-float-offset-lg")).toBe("calc(var(--brick-space-1) * 3)");
    expect(root.style.getPropertyValue("--brick-float-inline-initial")).toBe("var(--brick-space-0)");
    expect(root.style.getPropertyValue("--brick-float-block-initial")).toBe("calc(var(--brick-space-3) * -1)");
    expect(root).not.toHaveAttribute("offset");
    expect(root).not.toHaveAttribute("offsetInline");
  });
  it("composes one child, both refs and event handlers", () => {
    const outer = createRef<HTMLElement>(); const inner = createRef<HTMLButtonElement>();
    const parentClick = vi.fn(); const childClick = vi.fn();
    render(<Float.Root asChild ref={outer} onClick={parentClick} className="outer"><button ref={inner} className="inner" onClick={childClick}>Edit</button></Float.Root>);
    const button = screen.getByRole("button");
    expect(button).toBe(outer.current); expect(button).toBe(inner.current);
    expect(button).toHaveClass("brick-float", "outer", "inner");
    fireEvent.click(button); expect(parentClick).toHaveBeenCalledOnce(); expect(childClick).toHaveBeenCalledOnce();
  });
  it("keeps anchor asChild on its actual host", () => {
    render(<Float.Anchor asChild inline><article aria-label="Card">Content</article></Float.Anchor>);
    expect(screen.getByRole("article")).toHaveClass("brick-float-anchor");
  });
  it("serializes signed factors and CSS offsets without browser measurement", () => {
    render(<Float.Root offset={-2} offsetInline="12%" offsetBlock="calc(1rem + 2px)" data-testid="float" />);
    const style = screen.getByTestId("float").style;
    expect(style.getPropertyValue("--brick-float-offset-initial")).toBe("calc(calc(var(--brick-space-1) * 2) * -1)");
    expect(style.getPropertyValue("--brick-float-inline-initial")).toBe("12%");
    expect(style.getPropertyValue("--brick-float-block-initial")).toBe("calc(1rem + 2px)");
  });
  it("falls back deterministically for invalid numeric and empty offsets", () => {
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Float.Root offset={NaN} offsetInline="" data-testid="float" />);
    expect(screen.getByTestId("float").style.getPropertyValue("--brick-float-offset-initial")).toBe("0px");
    expect(warning).toHaveBeenCalledTimes(2); warning.mockRestore();
  });
});
