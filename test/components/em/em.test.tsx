import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Em } from "../../../src/em.js";

describe("Em", () => {
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
