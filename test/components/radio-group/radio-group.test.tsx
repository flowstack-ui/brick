import { createRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Fieldset } from "../../../src/fieldset.js";
import {
  RadioGroup,
  useRadioGroup,
  type RadioGroupSize,
} from "../../../src/radio-group.js";

function Items() {
  return <><RadioGroup.Item value="email">Email</RadioGroup.Item><RadioGroup.Item value="sms">SMS</RadioGroup.Item></>;
}

describe("RadioGroup", () => {
  it("inherits responsive presentation, permits item overrides, and replaces artwork", () => {
    render(<RadioGroup.Root aria-label="Options" size={{ initial: "xs", md: "lg" }} variant={{ initial: "subtle", lg: "outline" }} tone="success" density="compact" labelPlacement="start" defaultValue="a">
      <RadioGroup.Item value="a" indicator={<span data-testid="art">✓</span>}>Inherited</RadioGroup.Item>
      <RadioGroup.Item value="b" size="sm" tone="contrast">Override</RadioGroup.Item>
    </RadioGroup.Root>);
    const item = screen.getByRole("radio", { name: "Inherited" });
    expect(item).toHaveAttribute("data-size", "xs");
    expect(item).toHaveAttribute("data-size-md", "lg");
    expect(item).toHaveAttribute("data-density", "compact");
    expect(item.querySelector(".brick-radiomark")).toHaveAttribute("data-variant-lg", "outline");
    expect(item.querySelector(".brick-radiomark__dot")).toBeNull();
    expect(item.querySelectorAll(".brick-radiomark")).toHaveLength(1);
    expect(screen.getByRole("radio", { name: "Override" })).toHaveAttribute("data-tone", "contrast");
  });

  it("composes native refs, descriptions, independent links and one form value", async () => {
    const user = userEvent.setup();
    const inputRef = createRef<HTMLInputElement>();
    const changes = vi.fn();
    render(<form data-testid="form"><RadioGroup.Root name="delivery" defaultValue="a" onValueChange={changes}>
      <RadioGroup.Label>Delivery</RadioGroup.Label>
      {["a", "b"].map(value => <RadioGroup.ItemRoot key={value} value={value}>
        <RadioGroup.ItemHiddenInput ref={value === "b" ? inputRef : undefined} />
        <RadioGroup.ItemControl><RadioGroup.ItemIndicator /></RadioGroup.ItemControl>
        <RadioGroup.ItemText>{value}<a href="#shipping">Terms {value}</a></RadioGroup.ItemText>
        <RadioGroup.ItemDescription>Description {value}</RadioGroup.ItemDescription>
      </RadioGroup.ItemRoot>)}
    </RadioGroup.Root></form>);
    const second = screen.getByRole("radio", { name: "b Terms b" });
    expect(second).toBe(inputRef.current);
    expect(second).toHaveAccessibleDescription("Description b");
    // Real label/link default-action isolation is covered in browser tests.
    fireEvent.click(screen.getByRole("link", { name: "Terms b" }));
    expect(changes).not.toHaveBeenCalled();
    await user.click(second);
    expect(changes).toHaveBeenCalledTimes(1);
    expect(new FormData(screen.getByTestId("form") as HTMLFormElement).getAll("delivery")).toEqual(["b"]);
  });

  it("shares an external controller without adding another selection store", async () => {
    function Demo() {
      const controller = useRadioGroup({ defaultValue: "email" });
      return <><RadioGroup.RootProvider controller={controller} aria-label="Controller"><Items /></RadioGroup.RootProvider>
        <button onClick={() => controller.setValue("sms")}>Choose SMS</button><button onClick={controller.reset}>Reset</button></>;
    }
    const user = userEvent.setup();
    render(<Demo />);
    await user.click(screen.getByRole("button", { name: "Choose SMS" }));
    expect(screen.getByRole("radio", { name: "SMS" })).toBeChecked();
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByRole("radio", { name: "Email" })).toBeChecked();
  });
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
    expect(item.querySelector("[data-slot='radiomark-dot']")).toBeInTheDocument();
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
