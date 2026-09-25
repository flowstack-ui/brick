import { createRef, useState, type MouseEvent } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../../../src/field.js";
import {
  Switch,
  type SwitchSize,
  type SwitchVariant,
  useSwitch,
} from "../../../src/switch.js";

describe("Switch", () => {
  it("keeps custom part IDs associated and supports owner IDs", () => {
    const { rerender } = render(
      <Switch.Field ids={{ control: "owner-control", label: "owner-label" }}>
        <Switch.Control id="local-control" />
        <Switch.Label id="local-label">Alerts</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Field>,
    );
    const control = screen.getByRole("switch", { name: "Alerts" });
    expect(control).toHaveAttribute("aria-labelledby", "local-label");
    expect(screen.getByText("Alerts")).toHaveAttribute("for", "local-control");
    fireEvent.click(screen.getByText("Alerts"));
    expect(control).toHaveAttribute("aria-checked", "true");
    rerender(
      <Switch.Field ids={{ control: "owner-control", label: "owner-label" }}>
        <Switch.Control />
        <Switch.Label>Alerts</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Field>,
    );
    expect(control).toHaveAttribute("id", "owner-control");
    expect(control).toHaveAttribute("aria-labelledby", "owner-label");
    expect(screen.getByText("Alerts")).toHaveAttribute("for", "owner-control");
  });
  it("renders adopted defaults, anatomy, slots, and refs", () => {
    const rootRef = createRef<HTMLButtonElement>();
    const thumbRef = createRef<HTMLSpanElement>();
    render(
      <Switch.Root aria-label="Weekly reports" ref={rootRef}>
        <Switch.Thumb ref={thumbRef} />
      </Switch.Root>,
    );
    const root = screen.getByRole("switch", { name: "Weekly reports" });
    const thumb = root.querySelector("[data-slot='switch-thumb']");
    expect(root).toBe(rootRef.current);
    expect(thumb).toBe(thumbRef.current);
    expect(root).toHaveClass("brick-switch");
    expect(root).toHaveAttribute("data-slot", "switch");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "solid");
    expect(root).toHaveAttribute("data-state", "unchecked");
    expect(thumb).toHaveClass("brick-switch-thumb");
    expect(thumb).toHaveAttribute("aria-hidden", "true");
  });

  it("supports every closed size without leaking the visual prop", () => {
    const sizes: SwitchSize[] = ["xs", "sm", "md", "lg"];
    const { rerender } = render(
      <Switch.Root aria-label="Reports">
        <Switch.Thumb />
      </Switch.Root>,
    );
    for (const size of sizes) {
      rerender(
        <Switch.Root aria-label="Reports" size={size}>
          <Switch.Thumb />
        </Switch.Root>,
      );
      const root = screen.getByRole("switch");
      expect(root).toHaveAttribute("data-size", size);
      expect(root).not.toHaveAttribute("size");
    }
  });

  it("supports both visual variants without leaking the recipe prop", () => {
    const variants: SwitchVariant[] = ["solid", "raised"];
    const { rerender } = render(
      <Switch.Root aria-label="Reports">
        <Switch.Thumb />
      </Switch.Root>,
    );
    for (const variant of variants) {
      rerender(
        <Switch.Root aria-label="Reports" variant={variant}>
          <Switch.Thumb />
        </Switch.Root>,
      );
      const root = screen.getByRole("switch");
      expect(root).toHaveAttribute("data-variant", variant);
      expect(root).not.toHaveAttribute("variant");
    }
  });

  it("preserves controlled interaction and state on both parts", async () => {
    const user = userEvent.setup();
    const changes = vi.fn();
    function Controlled() {
      const [checked, setChecked] = useState(false);
      return (
        <Switch.Root
          aria-label="Reports"
          checked={checked}
          onCheckedChange={(next) => {
            changes(next);
            setChecked(next);
          }}
        >
          <Switch.Thumb />
        </Switch.Root>
      );
    }
    render(<Controlled />);
    const root = screen.getByRole("switch");
    await user.click(root);
    expect(changes).toHaveBeenLastCalledWith(true);
    expect(root).toHaveAttribute("aria-checked", "true");
    expect(root.querySelector("[data-slot='switch-thumb']")).toHaveAttribute(
      "data-state",
      "checked",
    );
  });

  it("keeps read-only focusable, disabled unavailable, and form state native", async () => {
    const user = userEvent.setup();
    const changes = vi.fn();
    render(
      <>
        <Switch.Root
          aria-label="Read only"
          defaultChecked
          name="reports"
          onCheckedChange={changes}
          readOnly
          required
          value="enabled"
        >
          <Switch.Thumb />
        </Switch.Root>
        <Switch.Root aria-label="Disabled" disabled>
          <Switch.Thumb />
        </Switch.Root>
      </>,
    );
    const readOnly = screen.getByRole("switch", { name: "Read only" });
    const disabled = screen.getByRole("switch", { name: "Disabled" });
    expect(readOnly).toHaveAttribute("aria-readonly", "true");
    expect(readOnly).not.toBeDisabled();
    await user.click(readOnly);
    expect(readOnly).toHaveAttribute("aria-checked", "true");
    expect(changes).not.toHaveBeenCalled();
    expect(document.querySelector("input[name='reports']")).toBeChecked();
    expect(disabled).toBeDisabled();
  });

  it("inherits Field relationships and preserves render/asChild", () => {
    render(
      <>
        <Field.Root id="reports" invalid required>
          <Field.Label>Weekly reports</Field.Label>
          <Field.Description>Immediate delivery.</Field.Description>
          <Switch.Root render={<button data-adapter="root" />}>
            <Switch.Thumb render={<i data-adapter="thumb" />} />
          </Switch.Root>
          <Field.Error>Required.</Field.Error>
        </Field.Root>
        <Switch.Root aria-label="Composed" asChild>
          <button data-adapter="as-child">
            <Switch.Thumb />
          </button>
        </Switch.Root>
      </>,
    );
    const fieldSwitch = screen.getByRole("switch", { name: "Weekly reports" });
    expect(fieldSwitch).toHaveAttribute("data-adapter", "root");
    expect(fieldSwitch).toHaveAttribute("aria-invalid", "true");
    expect(fieldSwitch).toHaveAttribute(
      "aria-describedby",
      "reports-description reports-error",
    );
    expect(fieldSwitch.querySelector("[data-adapter='thumb']")?.tagName).toBe(
      "I",
    );
    expect(screen.getByRole("switch", { name: "Composed" })).toHaveAttribute(
      "data-adapter",
      "as-child",
    );
  });

  it("composes one state owner, one input, a linked label, and a default thumb", async () => {
    const user = userEvent.setup();
    const changes = vi.fn();
    render(
      <Switch.Field defaultChecked name="digest" value="daily" onCheckedChange={changes}>
        <Switch.Control />
        <Switch.Label>Daily digest</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Field>,
    );
    const control = screen.getByRole("switch", { name: "Daily digest" });
    expect(control.querySelectorAll(".brick-switch-thumb")).toHaveLength(1);
    expect(document.querySelectorAll("input[type='checkbox']")).toHaveLength(1);
    expect(screen.getByText("Daily digest")).toHaveAttribute("for", control.id);
    await user.click(screen.getByText("Daily digest"));
    expect(control).toHaveAttribute("aria-checked", "false");
    expect(changes).toHaveBeenLastCalledWith(false);
  });

  it("serializes, resets, and keeps repeated compound names", async () => {
    const user = userEvent.setup();
    render(
      <form aria-label="preferences">
        <Switch.Field defaultChecked name="channel" value="email">
          <Switch.Control />
          <Switch.Label>Email</Switch.Label>
          <Switch.HiddenInput />
        </Switch.Field>
        <Switch.Field defaultChecked name="channel" value="push">
          <Switch.Control />
          <Switch.Label>Push</Switch.Label>
          <Switch.HiddenInput />
        </Switch.Field>
        <button type="reset">Reset</button>
      </form>,
    );
    const form = screen.getByRole("form", { name: "preferences" }) as HTMLFormElement;
    expect(new FormData(form).getAll("channel")).toEqual(["email", "push"]);
    await user.click(screen.getByRole("switch", { name: "Email" }));
    expect(new FormData(form).getAll("channel")).toEqual(["push"]);
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByRole("switch", { name: "Email" })).toHaveAttribute("aria-checked", "true");
  });

  it("inherits responsive presentation and keeps explicit artwork ownership", () => {
    render(
      <Switch.Field
        size={{ initial: "sm", md: "lg" }}
        variant={{ initial: "solid", md: "raised" }}
        tone="success"
      >
        <Switch.Control>
          <Switch.Indicator forceMount fallback="off">on</Switch.Indicator>
          <Switch.Thumb><Switch.ThumbIndicator forceMount>yes</Switch.ThumbIndicator></Switch.Thumb>
        </Switch.Control>
        <Switch.Label>Sync</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Field>,
    );
    const control = screen.getByRole("switch", { name: "Sync" });
    expect(control).toHaveAttribute("data-size", "sm");
    expect(control).toHaveAttribute("data-size-md", "lg");
    expect(control).toHaveAttribute("data-variant-md", "raised");
    expect(control).toHaveAttribute("data-tone", "success");
    expect(control.querySelectorAll(".brick-switch-thumb")).toHaveLength(1);
    expect(control.querySelector(".brick-switch-indicator")).toHaveTextContent("off");
  });

  it("bridges one controller through RootProvider", async () => {
    const user = userEvent.setup();
    function ControllerExample() {
      const controller = useSwitch({ defaultChecked: false });
      return (
        <Switch.RootProvider value={controller} inputValue="enabled" name="updates">
          <Switch.Control />
          <Switch.Label>Updates</Switch.Label>
          <Switch.HiddenInput />
        </Switch.RootProvider>
      );
    }
    render(<ControllerExample />);
    const control = screen.getByRole("switch", { name: "Updates" });
    await user.click(control);
    expect(control).toHaveAttribute("aria-checked", "true");
    expect(document.querySelector("input[name='updates']")).toHaveAttribute("value", "enabled");
    expect(document.querySelector("input[name='updates']")).toBeChecked();
  });

  it("forwards compound refs and preserves custom-host cancellation", () => {
    const fieldRef = createRef<HTMLDivElement>();
    const controlRef = createRef<HTMLButtonElement>();
    const inputRef = createRef<HTMLInputElement>();
    const cancelled = vi.fn((event: MouseEvent) => event.preventDefault());
    render(
      <Switch.Field ref={fieldRef}>
        <Switch.Control ref={controlRef} asChild>
          <button onClick={cancelled}><Switch.Thumb /></button>
        </Switch.Control>
        <Switch.Label>Custom host</Switch.Label>
        <Switch.HiddenInput ref={inputRef} />
      </Switch.Field>,
    );
    const control = screen.getByRole("switch", { name: "Custom host" });
    fireEvent.click(control);
    expect(control).toHaveAttribute("aria-checked", "false");
    expect(fieldRef.current?.tagName).toBe("DIV");
    expect(controlRef.current).toBe(control);
    expect(inputRef.current?.type).toBe("checkbox");
  });
});
