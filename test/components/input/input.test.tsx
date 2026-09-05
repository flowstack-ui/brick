import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../../../src/field.js";
import {
  Input,
  type InputShape,
  type InputSize,
  type InputVariant,
} from "../../../src/input.js";

describe("Input", () => {
  it("owns the adopted default wrapper and native control", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input aria-label="Project name" ref={ref} />);

    const control = screen.getByRole("textbox", { name: "Project name" });
    const root = control.closest(".brick-input");
    expect(control).toBe(ref.current);
    expect(control).toHaveClass("brick-input-control");
    expect(control).toHaveAttribute("data-slot", "input-control");
    expect(control).toHaveAttribute("type", "text");
    expect(root).toHaveClass("brick-input");
    expect(root).toHaveAttribute("data-slot", "input");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-size", "lg");
    expect(root).toHaveAttribute("data-shape", "rounded");
    expect(root).toHaveAttribute("data-full-width", "");
  });

  it("exposes every closed visual recipe without leaking props", () => {
    const variants: InputVariant[] = ["outline", "soft", "underline"];
    const sizes: InputSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
    const shapes: InputShape[] = ["sharp", "rounded", "pill"];
    const { rerender } = render(<Input aria-label="Recipe" />);
    const control = screen.getByRole("textbox", { name: "Recipe" });

    for (const variant of variants) {
      rerender(<Input aria-label="Recipe" variant={variant} />);
      const root = control.closest(".brick-input");
      expect(root).toHaveAttribute("data-variant", variant);
      if (variant === "underline") {
        expect(root).not.toHaveAttribute("data-shape");
      }
    }

    for (const size of sizes) {
      rerender(<Input aria-label="Recipe" size={size} />);
      expect(control.closest(".brick-input")).toHaveAttribute("data-size", size);
    }

    for (const shape of shapes) {
      rerender(<Input aria-label="Recipe" shape={shape} />);
      expect(control.closest(".brick-input")).toHaveAttribute("data-shape", shape);
    }

    rerender(<Input aria-label="Recipe" fullWidth={false} />);
    const root = control.closest(".brick-input");
    expect(root).not.toHaveAttribute("data-full-width");
    expect(root).not.toHaveAttribute("variant");
    expect(root).not.toHaveAttribute("shape");
    expect(control).not.toHaveAttribute("clearable");
    expect(control).not.toHaveAttribute("inputclassname");
  });

  it("supports explicit and sparse responsive sizes", () => {
    const { rerender } = render(<Input aria-label="Responsive" size={{ initial: "sm", lg: "xl" }} />);
    const root = screen.getByRole("textbox").closest(".brick-input");
    expect(root).toHaveAttribute("data-size", "sm");
    expect(root).toHaveAttribute("data-size-lg", "xl");
    rerender(<Input aria-label="Responsive" size={{ lg: "2xl" }} />);
    expect(root).toHaveAttribute("data-size", "lg");
    expect(root).toHaveAttribute("data-size-lg", "2xl");
  });

  it("routes native props and wrapper/input customization deliberately", () => {
    render(
      <Input
        aria-describedby="email-help"
        aria-label="Email"
        className="consumer-root"
        data-evidence="native"
        inputClassName="consumer-control"
        inputStyle={{ letterSpacing: "2px" }}
        name="email"
        placeholder="name@example.com"
        style={{ marginInlineStart: 4 }}
        type="email"
      />,
    );

    const control = screen.getByRole("textbox", { name: "Email" });
    const root = control.closest(".brick-input");
    expect(root).toHaveClass("brick-input", "consumer-root");
    expect(root).toHaveStyle({ marginInlineStart: "4px" });
    expect(control).toHaveClass("brick-input-control", "consumer-control");
    expect(control).toHaveStyle({ letterSpacing: "2px" });
    expect(control).toHaveAttribute("data-evidence", "native");
    expect(control).toHaveAttribute("name", "email");
    expect(control).toHaveAttribute("type", "email");
    expect(control).toHaveAttribute("placeholder", "name@example.com");
    expect(control).toHaveAttribute("aria-describedby", "email-help");
  });

  it("preserves controlled and uncontrolled Atom value adaptation", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const onChange = vi.fn();
    const { rerender } = render(
      <Input
        aria-label="Query"
        defaultValue="Brick"
        onChange={onChange}
        onValueChange={onValueChange}
      />,
    );
    const control = screen.getByRole("textbox", { name: "Query" });
    await user.type(control, " UI");
    expect(control).toHaveValue("Brick UI");
    expect(onValueChange).toHaveBeenLastCalledWith("Brick UI");
    expect(onChange).toHaveBeenCalled();

    rerender(
      <Input
        aria-label="Query"
        onValueChange={onValueChange}
        value="Controlled"
      />,
    );
    expect(control).toHaveValue("Controlled");
  });

  it("renders logical adornments and delegates clear behavior to Atom", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(
      <Input
        aria-label="Search"
        clearLabel="Effacer la recherche"
        clearable
        defaultValue="Brick"
        endAdornment={<span data-testid="shortcut">⌘K</span>}
        onClear={onClear}
        startAdornment={<svg aria-hidden="true" data-testid="search-icon" />}
        type="search"
      />,
    );

    const control = screen.getByRole("searchbox", { name: "Search" });
    const root = control.closest(".brick-input")!;
    expect(root.children).toHaveLength(4);
    expect(root.children[0]).toHaveAttribute("data-slot", "input-start");
    expect(root.children[1]).toBe(control);
    expect(root.children[2]).toHaveAttribute("data-slot", "input-end");
    expect(root.children[3]).toHaveAttribute("data-slot", "input-clear");
    expect(screen.getByTestId("search-icon")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("shortcut")).toHaveTextContent("⌘K");

    const clear = screen.getByRole("button", { name: "Effacer la recherche" });
    expect(clear).toHaveAttribute("tabindex", "-1");
    await user.click(clear);
    expect(control).toHaveValue("");
    expect(control).toHaveFocus();
    expect(onClear).toHaveBeenCalledOnce();
    expect(clear).toBeDisabled();
    expect(clear).toHaveAttribute("data-hidden", "");
  });

  it("preserves Field-owned relationships and state", () => {
    render(
      <Field.Root id="account-email" invalid readOnly required>
        <Field.Label>Email</Field.Label>
        <Input name="email" />
        <Field.Description>Use your work address.</Field.Description>
        <Field.Error>Enter a valid address.</Field.Error>
      </Field.Root>,
    );

    const control = screen.getByRole("textbox", { name: "Email" });
    expect(control).toHaveAttribute("id", "account-email-control");
    expect(control).toHaveAttribute("required");
    expect(control).toHaveAttribute("readonly");
    expect(control).toHaveAttribute("aria-required", "true");
    expect(control).toHaveAttribute("aria-readonly", "true");
    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(control).toHaveAttribute(
      "aria-describedby",
      "account-email-description account-email-error",
    );
    expect(control).toHaveAttribute("data-required", "");
    expect(control).toHaveAttribute("data-readonly", "");
    expect(control).toHaveAttribute("data-invalid", "");
  });

  it("keeps clear unavailable for empty, disabled, and read-only values", () => {
    const { rerender } = render(<Input aria-label="Value" clearable />);
    let clear = document.querySelector(".brick-input-clear") as HTMLButtonElement;
    expect(clear).toBeDisabled();
    expect(clear).toHaveAttribute("aria-hidden", "true");

    rerender(
      <Input aria-label="Value" clearable defaultValue="Disabled" disabled />,
    );
    clear = document.querySelector(".brick-input-clear") as HTMLButtonElement;
    expect(clear).toBeDisabled();
    expect(clear).toHaveAttribute("data-disabled", "");

    rerender(
      <Input aria-label="Value" clearable defaultValue="Read only" readOnly />,
    );
    clear = document.querySelector(".brick-input-clear") as HTMLButtonElement;
    expect(clear).toBeDisabled();
    expect(clear).toHaveAttribute("data-disabled", "");
  });
});
