import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CloseButton } from "../../../src/close-button.js";
import { LocaleProvider } from "../../../src/locale-provider.js";
describe("CloseButton", () => {
  it("forwards inside focus without leaking the public prop", () => {
    const ref=createRef<HTMLElement>();render(<CloseButton focusRing="inside" ref={ref}/>);
    const button=screen.getByRole("button",{name:"Close"});
    expect(ref.current).toBe(button);
    expect(button).toHaveAttribute("data-focus-ring","inside");
    expect(button).not.toHaveAttribute("focusRing");
  });
  it("inherits IconButton defaults with one decorative icon and a button ref", () => {
    const ref=createRef<HTMLElement>();render(<CloseButton ref={ref} />);
    const b=screen.getByRole("button",{name:"Close"});expect(ref.current).toBe(b);
    expect(b).toHaveAttribute("type","button");expect(b).toHaveAttribute("data-size","lg");
    expect(b).toHaveClass("brick-icon-button","brick-close-button");
  });
  it("localizes fallback and respects labelledby", () => {
    render(<LocaleProvider locale="fr" localeText={{close:"Fermer"}}><CloseButton /><span id="specific">Dismiss notice</span><CloseButton aria-labelledby="specific" /></LocaleProvider>);
    expect(screen.getByRole("button",{name:"Fermer"})).toBeInTheDocument();
    expect(screen.getByRole("button",{name:"Dismiss notice"})).not.toHaveAttribute("aria-label");
  });
  it("preserves cancelled and disabled actions and does not submit", () => {
    const press=vi.fn(),submit=vi.fn();render(<form onSubmit={submit}><CloseButton onClick={e=>e.preventDefault()} onPress={press}/><CloseButton aria-label="Inactive" disabled onPress={press}/></form>);
    fireEvent.click(screen.getByRole("button",{name:"Close"}));fireEvent.click(screen.getByRole("button",{name:"Inactive"}));
    expect(press).not.toHaveBeenCalled();expect(submit).not.toHaveBeenCalled();
  });
});
