import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  IconButton,
  type IconButtonShape,
  type IconButtonSize,
  type IconButtonTone,
  type IconButtonVariant,
} from "../../../src/icon-button.js";

function TestIcon() {
  return <svg data-testid="icon" viewBox="0 0 16 16"><path d="M2 8h12" /></svg>;
}

describe("IconButton", () => {
  it("renders the adopted defaults over Atom Button", () => {
    render(<IconButton aria-label="Open menu"><TestIcon /></IconButton>);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveClass("brick-icon-button");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-variant", "ghost");
    expect(button).toHaveAttribute("data-tone", "neutral");
    expect(button).toHaveAttribute("data-size", "md");
    expect(button).toHaveAttribute("data-shape", "rounded");
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards Atom link semantics and safe external rel", () => {
    render(
      <IconButton aria-label="Open documentation" href="/docs" target="_blank">
        <TestIcon />
      </IconButton>,
    );
    const link = screen.getByRole("link", { name: "Open documentation" });
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).not.toHaveAttribute("role", "button");
  });

  it("keeps Atom as event, disabled, loading, composition, and ref owner", async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    const ref = createRef<HTMLElement>();
    const { rerender } = render(
      <IconButton aria-label="Refresh" onPress={onPress} ref={ref}><TestIcon /></IconButton>,
    );
    const button = screen.getByRole("button", { name: "Refresh" });
    expect(button).toBe(ref.current);
    await user.click(button);
    expect(onPress).toHaveBeenCalledOnce();

    rerender(<IconButton aria-label="Refresh" disabled onPress={onPress}><TestIcon /></IconButton>);
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onPress).toHaveBeenCalledOnce();

    rerender(<IconButton aria-label="Refresh" loading><TestIcon /></IconButton>);
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).not.toBeDisabled();

    rerender(
      <IconButton asChild aria-label="Custom action" className="consumer-action">
        <span className="custom-root"><TestIcon /></span>
      </IconButton>,
    );
    expect(screen.getByRole("button", { name: "Custom action" })).toHaveClass(
      "brick-icon-button",
      "consumer-action",
      "custom-root",
    );
  });

  it("exposes every closed visual recipe", () => {
    const variants: IconButtonVariant[] = ["solid", "soft", "outline", "ghost"];
    const tones: IconButtonTone[] = ["neutral", "accent", "info", "success", "warning", "danger"];
    const sizes: IconButtonSize[] = ["xs", "sm", "md", "lg", "xl"];
    const shapes: IconButtonShape[] = ["rounded", "circle"];
    const { rerender } = render(<IconButton aria-label="Recipe"><TestIcon /></IconButton>);
    const button = screen.getByRole("button", { name: "Recipe" });
    for (const variant of variants) {
      rerender(<IconButton aria-label="Recipe" variant={variant}><TestIcon /></IconButton>);
      expect(button).toHaveAttribute("data-variant", variant);
    }
    for (const tone of tones) {
      rerender(<IconButton aria-label="Recipe" tone={tone}><TestIcon /></IconButton>);
      expect(button).toHaveAttribute("data-tone", tone);
    }
    for (const size of sizes) {
      rerender(<IconButton aria-label="Recipe" size={size}><TestIcon /></IconButton>);
      expect(button).toHaveAttribute("data-size", size);
    }
    for (const shape of shapes) {
      rerender(<IconButton aria-label="Recipe" shape={shape}><TestIcon /></IconButton>);
      expect(button).toHaveAttribute("data-shape", shape);
    }
  });
});
