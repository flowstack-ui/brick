import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Em } from "../../../src/em.js";

describe("Em", () => {
  it("projects onto one authored em and merges refs and hooks", () => {
    const outer = createRef<HTMLElement>();
    const inner = createRef<HTMLElement>();
    const { unmount } = render(<Em asChild ref={outer} className="outer" slot="legacy" data-slot="explicit"><em ref={inner} className="inner">first</em></Em>);
    const host = screen.getByText("first");
    expect(host.tagName).toBe("EM");
    expect(host.querySelector("em")).toBeNull();
    expect(host).toHaveClass("brick-em", "outer", "inner");
    expect(host).toHaveAttribute("data-slot", "explicit");
    expect(host).not.toHaveAttribute("slot");
    expect(outer.current).toBe(host);
    expect(inner.current).toBe(host);
    unmount();
    expect(outer.current).toBeNull();
    expect(inner.current).toBeNull();
  });
  it("renders the native semantic host and adopted defaults", () => {
    const ref = createRef<HTMLElement>();
    render(<p>Ship <Em ref={ref}>carefully</Em>.</p>);
    const emphasis = screen.getByText("carefully");
    expect(emphasis.tagName).toBe("EM");
    expect(emphasis).toBe(ref.current);
    expect(emphasis).toHaveClass("brick-em");
    expect(emphasis).toHaveAttribute("data-slot", "em");
    expect(emphasis).not.toHaveAttribute("role");
  });

  it("forwards native attributes, events, hooks, style, children, and ref", () => {
    const ref = createRef<HTMLElement>();
    let clicks = 0;
    render(
      <Em
        aria-label="Important cadence"
        className="consumer-em"
        data-owner="docs"
        lang="en"
        onClick={() => clicks++}
        ref={ref}
        slot="stress"
        style={{ color: "red" }}
      >
        <span>especially</span>
      </Em>,
    );
    const emphasis = screen.getByLabelText("Important cadence");
    fireEvent.click(emphasis);
    expect(clicks).toBe(1);
    expect(emphasis).toBe(ref.current);
    expect(emphasis).toHaveClass("brick-em", "consumer-em");
    expect(emphasis).toHaveAttribute("data-slot", "stress");
    expect(emphasis).toHaveAttribute("data-owner", "docs");
    expect(emphasis).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(emphasis.querySelector("span")).toHaveTextContent("especially");
  });
});
