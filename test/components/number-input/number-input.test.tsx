import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../../../src/field.js";
import { NumberInput } from "../../../src/number-input.js";

describe("Number Input", () => {
  it("adapts Atom anatomy, visual defaults, and stepping", async () => {
    const user = userEvent.setup(); const onValueChange = vi.fn();
    render(<NumberInput.Root aria-label="Quantity" defaultValue={2} onValueChange={onValueChange}><NumberInput.Input/><NumberInput.Increment aria-label="Increase quantity"/><NumberInput.Decrement aria-label="Decrease quantity"/></NumberInput.Root>);
    const input=screen.getByRole("spinbutton",{name:"Quantity"}); const root=input.closest(".brick-number-input")!;
    expect(root).toHaveAttribute("data-size","md"); expect(root).toHaveAttribute("data-variant","outline"); expect(root).toHaveAttribute("data-shape","rounded"); expect(root).toHaveAttribute("data-full-width","");
    await user.click(screen.getByRole("button",{name:"Increase quantity"})); expect(input).toHaveValue("3"); expect(onValueChange).toHaveBeenLastCalledWith(3);
  });
  it("inherits Field state and relationships",()=>{render(<Field.Root id="amount" invalid required><Field.Label>Amount</Field.Label><NumberInput.Root name="amount"><NumberInput.Input/><NumberInput.Increment aria-label="Increase"/><NumberInput.Decrement aria-label="Decrease"/></NumberInput.Root><Field.Error>Enter an amount.</Field.Error></Field.Root>);const input=screen.getByRole("spinbutton",{name:"Amount"});expect(input).toHaveAttribute("required");expect(input).toHaveAttribute("aria-invalid","true");expect(input).toHaveAttribute("aria-describedby","amount-error");});
  it("makes boundary actions unavailable",()=>{render(<NumberInput.Root aria-label="Seats" defaultValue={5} max={5} min={0}><NumberInput.Input/><NumberInput.Increment aria-label="Increase"/><NumberInput.Decrement aria-label="Decrease"/></NumberInput.Root>);expect(screen.getByRole("button",{name:"Increase"})).toHaveAttribute("aria-disabled","true");expect(screen.getByRole("button",{name:"Increase"})).toHaveAttribute("tabindex","-1");expect(screen.getByRole("button",{name:"Decrease"})).not.toHaveAttribute("aria-disabled");});
});
