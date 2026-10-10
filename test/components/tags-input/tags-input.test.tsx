import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TagsInput } from "../../../src/tags-input.js";
import { useTagsInput } from "../../../src/tags-input.js";
import { Field } from "../../../src/field.js";
describe("TagsInput", () => {
  it("serializes complete responsive variants identically through RootProvider", () => {
    function Provider() {
      const api = useTagsInput({ defaultValue: ["one"] });
      return <TagsInput.RootProvider value={api} variant={{ sm: "underline", lg: "subtle" }}><TagsInput.Control><TagsInput.Items className="shared-item" tone="contrast" /><TagsInput.Input aria-label="Topics" /></TagsInput.Control></TagsInput.RootProvider>;
    }
    const { container } = render(<Provider />);
    const root = container.querySelector(".brick-tags-input");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-variant-sm", "underline");
    expect(root).toHaveAttribute("data-variant-md", "underline");
    expect(root).toHaveAttribute("data-variant-lg", "subtle");
    expect(root).toHaveAttribute("data-variant-xl", "subtle");
    expect(container.querySelector(".shared-item")).toHaveAttribute("data-tone", "contrast");
  });
  it("forwards composed refs and item context without nested buttons", () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(<TagsInput.Root defaultValue={["one"]}><TagsInput.Label>Topics</TagsInput.Label><TagsInput.Control>
      <TagsInput.Item index={0} value="one"><TagsInput.ItemPreview><TagsInput.ItemText /><TagsInput.ItemDeleteTrigger asChild><button>Delete</button></TagsInput.ItemDeleteTrigger></TagsInput.ItemPreview><TagsInput.ItemContext>{state => <output>{state.value}</output>}</TagsInput.ItemContext></TagsInput.Item>
      <TagsInput.Input asChild ref={ref}><input /></TagsInput.Input>
    </TagsInput.Control></TagsInput.Root>);
    expect(ref.current).toBe(screen.getByLabelText("Topics"));
    expect(container.querySelectorAll("button button")).toHaveLength(0);
    expect(container.querySelector("output")?.textContent).toBe("one");
  });
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
