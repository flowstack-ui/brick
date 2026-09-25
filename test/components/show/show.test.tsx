import { createRef, useEffect, Fragment } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Show, type ShowBreakpoint, type ShowElement } from "../../../src/show.js";

describe("Show", () => {
  it("unmounts conditional children but leaves responsive children mounted", () => {
    let mounts=0, cleanups=0;
    function Child() { useEffect(() => { mounts++; return () => { cleanups++; }; }, []); return <span>Child</span>; }
    const { rerender, unmount } = render(<Show when={true}><Child /></Show>);
    rerender(<Show when={false}><Child /></Show>);
    expect(mounts).toBe(1); expect(cleanups).toBe(1);
    rerender(<Show from="sm"><Child /></Show>);
    rerender(<Show from="xl"><Child /></Show>);
    expect(mounts).toBe(2); expect(cleanups).toBe(1);
    unmount(); expect(cleanups).toBe(2);
  });

  it("projects valid table rows and rejects Fragment projection", () => {
    const { container } = render(<table><tbody><Show from="md" asChild><tr><td>Cell</td></tr></Show></tbody></table>);
    expect(container.querySelector("tbody")?.children[0]?.tagName).toBe("TR");
    expect(() => render(<Show from="md" asChild><Fragment><span /></Fragment></Show>)).toThrow(/non-Fragment/);
  });
  it("selects truthy values without a DOM host and preserves fallback nodes", () => {
    const { rerender, container } = render(<Show when={false} fallback={0}>yes</Show>);
    expect(container.textContent).toBe("0");
    for (const value of [false, null, undefined, 0, -0, NaN, "", 0n]) {
      rerender(<Show when={value} fallback="no">yes</Show>);
      expect(container.textContent).toBe("no");
    }
    let calls = 0;
    rerender(<Show when={{ name: "Ada" }}>{user => { calls++; return <span>{user.name}</span>; }}</Show>);
    expect(calls).toBe(1);
    expect(container.innerHTML).toBe("<span>Ada</span>");
    rerender(<Show when={undefined}>{() => { calls++; return "unexpected"; }}</Show>);
    expect(calls).toBe(1);
    expect(container.innerHTML).toBe("");
  });

  it("projects onto one host preserving child refs, metadata and classes", () => {
    const outer = createRef<HTMLElement>(); const child = createRef<HTMLButtonElement>();
    const { unmount } = render(<Show from="md" asChild ref={outer}><button ref={child} className="child" data-slot="button">Save</button></Show>);
    const button = screen.getByRole("button");
    expect(outer.current).toBe(button); expect(child.current).toBe(button);
    expect(button).toHaveClass("child", "brick-show");
    expect(button).toHaveAttribute("data-show-from", "md");
    expect(button).toHaveAttribute("data-slot", "button");
    unmount(); expect(outer.current).toBeNull(); expect(child.current).toBeNull();
  });
  it("renders one server-safe native root with required breakpoint metadata", () => {
    const ref = createRef<HTMLElement>();
    render(<Show data-testid="show" from="md" ref={ref}>Desktop tools</Show>);
    const root = screen.getByTestId("show");
    expect(root).toBe(ref.current);
    expect(root.tagName).toBe("DIV");
    expect(root).toHaveClass("brick-show");
    expect(root).toHaveAttribute("data-from", "md");
    expect(root).toHaveAttribute("data-slot", "show");
    expect(root).not.toHaveAttribute("role");
    expect(root).toHaveTextContent("Desktop tools");
  });

  it("exposes the closed breakpoints and semantic hosts", () => {
    const breakpoints: ShowBreakpoint[] = ["sm", "md", "lg", "xl"];
    const hosts: ShowElement[] = ["div", "span", "section", "article", "nav", "header", "footer", "main", "aside", "ul", "ol", "li"];
    const { rerender } = render(<Show data-testid="show" from="sm">Content</Show>);
    for (const from of breakpoints) {
      rerender(<Show data-testid="show" from={from}>Content</Show>);
      expect(screen.getByTestId("show")).toHaveAttribute("data-from", from);
    }
    for (const as of hosts) {
      rerender(<Show as={as} data-testid="show" from="sm">Content</Show>);
      expect(screen.getByTestId("show").tagName).toBe(as.toUpperCase());
    }
  });

  it("forwards native props, events, class, style, slot, children, and ref", () => {
    const ref = createRef<HTMLElement>(); let clicks = 0;
    render(<Show aria-label="Workspace tools" as="section" className="consumer-show" data-evidence="native" dir="rtl" from="lg" onClick={() => clicks++} ref={ref} slot="workspace-show" style={{ display: "grid" }}><span>Tools</span></Show>);
    const root = screen.getByLabelText("Workspace tools"); fireEvent.click(root);
    expect(clicks).toBe(1); expect(root).toBe(ref.current);
    expect(root).toHaveClass("brick-show", "consumer-show");
    expect(root).toHaveAttribute("data-slot", "workspace-show");
    expect(root).toHaveAttribute("data-evidence", "native");
    expect(root.style.display).toBe("grid");
    expect(root).not.toHaveAttribute("from");
  });
});
