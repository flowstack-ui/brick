import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CheckboxGroup } from "../../../src/checkbox-group.js";

describe("CheckboxGroup", () => {
  it("owns group, parent, and item anatomy", () => {
    render(
      <CheckboxGroup.Root aria-label="Channels" allValues={["email"]}>
        <CheckboxGroup.Parent>All channels</CheckboxGroup.Parent>
        <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
      </CheckboxGroup.Root>,
    );
    expect(screen.getByRole("group", { name: "Channels" })).toHaveClass("brick-checkbox-group");
    expect(screen.getByRole("checkbox", { name: "All channels" })).toHaveClass(
      "brick-checkbox-group-parent",
    );
    expect(screen.getByRole("checkbox", { name: "Email" })).toHaveClass(
      "brick-checkbox-group-item",
    );
  });
});
