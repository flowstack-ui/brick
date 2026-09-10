import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NativeSelect } from "../../../src/native-select.js";
import { Field } from "../../../src/field.js";

describe("NativeSelect", () => {
  it("preserves native selection, events, refs and recipe-only root attributes", () => {
    const ref = createRef<HTMLSelectElement>();
    const change = vi.fn();
    render(
      <NativeSelect.Root size={{ lg: "xl" }} variant="ghost" data-testid="root">
        <NativeSelect.Field
          aria-label="Framework"
          name="framework"
          defaultValue="react"
          onChange={change}
          ref={ref}
        >
          <option value="react">React</option>
          <option value="vue">Vue</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>,
    );
    expect(ref.current).toBe(screen.getByRole("combobox"));
    expect(ref.current).toHaveValue("react");
    fireEvent.change(ref.current!, { target: { value: "vue" } });
    expect(change).toHaveBeenCalledTimes(1);
    expect(ref.current).toHaveValue("vue");
    expect(screen.getByTestId("root")).not.toHaveAttribute("size");
    expect(ref.current).not.toHaveAttribute("variant");
  });
  it("inherits Field labels and state but honors explicit overrides", () => {
    render(
      <Field.Root disabled invalid required>
        <Field.Label>Region</Field.Label>
        <NativeSelect.Root disabled={false} invalid={false} required={false}>
          <NativeSelect.Field>
            <option>Europe</option>
          </NativeSelect.Field>
        </NativeSelect.Root>
      </Field.Root>,
    );
    const select = screen.getByRole("combobox", { name: "Region" });
    expect(select).not.toBeDisabled();
    expect(select).not.toBeRequired();
    expect(select).not.toHaveAttribute("data-invalid");
  });
  it("uses native multiple selection and suppresses the list-mode indicator", () => {
    const { container } = render(
      <NativeSelect.Root multiple rows={4}>
        <NativeSelect.Field aria-label="Regions" defaultValue={["us", "eu"]}>
          <optgroup label="Available">
            <option value="us">US</option>
            <option value="eu">Europe</option>
          </optgroup>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>,
    );
    expect(screen.getByRole("listbox")).toHaveValue(["us", "eu"]);
    expect(screen.getByRole("listbox")).toHaveAttribute("size", "4");
    expect(
      container.querySelector(".brick-native-select-indicator"),
    ).toBeNull();
    expect(container.querySelector("input")).toBeNull();
  });
});
