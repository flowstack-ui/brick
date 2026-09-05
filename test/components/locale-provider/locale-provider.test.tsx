import { render, screen } from "@testing-library/react";
import { useDirection } from "@flowstack-ui/atom/direction";
import { describe, expect, it } from "vitest";
import {
  LocaleProvider,
  getLocaleDirection,
  useLocaleContext,
} from "../../../src/locale-provider.js";
import { Input } from "../../../src/input.js";
import { NumberInput } from "../../../src/number-input.js";

function Probe() {
  const { dir, locale, localeText } = useLocaleContext();
  const atomDirection = useDirection();
  return <output>{[locale, dir, atomDirection, localeText.clearInput].join("|")}</output>;
}

describe("LocaleProvider", () => {
  it("derives direction and supplies it to Brick and Atom consumers", () => {
    render(<LocaleProvider locale="ar-BH"><Probe /></LocaleProvider>);
    expect(screen.getByText("ar-BH|rtl|rtl|Clear input")).toBeVisible();
    expect(getLocaleDirection("en-US")).toBe("ltr");
    expect(getLocaleDirection("he-IL")).toBe("rtl");
  });

  it("merges nested locale text and drives component-owned defaults", () => {
    render(
      <LocaleProvider locale="es-ES" localeText={{ clearInput: "Borrar", incrementValue: "Aumentar" }}>
        <Input aria-label="Search" clearable defaultValue="value" />
        <NumberInput.Root defaultValue={2}>
          <NumberInput.Input aria-label="Seats" />
          <NumberInput.Control />
        </NumberInput.Root>
      </LocaleProvider>,
    );
    expect(screen.getByRole("button", { name: "Borrar" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Aumentar" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Decrement value" })).toBeVisible();
  });
});
