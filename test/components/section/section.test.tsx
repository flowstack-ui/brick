import { createRef, type CSSProperties } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Section,
  type SectionElement,
  type SectionSpacing,
} from "../../../src/section.js";

describe("Section", () => {
  it("renders the adopted semantic one-root defaults", () => {
    const ref = createRef<HTMLElement>();
    render(<Section data-testid="section" ref={ref}>Content</Section>);
    const section = screen.getByTestId("section");

    expect(section).toBe(ref.current);
    expect(section.tagName).toBe("SECTION");
    expect(section).toHaveClass("brick-section");
    expect(section).toHaveAttribute("data-slot", "section");
    expect(section).toHaveAttribute("data-spacing", "md");
    expect(section).not.toHaveAttribute("data-start-spacing");
    expect(section).not.toHaveAttribute("data-end-spacing");
    expect(section).not.toHaveAttribute("role");
    expect(section).toHaveTextContent("Content");
    expect(section.children).toHaveLength(0);
  });

  it("exposes every closed spacing recipe", () => {
    const values: SectionSpacing[] = ["none", "sm", "md", "lg", "xl", "2xl"];
    const { rerender } = render(<Section data-testid="section" />);

    for (const spacing of values) {
      rerender(
        <Section
          data-testid="section"
          endSpacing={spacing}
          spacing={spacing}
          startSpacing={spacing}
        />,
      );
      const section = screen.getByTestId("section");
      expect(section).toHaveAttribute("data-spacing", spacing);
      expect(section).toHaveAttribute("data-start-spacing", spacing);
      expect(section).toHaveAttribute("data-end-spacing", spacing);
    }
  });

  it("serializes responsive rhythm without leaking props", () => {
    render(
      <Section
        data-testid="section"
        endSpacing={{ initial: "sm", md: "lg" }}
        spacing={{ initial: "md", lg: "xl" }}
        startSpacing={{ initial: "none", sm: "sm", xl: "2xl" }}
      />,
    );
    const section = screen.getByTestId("section");

    expect(section).toHaveAttribute("data-spacing", "md");
    expect(section).toHaveAttribute("data-spacing-lg", "xl");
    expect(section).toHaveAttribute("data-start-spacing", "none");
    expect(section).toHaveAttribute("data-start-spacing-sm", "sm");
    expect(section).toHaveAttribute("data-start-spacing-xl", "2xl");
    expect(section).toHaveAttribute("data-end-spacing", "sm");
    expect(section).toHaveAttribute("data-end-spacing-md", "lg");
    expect(section).not.toHaveAttribute("spacing");
    expect(section).not.toHaveAttribute("startSpacing");
    expect(section).not.toHaveAttribute("endSpacing");
  });

  it("supports every adopted host", () => {
    const hosts: SectionElement[] = ["section", "div", "article", "aside"];
    const { rerender } = render(<Section data-testid="section" />);
    for (const as of hosts) {
      rerender(<Section as={as} data-testid="section" />);
      expect(screen.getByTestId("section").tagName).toBe(as.toUpperCase());
    }
  });

  it("forwards native props, events, class, style, slot, children, and ref", () => {
    const ref = createRef<HTMLElement>();
    let clicks = 0;
    render(
      <Section
        aria-labelledby="projects-title"
        className="consumer-section"
        data-evidence="native"
        dir="rtl"
        onClick={() => clicks++}
        ref={ref}
        slot="projects"
        style={{ "--brick-section-space-lg": "8rem" } as CSSProperties}
      >
        <h2 id="projects-title">Projects</h2>
      </Section>,
    );
    const section = screen.getByLabelText("Projects");
    fireEvent.click(section);

    expect(clicks).toBe(1);
    expect(section).toBe(ref.current);
    expect(section).toHaveClass("brick-section", "consumer-section");
    expect(section).toHaveAttribute("data-slot", "projects");
    expect(section).toHaveAttribute("data-evidence", "native");
    expect(section).toHaveAttribute("dir", "rtl");
    expect(section.style.getPropertyValue("--brick-section-space-lg")).toBe("8rem");
    expect(section.firstElementChild?.tagName).toBe("H2");
  });
});
