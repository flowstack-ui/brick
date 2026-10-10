import { createRef, createElement, forwardRef, Fragment, type CSSProperties, type HTMLAttributes } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Container,
  type ContainerElement,
  type ContainerGutter,
  type ContainerMeasure,
} from "../../../src/container.js";

describe("Container", () => {
  it("adopts one host and merges attributes, styles, classes, events and refs", () => {
    const ownerRef = createRef<HTMLElement>();
    const childRef = createRef<HTMLElement>();
    const calls: string[] = [];
    const { unmount } = render(
      <Container asChild ref={ownerRef} id="owner" measure="narrow" gutter="none"
        className="owner-class" style={{ color: "red" }} onClick={() => calls.push("owner")}>
        <article ref={childRef} id="child" title="Preserved" className="child-class"
          style={{ color: "blue", paddingBlock: "7px" }} onClick={() => calls.push("child")}>Content</article>
      </Container>,
    );
    const host = screen.getByTitle("Preserved");
    expect(host.tagName).toBe("ARTICLE");
    expect(host).toBe(ownerRef.current);
    expect(host).toBe(childRef.current);
    expect(host).toHaveClass("brick-container", "owner-class", "child-class");
    expect(host).toHaveAttribute("id", "owner");
    expect(host).toHaveAttribute("data-measure", "narrow");
    expect(host).toHaveStyle({ color: "rgb(255, 0, 0)", paddingBlock: "7px" });
    expect(host).not.toHaveAttribute("asChild");
    fireEvent.click(host);
    expect(calls).toEqual(["owner", "child"]);
    unmount();
    expect(ownerRef.current).toBeNull();
    expect(childRef.current).toBeNull();
  });

  it("preserves child-only inline styles and custom forwarding hosts", () => {
    const Host = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => <article {...props} ref={ref} />);
    const ref = createRef<HTMLElement>();
    render(<Container asChild ref={ref}><Host style={{ maxInlineSize: "30rem" }}>Custom</Host></Container>);
    expect(ref.current?.tagName).toBe("ARTICLE");
    expect(ref.current?.style.maxInlineSize).toBe("30rem");
    expect(ref.current).toHaveClass("brick-container");
  });

  it("composes callback cleanup without losing the other ref", () => {
    const ref = createRef<HTMLElement>();
    let cleaned = 0;
    const { unmount } = render(<Container asChild ref={ref}><article ref={() => () => { cleaned++; }}>Content</article></Container>);
    expect(ref.current?.tagName).toBe("ARTICLE");
    unmount();
    expect(cleaned).toBe(1);
    expect(ref.current).toBeNull();
  });

  it("rejects invalid adopted children and renders the same host during SSR", () => {
    for (const child of [undefined, "text", [createElement("div"), createElement("div")], createElement(Fragment, null, "text")]) {
      expect(() => renderToStaticMarkup(createElement(Container, { asChild: true, children: child } as never))).toThrow();
    }
    const html = renderToStaticMarkup(<Container asChild><article>SSR</article></Container>);
    expect(html).toMatch(/^<article /);
    expect(html).not.toContain("<div");
    expect(html).toContain('data-measure="wide"');
  });
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
