import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../../../src/field.js";
import { PinInput } from "../../../src/pin-input.js";
const cells=(length=4)=>Array.from({length},(_,index)=><PinInput.Input index={index} key={index}/>);
describe("Pin Input",()=>{
 it("uses the shared default and responsive size metadata",()=>{render(<PinInput.Root length={4} size={{initial:"sm",lg:"xl"}}><PinInput.Group>{cells()}</PinInput.Group></PinInput.Root>);const root=document.querySelector(".brick-pin-input");expect(root).toHaveAttribute("data-size","sm");expect(root).toHaveAttribute("data-size-lg","xl");});
 it("adapts cells, layout, filtering, and completion",async()=>{const user=userEvent.setup();const onComplete=vi.fn();render(<PinInput.Root aria-label="Code" getInputLabel={(i,l)=>`Digit ${i+1} of ${l}`} length={4} onComplete={onComplete}><PinInput.Group>{cells()}</PinInput.Group></PinInput.Root>);const inputs=screen.getAllByRole("textbox");expect(inputs).toHaveLength(4);expect(inputs[0]).toHaveAccessibleName("Digit 1 of 4");await user.click(inputs[0]);await user.keyboard("12x4 3");expect(inputs.map(i=>(i as HTMLInputElement).value).join("")).toBe("1243");expect(onComplete).toHaveBeenCalledWith("1243");});
 it("renders attached geometry and a decorative separator",()=>{render(<PinInput.Root length={4} layout="attached"><PinInput.Group>{cells(2)}</PinInput.Group><PinInput.Separator/><PinInput.Group>{[2,3].map(index=><PinInput.Input index={index} key={index}/>)}</PinInput.Group></PinInput.Root>);expect(document.querySelector(".brick-pin-input")).toHaveAttribute("data-layout","attached");expect(document.querySelector(".brick-pin-input-separator")).toHaveAttribute("aria-hidden","true");});
 it("inherits Field relationships and applies native required validity once",()=>{render(<Field.Root id="verification" invalid required><Field.Label>Verification code</Field.Label><PinInput.Root length={4}><PinInput.Group>{cells()}</PinInput.Group></PinInput.Root><Field.Error>Enter the code.</Field.Error></Field.Root>);const inputs=screen.getAllByRole("textbox");expect(inputs[0]).toHaveAttribute("id","verification-control");expect(inputs[0]).toHaveAttribute("required");expect(inputs.slice(1).every(input=>!input.hasAttribute("required"))).toBe(true);for(const input of inputs){expect(input).toHaveAttribute("aria-invalid","true");expect(input).toHaveAttribute("aria-required","true");}});
});
