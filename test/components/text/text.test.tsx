import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Caption,
  Eyebrow,
  Heading,
  Paragraph,
  Text,
  type TextAlign,
  type TextElement,
  type TextLineClamp,
  type TextTone,
  type TextTransform,
  type TextVariant,
  type TextWeight,
  type TextWrap,
} from "../../../src/text.js";

describe("Text", () => {
  it("renders the adopted inline default without invented semantics", () => {
    const ref = createRef<HTMLElement>();
    render(<Text ref={ref}>Build dependable interfaces.</Text>);
    const text = screen.getByText("Build dependable interfaces.");

    expect(text.tagName).toBe("SPAN");
    expect(text).toBe(ref.current);
    expect(text).toHaveClass("brick-text");
    expect(text).toHaveAttribute("data-slot", "text");
    expect(text).toHaveAttribute("data-variant", "body-md");
    expect(text).toHaveAttribute("data-tone", "primary");
    expect(text).not.toHaveAttribute("role");
    expect(text).not.toHaveAttribute("data-weight");
    expect(text).not.toHaveAttribute("data-align");
    expect(text).not.toHaveAttribute("data-wrap");
  });

  it("keeps every semantic host independent from the visual recipe", () => {
    const elements: TextElement[] = [
      "span", "p", "div", "h1", "h2", "h3", "h4", "h5", "h6",
    ];
    const { rerender } = render(<Text>Semantic text</Text>);

    for (const as of elements) {
      rerender(<Text as={as} variant="body-sm">Semantic text</Text>);
      const text = screen.getByText("Semantic text");
      expect(text.tagName).toBe(as.toUpperCase());
      expect(text).toHaveAttribute("data-variant", "body-sm");
    }
  });

  it("exposes every closed visual recipe through stable metadata", () => {
    const variants: TextVariant[] = [
      "display", "display-sm", "display-md", "display-lg", "display-xl",
      "title-xl", "title-lg", "title-md", "title-sm", "title-xs", "title-2xs",
      "body-xl", "body-lg", "body-md", "body-sm", "caption", "eyebrow",
    ];
    const tones: TextTone[] = [
      "inherit", "primary", "secondary", "muted", "accent",
      "info", "success", "warning", "danger",
    ];
    const weights: TextWeight[] = ["inherit", "regular", "medium", "semibold"];
    const aligns: TextAlign[] = ["start", "center", "end"];
    const wraps: TextWrap[] = ["wrap", "nowrap", "balance", "pretty"];
    const transforms: TextTransform[] = ["none", "uppercase", "lowercase", "capitalize"];
    const clamps: TextLineClamp[] = [2, 3, 4, 5, 6];
    const { rerender } = render(<Text>Recipe text</Text>);

    for (const variant of variants) {
      rerender(<Text variant={variant}>Recipe text</Text>);
      expect(screen.getByText("Recipe text")).toHaveAttribute("data-variant", variant);
    }
    for (const tone of tones) {
      rerender(<Text tone={tone}>Recipe text</Text>);
      expect(screen.getByText("Recipe text")).toHaveAttribute("data-tone", tone);
    }
    for (const weight of weights) {
      rerender(<Text weight={weight}>Recipe text</Text>);
      expect(screen.getByText("Recipe text")).toHaveAttribute("data-weight", weight);
    }
    for (const align of aligns) {
      rerender(<Text align={align}>Recipe text</Text>);
      expect(screen.getByText("Recipe text")).toHaveAttribute("data-align", align);
    }
    for (const wrap of wraps) {
      rerender(<Text wrap={wrap}>Recipe text</Text>);
      const text = screen.getByText("Recipe text");
      if (wrap === "wrap") expect(text).not.toHaveAttribute("data-wrap");
      else expect(text).toHaveAttribute("data-wrap", wrap);
    }
    for (const transform of transforms) {
      rerender(<Text transform={transform}>Recipe text</Text>);
      expect(screen.getByText("Recipe text")).toHaveAttribute("data-transform", transform);
    }
    for (const lineClamp of clamps) {
      rerender(<Text lineClamp={lineClamp}>Recipe text</Text>);
      expect(screen.getByText("Recipe text")).toHaveAttribute(
        "data-line-clamp",
        String(lineClamp),
      );
    }
  });

  it("emits responsive visual recipes without changing the semantic host", () => {
    render(
      <Heading
        level={1}
        align={{ initial: "center", lg: "start" }}
        variant={{ initial: "display-sm", md: "display-md", lg: "display-xl" }}
      >
        Responsive product heading
      </Heading>,
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.tagName).toBe("H1");
    expect(heading).toHaveAttribute("data-variant", "display-sm");
    expect(heading).toHaveAttribute("data-variant-md", "display-md");
    expect(heading).toHaveAttribute("data-variant-lg", "display-xl");
    expect(heading).toHaveAttribute("data-align", "center");
    expect(heading).toHaveAttribute("data-align-lg", "start");
  });

  it("provides named semantic text components without coupling hierarchy to appearance", () => {
    render(
      <>
        <Heading level={3}>Project settings</Heading>
        <Heading level={2} variant="title-sm">Compact section</Heading>
        <Heading level={4} variant="title-xs">Small feature title</Heading>
        <Heading level={4} variant="title-2xs">Dense navigation group</Heading>
        <Paragraph>Readable supporting copy.</Paragraph>
        <Paragraph variant="body-xl">Prominent supporting copy.</Paragraph>
        <Caption>5 Blocks</Caption>
        <Eyebrow>Application</Eyebrow>
      </>,
    );

    expect(screen.getByText("Project settings").tagName).toBe("H3");
    expect(screen.getByText("Project settings")).toHaveAttribute("data-variant", "title-md");
    expect(screen.getByText("Compact section").tagName).toBe("H2");
    expect(screen.getByText("Compact section")).toHaveAttribute("data-variant", "title-sm");
    expect(screen.getByText("Dense navigation group").tagName).toBe("H4");
    expect(screen.getByText("Small feature title")).toHaveAttribute("data-variant", "title-xs");
    expect(screen.getByText("Dense navigation group")).toHaveAttribute("data-variant", "title-2xs");
    expect(screen.getByText("Readable supporting copy.").tagName).toBe("P");
    expect(screen.getByText("Readable supporting copy.")).toHaveAttribute("data-variant", "body-md");
    expect(screen.getByText("Prominent supporting copy.")).toHaveAttribute("data-variant", "body-xl");
    expect(screen.getByText("5 Blocks").tagName).toBe("SPAN");
    expect(screen.getByText("5 Blocks")).toHaveAttribute("data-variant", "caption");
    expect(screen.getByText("Application")).toHaveAttribute("data-variant", "eyebrow");
  });

  it("forwards native attributes, events, consumer hooks, content, and ref", () => {
    const ref = createRef<HTMLElement>();
    let clicks = 0;
    render(
      <Text
        aria-describedby="copy-help"
        as="p"
        className="consumer-text"
        data-evidence="native"
        dir="rtl"
        id="copy"
        lang="ar"
        onClick={() => clicks++}
        ref={ref}
        slot="supporting-copy"
        style={{ maxInlineSize: 320 }}
      >
        <strong>نص</strong> واضح
      </Text>,
    );
    const text = screen.getByText("نص", { exact: false }).closest(".brick-text")!;
    fireEvent.click(text);

    expect(clicks).toBe(1);
    expect(text).toBe(ref.current);
    expect(text).toHaveClass("brick-text", "consumer-text");
    expect(text).toHaveAttribute("data-slot", "supporting-copy");
    expect(text).toHaveAttribute("data-evidence", "native");
    expect(text).toHaveAttribute("aria-describedby", "copy-help");
    expect(text).toHaveAttribute("dir", "rtl");
    expect(text).toHaveAttribute("lang", "ar");
    expect(text).toHaveStyle({ maxInlineSize: "320px" });
    expect(text.querySelector("strong")).toHaveTextContent("نص");
  });

  it("represents truncation and line clamping without leaking visual props", () => {
    const { rerender } = render(<Text truncate>Long content</Text>);
    let text = screen.getByText("Long content");
    expect(text).toHaveAttribute("data-truncate", "");
    expect(text).not.toHaveAttribute("truncate");

    rerender(<Text lineClamp={3}>Long content</Text>);
    text = screen.getByText("Long content");
    expect(text).not.toHaveAttribute("data-truncate");
    expect(text).toHaveAttribute("data-line-clamp", "3");
    expect(text).not.toHaveAttribute("lineclamp");
    expect(text).not.toHaveAttribute("variant");
    expect(text).not.toHaveAttribute("tone");
    expect(text).not.toHaveAttribute("weight");
    expect(text).not.toHaveAttribute("align");
    expect(text).not.toHaveAttribute("wrap");
  });
});
