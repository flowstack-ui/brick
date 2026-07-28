import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  AspectRatio,
  AspectRatioRoot,
  type AspectRatioOverflow,
  type AspectRatioRadius,
  type AspectRatioVariant,
} from "../../../src/aspect-ratio.js";

describe("AspectRatio", () => {
  it("renders the adopted one-root defaults over Atom", () => {
    const ref = createRef<HTMLDivElement>();
    render(<AspectRatio.Root data-testid="ratio" ref={ref}>Media</AspectRatio.Root>);
    const root = screen.getByTestId("ratio");
    expect(root).toBe(ref.current);
    expect(root.tagName).toBe("DIV");
    expect(root).toHaveClass("brick-aspect-ratio");
    expect(root).toHaveAttribute("data-slot", "aspect-ratio");
    expect(root).toHaveAttribute("data-variant", "plain");
    expect(root).toHaveAttribute("data-radius", "none");
    expect(root).toHaveAttribute("data-overflow", "hidden");
    expect(root).toHaveStyle({ aspectRatio: String(16 / 9) });
    expect(root).not.toHaveAttribute("role");
    expect(AspectRatio.Root).toBe(AspectRatioRoot);
  });

  it("exposes each closed visual recipe without leaking props", () => {
    const variants: AspectRatioVariant[] = ["plain", "subtle", "outline"];
    const radii: AspectRatioRadius[] = ["none", "sm", "md", "lg", "full"];
    const overflows: AspectRatioOverflow[] = ["visible", "hidden"];
    const { rerender } = render(<AspectRatio.Root data-testid="ratio" />);
    for (const variant of variants) {
      rerender(<AspectRatio.Root data-testid="ratio" variant={variant} />);
      expect(screen.getByTestId("ratio")).toHaveAttribute("data-variant", variant);
    }
    for (const radius of radii) {
      rerender(<AspectRatio.Root data-testid="ratio" radius={radius} />);
      expect(screen.getByTestId("ratio")).toHaveAttribute("data-radius", radius);
    }
    for (const overflow of overflows) {
      rerender(<AspectRatio.Root data-testid="ratio" overflow={overflow} />);
      expect(screen.getByTestId("ratio")).toHaveAttribute("data-overflow", overflow);
    }
    expect(screen.getByTestId("ratio")).not.toHaveAttribute("variant");
    expect(screen.getByTestId("ratio")).not.toHaveAttribute("radius");
    expect(screen.getByTestId("ratio")).not.toHaveAttribute("overflow");
  });

  it("preserves Atom ratios, normalization, native props, class, style, events, slot, and ref", () => {
    let clicks = 0;
    const { rerender } = render(
      <AspectRatio.Root
        aria-label="Media preview"
        className="consumer-frame"
        data-evidence="native"
        data-slot="custom-ratio"
        onClick={() => clicks++}
        ratio={4 / 3}
        style={{ inlineSize: "24rem", aspectRatio: 2 }}
      >
        <span>Preview</span>
      </AspectRatio.Root>,
    );
    const root = screen.getByLabelText("Media preview");
    fireEvent.click(root);
    expect(clicks).toBe(1);
    expect(root).toHaveClass("brick-aspect-ratio", "consumer-frame");
    expect(root).toHaveAttribute("data-slot", "custom-ratio");
    expect(root).toHaveAttribute("data-evidence", "native");
    expect(root).toHaveStyle({ inlineSize: "24rem", aspectRatio: String(4 / 3) });
    expect(root.firstElementChild?.tagName).toBe("SPAN");

    rerender(<AspectRatio.Root data-testid="ratio" ratio={Number.NaN} />);
    expect(screen.getByTestId("ratio")).toHaveStyle({ aspectRatio: String(16 / 9) });
  });

  it("preserves Atom asChild and render composition", () => {
    const { rerender } = render(
      <AspectRatio.Root asChild ratio={1}>
        <section data-testid="ratio">Square</section>
      </AspectRatio.Root>,
    );
    expect(screen.getByTestId("ratio").tagName).toBe("SECTION");
    expect(screen.getByTestId("ratio")).toHaveClass("brick-aspect-ratio");
    rerender(
      <AspectRatio.Root render={(props) => <article {...props} data-testid="ratio">Wide</article>} />,
    );
    expect(screen.getByTestId("ratio").tagName).toBe("ARTICLE");
  });
});
