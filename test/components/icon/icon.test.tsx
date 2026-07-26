import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon, type IconSize, type IconTone } from "../../../src/icon.js";

function SearchGraphic({ className }: { className?: string }) {
  return <svg className={className} data-source="external" viewBox="0 0 20 20"><circle cx="9" cy="9" r="5" /></svg>;
}

describe("Icon", () => {
  it("renders one decorative md inherited wrapper by default", () => {
    const ref = createRef<HTMLElement | SVGSVGElement>();
    render(<Icon data-testid="icon" ref={ref}><SearchGraphic /></Icon>);
    const icon = screen.getByTestId("icon");
    expect(icon).toBe(ref.current);
    expect(icon.tagName).toBe("SPAN");
    expect(icon).toHaveClass("brick-icon");
    expect(icon).toHaveAttribute("data-slot", "icon");
    expect(icon).toHaveAttribute("data-size", "md");
    expect(icon).toHaveAttribute("data-tone", "inherit");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).not.toHaveAttribute("role");
    expect(icon).not.toHaveAttribute("data-directional");
    expect(icon.firstElementChild).toHaveAttribute("data-source", "external");
  });

  it("exposes informative label and label-reference modes without visual drift", () => {
    const { rerender } = render(<Icon data-testid="icon" label="Search"><SearchGraphic /></Icon>);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("role", "img");
    expect(icon).toHaveAttribute("aria-label", "Search");
    expect(icon).not.toHaveAttribute("aria-hidden");

    rerender(<><span id="warning-label">Warning</span><Icon aria-labelledby="warning-label" data-testid="icon"><SearchGraphic /></Icon></>);
    expect(screen.getByTestId("icon")).toHaveAttribute("role", "img");
    expect(screen.getByTestId("icon")).toHaveAttribute("aria-labelledby", "warning-label");
    expect(screen.getByTestId("icon")).not.toHaveAttribute("aria-label");
  });

  it("exposes every closed size and tone with explicit direction only", () => {
    const sizes: IconSize[] = ["2xs", "xs", "sm", "md", "lg", "xl"];
    const tones: IconTone[] = ["inherit", "primary", "secondary", "muted", "accent", "info", "success", "warning", "danger"];
    const { rerender } = render(<Icon data-testid="icon"><SearchGraphic /></Icon>);
    for (const size of sizes) {
      rerender(<Icon data-testid="icon" size={size}><SearchGraphic /></Icon>);
      expect(screen.getByTestId("icon")).toHaveAttribute("data-size", size);
    }
    for (const tone of tones) {
      rerender(<Icon data-testid="icon" tone={tone}><SearchGraphic /></Icon>);
      expect(screen.getByTestId("icon")).toHaveAttribute("data-tone", tone);
    }
    rerender(<Icon data-testid="icon" directional><SearchGraphic /></Icon>);
    expect(screen.getByTestId("icon")).toHaveAttribute("data-directional", "");
  });

  it("merges onto one SVG child while preserving authored source props", () => {
    const ref = createRef<HTMLElement | SVGSVGElement>();
    const { container } = render(
      <Icon
        aria-labelledby="graphic-label"
        asChild
        className="consumer-icon"
        data-evidence="composed"
        ref={ref}
        size="lg"
        slot="project-icon"
        style={{ opacity: 0.8 }}
        tone="success"
      >
        <svg className="source-icon" data-source="external" viewBox="0 0 20 20"><circle cx="9" cy="9" r="5" /></svg>
      </Icon>,
    );
    const icon = document.querySelector("svg")!;
    expect(icon).toBe(ref.current);
    expect(icon).toHaveClass("source-icon", "brick-icon", "consumer-icon");
    expect(icon).toHaveAttribute("data-source", "external");
    expect(icon).toHaveAttribute("data-evidence", "composed");
    expect(icon).toHaveAttribute("data-slot", "project-icon");
    expect(icon).toHaveAttribute("data-size", "lg");
    expect(icon).toHaveAttribute("data-tone", "success");
    expect(icon).toHaveAttribute("role", "img");
    expect(icon).toHaveAttribute("aria-labelledby", "graphic-label");
    expect(icon).toHaveStyle({ opacity: "0.8" });
    expect(icon.parentElement).toBe(container);
  });
});
