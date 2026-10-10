import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, ButtonGroup } from "../../../src/button.js";
import { IconButton } from "../../../src/icon-button.js";
import { CloseButton } from "../../../src/close-button.js";

describe("shared action family", () => {
  it("uses one native host and one shared recipe for every variant", () => {
    for (const variant of ["solid", "soft", "subtle", "surface", "outline", "ghost", "plain"] as const) {
      const { unmount, container } = render(<ButtonGroup variant={variant} tone="accent" size="md"><Button>Save</Button><IconButton aria-label="Search"><svg /></IconButton><CloseButton /></ButtonGroup>);
      expect(container.querySelectorAll("button")).toHaveLength(3);
      for (const button of screen.getAllByRole("button")) {
        expect(button).toHaveClass("brick-button");
        expect(button).toHaveAttribute("data-variant", variant);
        expect(button).toHaveAttribute("data-size", "md");
      }
      unmount();
    }
  });
  it("centers custom loaders without losing names or adding text mode", () => {
    render(<><IconButton aria-label="Search" loading spinner={<svg data-testid="spinner" />}><svg /></IconButton><CloseButton loading spinner={<svg />} /></>);
    for (const button of screen.getAllByRole("button")) {
      expect(button).toHaveAttribute("aria-busy", "true");
      expect(button.querySelector(".brick-button__loading-overlay")).not.toBeNull();
      expect(button.querySelector(".brick-icon-button__icon")).toHaveAttribute("aria-hidden", "true");
    }
    expect(screen.getByRole("button", {name:"Close"})).toBeInTheDocument();
  });
});
