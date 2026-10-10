import { createRef, Fragment } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Frame } from "../../../src/frame.js";

describe("Frame", () => {
  it("rejects invalid numeric dimensions and Fragment hosts", () => {
    for (const value of [-1, NaN, Infinity]) {
      expect(() => render(<Frame inlineSize={value} />)).toThrow(RangeError);
    }
    expect(() => render(<Frame inlineSize={{} as never} />)).toThrow(TypeError);
    expect(() => render(<Frame asChild><Fragment><span /></Fragment></Frame>)).toThrow(/Fragment/);
  });

  it("preserves both callback ref cleanups", () => {
    const ownerCleanup = vi.fn();
    const childCleanup = vi.fn();
    const { unmount } = render(<Frame asChild ref={() => ownerCleanup}><div ref={() => childCleanup} /></Frame>);
    unmount();
    expect(ownerCleanup).toHaveBeenCalledTimes(1);
    expect(childCleanup).toHaveBeenCalledTimes(1);
  });
  it("renders a neutral one-root default", () => {
    const ref = createRef<HTMLElement>();
    render(<Frame data-testid="frame" ref={ref}>Content</Frame>);
    const frame = screen.getByTestId("frame");
    expect(frame).toBe(ref.current);
    expect(frame.tagName).toBe("DIV");
    expect(frame).toHaveClass("brick-frame");
    expect(frame).toHaveAttribute("data-frame");
    expect(frame).toHaveAttribute("data-slot", "frame");
    expect(frame).toHaveTextContent("Content");
    expect(frame).not.toHaveAttribute("role");
  });

  it("serializes all logical constraints and responsive values", () => {
    render(
      <Frame
        blockSize="50svh"
        data-testid="frame"
        inlineSize={{ initial: "100%", lg: "40rem" }}
        maxBlockSize={{ initial: 320, md: "24rem" }}
        maxInlineSize="72ch"
        minBlockSize={{ initial: "12rem", xl: "20rem" }}
        minInlineSize={0}
      />,
    );
    const style = screen.getByTestId("frame").style;
    expect(style.getPropertyValue("--brick-frame-inline-size")).toBe("100%");
    expect(style.getPropertyValue("--brick-frame-inline-size-lg")).toBe("40rem");
    expect(style.getPropertyValue("--brick-frame-min-inline-size")).toBe("0");
    expect(style.getPropertyValue("--brick-frame-max-inline-size")).toBe("72ch");
    expect(style.getPropertyValue("--brick-frame-block-size")).toBe("50svh");
    expect(style.getPropertyValue("--brick-frame-min-block-size-xl")).toBe("20rem");
    expect(style.getPropertyValue("--brick-frame-max-block-size")).toBe("320px");
    expect(style.getPropertyValue("--brick-frame-max-block-size-md")).toBe("24rem");
  });

  it("leaves the intrinsic baseline intact for sparse constraints", () => {
    render(<Frame data-testid="frame" maxInlineSize={{ lg: "40rem" }} />);
    const style = screen.getByTestId("frame").style;
    expect(style.getPropertyValue("--brick-frame-max-inline-size")).toBe("");
    expect(style.getPropertyValue("--brick-frame-max-inline-size-lg")).toBe(
      "40rem",
    );
  });

  it("enhances one child while preserving its props, style, and ref", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Frame asChild maxInlineSize="40rem" ref={ref} style={{ color: "red" }}>
        <article className="consumer" data-testid="frame" style={{ padding: "4px" }}>Copy</article>
      </Frame>,
    );
    const frame = screen.getByTestId("frame");
    expect(frame.tagName).toBe("ARTICLE");
    expect(frame).toBe(ref.current);
    expect(frame).toHaveClass("consumer", "brick-frame");
    expect(frame).toHaveAttribute("data-frame");
    expect(frame.style.padding).toBe("4px");
    expect(frame.style.color).toBe("red");
    expect(frame.style.getPropertyValue("--brick-frame-max-inline-size")).toBe("40rem");
  });

  it("does not leak constraint props to the native host", () => {
    render(<Frame data-testid="frame" inlineSize="20rem" minBlockSize="10rem" />);
    const frame = screen.getByTestId("frame");
    expect(frame).not.toHaveAttribute("inlineSize");
    expect(frame).not.toHaveAttribute("minBlockSize");
  });
});
