import { createRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Accordion } from "../../../src/accordion.js";

function Item({ disabled, value = "account" }: { disabled?: boolean; value?: string }) {
  const label = value === "account" ? "Account" : value === "billing" ? "Billing" : "Security";
  return <Accordion.Item disabled={disabled} value={value}><Accordion.Header><Accordion.Trigger>{label}<Accordion.Indicator /></Accordion.Trigger></Accordion.Header><Accordion.Content><Accordion.ContentInner>{label} settings</Accordion.ContentInner></Accordion.Content></Accordion.Item>;
}

describe("Accordion", () => {
  it("renders the seven-part default contract and Atom relationships", () => {
    render(<Accordion.Root><Item /></Accordion.Root>);
    const root = screen.getByText("Account").closest(".brick-accordion");
    const trigger = screen.getByRole("button", { name: "Account" });
    expect(root).toHaveAttribute("data-variant", "plain");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-orientation", "vertical");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    const region = screen.getByRole("region");
    expect(trigger).toHaveAttribute("aria-controls", region.id);
    expect(region).toHaveAttribute("aria-labelledby", trigger.id);
    expect(region).toHaveTextContent("Account settings");
  });

  it("supports every variant and size without leaking recipe props", () => {
    const { rerender } = render(<Accordion.Root><Item /></Accordion.Root>);
    for (const variant of ["plain", "soft", "outline"] as const) for (const size of ["sm", "md", "lg"] as const) {
      rerender(<Accordion.Root variant={variant} size={size}><Item /></Accordion.Root>);
      const root = screen.getByText("Account").closest(".brick-accordion");
      expect(root).toHaveAttribute("data-variant", variant);
      expect(root).toHaveAttribute("data-size", size);
      expect(root).not.toHaveAttribute("variant");
      expect(root).not.toHaveAttribute("size");
    }
  });

  it("supports single and multiple selection models", () => {
    const { unmount } = render(<Accordion.Root defaultValue="account"><Item /><Item value="billing" /></Accordion.Root>);
    expect(screen.getAllByRole("button")[0]).toHaveAttribute("aria-expanded", "true");
    unmount();
    render(<Accordion.Root type="multiple" defaultValue={["account", "billing"]}><Item /><Item value="billing" /></Accordion.Root>);
    expect(screen.getAllByRole("region")).toHaveLength(2);
  });

  it("supports controlled state and composes change", () => {
    const onValueChange = vi.fn();
    function Controlled() { const [value, setValue] = useState(""); return <Accordion.Root value={value} onValueChange={(next) => { onValueChange(next); setValue(next); }}><Item /></Accordion.Root>; }
    render(<Controlled />);
    fireEvent.click(screen.getByRole("button", { name: "Account" }));
    expect(onValueChange).toHaveBeenCalledWith("account");
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("keeps a non-collapsible open trigger focusable and aria-disabled", () => {
    render(<Accordion.Root defaultValue="account" collapsible={false}><Item /></Accordion.Root>);
    const trigger = screen.getByRole("button", { name: "Account" });
    expect(trigger).toHaveAttribute("aria-disabled", "true");
    expect(trigger).toHaveAttribute("data-locked-open", "");
    expect(trigger).not.toBeDisabled();
    fireEvent.click(trigger);
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("supports horizontal orientation and landmark opt-out", () => {
    render(<Accordion.Root orientation="horizontal" defaultValue="account"><Accordion.Item value="account"><Accordion.Header><Accordion.Trigger>Account</Accordion.Trigger></Accordion.Header><Accordion.Content landmark={false}><Accordion.ContentInner>Settings</Accordion.ContentInner></Accordion.Content></Accordion.Item></Accordion.Root>);
    expect(screen.getByText("Account").closest(".brick-accordion")).toHaveAttribute("data-orientation", "horizontal");
    expect(screen.getByRole("button")).toHaveAttribute("data-orientation", "horizontal");
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
    expect(screen.getByText("Settings").closest(".brick-accordion-content")).not.toHaveAttribute("aria-labelledby");
  });

  it("disables individual items and preserves keyboard navigation", () => {
    render(<Accordion.Root><Item /><Item disabled value="billing" /><Accordion.Item value="security"><Accordion.Header><Accordion.Trigger>Security</Accordion.Trigger></Accordion.Header></Accordion.Item></Accordion.Root>);
    const account = screen.getByRole("button", { name: "Account" });
    account.focus();
    fireEvent.keyDown(account, { key: "ArrowDown" });
    expect(screen.getByRole("button", { name: "Security" })).toHaveFocus();
  });

  it("merges refs, classes, slots, render, and custom indicator artwork", () => {
    const rootRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLDivElement>();
    render(<Accordion.Root ref={rootRef} className="root-extra" render="section" defaultValue="account"><Accordion.Item ref={itemRef} className="item-extra" value="account"><Accordion.Header as="h3"><Accordion.Trigger>Account<Accordion.Indicator data-testid="indicator">+</Accordion.Indicator></Accordion.Trigger></Accordion.Header><Accordion.Content render="article"><Accordion.ContentInner>Settings</Accordion.ContentInner></Accordion.Content></Accordion.Item></Accordion.Root>);
    expect(rootRef.current?.tagName).toBe("SECTION");
    expect(rootRef.current).toHaveClass("brick-accordion", "root-extra");
    expect(itemRef.current).toHaveClass("brick-accordion-item", "item-extra");
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("region").tagName).toBe("ARTICLE");
    expect(screen.getByRole("region")).toHaveClass("brick-accordion-content");
    expect(screen.getByTestId("indicator")).toHaveAttribute("aria-hidden", "true");
  });
});
