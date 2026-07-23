import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Button,
  type ButtonShape,
  type ButtonSize,
  type ButtonTone,
  type ButtonVariant,
} from "../../../src/button.js";

describe("Button", () => {
  it("renders the adopted defaults without leaking visual props", () => {
    render(<Button>Save changes</Button>);

    const button = screen.getByRole("button", { name: "Save changes" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-slot", "button");
    expect(button).toHaveAttribute("data-variant", "solid");
    expect(button).toHaveAttribute("data-tone", "accent");
    expect(button).toHaveAttribute("data-size", "md");
    expect(button).toHaveAttribute("data-shape", "rounded");
    expect(button).not.toHaveAttribute("data-full-width");
    expect(button).not.toHaveAttribute("variant");
    expect(button).not.toHaveAttribute("tone");
    expect(button).not.toHaveAttribute("shape");
  });

  it("forwards native props, refs, class, style, and the overridable slot", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Button
        aria-describedby="button-help"
        className="consumer-button"
        data-slot="save-action"
        form="profile-form"
        name="intent"
        ref={ref}
        style={{ marginInlineStart: 4 }}
        type="submit"
        value="save"
      >
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBe(ref.current);
    expect(button).toHaveClass("brick-button", "consumer-button");
    expect(button).toHaveAttribute("data-slot", "save-action");
    expect(button).toHaveAttribute("form", "profile-form");
    expect(button).toHaveAttribute("name", "intent");
    expect(button).toHaveAttribute("value", "save");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveStyle({ marginInlineStart: "4px" });
  });

  it("renders decorative start and end icons around accessible content", () => {
    render(
      <Button
        endIcon={<svg data-testid="end-icon" />}
        startIcon={<svg data-testid="start-icon" />}
      >
        Continue
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Continue" })).toBeVisible();
    expect(screen.getByTestId("start-icon").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("start-icon").parentElement).toHaveAttribute("data-position", "start");
    expect(screen.getByTestId("end-icon").parentElement).toHaveAttribute("data-position", "end");
  });

  it("applies every adopted visual recipe as authoritative data", () => {
    const variants: ButtonVariant[] = ["solid", "soft", "outline", "ghost"];
    const tones: ButtonTone[] = ["neutral", "accent", "info", "success", "warning", "danger"];
    const sizes: ButtonSize[] = ["xs", "sm", "md", "lg", "xl"];
    const shapes: ButtonShape[] = ["sharp", "rounded", "pill"];

    const { rerender } = render(<Button>Recipe</Button>);
    const button = screen.getByRole("button", { name: "Recipe" });

    for (const variant of variants) {
      rerender(<Button variant={variant}>Recipe</Button>);
      expect(button).toHaveAttribute("data-variant", variant);
    }
    for (const tone of tones) {
      rerender(<Button tone={tone}>Recipe</Button>);
      expect(button).toHaveAttribute("data-tone", tone);
    }
    for (const size of sizes) {
      rerender(<Button size={size}>Recipe</Button>);
      expect(button).toHaveAttribute("data-size", size);
    }
    for (const shape of shapes) {
      rerender(<Button shape={shape}>Recipe</Button>);
      expect(button).toHaveAttribute("data-shape", shape);
    }

    rerender(<Button fullWidth>Recipe</Button>);
    expect(button).toHaveAttribute("data-full-width", "");
  });

  it("preserves native link semantics and safe new-tab relationships", () => {
    render(
      <Button href="/account" target="_blank">
        Account
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Account" });
    expect(link).toHaveAttribute("href", "/account");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).not.toHaveAttribute("role", "button");
  });

  it("forwards asChild composition without replacing the child content", () => {
    render(
      <Button asChild tone="info" variant="outline">
        <a className="router-link" href="/composed">
          Composed link
        </a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Composed link" });
    expect(link).toHaveAttribute("href", "/composed");
    expect(link).toHaveClass("brick-button", "router-link");
    expect(link).toHaveAttribute("data-tone", "info");
    expect(link.querySelector(".brick-button__content")).toBeNull();
  });

  it("forwards render composition and removes a live destination while inactive", () => {
    const { rerender } = render(
      <Button render={<a href="/router" />}>Router link</Button>,
    );

    expect(screen.getByRole("link", { name: "Router link" })).toHaveAttribute("href", "/router");

    rerender(
      <Button disabled render={<a href="/router" />}>
        Router link
      </Button>,
    );
    const inactive = screen.getByRole("link", { name: "Router link" });
    expect(inactive).not.toHaveAttribute("href");
    expect(inactive).toHaveAttribute("aria-disabled", "true");
    expect(inactive).toHaveAttribute("data-disabled");
  });

  it("exposes loading presentation while Atom blocks repeated activation", async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(
      <Button loading onPress={onPress}>
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("data-loading");
    expect(button).not.toBeDisabled();
    await user.click(button);
    expect(onPress).not.toHaveBeenCalled();
  });
});
