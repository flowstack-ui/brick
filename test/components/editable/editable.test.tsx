import { createRef, useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Editable, useEditable } from "../../../src/editable.js";
import { Field } from "../../../src/field.js";

describe("Editable", () => {
  it("preserves refs, recipes and empty cancellation without leaking props", () => {
    const ref = createRef<HTMLInputElement>();
    const commit = vi.fn();
    const { container } = render(
      <Editable.Root
        size="sm"
        defaultValue=""
        placeholder="Untitled"
        onValueCommit={commit}
      >
        <Editable.Label>Name</Editable.Label>
        <Editable.Area>
          <Editable.Preview />
          <Editable.Input ref={ref} />
        </Editable.Area>
      </Editable.Root>,
    );
    fireEvent.focus(screen.getByRole("button", { name: "Untitled" }));
    expect(ref.current).toBe(screen.getByRole("textbox", { name: "Name" }));
    fireEvent.change(ref.current!, { target: { value: "Draft" } });
    fireEvent.keyDown(ref.current!, { key: "Escape" });
    expect(screen.getByRole("button", { name: "Untitled" })).toBeVisible();
    expect(commit).not.toHaveBeenCalled();
    expect(container.firstChild).toHaveAttribute("data-size", "sm");
    expect(container.firstChild).not.toHaveAttribute("size");
  });
  it("inherits Field state and supports explicit enabled overrides", () => {
    render(
      <Field.Root disabled>
        <Field.Label>Locked</Field.Label>
        <Editable.Root defaultValue="Value">
          <Editable.Area>
            <Editable.Preview />
            <Editable.Input />
          </Editable.Area>
        </Editable.Root>
      </Field.Root>,
    );
    expect(screen.getByText("Value")).not.toHaveAttribute("tabindex", "0");
    expect(screen.getByLabelText("Locked")).toBeDisabled();
  });
  it("composes provider, context and projected controls", () => {
    function Example() {
      const [saved, save] = useState("");
      const controller = useEditable({
        defaultValue: "Before",
        activationMode: "none",
        onValueCommit: ({ value }) => save(value),
      });
      return (
        <>
          <Editable.RootProvider value={controller}>
            <Editable.Area>
              <Editable.Preview />
              <Editable.Input aria-label="Provider name" />
            </Editable.Area>
            <Editable.Control>
              <Editable.EditTrigger asChild>
                <button>Edit name</button>
              </Editable.EditTrigger>
              <Editable.SubmitTrigger>Save name</Editable.SubmitTrigger>
              <Editable.CancelTrigger>Cancel name</Editable.CancelTrigger>
            </Editable.Control>
            <Editable.Context>
              {(value) => <span>{value.editing ? "Editing" : "Preview"}</span>}
            </Editable.Context>
          </Editable.RootProvider>
          <output>{saved}</output>
        </>
      );
    }
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Edit name" }));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "After" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save name" }));
    expect(screen.getByRole("status")).toHaveTextContent("After");
  });
});
