import { createRef, Fragment } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Appearance,
  type AppearanceValue,
} from "../../../src/appearance.js";
import { AppBar } from "../../../src/app-bar.js";
import { Surface } from "../../../src/surface.js";

describe("Appearance", () => {
  it("preserves cleanup refs without reconnecting a stable child ref", () => {
    const calls: string[] = [];
    const ref = (node: HTMLElement | null) => {
      calls.push(node ? "attach" : "null");
      if (node) return () => { calls.push("cleanup"); };
    };
    const { rerender, unmount } = render(<Appearance value="dark"><section ref={ref} /></Appearance>);
    rerender(<Appearance value="light"><section ref={ref} /></Appearance>);
    expect(calls).toEqual(["attach"]);
    unmount();
    expect(calls).toEqual(["attach", "cleanup"]);
  });

  it("runs both composed ref cleanups", () => {
    const calls: string[] = [];
    const ref = (name: string) => (node: HTMLElement | null) => {
      if (node) return () => { calls.push(name); };
    };
    const { unmount } = render(<Appearance ref={ref("outer")} value="dark"><section ref={ref("child")} /></Appearance>);
    unmount();
    expect(calls).toEqual(["child", "outer"]);
  });

  it("inherit removes an authored child boundary", () => {
    render(<Appearance><section data-testid="inherited" data-brick-appearance="dark" /></Appearance>);
    expect(screen.getByTestId("inherited")).not.toHaveAttribute("data-brick-appearance");
  });
  it("decorates one existing Brick host without a wrapper", () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(
      <Appearance ref={ref} value="dark">
        <AppBar.Root aria-label="Primary" data-purpose="shell" />
      </Appearance>,
    );

    const appBar = screen.getByLabelText("Primary");
    expect(container.children).toHaveLength(1);
    expect(appBar).toBe(ref.current);
    expect(appBar).toHaveClass("brick-app-bar", "brick-appearance");
    expect(appBar).toHaveAttribute("data-brick-appearance", "dark");
    expect(appBar).toHaveAttribute("data-purpose", "shell");
    expect(appBar).toHaveAttribute("data-slot", "appbar");
  });

  it("supports light, dark, and inherited scopes", () => {
    const values: AppearanceValue[] = ["light", "dark", "inherit"];
    const { rerender } = render(
      <Appearance value="light">
        <Surface data-testid="scope" />
      </Appearance>,
    );

    for (const value of values) {
      rerender(
        <Appearance value={value}>
          <Surface data-testid="scope" />
        </Appearance>,
      );
      if (value === "inherit") {
        expect(screen.getByTestId("scope")).not.toHaveAttribute(
          "data-brick-appearance",
        );
      } else {
        expect(screen.getByTestId("scope")).toHaveAttribute(
          "data-brick-appearance",
          value,
        );
      }
    }
  });

  it("preserves child props, styles, handlers, slots, and refs", () => {
    const childRef = createRef<HTMLDivElement>();
    const appearanceRef = createRef<HTMLElement>();
    const calls: string[] = [];
    render(
      <Appearance ref={appearanceRef} value="light">
        <Surface
          className="child-class"
          data-testid="surface"
          onClick={() => calls.push("child")}
          ref={childRef}
          style={{ background: "black" }}
        />
      </Appearance>,
    );

    const surface = screen.getByTestId("surface");
    fireEvent.click(surface);
    expect(calls).toEqual(["child"]);
    expect(surface).toBe(childRef.current);
    expect(surface).toBe(appearanceRef.current);
    expect(surface).toHaveClass(
      "brick-surface",
      "child-class",
      "brick-appearance",
    );
    expect(surface).toHaveAttribute("data-slot", "surface");
    expect(surface).toHaveStyle({ background: "black" });
  });

  it("rejects a Fragment because it cannot own DOM attributes", () => {
    expect(() =>
      render(
        <Appearance value="dark">
          <Fragment>
            <Surface />
          </Fragment>
        </Appearance>,
      ),
    ).toThrow(/Fragment cannot receive the appearance boundary/);
  });

  it("rejects text and multiple direct children", () => {
    expect(() =>
      render(
        // @ts-expect-error runtime validation protects non-TypeScript callers.
        <Appearance value="dark">text</Appearance>,
      ),
    ).toThrow();

    expect(() =>
      render(
        // @ts-expect-error runtime validation protects non-TypeScript callers.
        <Appearance value="dark">
          <Surface />
          <Surface />
        </Appearance>,
      ),
    ).toThrow();
  });
});
