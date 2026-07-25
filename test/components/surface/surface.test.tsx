import { createRef, type CSSProperties } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Surface,
  type SurfaceElement,
  type SurfaceElevation,
  type SurfaceInset,
  type SurfaceLevel,
  type SurfaceRadius,
} from "../../../src/surface.js";

describe("Surface", () => {
  it("renders the adopted one-root defaults", () => {
    const ref = createRef<HTMLElement>();
    render(<Surface data-testid="surface" ref={ref}>Content</Surface>);
    const surface = screen.getByTestId("surface");

    expect(surface).toBe(ref.current);
    expect(surface.tagName).toBe("DIV");
    expect(surface).toHaveClass("brick-surface");
    expect(surface).toHaveAttribute("data-slot", "surface");
    expect(surface).toHaveAttribute("data-level", "base");
    expect(surface).toHaveAttribute("data-elevation", "none");
    expect(surface).toHaveAttribute("data-radius", "surface");
    expect(surface).toHaveAttribute("data-inset", "none");
    expect(surface).not.toHaveAttribute("data-bordered");
    expect(surface).not.toHaveAttribute("role");
    expect(surface).toHaveTextContent("Content");
    expect(surface.children).toHaveLength(0);
  });

  it("exposes every closed visual recipe independently", () => {
    const levels: SurfaceLevel[] = ["canvas", "base", "subtle", "raised"];
    const elevations: SurfaceElevation[] = ["none", "low", "medium", "high"];
    const radii: SurfaceRadius[] = ["none", "subtle", "surface"];
    const insets: SurfaceInset[] = ["none", "sm", "md", "lg"];
    const { rerender } = render(<Surface data-testid="surface" />);

    for (const level of levels) {
      rerender(<Surface data-testid="surface" level={level} />);
      expect(screen.getByTestId("surface")).toHaveAttribute("data-level", level);
      expect(screen.getByTestId("surface")).not.toHaveAttribute("data-bordered");
    }
    for (const elevation of elevations) {
      rerender(<Surface data-testid="surface" elevation={elevation} />);
      expect(screen.getByTestId("surface")).toHaveAttribute(
        "data-elevation",
        elevation,
      );
    }
    for (const radius of radii) {
      rerender(<Surface data-testid="surface" radius={radius} />);
      expect(screen.getByTestId("surface")).toHaveAttribute(
        "data-radius",
        radius,
      );
    }
    for (const inset of insets) {
      rerender(<Surface data-testid="surface" inset={inset} />);
      expect(screen.getByTestId("surface")).toHaveAttribute("data-inset", inset);
    }

    rerender(<Surface bordered data-testid="surface" />);
    expect(screen.getByTestId("surface")).toHaveAttribute("data-bordered", "");
  });

  it("supports every adopted semantic host", () => {
    const hosts: SurfaceElement[] = [
      "div", "section", "article", "aside", "nav", "main", "header", "footer",
      "form", "li",
    ];
    const { rerender } = render(<Surface data-testid="surface" />);
    for (const as of hosts) {
      rerender(<Surface as={as} data-testid="surface" />);
      expect(screen.getByTestId("surface").tagName).toBe(as.toUpperCase());
    }
  });

  it("forwards native props, events, class, style, slot, children, and ref", () => {
    const ref = createRef<HTMLElement>();
    let clicks = 0;
    render(
      <Surface
        aria-label="Release readiness"
        as="section"
        bordered
        className="consumer-surface"
        data-evidence="native"
        dir="rtl"
        elevation="low"
        inset="lg"
        level="raised"
        onClick={() => clicks++}
        radius="subtle"
        ref={ref}
        slot="release-region"
        style={{
          "--brick-surface-background": "Canvas",
        } as CSSProperties}
      >
        <span>Ready</span>
      </Surface>,
    );
    const surface = screen.getByLabelText("Release readiness");
    fireEvent.click(surface);

    expect(clicks).toBe(1);
    expect(surface).toBe(ref.current);
    expect(surface).toHaveClass("brick-surface", "consumer-surface");
    expect(surface).toHaveAttribute("data-slot", "release-region");
    expect(surface).toHaveAttribute("data-evidence", "native");
    expect(surface).toHaveAttribute("dir", "rtl");
    expect(surface.style.getPropertyValue("--brick-surface-background")).toBe(
      "Canvas",
    );
    expect(surface.firstElementChild?.tagName).toBe("SPAN");
    expect(surface).not.toHaveAttribute("bordered");
    expect(surface).not.toHaveAttribute("elevation");
    expect(surface).not.toHaveAttribute("inset");
    expect(surface).not.toHaveAttribute("level");
    expect(surface).not.toHaveAttribute("radius");
  });
});
