import "@testing-library/jest-dom/vitest";
import { createRef, useState, type MouseEvent } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../../../src/field.js";
import { LocaleProvider } from "../../../src/locale-provider.js";
import { PasswordToggleField } from "../../../src/password-toggle-field.js";

function PasswordControl({ name = "password" }: { name?: string }) {
  return (
    <PasswordToggleField.Root>
      <PasswordToggleField.Input aria-label={name} name={name} />
      <PasswordToggleField.Toggle />
    </PasswordToggleField.Root>
  );
}

describe("Password Toggle Field", () => {
  it("uses the shared default and sparse responsive size metadata", () => {
    render(
      <PasswordToggleField.Root size={{ lg: "xl" }}>
        <PasswordToggleField.Input aria-label="Password" />
        <PasswordToggleField.Toggle />
      </PasswordToggleField.Root>,
    );
    const root = document.querySelector(".brick-password-toggle-field");
    expect(root).toHaveAttribute("data-size", "lg");
    expect(root).toHaveAttribute("data-size-lg", "xl");
  });

  it("uses LocaleProvider labels while explicit Root labels take precedence", async () => {
    const user = userEvent.setup();
    render(
      <LocaleProvider
        locale="es"
        localeText={{
          hidePassword: "Ocultar contraseña",
          showPassword: "Mostrar contraseña",
        }}
      >
        <PasswordControl />
        <PasswordToggleField.Root
          hideLabel="Conceal secret"
          showLabel="Reveal secret"
        >
          <PasswordToggleField.Input aria-label="Recovery password" />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
      </LocaleProvider>,
    );

    await user.click(
      screen.getByRole("button", { name: "Mostrar contraseña" }),
    );
    expect(
      screen.getByRole("button", { name: "Ocultar contraseña" }),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "Reveal secret" })).toBeVisible();
  });

  it("supports accepted and rejected controlled visibility with one callback per activation", async () => {
    const user = userEvent.setup();
    const accepted = vi.fn();
    const rejected = vi.fn();

    function Accepted() {
      const [visible, setVisible] = useState(false);
      return (
        <PasswordToggleField.Root
          visible={visible}
          onVisibleChange={(next) => {
            accepted(next);
            setVisible(next);
          }}
        >
          <PasswordToggleField.Input aria-label="Accepted password" />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
      );
    }

    render(
      <>
        <Accepted />
        <PasswordToggleField.Root visible={false} onVisibleChange={rejected}>
          <PasswordToggleField.Input aria-label="Rejected password" />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
      </>,
    );

    await user.click(
      screen.getAllByRole("button", { name: "Show password" })[0]!,
    );
    expect(accepted).toHaveBeenCalledTimes(1);
    expect(accepted).toHaveBeenLastCalledWith(true);
    expect(screen.getByLabelText("Accepted password")).toHaveAttribute(
      "type",
      "text",
    );

    await user.click(screen.getByRole("button", { name: "Show password" }));
    expect(rejected).toHaveBeenCalledTimes(1);
    expect(rejected).toHaveBeenLastCalledWith(true);
    expect(screen.getByLabelText("Rejected password")).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("keeps multiple fields, native values, refs, and autocomplete ownership independent", async () => {
    const user = userEvent.setup();
    const inputRef = createRef<HTMLInputElement>();
    render(
      <>
        <PasswordToggleField.Root>
          <PasswordToggleField.Input
            aria-label="Current password"
            autoComplete="current-password"
            defaultValue="initial synthetic value"
            ref={inputRef}
          />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
        <PasswordControl name="New password" />
      </>,
    );

    const current = screen.getByLabelText("Current password");
    await user.clear(current);
    await user.type(current, "replacement synthetic value");
    await user.click(
      screen.getAllByRole("button", { name: "Show password" })[0]!,
    );

    expect(current).toHaveValue("replacement synthetic value");
    expect(current).toHaveAttribute("autocomplete", "current-password");
    expect(inputRef.current).toBe(current);
    expect(screen.getByLabelText("New password")).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("preserves custom hosts, refs, merged handlers, and canceled activation", async () => {
    const user = userEvent.setup();
    const toggleRef = createRef<HTMLButtonElement>();
    const consumerClick = vi.fn((event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    });
    render(
      <PasswordToggleField.Root>
        <PasswordToggleField.Input aria-label="Password" />
        <PasswordToggleField.Toggle
          asChild
          onClick={consumerClick}
          ref={toggleRef}
        >
          <button data-testid="custom-toggle">Custom reveal</button>
        </PasswordToggleField.Toggle>
      </PasswordToggleField.Root>,
    );

    await user.click(screen.getByTestId("custom-toggle"));
    expect(consumerClick).toHaveBeenCalledTimes(1);
    expect(toggleRef.current).toBe(screen.getByTestId("custom-toggle"));
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("inherits Field state and relationships", () => {
    render(
      <Field.Root id="password" invalid required>
        <Field.Label>Password</Field.Label>
        <PasswordToggleField.Root>
          <PasswordToggleField.Input />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
        <Field.Error>Password is required.</Field.Error>
      </Field.Root>,
    );
    const input = screen.getByLabelText(/Password/);
    expect(input).toHaveAttribute("id", "password-control");
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "password-error");
  });

  it("blocks disabled activation but keeps read-only reveal usable", async () => {
    const user = userEvent.setup();
    render(
      <>
        <PasswordToggleField.Root disabled>
          <PasswordToggleField.Input aria-label="Disabled password" />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
        <PasswordToggleField.Root readOnly>
          <PasswordToggleField.Input aria-label="Read-only password" />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
      </>,
    );

    expect(
      screen.getAllByRole("button", { name: "Show password" })[0],
    ).toBeDisabled();
    await user.click(
      screen.getAllByRole("button", { name: "Show password" })[1]!,
    );
    expect(screen.getByLabelText("Read-only password")).toHaveAttribute(
      "type",
      "text",
    );
  });

  it("restores default visibility and native value on form reset", async () => {
    const user = userEvent.setup();
    render(
      <form>
        <PasswordToggleField.Root defaultVisible>
          <PasswordToggleField.Input
            aria-label="Password"
            defaultValue="initial synthetic value"
          />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
        <button type="reset">Reset</button>
      </form>,
    );
    const input = screen.getByLabelText("Password");
    await user.clear(input);
    await user.type(input, "changed synthetic value");
    await user.click(screen.getByRole("button", { name: "Hide password" }));
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(input).toHaveValue("initial synthetic value");
    expect(input).toHaveAttribute("type", "text");
  });
});
