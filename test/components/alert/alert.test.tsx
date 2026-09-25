import { render, screen, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { Alert, type AlertStatus } from "../../../src/alert.js";

describe("Alert", () => {
  it("serializes sparse visual recipes with stable defaults and filters new props", () => {
    const { container } = render(<Alert.Root size={{ md: "lg" }} variant={{ lg: "outline" }} inline={{ md: true, xl: false }} align={{ md: "center" }} radius="sm" accentStart><Alert.Content tone="primary">Notice</Alert.Content></Alert.Root>);
    const root = container.firstElementChild!;
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-size-md", "lg");
    expect(root).toHaveAttribute("data-variant", "soft");
    expect(root).not.toHaveAttribute("data-inline");
    expect(root).toHaveAttribute("data-inline-xl", "false");
    expect(root).toHaveAttribute("data-align", "start");
    expect(root).toHaveAttribute("data-accent-start", "");
    expect((root as HTMLElement).style.getPropertyValue("--brick-alert-radius")).toBe("var(--brick-radius-core-sm)");
    for (const name of ["size", "variant", "inline", "align", "radius", "accentStart"]) expect(root).not.toHaveAttribute(name);
    expect(root.firstElementChild).toHaveAttribute("data-tone", "primary");
    expect(root.firstElementChild).not.toHaveAttribute("tone");
  });
  it("composes Indicator without a second wrapper or default glyph", () => {
    const ref = createRef<HTMLSpanElement>(); const child = createRef<HTMLSpanElement>();
    const outer = vi.fn(); const inner = vi.fn();
    const { container } = render(<Alert.Indicator asChild ref={ref} onClick={outer}><span ref={child} onClick={inner}>Artwork</span></Alert.Indicator>);
    expect(ref.current).toBe(child.current);
    expect(container.querySelectorAll("span")).toHaveLength(1);
    expect(container.querySelector("svg")).toBeNull();
    fireEvent.click(ref.current!);
    expect(outer).toHaveBeenCalledOnce(); expect(inner).toHaveBeenCalledOnce();
  });
  it("has no implicit live role and renders the five public parts", () => {
    const root = createRef<HTMLElement>();
    const indicator = createRef<HTMLSpanElement>();
    render(<Alert.Root ref={root}><Alert.Indicator ref={indicator} /><Alert.Content><Alert.Title>Saved</Alert.Title><Alert.Description>Your changes are available.</Alert.Description></Alert.Content></Alert.Root>);
    expect(root.current).toHaveClass("brick-alert");
    expect(root.current).not.toHaveAttribute("role");
    expect(indicator.current?.tagName).toBe("SPAN");
    expect(indicator.current?.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(root.current).toHaveAttribute("data-status", "info");
  });
  it.each(["info", "warning", "success", "error", "neutral"] as AlertStatus[])("maps %s to a visual palette without announcement priority", status => {
    const { container } = render(<Alert.Root status={status}><Alert.Indicator /></Alert.Root>);
    expect(container.firstChild).toHaveAttribute("data-tone", status === "error" ? "danger" : status);
    expect(container.firstChild).not.toHaveAttribute("role");
  });
  it("keeps explicit tone separate from status and accepts native roles", () => {
    render(<Alert.Root status="success" tone="accent" role="status" variant="outline" size="lg" inline>Ready</Alert.Root>);
    const root = screen.getByRole("status");
    expect(root).toHaveAttribute("data-status", "success");
    expect(root).toHaveAttribute("data-tone", "accent");
    for (const name of ["status", "tone", "variant", "size", "inline"]) expect(root).not.toHaveAttribute(name);
  });
  it("composes one native host and preserves both refs and handlers", () => {
    const parent = createRef<HTMLElement>(); const child = createRef<HTMLElement>();
    const outer = vi.fn(); const inner = vi.fn();
    render(<Alert.Root asChild ref={parent} onClick={outer} className="outer"><section ref={child} onClick={inner} className="inner">Saved</section></Alert.Root>);
    fireEvent.click(screen.getByText("Saved"));
    expect(parent.current).toBe(child.current);
    expect(parent.current?.tagName).toBe("SECTION");
    expect(parent.current).toHaveClass("outer", "inner", "brick-alert");
    expect(outer).toHaveBeenCalledOnce(); expect(inner).toHaveBeenCalledOnce();
  });
  it("allows a custom indicator or no indicator and stable SSR", () => {
    const markup = renderToString(<Alert.Root><Alert.Indicator><span>!</span></Alert.Indicator><Alert.Title>Notice</Alert.Title></Alert.Root>);
    expect(markup).not.toContain("<svg");
    expect(renderToString(<Alert.Root>Notice</Alert.Root>)).not.toContain("brick-alert-indicator");
  });
  it("renders every status and variant pair without changing semantic priority", () => {
    for (const status of ["info", "warning", "success", "error", "neutral"] as const) {
      for (const variant of ["soft", "surface", "outline", "solid"] as const) {
        const html = renderToString(<Alert.Root status={status} variant={variant}><Alert.Indicator /><Alert.Title>Notice</Alert.Title></Alert.Root>);
        expect(html).toContain(`data-status="${status}"`);
        expect(html).toContain(`data-variant="${variant}"`);
        expect(html).not.toContain('role="alert"');
        expect(html).toContain('aria-hidden="true"');
      }
    }
  });
});
