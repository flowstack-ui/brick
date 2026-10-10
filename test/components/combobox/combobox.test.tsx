import { createRef } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Combobox, useCombobox, type ComboboxShape, type ComboboxSize, type ComboboxVariant, type ComboboxRootProps } from "../../../src/combobox.js";
import { Field } from "../../../src/field.js";

const options = [{ value: "boston", label: "Boston" }, { value: "chicago", label: "Chicago" }, { value: "denver", label: "Denver", disabled: true }];
function Example({ defaultOpen = false }: { defaultOpen?: boolean }) { return <Field.Root id="combobox-city"><Field.Label>City</Field.Label><Combobox.Root defaultOpen={defaultOpen} options={options}><Combobox.Control><Combobox.Input /><Combobox.Clear /><Combobox.Trigger /></Combobox.Control><Combobox.Portal disabled><Combobox.Content><Combobox.Listbox>{options.map(option => <Combobox.Item disabled={option.disabled} key={option.value} label={option.label} value={option.value}>{option.label}</Combobox.Item>)}<Combobox.Empty /><Combobox.Loading /></Combobox.Listbox></Combobox.Content></Combobox.Portal></Combobox.Root></Field.Root>; }

describe("Combobox", () => {
  it("preserves presentation-part customization without replacing host refs or classes", () => {
    const group = createRef<HTMLDivElement>();
    const text = createRef<HTMLSpanElement>();
    const indicator = createRef<HTMLSpanElement>();
    const { container, rerender } = render(<Combobox.IndicatorGroup ref={group} data-slot="actions" className="custom-actions" title="Options"><Combobox.ItemText ref={text} data-slot="label">Boston</Combobox.ItemText><Combobox.ItemIndicator ref={indicator} data-slot="selected" /></Combobox.IndicatorGroup>);
    expect(group.current).toBe(container.firstChild);
    expect(group.current).toHaveAttribute("data-slot", "actions");
    expect(group.current).toHaveAttribute("title", "Options");
    expect(group.current).toHaveClass("brick-combobox-indicator-group", "custom-actions");
    expect(text.current).toHaveAttribute("data-slot", "label");
    expect(text.current).toHaveClass("brick-combobox-item-text");
    expect(indicator.current).toHaveAttribute("data-slot", "selected");
    expect(indicator.current).toHaveAttribute("aria-hidden", "true");
    rerender(<Combobox.IndicatorGroup><Combobox.ItemText>Boston</Combobox.ItemText><Combobox.ItemIndicator /></Combobox.IndicatorGroup>);
    for (const name of ["indicator-group", "item-text", "item-indicator"]) expect(container.querySelector(`[data-slot="combobox-${name}"]`)).not.toBeNull();
  });
  const parts = <><Combobox.Control><Combobox.Input aria-label="Choice" /><Combobox.Trigger /><Combobox.Clear /></Combobox.Control><Combobox.Content><Combobox.Listbox>{options.map(option => <Combobox.Item key={option.value} value={option.value}>{option.label}</Combobox.Item>)}</Combobox.Listbox></Combobox.Content></>;
  it("toggles multiple values, stays open, and submits repeated names", async () => {
    const user = userEvent.setup();
    render(<form aria-label="Choices"><Combobox.Root options={options} multiple name="cities" defaultValues={["boston"]}>{parts}</Combobox.Root></form>);
    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", {name:"Chicago"}));
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true");
    expect(new FormData(screen.getByRole("form") as HTMLFormElement).getAll("cities")).toEqual(["boston", "chicago"]);
    await user.click(await screen.findByRole("option", {name:"Boston"}));
    expect(new FormData(screen.getByRole("form") as HTMLFormElement).getAll("cities")).toEqual(["chicago"]);
    fireEvent.reset(screen.getByRole("form"));
    await waitFor(() => expect(new FormData(screen.getByRole("form") as HTMLFormElement).getAll("cities")).toEqual(["boston"]));
  });
  it("supports automatic highlight and autocomplete without collapsing the search results", async () => {
    const user = userEvent.setup();
    const {rerender} = render(<Combobox.Root options={options} inputBehavior="autohighlight">{parts}</Combobox.Root>);
    await user.type(screen.getByRole("combobox"), "chi");
    expect(await screen.findByRole("option", {name:"Chicago"})).toHaveAttribute("data-highlighted");
    await user.keyboard("{Enter}");
    expect(screen.getByRole("combobox")).toHaveValue("Chicago");
    rerender(<Combobox.Root key="complete" options={options} inputBehavior="autocomplete">{parts}</Combobox.Root>);
    await user.click(screen.getByRole("combobox"));
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("combobox")).toHaveValue("Boston");
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("combobox")).toHaveValue("Chicago");
  });
  it("preserves query after selection and can disable arrow-key opening", async () => {
    const user=userEvent.setup();
    render(<Combobox.Root options={options} selectionBehavior="preserve" openOnFocus={false} openOnKeyPress={false}>{parts}</Combobox.Root>);
    const input=screen.getByRole("combobox");
    await user.click(input); await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-expanded","false");
    await user.type(input,"chi"); await user.click(await screen.findByRole("option",{name:"Chicago"}));
    expect(input).toHaveValue("chi");
  });
  it("resets a controller through its RootProvider without losing initial selection", async () => {
    function Controller() { const state=useCombobox({options,defaultValue:"boston"}); return <form aria-label="Controller"><Combobox.RootProvider value={state}>{parts}</Combobox.RootProvider></form>; }
    const user=userEvent.setup(); render(<Controller />);
    await user.clear(screen.getByRole("combobox")); await user.type(screen.getByRole("combobox"),"chi");
    await user.click(await screen.findByRole("option",{name:"Chicago"}));
    fireEvent.reset(screen.getByRole("form"));
    await waitFor(()=>expect(screen.getByRole("combobox")).toHaveValue("Boston"));
  });
  it("renders canonical recipes and styled anatomy", () => { render(<Example defaultOpen />); expect(screen.getByRole("combobox", { name: "City" })).toHaveClass("brick-combobox-input"); const control = document.querySelector(".brick-combobox-control"); expect(control).toHaveAttribute("data-variant", "outline"); expect(control).toHaveAttribute("data-size", "lg"); expect(control).toHaveAttribute("data-shape", "rounded"); expect(control).toHaveAttribute("data-full-width", ""); expect(screen.getByRole("listbox", {hidden:true})).toHaveClass("brick-combobox-listbox"); expect(document.querySelector(".brick-combobox-content")).toHaveAttribute("data-size", "lg"); expect(screen.getAllByRole("option", {hidden:true})[0]).toHaveClass("brick-combobox-item"); expect(document.querySelector(".brick-combobox-indicator-artwork")).toBeInTheDocument(); });
  it("exposes variants sizes shapes and intrinsic width without leaking props", () => { const variants: ComboboxVariant[] = ["outline", "soft", "underline", "surface"]; const sizes: ComboboxSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]; const shapes: ComboboxShape[] = ["sharp", "rounded", "pill"]; const { rerender } = render(<Example />); for (const variant of variants) { rerender(<Combobox.Root options={options} variant={variant}><Combobox.Control><Combobox.Input aria-label="City" /></Combobox.Control></Combobox.Root>); const control = document.querySelector(".brick-combobox-control"); expect(control).toHaveAttribute("data-variant", variant); if (variant === "underline") expect(control).not.toHaveAttribute("data-shape"); } for (const size of sizes) { rerender(<Combobox.Root options={options} size={size}><Combobox.Control><Combobox.Input aria-label="City" /></Combobox.Control></Combobox.Root>); expect(document.querySelector(".brick-combobox-control")).toHaveAttribute("data-size", size); } for (const shape of shapes) { rerender(<Combobox.Root options={options} shape={shape}><Combobox.Control><Combobox.Input aria-label="City" /></Combobox.Control></Combobox.Root>); expect(document.querySelector(".brick-combobox-control")).toHaveAttribute("data-shape", shape); } });
  it("preserves trigger filtering selection freeSolo and callbacks", async () => { const user = userEvent.setup(); const onValueChange = vi.fn(); render(<Combobox.Root onValueChange={onValueChange} options={options}><Combobox.Control><Combobox.Input aria-label="City" /><Combobox.Trigger /></Combobox.Control><Combobox.Content><Combobox.Listbox>{options.map(option => <Combobox.Item key={option.value} label={option.label} value={option.value}>{option.label}</Combobox.Item>)}</Combobox.Listbox></Combobox.Content></Combobox.Root>); const input = screen.getByRole("combobox"); await user.click(screen.getByRole("button", { name: "Toggle options" })); expect(await screen.findByRole("listbox")).toBeInTheDocument(); await user.type(input, "chi"); expect(await screen.findByRole("option", { name: "Chicago" })).toBeInTheDocument(); expect(screen.queryByRole("option", { name: "Boston" })).not.toBeInTheDocument(); await user.click(await screen.findByRole("option", { name: "Chicago" })); expect(onValueChange).toHaveBeenCalledWith("chicago"); });
  it("preserves refs native props classes and replaceable artwork", () => { const ref = createRef<HTMLInputElement>(); render(<Combobox.Root options={options}><Combobox.Control className="consumer"><Combobox.Input aria-label="City" data-check="yes" ref={ref} /><Combobox.Clear>Remove</Combobox.Clear><Combobox.Trigger aria-label="Open cities"><Combobox.Indicator>Open</Combobox.Indicator></Combobox.Trigger></Combobox.Control></Combobox.Root>); expect(screen.getByRole("combobox")).toBe(ref.current); expect(screen.getByRole("combobox")).toHaveAttribute("data-check", "yes"); expect(document.querySelector(".brick-combobox-control")).toHaveClass("consumer"); expect(screen.getByText("Open")).toBeInTheDocument(); });
  it("inherits Field invalid state on the whole visual control", () => { render(<Field.Root id="invalid-city" invalid><Field.Label>City</Field.Label><Combobox.Root options={options}><Combobox.Control><Combobox.Input /></Combobox.Control></Combobox.Root><Field.Error>Choose a city.</Field.Error></Field.Root>); expect(document.querySelector(".brick-combobox-control")).toHaveAttribute("data-invalid"); expect(screen.getByRole("combobox", { name: "City" })).toHaveAttribute("aria-invalid", "true"); expect(screen.getByText("Choose a city.")).toBeInTheDocument(); });
  it("keeps sparse responsive size metadata on the control and popup", () => { render(<Combobox.Root defaultOpen options={options} size={{lg:"xl"}}><Combobox.Control><Combobox.Input aria-label="City" /></Combobox.Control><Combobox.Content><Combobox.Listbox><Combobox.Item label="Boston" value="boston">Boston</Combobox.Item></Combobox.Listbox></Combobox.Content></Combobox.Root>); expect(document.querySelector(".brick-combobox-control")).toHaveAttribute("data-size","lg"); expect(document.querySelector(".brick-combobox-control")).toHaveAttribute("data-size-lg","xl"); expect(document.querySelector(".brick-combobox-content")).toHaveAttribute("data-size-lg","xl"); });
});
