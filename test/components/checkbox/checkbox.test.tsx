import { createRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "../../../src/checkbox.js";

describe("Checkbox", () => {
  it("exposes coordinated presentation and one custom indicator", () => {
    render(<Checkbox.Root size={{ initial: "xs", md: "lg" }} variant="outline" tone="contrast" density="compact" radius="none">
      <Checkbox.Control defaultChecked indicator={<Checkbox.Indicator indeterminate="mixed">custom</Checkbox.Indicator>} />
      <Checkbox.Label>Recipes</Checkbox.Label>
    </Checkbox.Root>);
    const control = screen.getByRole("checkbox", { name: "Recipes" });
    expect(control).toHaveAttribute("data-size", "xs");
    expect(control).toHaveAttribute("data-size-md", "lg");
    expect(control).toHaveAttribute("data-variant", "outline");
    expect(control).toHaveAttribute("data-tone", "contrast");
    expect(control).toHaveAttribute("data-density", "compact");
    expect(control.style.getPropertyValue("--brick-checkbox-radius")).toBe("0px");
    expect(control.querySelectorAll(".brick-checkbox-control")).toHaveLength(1);
    expect(screen.getByText("custom")).toBeInTheDocument();
  });

  it("bridges a controller and the single native input ref", async () => {
    const input = createRef<HTMLInputElement>();
    function Example() { const value = useCheckbox(); return <Checkbox.RootProvider value={value} inputRef={input} name="choice" inputValue="yes">Controller</Checkbox.RootProvider>; }
    const { container } = render(<Example />);
    await userEvent.setup().click(screen.getByRole("checkbox", { name: "Controller" }));
    expect(input.current?.checked).toBe(true);
    expect(input.current?.value).toBe("yes");
    expect(container.querySelectorAll("input")).toHaveLength(1);
  });
  it("keeps compound controlled state and external form ownership on Control", async () => {
    const user = userEvent.setup();
    function Example() {
      const [checked, setChecked] = useState<boolean | "indeterminate">("indeterminate");
      return <><form id="external-compound" data-testid="external-form" />
        <Checkbox.Root><Checkbox.Control checked={checked} onCheckedChange={setChecked} form="external-compound" name="choice" value="yes" />
          <Checkbox.Label>External choice</Checkbox.Label></Checkbox.Root></>;
    }
    render(<Example />);
    const control = screen.getByRole("checkbox", { name: "External choice" });
    const form = screen.getByTestId("external-form") as HTMLFormElement;
    expect(new FormData(form).has("choice")).toBe(false);
    await user.click(control);
    expect(new FormData(form).get("choice")).toBe("yes");
    fireEvent.reset(form);
    expect(control).toHaveAttribute("aria-checked", "true");
  });
  it("composes a linked label without nested controls and preserves native activation", async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const rootRef = createRef<HTMLDivElement>();
    const controlRef = createRef<HTMLButtonElement>();
    const labelRef = createRef<HTMLLabelElement>();
    render(<form data-testid="compound-form">
      <Checkbox.Root ref={rootRef} size="lg">
        <Checkbox.Control ref={controlRef} name="consent" value="yes" onCheckedChange={change} />
        <Checkbox.Label ref={labelRef}>Accept <a href="#terms" onClick={e => e.preventDefault()}>terms</a></Checkbox.Label>
        <Checkbox.Description>Read carefully</Checkbox.Description>
      </Checkbox.Root>
      <button type="reset">Reset</button>
    </form>);
    const control = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(controlRef.current).toBe(control);
    expect(rootRef.current).toHaveAttribute("data-size", "lg");
    expect(control).toHaveAttribute("data-size", "lg");
    expect(labelRef.current?.htmlFor).toBe(control.id);
    expect(control.querySelector("a")).toBeNull();
    expect(control).toHaveAccessibleDescription("Read carefully");
    await user.click(labelRef.current!);
    expect(control).toHaveAttribute("aria-checked", "true");
    expect(change).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("link", { name: "terms" }));
    expect(change).toHaveBeenCalledTimes(1);
    expect(new FormData(screen.getByTestId("compound-form") as HTMLFormElement).get("consent")).toBe("yes");
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(control).toHaveAttribute("aria-checked", "false");
  });

  it("inherits field availability, validation and mixed state without duplicating inputs", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Checkbox.Root disabled required invalid>
      <Checkbox.Control name="choice" defaultChecked="indeterminate" />
      <Checkbox.Label>Choice</Checkbox.Label>
      <Checkbox.Error>Required choice</Checkbox.Error>
    </Checkbox.Root>);
    const control = screen.getByRole("checkbox", { name: "Choice" });
    expect(control).toBeDisabled();
    expect(control).toHaveAttribute("aria-checked", "mixed");
    expect(control).toHaveAttribute("aria-required", "true");
    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(control).toHaveAccessibleDescription("Required choice");
    expect(document.querySelectorAll('input[name="choice"]')).toHaveLength(1);
    rerender(<Checkbox.Root readOnly>
      <Checkbox.Control name="choice" defaultChecked="indeterminate" />
      <Checkbox.Label>Choice</Checkbox.Label>
    </Checkbox.Root>);
    await user.click(control);
    expect(control).toHaveAttribute("aria-checked", "mixed");
    expect(control).toHaveAttribute("aria-readonly", "true");
  });

  it("keeps description/error relationships in server output and supports composed root", () => {
    const html = renderToString(<Checkbox.Root id="server" invalid asChild>
      <section>
        <Checkbox.Control name="server-choice" />
        <Checkbox.Label>Choice</Checkbox.Label>
        <Checkbox.Description>Help</Checkbox.Description>
        <Checkbox.Error>Error</Checkbox.Error>
      </section>
    </Checkbox.Root>);
    expect(html).toContain('aria-describedby="server-description server-error"');
    expect(html).toContain('for="server-control"');
    expect(html).toContain("<section");
  });
  it("owns complete defaults, visual anatomy, native hooks, and refs", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    const onCheckedChange = vi.fn();
    const onClick = vi.fn();
    render(
      <Checkbox aria-label="Updates" className="consumer-checkbox" data-purpose="updates" name="updates" onCheckedChange={onCheckedChange} onClick={onClick} ref={ref} style={{ marginTop: 3 }} value="yes" />,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Updates" });
    expect(ref.current).toBe(checkbox);
    expect(checkbox).toHaveClass("brick-checkbox", "consumer-checkbox");
    expect(checkbox).toHaveAttribute("data-slot", "checkbox");
    expect(checkbox).toHaveAttribute("data-size", "md");
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
    expect(checkbox.querySelector(".brick-checkbox-control")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(checkbox.querySelector(".brick-checkbox-check")).toBeTruthy();
    expect(checkbox.querySelector(".brick-checkbox-mixed")).toBeTruthy();
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("supports controlled checked and indeterminate state", () => {
    function Example() {
      const [checked, setChecked] = useState<false | true | "indeterminate">(
        "indeterminate",
      );
      return (
        <Checkbox checked={checked} onCheckedChange={setChecked} size="lg">
          Controlled
        </Checkbox>
      );
    }
    render(<Example />);
    const checkbox = screen.getByRole("checkbox", { name: "Controlled" });
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    expect(checkbox).toHaveAttribute("data-state", "indeterminate");
    expect(checkbox).toHaveAttribute("data-size", "lg");
    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("preserves disabled, read-only, invalid, required, and custom slot state", () => {
    render(
      <Checkbox data-slot="consent-control" disabled invalid readOnly required>
        Consent
      </Checkbox>,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Consent" });
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAttribute("aria-readonly", "true");
    expect(checkbox).toHaveAttribute("aria-required", "true");
    expect(checkbox).toHaveAttribute("data-disabled");
    expect(checkbox).toHaveAttribute("data-readonly");
    expect(checkbox).toHaveAttribute("data-invalid");
    expect(checkbox).toHaveAttribute("data-required");
    expect(checkbox).toHaveAttribute("data-slot", "consent-control");
  });

  it("supports render and asChild while retaining the visual control", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <>
        <Checkbox render={<button data-adapter="render" />}>Rendered</Checkbox>
        <Checkbox asChild ref={ref} size="sm">
          <button data-adapter="child"><strong>Composed</strong></button>
        </Checkbox>
      </>,
    );
    const rendered = screen.getByRole("checkbox", { name: "Rendered" });
    const composed = screen.getByRole("checkbox", { name: "Composed" });
    expect(rendered).toHaveAttribute("data-adapter", "render");
    expect(rendered.querySelector(".brick-checkbox-control")).toBeTruthy();
    expect(composed).toHaveAttribute("data-adapter", "child");
    expect(composed).toHaveAttribute("data-size", "sm");
    expect(composed.querySelector(".brick-checkbox-control")).toBeTruthy();
    expect(ref.current).toBe(composed);
  });
});
import { useCheckbox } from "../../../src/checkbox.js";
