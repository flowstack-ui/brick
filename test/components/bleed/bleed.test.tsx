import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Bleed } from "../../../src/bleed.js";

describe("Bleed", () => {
  it("renders one neutral host and serializes logical responsive spacing", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Bleed
        blockStart={3}
        data-testid="bleed"
        inline={{ initial: 4, md: 8 }}
        inlineEnd={{ initial: 2, lg: 6 }}
        ref={ref}
      >
        Media
      </Bleed>,
    );
    const bleed = screen.getByTestId("bleed");
    expect(bleed).toBe(ref.current);
    expect(bleed).toHaveClass("brick-bleed");
    expect(bleed).toHaveAttribute("data-bleed", "");
    expect(bleed).toHaveAttribute("data-slot", "bleed");
    expect(bleed.style.getPropertyValue("--brick-bleed-inline-start")).toBe("calc(var(--brick-space-1) * 4)");
    expect(bleed.style.getPropertyValue("--brick-bleed-inline-start-md")).toBe("calc(var(--brick-space-1) * 8)");
    expect(bleed.style.getPropertyValue("--brick-bleed-inline-end")).toBe("calc(var(--brick-space-1) * 2)");
    expect(bleed.style.getPropertyValue("--brick-bleed-inline-end-lg")).toBe("calc(var(--brick-space-1) * 6)");
    expect(bleed.style.getPropertyValue("--brick-bleed-block-start")).toBe("calc(var(--brick-space-1) * 3)");
    expect(bleed).not.toHaveAttribute("inline");
    expect(bleed).not.toHaveAttribute("blockStart");
  });

  it("uses zero bleed below the first sparse responsive edge", () => {
    render(<Bleed data-testid="bleed" inline={{ lg: 6 }}>Media</Bleed>);
    const style = screen.getByTestId("bleed").style;
    expect(style.getPropertyValue("--brick-bleed-inline-start")).toBe(
      "var(--brick-space-0)",
    );
    expect(style.getPropertyValue("--brick-bleed-inline-start-lg")).toBe(
      "calc(var(--brick-space-1) * 6)",
    );
  });

  it("composes onto one existing semantic host without a wrapper", () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(
      <Bleed asChild block={5} className="edge-media" ref={ref}>
        <figure className="authored" data-testid="bleed">Artwork</figure>
      </Bleed>,
    );
    const bleed = screen.getByTestId("bleed");
    expect(container.children).toHaveLength(1);
    expect(bleed.tagName).toBe("FIGURE");
    expect(bleed).toBe(ref.current);
    expect(bleed).toHaveClass("authored", "brick-bleed", "edge-media");
  });
});
