import { createRef } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CheckboxCard, useCheckboxCard } from "../../../src/checkbox-card.js";
import { CheckboxGroup } from "../../../src/checkbox-group.js";

describe("CheckboxCard", () => {
  it("renders native input, coordinated recipe and associated text", async () => {
    const changed = vi.fn();
    const { container } = render(
      <CheckboxCard.Root
        onCheckedChange={changed}
        size={{ initial: "sm", md: "lg" }}
        variant={{ initial: "outline", lg: "solid" }}
        radius="none"
        tone="contrast"
      >
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Content>
            <CheckboxCard.Label>Backups</CheckboxCard.Label>
            <CheckboxCard.Description>Daily snapshots</CheckboxCard.Description>
          </CheckboxCard.Content>
          <CheckboxCard.Indicator />
        </CheckboxCard.Control>
        <CheckboxCard.Addon>$5 per month</CheckboxCard.Addon>
      </CheckboxCard.Root>,
    );
    const input = screen.getByRole("checkbox", { name: "Backups" });
    expect(input).toHaveAccessibleDescription("Daily snapshots");
    const root = container.querySelector("label")!;
    expect(root).toHaveAttribute("data-size-md", "lg");
    expect(root).toHaveAttribute("data-variant-lg", "solid");
    expect(root.style.getPropertyValue("--brick-checkbox-card-radius")).toBe(
      "0px",
    );
    expect(container.querySelectorAll("input")).toHaveLength(1);
    await userEvent.setup().click(screen.getByText("$5 per month"));
    expect(changed).toHaveBeenCalledTimes(1);
    expect(input).toBeChecked();
  });
  it("does not duplicate custom indicators", () => {
    const { container } = render(
      <CheckboxCard.Root>
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Label>Choice</CheckboxCard.Label>
        <CheckboxCard.Indicator>Custom mark</CheckboxCard.Indicator>
      </CheckboxCard.Root>,
    );
    expect(container.querySelector("svg")).toBeNull();
    expect(screen.getByText("Custom mark")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
  it("permits omitted indicator and preserves Space selection", async () => {
    render(
      <CheckboxCard.Root>
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Label>No mark</CheckboxCard.Label>
      </CheckboxCard.Root>,
    );
    const user = userEvent.setup();
    await user.tab();
    await user.keyboard(" ");
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
  it("uses group values and preserves reset and selection limits", async () => {
    render(
      <form aria-label="Preferences">
        <CheckboxGroup.Root name="extras" maxSelectedValues={1}>
          <CheckboxCard.Root value="a">
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Label>Alpha</CheckboxCard.Label>
          </CheckboxCard.Root>
          <CheckboxCard.Root value="b">
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Label>Beta</CheckboxCard.Label>
          </CheckboxCard.Root>
        </CheckboxGroup.Root>
      </form>,
    );
    await userEvent.setup().click(screen.getByText("Alpha"));
    expect(screen.getByRole("checkbox", { name: "Beta" })).toBeDisabled();
    expect(
      new FormData(screen.getByRole("form") as HTMLFormElement).getAll(
        "extras",
      ),
    ).toEqual(["a"]);
    fireEvent.reset(screen.getByRole("form"));
    // Reset settles after native default handling and cancellation listeners.
    await waitFor(() => {
      expect(screen.getByRole("checkbox", { name: "Alpha" })).not.toBeChecked();
      expect(screen.getByRole("checkbox", { name: "Beta" })).not.toBeDisabled();
    });
    expect(
      new FormData(screen.getByRole("form") as HTMLFormElement).getAll(
        "extras",
      ),
    ).toEqual([]);
  });
  it("forwards provider label/input refs", async () => {
    const root = createRef<HTMLLabelElement>();
    const input = createRef<HTMLInputElement>();
    function Fixture() {
      const value = useCheckboxCard();
      return (
        <CheckboxCard.RootProvider value={value} ref={root}>
          <CheckboxCard.HiddenInput ref={input} />
          <CheckboxCard.Label>Controlled</CheckboxCard.Label>
        </CheckboxCard.RootProvider>
      );
    }
    render(<Fixture />);
    expect(root.current?.tagName).toBe("LABEL");
    await userEvent.setup().click(screen.getByText("Controlled"));
    expect(input.current?.checked).toBe(true);
  });
});
