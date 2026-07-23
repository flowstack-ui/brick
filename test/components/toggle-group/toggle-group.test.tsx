import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ToggleGroup } from "../../../src/toggle-group.js";

describe("ToggleGroup", () => {
  it("owns grouped selection anatomy and defaults", () => {
    render(
      <ToggleGroup.Root ariaLabel="View" defaultValue="cards" type="single">
        <ToggleGroup.Item value="cards">Cards</ToggleGroup.Item>
        <ToggleGroup.Item value="list">List</ToggleGroup.Item>
      </ToggleGroup.Root>,
    );
    expect(screen.getByRole("group", { name: "View" })).toHaveClass("brick-toggle-group");
    expect(screen.getByRole("button", { name: "Cards" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "List" })).toHaveAttribute("aria-pressed", "false");
  });
});
