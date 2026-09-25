import { createRef } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { VisuallyHidden } from "../../../src/visually-hidden.js";

describe("VisuallyHidden", () => {
  it("protects hiding through inline and composed host styles", () => {
    const style = { position: "static", width: 100, height: 100, clipPath: "none", overflow: "visible" } as const;
    const { rerender } = render(<VisuallyHidden.Root style={style}>Protected</VisuallyHidden.Root>);
    const check = () => expect(screen.getByText("Protected")).toHaveStyle({ position: "absolute", width: "1px", height: "1px", clipPath: "inset(50%)", overflow: "hidden" });
    check();
    rerender(<VisuallyHidden.Root asChild><span style={style}>Protected</span></VisuallyHidden.Root>);
    check();
    rerender(<VisuallyHidden.Root render={<span style={style} />}>Protected</VisuallyHidden.Root>);
    check();
  });
  it("merges composed refs and events", () => {
    const owner = createRef<HTMLSpanElement>(), child = createRef<HTMLSpanElement>();
    const calls: string[] = [];
    render(<VisuallyHidden.Root asChild ref={owner} onClick={() => calls.push("owner")}><span ref={child} onClick={() => calls.push("child")}>Merged</span></VisuallyHidden.Root>);
    expect(owner.current).toBe(child.current);
    fireEvent.click(screen.getByText("Merged"));
    expect(calls.sort()).toEqual(["child", "owner"]);
  });
  it("renders hiding without CSS and hydrates cleanly", async () => {
    const element = <button><VisuallyHidden.Root>Search</VisuallyHidden.Root></button>;
    const host = document.createElement("div");
    host.innerHTML = renderToString(element);
    document.body.append(host);
    expect(host.querySelector("span")).toHaveStyle({ position: "absolute", width: "1px", height: "1px" });
    const errors: unknown[] = [];
    let root: ReturnType<typeof hydrateRoot>;
    await act(async () => { root = hydrateRoot(host, element, {onRecoverableError: e => errors.push(e)}); });
    expect(errors).toEqual([]);
    expect(host.querySelector("button")).toHaveAccessibleName("Search");
    await act(async () => root!.unmount());
    host.remove();
  });
  it("delegates authoritative hiding behavior while adding Brick identity", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<VisuallyHidden.Root className="consumer-class" data-owner="test" ref={ref}>Search</VisuallyHidden.Root>);
    const root = screen.getByText("Search");
    expect(ref.current).toBe(root);
    expect(root).toHaveClass("brick-visually-hidden", "consumer-class");
    expect(root).toHaveAttribute("data-slot", "visually-hidden");
    expect(root).toHaveAttribute("data-owner", "test");
    expect(root).toHaveStyle({ position: "absolute", width: "1px", height: "1px", overflow: "hidden" });
  });

  it("preserves render, asChild, authored slots, and consumer styles", () => {
    const { rerender } = render(
      <VisuallyHidden.Root data-slot="custom-hidden" render={<strong data-owner="render" />} style={{ color: "red" }}>Details</VisuallyHidden.Root>,
    );
    const rendered = screen.getByText("Details");
    expect(rendered.tagName).toBe("STRONG");
    expect(rendered).toHaveAttribute("data-slot", "custom-hidden");
    expect(rendered).toHaveStyle({ color: "rgb(255, 0, 0)", position: "absolute" });

    rerender(<VisuallyHidden.Root asChild><em data-owner="child">Context</em></VisuallyHidden.Root>);
    const child = screen.getByText("Context");
    expect(child.tagName).toBe("EM");
    expect(child).toHaveClass("brick-visually-hidden");
    expect(child).toHaveStyle({ clipPath: "inset(50%)" });
  });
});
