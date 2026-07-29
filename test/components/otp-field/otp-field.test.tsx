import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../../../src/field.js";
import { OTPField } from "../../../src/otp-field.js";
const cells=(length=4)=>Array.from({length},(_,index)=><OTPField.Input index={index} key={index}/>);
describe("OTP Field",()=>{
 it("adapts cells, layout, filtering, and completion",async()=>{const user=userEvent.setup();const onComplete=vi.fn();render(<OTPField.Root aria-label="Code" getInputLabel={(i,l)=>`Digit ${i+1} of ${l}`} length={4} onComplete={onComplete}><OTPField.Group>{cells()}</OTPField.Group></OTPField.Root>);const inputs=screen.getAllByRole("textbox");expect(inputs).toHaveLength(4);expect(inputs[0]).toHaveAccessibleName("Digit 1 of 4");await user.click(inputs[0]);await user.keyboard("12x4 3");expect(inputs.map(i=>(i as HTMLInputElement).value).join("")).toBe("1243");expect(onComplete).toHaveBeenCalledWith("1243");});
 it("renders attached geometry and a decorative separator",()=>{render(<OTPField.Root length={4} layout="attached"><OTPField.Group>{cells(2)}</OTPField.Group><OTPField.Separator/><OTPField.Group>{[2,3].map(index=><OTPField.Input index={index} key={index}/>)}</OTPField.Group></OTPField.Root>);expect(document.querySelector(".brick-otp-field")).toHaveAttribute("data-layout","attached");expect(document.querySelector(".brick-otp-field-separator")).toHaveAttribute("aria-hidden","true");});
 it("inherits Field relationships and applies native required validity once",()=>{render(<Field.Root id="verification" invalid required><Field.Label>Verification code</Field.Label><OTPField.Root length={4}><OTPField.Group>{cells()}</OTPField.Group></OTPField.Root><Field.Error>Enter the code.</Field.Error></Field.Root>);const inputs=screen.getAllByRole("textbox");expect(inputs[0]).toHaveAttribute("id","verification-control");expect(inputs[0]).toHaveAttribute("required");expect(inputs.slice(1).every(input=>!input.hasAttribute("required"))).toBe(true);for(const input of inputs){expect(input).toHaveAttribute("aria-invalid","true");expect(input).toHaveAttribute("aria-required","true");}});
});
