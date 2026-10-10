import "@testing-library/jest-dom/vitest";
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../../../src/field.js";
import { NumberInput } from "../../../src/number-input.js";
import { LocaleProvider } from "../../../src/locale-provider.js";

describe("Number Input", () => {
  it("composes labelled groups with inherited recipes, native refs and logical elements", async () => {
    const groupRef = createRef<HTMLDivElement>();
    const elementRef = createRef<HTMLDivElement>();
    render(
      <NumberInput.Root defaultValue={3} invalid variant="surface" size="sm">
        <NumberInput.Label>Grouped quantity</NumberInput.Label>
        <NumberInput.Group ref={groupRef} title="Field group">
          <NumberInput.Element ref={elementRef} placement="end">
            kg
          </NumberInput.Element>
          <NumberInput.Input />
          <NumberInput.Control />
        </NumberInput.Group>
      </NumberInput.Root>,
    );
    expect(groupRef.current).toHaveAttribute("data-variant", "surface");
    expect(groupRef.current).toHaveAttribute("data-invalid", "");
    expect(groupRef.current).toHaveAttribute("title", "Field group");
    expect(elementRef.current).toHaveAttribute("data-placement", "end");
    expect(groupRef.current?.querySelector("label")).toBeNull();
    const input = screen.getByRole("spinbutton", { name: "Grouped quantity" });
    await userEvent.click(
      screen.getByRole("button", { name: "Increment value" }),
    );
    expect(input).toHaveValue("4");
  });
  it("inherits locale and translated names through generated controls", () => {
    render(
      <LocaleProvider
        locale="de-DE"
        localeText={{ incrementValue: "Mehr", decrementValue: "Weniger" }}
      >
        <NumberInput.Root defaultValue={1.5}>
          <NumberInput.Input aria-label="Menge" />
          <NumberInput.Control />
        </NumberInput.Root>
      </LocaleProvider>,
    );
    expect(screen.getByRole("spinbutton")).toHaveValue("1,5");
    expect(screen.getByRole("button", { name: "Mehr" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Weniger" })).toBeInTheDocument();
  });
  it("gives explicit locale and control names precedence", () => {
    render(
      <LocaleProvider locale="de-DE" localeText={{ incrementValue: "Mehr" }}>
        <NumberInput.Root locale="en-US" defaultValue={1.5}>
          <NumberInput.Input aria-label="Quantity" />
          <NumberInput.Control incrementLabel="Add" />
        </NumberInput.Root>
      </LocaleProvider>,
    );
    expect(screen.getByRole("spinbutton")).toHaveValue("1.5");
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });
  it("adapts Atom anatomy, visual defaults, and stepping", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <NumberInput.Root
        aria-label="Quantity"
        defaultValue={2}
        onValueChange={onValueChange}
      >
        <NumberInput.Input />
        <NumberInput.Increment aria-label="Increase quantity" />
        <NumberInput.Decrement aria-label="Decrease quantity" />
      </NumberInput.Root>,
    );
    const input = screen.getByRole("spinbutton", { name: "Quantity" });
    const root = input.closest(".brick-number-input")!;
    expect(root).toHaveAttribute("data-size", "lg");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-shape", "rounded");
    expect(root).toHaveAttribute("data-full-width", "");
    expect(root).toHaveAttribute("data-stepper-visibility", "always");
    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(input).toHaveValue("3");
    expect(onValueChange).toHaveBeenLastCalledWith(3);
  });
  it("inherits Field state and relationships", () => {
    render(
      <Field.Root id="amount" invalid required>
        <Field.Label>Amount</Field.Label>
        <NumberInput.Root name="amount">
          <NumberInput.Input />
          <NumberInput.Increment aria-label="Increase" />
          <NumberInput.Decrement aria-label="Decrease" />
        </NumberInput.Root>
        <Field.Error>Enter an amount.</Field.Error>
      </Field.Root>,
    );
    const input = screen.getByRole("spinbutton", { name: "Amount" });
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "amount-error");
  });
  it("makes boundary actions unavailable", () => {
    render(
      <NumberInput.Root aria-label="Seats" defaultValue={5} max={5} min={0}>
        <NumberInput.Input />
        <NumberInput.Increment aria-label="Increase" />
        <NumberInput.Decrement aria-label="Decrease" />
      </NumberInput.Root>,
    );
    expect(screen.getByRole("button", { name: "Increase" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("button", { name: "Increase" })).toHaveAttribute(
      "tabindex",
      "-1",
    );
    expect(
      screen.getByRole("button", { name: "Decrease" }),
    ).not.toHaveAttribute("aria-disabled");
  });
  it("opts into hover-only steppers without leaking the visual prop", () => {
    render(
      <NumberInput.Root
        aria-label="Opacity"
        defaultValue={75}
        stepperVisibility="hover"
      >
        <NumberInput.Input />
        <NumberInput.Increment aria-label="Increase" />
        <NumberInput.Decrement aria-label="Decrease" />
      </NumberInput.Root>,
    );
    const root = screen
      .getByRole("spinbutton", { name: "Opacity" })
      .closest(".brick-number-input")!;
    expect(root).toHaveAttribute("data-stepper-visibility", "hover");
    expect(root).not.toHaveAttribute("stepperVisibility");
  });
  it("supports an xs control with a stable unit column", () => {
    render(
      <NumberInput.Root aria-label="Width" defaultValue={320} size="xs">
        <NumberInput.Input />
        <NumberInput.Unit>px</NumberInput.Unit>
        <NumberInput.Increment aria-label="Increase" />
        <NumberInput.Decrement aria-label="Decrease" />
      </NumberInput.Root>,
    );
    const root = screen
      .getByRole("spinbutton", { name: "Width" })
      .closest(".brick-number-input")!;
    expect(root).toHaveAttribute("data-size", "xs");
    expect(
      root.querySelector('[data-slot="number-input-unit"]'),
    ).toHaveTextContent("px");
  });
  it("supports a compact input without authored step actions", () => {
    render(
      <NumberInput.Root aria-label="Compact width" defaultValue={16} size="xs">
        <NumberInput.Input />
      </NumberInput.Root>,
    );
    const root = screen
      .getByRole("spinbutton", { name: "Compact width" })
      .closest(".brick-number-input")!;
    expect(root.querySelectorAll(".brick-number-input-step")).toHaveLength(0);
    expect(root).toHaveAttribute("data-size", "xs");
  });
  it("supports sparse responsive sizes from the lg default", () => {
    render(
      <NumberInput.Root
        aria-label="Responsive width"
        size={{ md: "sm", xl: "2xl" }}
      >
        <NumberInput.Input />
      </NumberInput.Root>,
    );
    const root = screen.getByRole("spinbutton").closest(".brick-number-input")!;
    expect(root).toHaveAttribute("data-size", "lg");
    expect(root).toHaveAttribute("data-size-md", "sm");
    expect(root).toHaveAttribute("data-size-xl", "2xl");
  });
  it("provides labelled shorthand controls", () => {
    render(
      <NumberInput.Root aria-label="Seats" defaultValue={2}>
        <NumberInput.Input />
        <NumberInput.Control
          incrementLabel="Add seat"
          decrementLabel="Remove seat"
        />
      </NumberInput.Root>,
    );
    expect(
      screen.getByRole("button", { name: "Add seat" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Remove seat" }),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="number-input-stepper"]'),
    ).toBeInTheDocument();
  });
  it("exposes the square stepper layout without leaking the visual prop", () => {
    render(
      <NumberInput.Root aria-label="Seats" defaultValue={2} layout="stepper">
        <NumberInput.Decrement aria-label="Remove seat" />
        <NumberInput.Input />
        <NumberInput.Increment aria-label="Add seat" />
      </NumberInput.Root>,
    );
    const root = screen
      .getByRole("spinbutton", { name: "Seats" })
      .closest(".brick-number-input")!;
    expect(root).toHaveAttribute("data-layout", "stepper");
    expect(root).not.toHaveAttribute("layout");
  });
  it("uses layout-aware default step artwork", () => {
    const { rerender } = render(
      <NumberInput.Root aria-label="Seats" defaultValue={2} layout="stepper">
        <NumberInput.Decrement aria-label="Remove seat" />
        <NumberInput.Input />
        <NumberInput.Increment aria-label="Add seat" />
      </NumberInput.Root>,
    );
    expect(
      screen.getByRole("button", { name: "Remove seat" }).querySelector("path"),
    ).toHaveAttribute("d", "M3 8h10");
    expect(
      screen.getByRole("button", { name: "Add seat" }).querySelector("path"),
    ).toHaveAttribute("d", "M3 8h10M8 3v10");
    rerender(
      <NumberInput.Root aria-label="Seats" defaultValue={2}>
        <NumberInput.Input />
        <NumberInput.Control
          incrementLabel="Add seat"
          decrementLabel="Remove seat"
        />
      </NumberInput.Root>,
    );
    expect(
      screen.getByRole("button", { name: "Remove seat" }).querySelector("path"),
    ).toHaveAttribute("d", "m4 6 4 4 4-4");
  });
});
