import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { useForm, Controller } from "react-hook-form";
import { useMaskInput } from "use-mask-input";
import { usePaymentInputs } from "react-payment-inputs";
import { Input } from "../../src/input.js";
import { Input as AtomInput } from "@flowstack-ui/atom/input";

function RegisteredForm({ host = "brick" }: { host?: "brick" | "atom" | "native" }) {
  const { register, reset, handleSubmit } = useForm({ defaultValues: { name: "Ada" } });
  const [submitted, setSubmitted] = useState("");
  return <form onSubmit={handleSubmit((data) => setSubmitted(data.name))}>
    {host === "native" ? <input aria-label="Name" {...register("name")} /> : host === "atom" ? <AtomInput.Root aria-label="Name" {...register("name")} /> : <Input aria-label="Name" clearable {...register("name")} />}
    <button type="button" onClick={() => reset({ name: "Grace" })}>Reset</button>
    <button>Submit</button><output>{submitted}</output>
  </form>;
}

function ControlledForm() {
  const { control, reset, handleSubmit } = useForm({ defaultValues: { name: "Ada" } });
  const [submitted, setSubmitted] = useState("");
  return <form onSubmit={handleSubmit((data) => setSubmitted(data.name))}>
    <Controller name="name" control={control} render={({ field }) => <Input aria-label="Name" {...field} />} />
    <button type="button" onClick={() => reset({ name: "Grace" })}>Reset</button>
    <button>Submit</button><output>{submitted}</output>
  </form>;
}

function MaskedInput({ native = false }: { native?: boolean }) {
  const ref = useMaskInput({ mask: "999-999" });
  const [value, setValue] = useState("");
  return <>{native ? <input aria-label="Code" ref={ref} onChange={(event) => setValue(event.currentTarget.value)} /> : <Input aria-label="Code" ref={ref} onValueChange={setValue} />}<output>{value}</output></>;
}

function CardInput() {
  const { getCardNumberProps } = usePaymentInputs();
  return <Input aria-label="Card number" {...getCardNumberProps()} />;
}

describe("Input external integration feasibility", () => {
  it("does not echo a rejected controlled edit as a second value callback", async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    render(<Input aria-label="Controlled" value="Fixed" onValueChange={changed} />);
    await user.type(screen.getByRole("textbox", { name: "Controlled" }), "!");
    expect(changed.mock.calls).toEqual([["Fixed!"]]);
    expect(screen.getByRole("textbox", { name: "Controlled" })).toHaveValue("Fixed");
  });
  it("respects cancellation by the native change handler", async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    render(<Input aria-label="Cancelled" onChange={event => event.preventDefault()} onValueChange={changed} />);
    await user.type(screen.getByRole("textbox", { name: "Cancelled" }), "x");
    expect(changed).not.toHaveBeenCalled();
  });
  it("clear updates the registered form value, not only the DOM", async () => {
    const user = userEvent.setup();
    render(<RegisteredForm />);
    await user.click(screen.getByRole("button", { name: "Clear input" }));
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });
  it.each(["native", "atom"] as const)("%s register initial value comparison", async (host) => {
    render(<RegisteredForm host={host} />);
    await waitFor(() => expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("Ada"));
  });

  it("native mask comparison", async () => {
    const user = userEvent.setup();
    render(<MaskedInput native />);
    const input = screen.getByRole("textbox", { name: "Code" });
    await user.type(input, "123456");
    expect(input).toHaveValue("123-456");
  });
  it("register preserves default, typing and programmatic reset", async () => {
    const user = userEvent.setup();
    render(<RegisteredForm />);
    const input = screen.getByRole("textbox", { name: "Name" });
    await waitFor(() => expect(input).toHaveValue("Ada"));
    await user.type(input, " Lovelace");
    expect(input).toHaveValue("Ada Lovelace");
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(input).toHaveValue("Grace");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(screen.getByRole("status")).toHaveTextContent("Grace");
  });

  it("Controller preserves default, typing and programmatic reset", async () => {
    const user = userEvent.setup();
    render(<ControlledForm />);
    const input = screen.getByRole("textbox", { name: "Name" });
    expect(input).toHaveValue("Ada");
    await user.type(input, " Lovelace");
    expect(input).toHaveValue("Ada Lovelace");
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(input).toHaveValue("Grace");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(screen.getByRole("status")).toHaveTextContent("Grace");
  });

  it("mask keeps the formatted DOM value and Atom callbacks consistent", async () => {
    const user = userEvent.setup();
    render(<MaskedInput />);
    const input = screen.getByRole("textbox", { name: "Code" });
    await user.type(input, "123456");
    expect(input).toHaveValue("123-456");
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("123-456"));
  });

  it("payment prop getters format a synthetic card number", async () => {
    const user = userEvent.setup();
    render(<CardInput />);
    const input = screen.getByRole("textbox", { name: "Card number" });
    await user.type(input, "4242424242424242");
    expect(input).toHaveValue("4242 4242 4242 4242");
  });
});
