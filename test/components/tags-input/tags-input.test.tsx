import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TagsInput } from "../../../src/tags-input.js";
import { Field } from "../../../src/field.js";
describe("TagsInput", () => {
  it("preserves native refs, sparse recipes and JSON values", () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(
      <TagsInput.Root size={{ lg: "xl" }} name="tags" defaultValue={["a,b"]}>
        <TagsInput.Label>Topics</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input ref={ref} />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput.Root>,
    );
    expect(container.firstChild).toHaveAttribute("data-size", "lg");
    expect(container.firstChild).toHaveAttribute("data-size-lg", "xl");
    expect(container.firstChild).not.toHaveAttribute("size");
    expect(ref.current).toBe(screen.getByRole("textbox", { name: "Topics" }));
    expect(container.querySelector('[name="tags"]')).toHaveValue('["a,b"]');
    fireEvent.change(ref.current!, { target: { value: "Other" } });
    fireEvent.keyDown(ref.current!, { key: "Enter" });
    expect(container.querySelector('[name="tags"]')).toHaveValue(
      '["a,b","Other"]',
    );
  });
  it("inherits Field state while preserving explicit overrides", () => {
    render(
      <Field.Root disabled>
        <Field.Label>Tags</Field.Label>
        <TagsInput.Root disabled={false}>
          <TagsInput.Control>
            <TagsInput.Input />
          </TagsInput.Control>
        </TagsInput.Root>
      </Field.Root>,
    );
    expect(screen.getByLabelText("Tags")).not.toBeDisabled();
  });
  it("retains disabled values on clear and uses default accessible artwork", () => {
    render(
      <TagsInput.Root defaultValue={["Locked", "Open"]}>
        <TagsInput.Control>
          <TagsInput.Items disabled={(value) => value === "Locked"} />
          <TagsInput.Input aria-label="Topics" />
          <TagsInput.ClearTrigger />
        </TagsInput.Control>
      </TagsInput.Root>,
    );
    expect(
      screen.getByRole("button", { name: "Remove Locked" }),
    ).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Clear tags" }));
    expect(screen.getByText("Locked")).toBeVisible();
    expect(screen.queryByText("Open")).toBeNull();
    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});
