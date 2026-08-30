import { createElement, createRef } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CodeBlock } from "../../../src/code-block.js";

const source = "const answer = 42;";

function CompleteBlock({ writeValue = vi.fn().mockResolvedValue(undefined) }) {
  return <CodeBlock.Root language="tsx" timeout={1000} value={source} writeValue={writeValue}>
    <CodeBlock.Header>
      <CodeBlock.Title>Example</CodeBlock.Title>
      <CodeBlock.Language />
      <CodeBlock.Actions><CodeBlock.CopyTrigger>Copy</CodeBlock.CopyTrigger></CodeBlock.Actions>
    </CodeBlock.Header>
    <CodeBlock.Content aria-label="Example source" />
    <CodeBlock.CopyStatus>
      <CodeBlock.CopyIndicator when="copied">Copied</CodeBlock.CopyIndicator>
      <CodeBlock.CopyIndicator when="error">Failed</CodeBlock.CopyIndicator>
    </CodeBlock.CopyStatus>
  </CodeBlock.Root>;
}

describe("CodeBlock", () => {
  it("renders only authored anatomy and canonical pre/code structure", () => {
    const ref = createRef<HTMLDivElement>();
    render(<CodeBlock.Root ref={ref} value={source}><CodeBlock.Content aria-label="Source" /></CodeBlock.Root>);
    const root = ref.current!;
    const viewport = screen.getByRole("region", { name: "Source" });
    expect(root).toHaveClass("brick-code-block");
    expect(root).toHaveAttribute("data-slot", "code-block");
    expect(root).toHaveAttribute("data-variant", "subtle");
    expect(root).toHaveAttribute("data-size", "md");
    expect(viewport).toHaveAttribute("data-slot", "code-block-content");
    expect(viewport).toHaveAttribute("data-wrap", "scroll");
    expect(viewport).toHaveAttribute("dir", "ltr");
    expect(viewport).toHaveAttribute("tabindex", "0");
    expect(viewport.querySelector("pre > code")).toHaveTextContent(source);
    expect(root.querySelector("[data-slot='code-block-header']")).toBeNull();
    expect(root.querySelector("button")).toBeNull();
  });

  it("renders complete optional anatomy, metadata, and highlighted nodes", () => {
    render(<CodeBlock.Root language="TSX" size="sm" value={source} variant="bordered"><CodeBlock.Header><CodeBlock.Title>Example</CodeBlock.Title><CodeBlock.Language /><CodeBlock.Actions>Actions</CodeBlock.Actions></CodeBlock.Header><CodeBlock.Content aria-label="Highlighted source"><span className="token-keyword">const</span> answer = 42;</CodeBlock.Content></CodeBlock.Root>);
    expect(screen.getByText("TSX")).toHaveAttribute("data-slot", "code-block-language");
    const root = screen.getByText("Example").closest("[data-slot='code-block']")!;
    expect(root).toHaveAttribute("data-language", "TSX");
    expect(root).toHaveAttribute("data-size", "sm");
    expect(root).toHaveAttribute("data-variant", "bordered");
    expect(root.querySelector("code")).toHaveClass("language-tsx");
    expect(root.querySelector(".token-keyword")).toHaveTextContent("const");
  });

  it("copies Root value rather than rendered highlighted text", async () => {
    const writeValue = vi.fn().mockResolvedValue(undefined);
    render(<CodeBlock.Root value={source} writeValue={writeValue}><CodeBlock.Content aria-label="Source"><span>different rendered tokens</span></CodeBlock.Content><CodeBlock.CopyTrigger>Copy</CodeBlock.CopyTrigger><CodeBlock.CopyStatus><CodeBlock.CopyIndicator when="copied">Copied</CodeBlock.CopyIndicator></CodeBlock.CopyStatus></CodeBlock.Root>);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeValue).toHaveBeenCalledWith(source));
    expect(await screen.findByText("Copied")).toBeVisible();
    expect(document.activeElement).not.toBeNull();
  });

  it("reports copy rejection truthfully", async () => {
    render(<CompleteBlock writeValue={vi.fn().mockRejectedValue(new Error("denied"))} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(await screen.findByText("Failed")).toBeVisible();
    expect(screen.queryByText("Copied")).toBeNull();
  });

  it("forwards part refs, native props, classes, slots, and wrap", () => {
    const contentRef = createRef<HTMLDivElement>();
    render(<CodeBlock.Root className="root-custom" data-owner="docs" value={source}><CodeBlock.Header className="header-custom"><CodeBlock.Title data-slot="title-custom">Title</CodeBlock.Title></CodeBlock.Header><CodeBlock.Content className="content-custom" data-owner="source" data-slot="content-custom" focusable={false} ref={contentRef} style={{ maxBlockSize: 200 }} wrap="wrap" /></CodeBlock.Root>);
    expect(screen.getByText("Title")).toHaveAttribute("data-slot", "title-custom");
    expect(contentRef.current).toHaveClass("brick-code-block-content", "content-custom");
    expect(contentRef.current).toHaveAttribute("data-slot", "content-custom");
    expect(contentRef.current).toHaveAttribute("data-wrap", "wrap");
    expect(contentRef.current).not.toHaveAttribute("tabindex");
    expect(contentRef.current).toHaveStyle({ maxBlockSize: "200px" });
  });

  it("renders trusted adapter output and independent line metadata", () => {
    const adapter = vi.fn(({ value }: { value: string }) => value.split("\n").map((line, index) => (
      <CodeBlock.Line
        change={index === 1 ? "added" : undefined}
        focused={index === 0}
        highlighted={index === 1}
        key={index}
        lineNumber={index + 1}
      >
        {line}
      </CodeBlock.Line>
    )));
    render(
      <CodeBlock.Root adapter={adapter} language="ts" value={"const first = 1;\nconst second = 2;"}>
        <CodeBlock.Content aria-label="Adapted source" />
      </CodeBlock.Root>,
    );
    expect(adapter).toHaveBeenCalledWith({ language: "ts", value: "const first = 1;\nconst second = 2;" });
    const lines = screen.getByRole("region", { name: "Adapted source" }).querySelectorAll("[data-slot='code-block-line']");
    expect(lines).toHaveLength(2);
    expect(lines[0]).toHaveAttribute("data-focused", "");
    expect(lines[0]).toHaveAttribute("data-line-number", "1");
    expect(lines[1]).toHaveAttribute("data-change", "added");
    expect(lines[1]).toHaveAttribute("data-highlighted", "");
    expect(lines[1].querySelector("[data-slot='code-block-line-content']")).toHaveTextContent("const second = 2;");
  });

  it("rejects injected HTML on Root, Content, and Line for untyped consumers", () => {
    const injected = { __html: "<img data-unsafe src=x>" };
    const line = createElement(
      CodeBlock.Line as never,
      { dangerouslySetInnerHTML: injected },
      "safe line",
    );
    const content = createElement(
      CodeBlock.Content as never,
      { "aria-label": "Safe source", dangerouslySetInnerHTML: injected },
      line,
    );
    const { container } = render(createElement(
      CodeBlock.Root as never,
      { dangerouslySetInnerHTML: injected, value: "safe line" },
      content,
    ));

    expect(container.querySelector("[data-unsafe]")).toBeNull();
    expect(screen.getByRole("region", { name: "Safe source" })).toHaveTextContent("safe line");
  });

  it("lets explicit Content children override the optional adapter", () => {
    const adapter = vi.fn(() => "adapter output");
    render(
      <CodeBlock.Root adapter={adapter} value={source}>
        <CodeBlock.Content aria-label="Explicit source">explicit output</CodeBlock.Content>
      </CodeBlock.Root>,
    );
    expect(screen.getByRole("region", { name: "Explicit source" })).toHaveTextContent("explicit output");
    expect(adapter).not.toHaveBeenCalled();
  });

  it("bounds positive whole line counts and composes Collapsible disclosure state", () => {
    const adapter = vi.fn(({ value }: { value: string }) => value);
    render(
      <CodeBlock.Collapse>
        <CodeBlock.Root adapter={adapter} value={source}>
          <CodeBlock.CollapsePreview>
            <CodeBlock.Content aria-label="Bounded source preview" maxLines={4} />
          </CodeBlock.CollapsePreview>
          <CodeBlock.CollapseContent>
            <CodeBlock.Content aria-label="Full bounded source" />
          </CodeBlock.CollapseContent>
          <CodeBlock.CollapseTrigger>Show full source</CodeBlock.CollapseTrigger>
        </CodeBlock.Root>
      </CodeBlock.Collapse>,
    );
    const region = screen.getByRole("region", { name: "Bounded source preview" });
    const trigger = screen.getByRole("button", { name: "Show full source" });
    expect(region).toHaveAttribute("data-max-lines", "4");
    expect(region.style.getPropertyValue("--brick-code-block-max-block-size")).toBe("4lh");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById(trigger.getAttribute("aria-controls")!)).toBeNull();
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById(trigger.getAttribute("aria-controls")!)).toHaveAttribute("data-slot", "code-block-collapse-content");
    expect(screen.getByRole("region", { name: "Full bounded source" })).toBeVisible();
    expect(adapter).toHaveBeenCalledTimes(1);
  });
});
