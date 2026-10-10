import { render, screen } from "@testing-library/react";
import { useDirection } from "@flowstack-ui/atom/direction";
import { describe, expect, it } from "vitest";
import {
  LocaleProvider,
  getLocaleDirection,
  useLocaleContext,
  useFilter,
} from "../../../src/locale-provider.js";
import { Input } from "../../../src/input.js";
import { NumberInput } from "../../../src/number-input.js";
import { PasswordToggleField } from "../../../src/password-toggle-field.js";

function Probe() {
  const { dir, locale, localeText } = useLocaleContext();
  const atomDirection = useDirection();
  return (
    <output>
      {[locale, dir, atomDirection, localeText.clearInput].join("|")}
    </output>
  );
}

describe("LocaleProvider", () => {
  it("merges actual nested providers and updates locale-aware filtering", () => {
    function FilterProbe() {
      const filter = useFilter({ sensitivity: "base" });
      const { localeText } = useLocaleContext();
      return (
        <output>
          {String(filter.startsWith("Istanbul", "i"))}|{localeText.close}|
          {localeText.clearInput}
        </output>
      );
    }
    const { rerender } = render(
      <LocaleProvider locale="en-US" localeText={{ close: "Dismiss" }}>
        <LocaleProvider locale="tr" localeText={{ clearInput: "Clear search" }}>
          <FilterProbe />
        </LocaleProvider>
      </LocaleProvider>,
    );
    expect(screen.getByText("false|Dismiss|Clear search")).toBeVisible();
    rerender(
      <LocaleProvider locale="en-US" localeText={{ close: "Dismiss" }}>
        <LocaleProvider
          locale="en-US"
          localeText={{ clearInput: "Clear search" }}
        >
          <FilterProbe />
        </LocaleProvider>
      </LocaleProvider>,
    );
    expect(screen.getByText("true|Dismiss|Clear search")).toBeVisible();
  });
  it("derives direction and supplies it to Brick and Atom consumers", () => {
    render(
      <LocaleProvider locale="ar-BH">
        <Probe />
      </LocaleProvider>,
    );
    expect(screen.getByText("ar-BH|rtl|rtl|Clear input")).toBeVisible();
    expect(getLocaleDirection("en-US")).toBe("ltr");
    expect(getLocaleDirection("he-IL")).toBe("rtl");
  });

  it("merges nested locale text and drives component-owned defaults", () => {
    render(
      <LocaleProvider
        locale="es-ES"
        localeText={{
          clearInput: "Borrar",
          incrementValue: "Aumentar",
          showPassword: "Mostrar contraseña",
        }}
      >
        <Input aria-label="Search" clearable defaultValue="value" />
        <NumberInput.Root defaultValue={2}>
          <NumberInput.Input aria-label="Seats" />
          <NumberInput.Control />
        </NumberInput.Root>
        <PasswordToggleField.Root>
          <PasswordToggleField.Input aria-label="Contraseña" />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
      </LocaleProvider>,
    );
    expect(screen.getByRole("button", { name: "Borrar" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Aumentar" })).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Decrement value" }),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Mostrar contraseña" }),
    ).toBeVisible();
  });
});
