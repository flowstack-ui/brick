import { createRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Accordion, useAccordion } from "../../../src/accordion.js";
import { Button } from "../../../src/button.js";

function Item({ disabled, value = "account" }: { disabled?: boolean; value?: string }) {
  const label = value === "account" ? "Account" : value === "billing" ? "Billing" : "Security";
  return <Accordion.Item disabled={disabled} value={value}><Accordion.Header><Accordion.Trigger>{label}<Accordion.Indicator /></Accordion.Trigger></Accordion.Header><Accordion.Content><Accordion.ContentInner>{label} settings</Accordion.ContentInner></Accordion.Content></Accordion.Item>;
}

describe("Accordion", () => {
  it("serializes sparse responsive recipes and delegates composed triggers", () => {
    render(<Accordion.Root unstyled size={{ md: "lg" }} variant={{ md: "enclosed" }}><Accordion.Item value="a"><Accordion.Header><Accordion.Trigger asChild><Button>Delegated</Button></Accordion.Trigger></Accordion.Header><Accordion.Content motion="none"><Accordion.ContentInner asChild><section>Body</section></Accordion.ContentInner></Accordion.Content></Accordion.Item></Accordion.Root>);
    const trigger=screen.getByRole("button", {name:"Delegated"});
    const root=trigger.closest(".brick-accordion");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-size-md", "lg");
    expect(root).toHaveAttribute("data-variant-md", "enclosed");
    expect(trigger).toHaveClass("brick-button");
    expect(trigger).toHaveAttribute("data-unstyled");
    fireEvent.click(trigger);
    expect(screen.getByText("Body").tagName).toBe("SECTION");
    expect(screen.getByText("Body")).toHaveAttribute("data-inset","none");
  });
  it("exposes controller, IDs, item state and retained inert panels", () => {
    function Store() {
      const api=useAccordion({type:"multiple", lazyMount:false, unmountOnExit:false, ids:{root:"group",itemTrigger:v=>`${v}-trigger`,itemContent:v=>`${v}-panel`}});
      return <Accordion.RootProvider value={api}><button onClick={()=>api.setValue(["a"])}>Expand</button><Accordion.Item value="a"><Accordion.Header><Accordion.Trigger>Stored<Accordion.Indicator /></Accordion.Trigger></Accordion.Header><Accordion.Content><Accordion.ContentInner><Accordion.ItemContext>{item=><span>{item.isOpen ? "Opened" : "Closed"}</span>}</Accordion.ItemContext></Accordion.ContentInner></Accordion.Content></Accordion.Item></Accordion.RootProvider>;
    }
    render(<Store />);
    expect(screen.getByRole("region", {hidden:true})).toHaveAttribute("hidden");
    expect(screen.getByRole("region", {hidden:true})).toHaveAttribute("inert");
    fireEvent.click(screen.getByRole("button",{name:"Expand"}));
    expect(screen.getByRole("region")).toHaveAttribute("id","a-panel");
    expect(screen.getByRole("region")).toHaveAttribute("aria-labelledby","a-trigger");
    expect(screen.getByText("Opened")).toBeVisible();
    fireEvent.click(screen.getByRole("button",{name:"Stored"}));
    expect(screen.getByRole("region", {hidden:true})).toHaveAttribute("aria-hidden","true");
  });
  it("renders the seven-part default contract and Atom relationships", () => {
    render(<Accordion.Root><Item /></Accordion.Root>);
    const root = screen.getByText("Account").closest(".brick-accordion");
    const trigger = screen.getByRole("button", { name: "Account" });
    expect(root).toHaveAttribute("data-variant", "plain");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-orientation", "vertical");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger.querySelector(".brick-accordion-indicator path")).toHaveAttribute("d", "m3.5 6 4.5 4.5L12.5 6");
    fireEvent.click(trigger);
    const region = screen.getByRole("region");
    expect(trigger).toHaveAttribute("aria-controls", region.id);
    expect(region).toHaveAttribute("aria-labelledby", trigger.id);
    expect(region).toHaveTextContent("Account settings");
  });

  it("supports every variant and size without leaking recipe props", () => {
    const { rerender } = render(<Accordion.Root><Item /></Accordion.Root>);
    for (const variant of ["plain", "ghost", "soft", "outline", "subtle", "enclosed"] as const) for (const size of ["sm", "md", "lg", "xl"] as const) {
      rerender(<Accordion.Root variant={variant} size={size}><Item /></Accordion.Root>);
      const root = screen.getByText("Account").closest(".brick-accordion");
      expect(root).toHaveAttribute("data-variant", variant);
      expect(root).toHaveAttribute("data-size", size);
      expect(root).not.toHaveAttribute("variant");
      expect(root).not.toHaveAttribute("size");
    }
  });

  it("supports a start indicator in a surface-blended disclosure", () => {
    render(<Accordion.Root indicatorPlacement="start" variant="ghost"><Item /></Accordion.Root>);
    const root = screen.getByText("Account").closest(".brick-accordion");
    expect(root).toHaveAttribute("data-indicator-placement", "start");
    expect(root).toHaveAttribute("data-variant", "ghost");
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
