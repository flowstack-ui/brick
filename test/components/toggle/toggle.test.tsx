import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Toggle,
  type ToggleShape,
  type ToggleSize,
  type ToggleTone,
  type ToggleVariant,
} from "../../../src/toggle.js";

describe("Toggle", () => {
  it("owns adopted defaults and Atom pressed semantics", () => {
    render(<Toggle>Bold</Toggle>);
    const toggle = screen.getByRole("button", { name: "Bold" });
    expect(toggle).toHaveClass("brick-toggle");
    expect(toggle).toHaveAttribute("type", "button");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(toggle).toHaveAttribute("data-state", "off");
    expect(toggle).toHaveAttribute("data-variant", "soft");
    expect(toggle).toHaveAttribute("data-tone", "accent");
    expect(toggle).toHaveAttribute("data-size", "md");
    expect(toggle).toHaveAttribute("data-shape", "rounded");
    expect(toggle).not.toHaveAttribute("data-icon-only");
  });

  it("forwards controlled state and consumer hooks", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Toggle
        aria-describedby="favorite-help"
        className="consumer-toggle"
        data-slot="favorite-toggle"
        iconOnly
        pressed
        ref={ref}
        style={{ marginInlineStart: 4 }}
        title="Favorite"
      >
        <svg aria-label="Favorite" />
      </Toggle>,
    );
    const toggle = screen.getByRole("button", { name: "Favorite" });
    expect(toggle).toBe(ref.current);
    expect(toggle).toHaveClass("brick-toggle", "consumer-toggle");
    expect(toggle).toHaveAttribute("data-slot", "favorite-toggle");
    expect(toggle).toHaveAttribute("data-icon-only", "");
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toHaveAttribute("title", "Favorite");
    expect(toggle).toHaveStyle({ marginInlineStart: "4px" });
  });

  it("exposes every closed visual recipe", () => {
    const variants: ToggleVariant[] = ["solid", "soft", "outline", "ghost"];
    const sizes: ToggleSize[] = ["sm", "md", "lg"];
    const shapes: ToggleShape[] = ["rounded", "pill"];
    const tones: ToggleTone[] = ["accent", "neutral"];
    const { rerender } = render(<Toggle>Recipe</Toggle>);
    const toggle = screen.getByRole("button", { name: "Recipe" });
    for (const variant of variants) {
      rerender(<Toggle variant={variant}>Recipe</Toggle>);
      expect(toggle).toHaveAttribute("data-variant", variant);
    }
    for (const size of sizes) {
      rerender(<Toggle size={size}>Recipe</Toggle>);
      expect(toggle).toHaveAttribute("data-size", size);
    }
    for (const shape of shapes) {
      rerender(<Toggle shape={shape}>Recipe</Toggle>);
      expect(toggle).toHaveAttribute("data-shape", shape);
    }
    for (const tone of tones) {
      rerender(<Toggle tone={tone}>Recipe</Toggle>);
      expect(toggle).toHaveAttribute("data-tone", tone);
    }
  });

  it("leaves uncontrolled pointer and keyboard state with Atom", async () => {
    const user = userEvent.setup();
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Pin</Toggle>);
    const toggle = screen.getByRole("button", { name: "Pin" });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(onPressedChange).toHaveBeenLastCalledWith(true);
    await user.keyboard(" ");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(onPressedChange).toHaveBeenLastCalledWith(false);
  });

  it("preserves asChild and render composition", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { unmount } = render(
      <Toggle asChild className="root-toggle" onClick={onClick}>
        <span className="child-toggle">Preview</span>
      </Toggle>,
    );
    const composed = screen.getByRole("button", { name: "Preview" });
    expect(composed).toHaveClass("brick-toggle", "root-toggle", "child-toggle");
    await user.click(composed);
    expect(onClick).toHaveBeenCalledOnce();
    expect(composed).toHaveAttribute("aria-pressed", "true");
    unmount();
    render(<Toggle render={<span data-testid="rendered-toggle" />}>Rendered</Toggle>);
    expect(screen.getByTestId("rendered-toggle")).toHaveClass("brick-toggle");
    expect(screen.getByRole("button", { name: "Rendered" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});
