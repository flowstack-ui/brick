import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { EmptyState } from "../../../src/empty-state.js";
describe("EmptyState", () => {
  it("renders five optional parts with independent heading semantics", () => {
    const root = createRef<HTMLElement>(); const title = createRef<HTMLHeadingElement>();
    render(<EmptyState.Root ref={root}><EmptyState.Content><EmptyState.Indicator>+</EmptyState.Indicator><EmptyState.Title ref={title}>No projects</EmptyState.Title><EmptyState.Description>Create your first project.</EmptyState.Description></EmptyState.Content></EmptyState.Root>);
    expect(root.current?.tagName).toBe("DIV");
    expect(root.current).toHaveAttribute("data-size", "md");
    expect(root.current).toHaveAttribute("data-align", "center");
    expect(root.current).not.toHaveAttribute("role");
    expect(title.current).toBe(screen.getByRole("heading", { level: 3 }));
    expect(screen.getByText("Create your first project.").tagName).toBe("P");
  });
  it("uses the requested heading level without selecting type from semantics", () => {
    render(<EmptyState.Root size="sm"><EmptyState.Title as="h2">No projects</EmptyState.Title></EmptyState.Root>);
    expect(screen.getByRole("heading", { level: 2 })).toHaveClass("brick-empty-state-title");
  });
  it("preserves native customization and valid host projection", () => {
    const ref = createRef<HTMLElement>();
    render(<EmptyState.Root asChild ref={ref} size="lg" align="start" className="outer"><section className="inner" aria-label="Projects">No projects</section></EmptyState.Root>);
    expect(screen.getByRole("region", { name: "Projects" })).toBe(ref.current);
    expect(ref.current).toHaveClass("inner", "outer", "brick-empty-state");
    expect(ref.current).not.toHaveAttribute("size"); expect(ref.current).not.toHaveAttribute("align");
  });
  it("does not silence authored informative imagery or impose state", () => {
    render(<EmptyState.Root><EmptyState.Indicator><img alt="Empty archive" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" /></EmptyState.Indicator></EmptyState.Root>);
    expect(screen.getByRole("img", { name: "Empty archive" })).toBeInTheDocument();
  });
  it("has deterministic SSR without loading or detection logic", () => {
    const markup = renderToString(<EmptyState.Root><EmptyState.Description>No results</EmptyState.Description></EmptyState.Root>);
    expect(markup).toBe(renderToString(<EmptyState.Root><EmptyState.Description>No results</EmptyState.Description></EmptyState.Root>));
    expect(markup).not.toContain("aria-live");
  });
});
