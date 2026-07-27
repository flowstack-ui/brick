import { createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Fieldset } from "../../../src/fieldset.js";
import {
  RadioGroup,
  type RadioGroupSize,
} from "../../../src/radio-group.js";

function Items() {
  return <><RadioGroup.Item value="email">Email</RadioGroup.Item><RadioGroup.Item value="sms">SMS</RadioGroup.Item></>;
}

describe("RadioGroup", () => {
  it("renders the adopted defaults, anatomy, and refs", () => {
    const rootRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLButtonElement>();
    render(<RadioGroup.Root aria-label="Channel" ref={rootRef}><RadioGroup.Item ref={itemRef} value="email">Email</RadioGroup.Item></RadioGroup.Root>);
    const group = screen.getByRole("radiogroup", { name: "Channel" });
    const item = screen.getByRole("radio", { name: "Email" });
    expect(group).toBe(rootRef.current);
    expect(item).toBe(itemRef.current);
    expect(group).toHaveClass("brick-radio-group");
    expect(group).toHaveAttribute("data-slot", "radio-group");
    expect(group).toHaveAttribute("data-size", "md");
    expect(group).toHaveAttribute("data-orientation", "vertical");
    expect(item).toHaveClass("brick-radio-group-item");
    expect(item).toHaveAttribute("data-slot", "radio-group-item");
    expect(item.querySelector("[data-slot='radio-group-control']")).toHaveAttribute("aria-hidden", "true");
    expect(item.querySelector("[data-slot='radio-group-dot']")).toBeInTheDocument();
    expect(item.querySelector("[data-slot='radio-group-label']")).toHaveTextContent("Email");
  });

  it("exposes every size and orientation without leaking Brick props", () => {
    const sizes: RadioGroupSize[] = ["sm", "md", "lg"];
    const { rerender } = render(<RadioGroup.Root aria-label="Channel"><Items /></RadioGroup.Root>);
    for (const size of sizes) {
      rerender(<RadioGroup.Root aria-label="Channel" size={size}><Items /></RadioGroup.Root>);
      expect(screen.getByRole("radiogroup")).toHaveAttribute("data-size", size);
    }
    rerender(<RadioGroup.Root aria-label="Channel" orientation="horizontal"><Items /></RadioGroup.Root>);
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveAttribute("data-orientation", "horizontal");
    expect(group).not.toHaveAttribute("size");
  });

  it("preserves controlled selection and Atom keyboard behavior", async () => {
    const user = userEvent.setup();
    const changes = vi.fn();
    function Controlled() {
      const [value, setValue] = useState("email");
      return <RadioGroup.Root aria-label="Channel" onValueChange={(next) => { changes(next); setValue(next); }} value={value}><Items /></RadioGroup.Root>;
    }
    render(<Controlled />);
    const email = screen.getByRole("radio", { name: "Email" });
    const sms = screen.getByRole("radio", { name: "SMS" });
    await user.click(sms);
    expect(changes).toHaveBeenLastCalledWith("sms");
    expect(sms).toHaveAttribute("aria-checked", "true");
    email.focus();
    await user.keyboard("{ArrowDown}");
    expect(sms).toHaveFocus();
  });

  it("inherits complete disabled, read-only, required, and invalid behavior", async () => {
    const user = userEvent.setup();
    const changes = vi.fn();
    render(<RadioGroup.Root aria-label="Channel" defaultValue="email" invalid name="channel" onValueChange={changes} readOnly required><Items /></RadioGroup.Root>);
    const group = screen.getByRole("radiogroup");
    const email = screen.getByRole("radio", { name: "Email" });
    const sms = screen.getByRole("radio", { name: "SMS" });
    expect(group).toHaveAttribute("aria-readonly", "true");
    expect(group).toHaveAttribute("aria-required", "true");
    expect(group).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAttribute("data-readonly", "");
    await user.click(sms);
    expect(email).toHaveAttribute("aria-checked", "true");
    expect(changes).not.toHaveBeenCalled();
    expect(document.querySelector("input[name='channel'][value='email']")).toBeChecked();
  });

  it("composes with Fieldset relationships and render/asChild hosts", () => {
    render(<Fieldset.Root id="channel-field" invalid required><Fieldset.Legend>Channel</Fieldset.Legend><Fieldset.Description>Choose one.</Fieldset.Description><RadioGroup.Root render={<section data-adapter="group" />}><RadioGroup.Item asChild value="email"><span data-adapter="item">Email</span></RadioGroup.Item></RadioGroup.Root><Fieldset.Error>Choose a channel.</Fieldset.Error></Fieldset.Root>);
    const group = screen.getByRole("radiogroup", { name: "Channel" });
    const item = screen.getByRole("radio", { name: "Email" });
    expect(group.tagName).toBe("SECTION");
    expect(group).toHaveAttribute("data-adapter", "group");
    expect(group).toHaveAttribute("aria-describedby", "channel-field-description channel-field-error");
    expect(item.tagName).toBe("SPAN");
    expect(item).toHaveAttribute("data-adapter", "item");
    expect(item.querySelector("[data-slot='radio-group-control']")).toBeInTheDocument();
  });
});
