import { render, screen, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { Alert, type AlertStatus } from "../../../src/alert.js";

describe("Alert", () => {
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
});
