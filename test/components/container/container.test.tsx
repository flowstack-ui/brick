import { createRef, type CSSProperties } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Container,
  type ContainerElement,
  type ContainerGutter,
  type ContainerMeasure,
} from "../../../src/container.js";

describe("Container", () => {
  it("renders the adopted one-root defaults", () => {
    const ref = createRef<HTMLElement>();
    render(<Container data-testid="container" ref={ref}>Content</Container>);
    const container = screen.getByTestId("container");

    expect(container).toBe(ref.current);
    expect(container.tagName).toBe("DIV");
    expect(container).toHaveClass("brick-container");
    expect(container).toHaveAttribute("data-slot", "container");
    expect(container).toHaveAttribute("data-measure", "wide");
    expect(container).toHaveAttribute("data-gutter", "md");
    expect(container).not.toHaveAttribute("role");
    expect(container).toHaveTextContent("Content");
    expect(container.children).toHaveLength(0);
  });

  it("exposes every closed measure and gutter", () => {
    const measures: ContainerMeasure[] = [
      "narrow", "medium", "wide", "max", "full",
    ];
    const gutters: ContainerGutter[] = ["none", "sm", "md", "lg"];
    const { rerender } = render(<Container data-testid="container" />);

    for (const measure of measures) {
      rerender(<Container data-testid="container" measure={measure} />);
      expect(screen.getByTestId("container")).toHaveAttribute(
        "data-measure",
        measure,
      );
    }
    for (const gutter of gutters) {
      rerender(<Container data-testid="container" gutter={gutter} />);
      expect(screen.getByTestId("container")).toHaveAttribute(
        "data-gutter",
        gutter,
      );
    }
  });

  it("supports every adopted semantic host", () => {
    const hosts: ContainerElement[] = [
      "div", "section", "article", "main", "header", "footer", "nav", "aside",
    ];
    const { rerender } = render(<Container data-testid="container" />);
    for (const as of hosts) {
      rerender(<Container as={as} data-testid="container" />);
      expect(screen.getByTestId("container").tagName).toBe(as.toUpperCase());
    }
  });

  it("forwards native props, events, class, style, slot, children, and ref", () => {
    const ref = createRef<HTMLElement>();
    let clicks = 0;
    render(
      <Container
        aria-label="Project region"
        as="section"
        className="consumer-container"
        data-evidence="native"
        dir="rtl"
        onClick={() => clicks++}
        ref={ref}
        slot="project-region"
        style={{
          "--brick-container-max-inline-size": "76rem",
        } as CSSProperties}
      >
        <span>Project</span>
      </Container>,
    );
    const container = screen.getByLabelText("Project region");
    fireEvent.click(container);

    expect(clicks).toBe(1);
    expect(container).toBe(ref.current);
    expect(container).toHaveClass("brick-container", "consumer-container");
    expect(container).toHaveAttribute("data-slot", "project-region");
    expect(container).toHaveAttribute("data-evidence", "native");
    expect(container).toHaveAttribute("dir", "rtl");
    expect(container.style.getPropertyValue(
      "--brick-container-max-inline-size",
    )).toBe("76rem");
    expect(container.firstElementChild?.tagName).toBe("SPAN");
    expect(container).not.toHaveAttribute("measure");
    expect(container).not.toHaveAttribute("gutter");
  });
});
