import { createRef } from "react";
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
});
