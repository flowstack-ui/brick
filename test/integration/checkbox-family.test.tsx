import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Checkbox } from "../../src/checkbox.js";
import { CheckboxGroup } from "../../src/checkbox-group.js";
import { Field } from "../../src/field.js";
import { Fieldset } from "../../src/fieldset.js";
import { Form } from "../../src/form.js";

describe("Checkbox family integration", () => {
  it("submits repeated values and resets internal and external controls", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Form aria-label="Preferences" id="preferences">
          <Checkbox name="terms" required value="accepted">Terms</Checkbox>
          <CheckboxGroup.Root name="channels" required>
            <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
            <CheckboxGroup.Item value="sms">SMS</CheckboxGroup.Item>
          </CheckboxGroup.Root>
          <button type="reset">Reset</button>
        </Form>
        <Checkbox form="preferences" name="external" value="yes">External</Checkbox>
      </>,
    );
    const form = screen.getByRole("form", {
      name: "Preferences",
    }) as HTMLFormElement;
    const terms = screen.getByRole("checkbox", { name: "Terms" });
    const email = screen.getByRole("checkbox", { name: "Email" });
    const external = screen.getByRole("checkbox", { name: "External" });
    await user.click(terms);
    await user.click(email);
    await user.click(external);
    expect(new FormData(form).get("terms")).toBe("accepted");
    expect(new FormData(form).getAll("channels")).toEqual(["email"]);
    expect(new FormData(form).get("external")).toBe("yes");
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(terms).toHaveAttribute("data-state", "unchecked");
    expect(email).toHaveAttribute("data-state", "unchecked");
    expect(external).toHaveAttribute("data-state", "unchecked");
  });

  it("presents required validity through Field and Fieldset without Brick validation wiring", async () => {
    const user = userEvent.setup();
    render(
      <Form aria-label="Release validation">
        <Field.Root required>
          <Field.Label>Acknowledgement</Field.Label>
          <Checkbox name="acknowledgement" required>Review release</Checkbox>
          <Field.Error>Review is required.</Field.Error>
        </Field.Root>
        <Fieldset.Root required>
          <Fieldset.Legend>Delivery</Fieldset.Legend>
          <CheckboxGroup.Root name="delivery" required>
            <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
            <CheckboxGroup.Item value="push">Push</CheckboxGroup.Item>
          </CheckboxGroup.Root>
          <Fieldset.Error>Choose a delivery method.</Fieldset.Error>
        </Fieldset.Root>
      </Form>,
    );
    const form = screen.getByRole("form", {
      name: "Release validation",
    }) as HTMLFormElement;
    const acknowledgement = screen.getByRole("checkbox", {
      name: "Acknowledgement",
    });
    const email = screen.getByRole("checkbox", { name: "Email" });
    const field = acknowledgement.closest(".brick-field");
    const fieldset = email.closest(".brick-fieldset");
    const group = email.closest(".brick-checkbox-group");
    expect(form.checkValidity()).toBe(false);
    await waitFor(() => {
      expect(form).toHaveAttribute("data-invalid");
      expect(field).toHaveAttribute("data-invalid");
      expect(fieldset).toHaveAttribute("data-invalid");
      expect(group).toHaveAttribute("data-invalid");
    });
    await user.click(acknowledgement);
    await waitFor(() => expect(field).not.toHaveAttribute("data-invalid"));
    expect(form).toHaveAttribute("data-invalid");
    await user.click(email);
    await waitFor(() => {
      expect(form).not.toHaveAttribute("data-invalid");
      expect(fieldset).not.toHaveAttribute("data-invalid");
      expect(group).not.toHaveAttribute("data-invalid");
    });
  });

  it("inherits Fieldset naming, description, state, and required validity", () => {
    render(
      <Fieldset.Root id="topics" invalid required>
        <Fieldset.Legend>Topics</Fieldset.Legend>
        <Fieldset.Description>Choose at least one.</Fieldset.Description>
        <CheckboxGroup.Root name="topics">
          <CheckboxGroup.Item value="design">Design</CheckboxGroup.Item>
        </CheckboxGroup.Root>
        <Fieldset.Error>Selection required.</Fieldset.Error>
      </Fieldset.Root>,
    );
    const group = document.querySelector(".brick-checkbox-group");
    const item = screen.getByRole("checkbox", { name: "Design" });
    expect(group).toHaveAttribute(
      "aria-describedby",
      "topics-description topics-error",
    );
    expect(group).toHaveAttribute("data-invalid");
    expect(group).toHaveAttribute("data-required");
    expect(item).toHaveAttribute("aria-invalid", "true");
    expect(item).toHaveAttribute("aria-required", "true");
  });
});
