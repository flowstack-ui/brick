import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ActionMenuArrowArtwork, actionMenuArrowWidth, actionMenuArrowHeight } from "../../../src/components/_action-menu/ActionMenuArrowArtwork.js";
import { floatingArrowStyle } from "../../../src/components/_floating-arrow/FloatingArrowArtwork.js";

describe("shared action-menu arrow paint", () => {
  it("lets the shared seed size defaults while explicit dimensions and consumer styles win", () => {
    expect(floatingArrowStyle()).toEqual({});
    expect(floatingArrowStyle(24, 12)).toEqual({ "--brick-floating-arrow-width": "24px", "--brick-floating-arrow-height": "12px" });
    expect(floatingArrowStyle(24, 12, { width: 30 })).toMatchObject({ width: 30 });
  });
  it("matches the exposed geometry of a rotated 12px square", () => {
    expect(actionMenuArrowWidth).toBeCloseTo(16.97056);
    expect(actionMenuArrowHeight).toBeCloseTo(8.48528);
  });

  it("separates fill, border masking and exposed edges for all placements", () => {
    const { container } = render(<svg><ActionMenuArrowArtwork width={20} height={10} /></svg>);
    for (const side of ["top", "bottom", "left", "right"]) {
      const artwork = container.querySelector(`[data-arrow-artwork="${side}"]`)!;
      expect(artwork.querySelector("polygon")).toHaveAttribute("stroke", "none");
      expect(artwork.querySelector(".brick-floating-arrow__edge")?.tagName).toBe("polyline");
      expect(artwork.querySelector(".brick-floating-arrow__join")).not.toBeNull();
    }
    expect(container.querySelector('[data-arrow-artwork="bottom"] polygon')).toHaveAttribute("points", "0,10 10,0 20,10");
    expect(container.querySelector('[data-arrow-artwork="right"] polygon')).toHaveAttribute("points", "10,0 0,10 10,20");
  });
});
