import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../../../src/field.js";
import {
  Textarea,
  type TextareaResize,
  type TextareaShape,
  type TextareaSize,
  type TextareaVariant,
} from "../../../src/textarea.js";

describe("Textarea", () => {
  it("owns the adopted wrapper, native control, defaults, and ref", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea.Root aria-label="Project summary" ref={ref} />);

    const control = screen.getByRole("textbox", { name: "Project summary" });
    const root = control.closest(".brick-textarea");
    expect(control).toBe(ref.current);
    expect(control.tagName).toBe("TEXTAREA");
    expect(control).toHaveClass("brick-textarea-control");
    expect(control).toHaveAttribute("data-slot", "textarea-control");
    expect(control).toHaveAttribute("rows", "3");
    expect(root).toHaveAttribute("data-slot", "textarea");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-shape", "rounded");
    expect(root).toHaveAttribute("data-resize", "vertical");
    expect(root).toHaveAttribute("data-full-width", "");
    expect(root).not.toHaveAttribute("data-autoresize");
  });

  it("exposes every closed visual recipe without leaking Brick props", () => {
    const variants: TextareaVariant[] = ["outline", "soft", "underline"];
    const sizes: TextareaSize[] = ["sm", "md", "lg"];
    const shapes: TextareaShape[] = ["sharp", "rounded"];
    const resizeModes: TextareaResize[] = ["none", "vertical", "horizontal", "both"];
    const { rerender } = render(<Textarea.Root aria-label="Recipe" />);
    const control = screen.getByRole("textbox", { name: "Recipe" });

    for (const variant of variants) {
      rerender(
        variant === "underline" ? (
          <Textarea.Root aria-label="Recipe" variant="underline" />
        ) : (
          <Textarea.Root aria-label="Recipe" variant={variant} />
        ),
      );
      const root = control.closest(".brick-textarea");
      expect(root).toHaveAttribute("data-variant", variant);
      if (variant === "underline") expect(root).not.toHaveAttribute("data-shape");
    }
    for (const size of sizes) {
      rerender(<Textarea.Root aria-label="Recipe" size={size} />);
      expect(control.closest(".brick-textarea")).toHaveAttribute("data-size", size);
    }
    for (const shape of shapes) {
      rerender(<Textarea.Root aria-label="Recipe" shape={shape} />);
      expect(control.closest(".brick-textarea")).toHaveAttribute("data-shape", shape);
    }
    for (const resize of resizeModes) {
      rerender(<Textarea.Root aria-label="Recipe" resize={resize} />);
      expect(control.closest(".brick-textarea")).toHaveAttribute("data-resize", resize);
    }
    rerender(<Textarea.Root aria-label="Recipe" fullWidth={false} />);
    const root = control.closest(".brick-textarea");
    expect(root).not.toHaveAttribute("data-full-width");
    expect(root).not.toHaveAttribute("variant");
    expect(root).not.toHaveAttribute("shape");
    expect(control).not.toHaveAttribute("resize");
    expect(control).not.toHaveAttribute("textareaclassname");
  });

  it("routes native and customization props to their deliberate targets", () => {
    render(
      <Textarea.Root
        aria-describedby="summary-help"
        aria-label="Summary"
        className="consumer-root"
        data-evidence="native"
        name="summary"
        placeholder="Explain the result"
        style={{ marginInlineStart: 4 }}
        textareaClassName="consumer-control"
        textareaStyle={{ letterSpacing: "2px" }}
        wrap="soft"
      />,
    );
    const control = screen.getByRole("textbox", { name: "Summary" });
    const root = control.closest(".brick-textarea");
    expect(root).toHaveClass("brick-textarea", "consumer-root");
    expect(root).toHaveStyle({ marginInlineStart: "4px" });
    expect(control).toHaveClass("brick-textarea-control", "consumer-control");
    expect(control).toHaveStyle({ letterSpacing: "2px" });
    expect(control).toHaveAttribute("data-evidence", "native");
    expect(control).toHaveAttribute("name", "summary");
    expect(control).toHaveAttribute("placeholder", "Explain the result");
    expect(control).toHaveAttribute("wrap", "soft");
    expect(control).toHaveAttribute("aria-describedby", "summary-help");
  });

  it("preserves Atom value changes, native newlines, and Count state", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onValueChange = vi.fn();
    render(
      <Textarea.Root
        aria-label="Notes"
        defaultValue="Brick"
        maxLength={20}
        onChange={onChange}
        onValueChange={onValueChange}
      >
        <Textarea.Count data-testid="count" />
      </Textarea.Root>,
    );
    const control = screen.getByRole("textbox", { name: "Notes" });
    await user.type(control, "{enter}UI");
    expect(control).toHaveValue("Brick\nUI");
    expect(onValueChange).toHaveBeenLastCalledWith("Brick\nUI");
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByTestId("count")).toHaveTextContent("8/20");
    expect(screen.getByTestId("count")).toHaveAttribute("aria-live", "polite");
    expect(screen.getByTestId("count")).toHaveAttribute("data-count", "8");
  });

  it("delegates bounded auto-resize metadata to Atom", () => {
    render(
      <Textarea.Root
        aria-label="Growing notes"
        autoResize
        maxRows={6}
        minRows={2}
      />,
    );
    const control = screen.getByRole("textbox", { name: "Growing notes" });
    const root = control.closest(".brick-textarea");
    expect(root).toHaveAttribute("data-autoresize", "");
    expect(root).toHaveAttribute("data-resize", "none");
    expect(control).toHaveAttribute("data-autoresize", "");
    expect(control).toHaveAttribute("rows", "2");
  });

  it("preserves Field relationships and state", () => {
    render(
      <Field.Root id="project-summary" invalid readOnly required>
        <Field.Label>Project summary</Field.Label>
        <Textarea.Root name="summary" />
        <Field.Description>Explain the intended result.</Field.Description>
        <Field.Error>Enter a usable summary.</Field.Error>
      </Field.Root>,
    );
    const control = screen.getByRole("textbox", { name: "Project summary" });
    expect(control).toHaveAttribute("id", "project-summary-control");
    expect(control).toHaveAttribute("required");
    expect(control).toHaveAttribute("readonly");
    expect(control).toHaveAttribute("aria-required", "true");
    expect(control).toHaveAttribute("aria-readonly", "true");
    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(control).toHaveAttribute(
      "aria-describedby",
      "project-summary-description project-summary-error",
    );
    expect(control).toHaveAttribute("data-invalid", "");
  });
});
