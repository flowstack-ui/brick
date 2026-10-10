import { createRef } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../../../src/field.js";
import { Slider } from "../../../src/slider.js";

function Example(props: React.ComponentProps<typeof Slider.Root> = {}) {
  return <Slider.Root aria-label="Volume" defaultValue={[40]} {...props}><Slider.Control><Slider.Track><Slider.Range /></Slider.Track><Slider.MarkerGroup><Slider.Marker value={25}><Slider.MarkerIndicator /><Slider.MarkerLabel>25</Slider.MarkerLabel></Slider.Marker></Slider.MarkerGroup><Slider.Thumb><Slider.ValueLabel /></Slider.Thumb></Slider.Control></Slider.Root>;
}

describe("Slider", () => {
  function pointer(node: Element, type: string, x: number, button = 0) {
    const event = new Event(type, {bubbles:true, cancelable:true});
    Object.defineProperties(event, {
      pointerId:{value:1}, isPrimary:{value:true}, button:{value:button},
      clientX:{value:x}, clientY:{value:10}, pointerType:{value:"mouse"},
    });
    fireEvent(node, event);
  }
  function controlGeometry() {
    const control = document.querySelector(".brick-slider__control")!;
    vi.spyOn(control, "getBoundingClientRect").mockReturnValue({x:0,y:0,left:0,top:0,right:100,bottom:20,width:100,height:20,toJSON:()=>({})});
    return control;
  }
  it("rejects secondary pointers and focuses a primary track activation", () => {
    const change = vi.fn();
    render(<Example thumbSize={{width:20,height:20}} onValueChange={change}/>);
    const control=controlGeometry();
    pointer(control,"pointerdown",75,2);
    expect(change).not.toHaveBeenCalled();
    pointer(control,"pointerdown",50);
    expect(screen.getByRole("slider")).toHaveFocus();
    pointer(control,"pointerup",90);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow","100");
  });
  it("reset invalidates an active drag without a stale commit", async () => {
    const commit=vi.fn();
    render(<form data-testid="form"><Example thumbSize={{width:20,height:20}} onValueCommit={commit}/></form>);
    const control=controlGeometry();
    pointer(control,"pointerdown",70);
    fireEvent.reset(screen.getByTestId("form"));
    await waitFor(() => expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow","40"));
    pointer(control,"pointermove",90); pointer(control,"pointerup",90);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow","40");
    expect(commit).not.toHaveBeenCalled();
  });
  it("a controlled rejection cannot commit a speculative pointer value", () => {
    const commit=vi.fn();
    render(<Example value={40} thumbSize={{width:20,height:20}} onValueCommit={commit}/>);
    const control=controlGeometry();
    pointer(control,"pointerdown",75); pointer(control,"pointerup",90);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow","40");
    expect(commit).not.toHaveBeenCalled();
  });
  it("changing orientation invalidates the previous drag coordinate system", () => {
    const commit=vi.fn();
    const view=render(<Example onValueCommit={commit}/>);
    const control=controlGeometry();
    pointer(control,"pointerdown",50);
    view.rerender(<Example orientation="vertical" onValueCommit={commit}/>);
    pointer(control,"pointerup",90);
    expect(commit).not.toHaveBeenCalled();
    expect(screen.getByRole("slider")).not.toHaveAttribute("data-dragging");
  });
  it("renders the complete default anatomy and recipes", () => {
    render(<Example />);
    const root = document.querySelector(".brick-slider")!;
    const thumb = screen.getByRole("slider", { name: "Volume" });
    expect(root).toHaveClass("brick-slider");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-tone", "accent");
    expect(root).toHaveAttribute("data-frame", "none");
    expect(thumb).toHaveAttribute("aria-valuenow", "40");
    expect(root.querySelector(".brick-slider__range")).toBeInTheDocument();
    expect(root.querySelector(".brick-slider__marker")).toHaveStyle({ insetInlineStart: "25%" });
    expect(root.querySelector(".brick-slider__marker-indicator")).toBeInTheDocument();
    expect(root.querySelector(".brick-slider__marker-label")).toHaveTextContent("25");
    expect(root.querySelector(".brick-slider__value-label")).toHaveTextContent("40");
  });

  it("can own an outline frame for compact property rows", () => {
    render(<Example frame="outline" size="sm" />);
    const root = document.querySelector(".brick-slider")!;
    expect(root).toHaveAttribute("data-frame", "outline");
    expect(root).toHaveAttribute("data-size", "sm");
  });

  it("emits responsive recipes and semantic tones", () => {
    render(<Example size={{ initial: "sm", md: "lg" }} variant={{ initial: "outline", lg: "solid" }} tone="contrast" />);
    const root = document.querySelector(".brick-slider")!;
    expect(root).toHaveAttribute("data-size", "sm");
    expect(root).toHaveAttribute("data-size-md", "lg");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-variant-lg", "solid");
    expect(root).toHaveAttribute("data-tone", "contrast");
  });

  it("supports decorative thumb content without replacing the slider semantics", () => {
    render(<Slider.Root aria-label="Seats" defaultValue={[25]}><Slider.Track><Slider.Range/><Slider.Thumb><svg aria-hidden="true" data-testid="thumb-icon"/></Slider.Thumb></Slider.Track></Slider.Root>);
    expect(screen.getByRole("slider", { name: "Seats" })).toContainElement(screen.getByTestId("thumb-icon"));
  });

  it("supports range values, vertical orientation, soft styling, and formatted labels", () => {
    render(<Slider.Root aria-label="Price range" defaultValue={[20, 80]} orientation="vertical" size="lg" variant="soft"><Slider.Track><Slider.Range /><Slider.Thumb index={0}><Slider.ValueLabel>{({ value }) => `$${value}`}</Slider.ValueLabel></Slider.Thumb><Slider.Thumb index={1}><Slider.ValueLabel /></Slider.Thumb></Slider.Track></Slider.Root>);
    const root = document.querySelector(".brick-slider")!;
    expect(root).toHaveAttribute("data-orientation", "vertical");
    expect(root).toHaveAttribute("data-size", "lg");
    expect(root).toHaveAttribute("data-variant", "soft");
    expect(screen.getAllByRole("slider")).toHaveLength(2);
    expect(screen.getByText("$20")).toBeVisible();
  });

  it("supports shortcut thumbs and marks without duplicating authored anatomy", () => {
    render(<Slider.Root aria-label="Window" defaultValue={[20, 80]}><Slider.Control><Slider.Track><Slider.Range /></Slider.Track><Slider.Marks marks={[0, { value: 50, label: "Mid" }, 100]} /><Slider.Thumbs>{({ value }) => <Slider.ValueLabel>{value}</Slider.ValueLabel>}</Slider.Thumbs></Slider.Control></Slider.Root>);
    expect(screen.getByRole("slider", { name: "Window 1" })).toHaveAttribute("aria-valuenow", "20");
    expect(screen.getByRole("slider", { name: "Window 2" })).toHaveAttribute("aria-valuenow", "80");
    expect(document.querySelectorAll(".brick-slider__marker")).toHaveLength(3);
    expect(screen.getByText("Mid")).toHaveClass("brick-slider__marker-label");
  });

  it("renders label, output, dragging indicator, and explicit hidden input parts", () => {
    render(<Slider.Root defaultValue={[35]} name="level" hiddenInputMode="explicit"><Slider.Label>Level</Slider.Label><Slider.ValueText>{({ values }) => `${values[0]}%`}</Slider.ValueText><Slider.Control><Slider.Track><Slider.Range /></Slider.Track><Slider.Thumb /><Slider.DraggingIndicator /><Slider.HiddenInput /></Slider.Control></Slider.Root>);
    expect(screen.getByRole("slider", { name: "Level" })).toHaveAttribute("aria-valuenow", "35");
    expect(document.querySelector("output")).toHaveTextContent("35%");
    expect(document.querySelector('.brick-slider__dragging-indicator')).toHaveTextContent("35");
    expect(document.querySelectorAll('input[name="level"]')).toHaveLength(1);
  });

  it("identifies logical endpoint markers for contained alignment", () => {
    render(<Slider.Root aria-label="Scale" defaultValue={[50]}><Slider.Track><Slider.Marker value={0}>0</Slider.Marker><Slider.Marker value={50}>50</Slider.Marker><Slider.Marker value={100}>100</Slider.Marker><Slider.Range /><Slider.Thumb /></Slider.Track></Slider.Root>);
    const markers = document.querySelectorAll(".brick-slider__marker");
    expect(markers[0]).toHaveAttribute("data-edge", "start");
    expect(markers[1]).not.toHaveAttribute("data-edge");
    expect(markers[2]).toHaveAttribute("data-edge", "end");
  });

  it("identifies markers inside the selected range", () => {
    render(<Slider.Root aria-label="Scale" defaultValue={[50]}><Slider.Track><Slider.Marker value={0} /><Slider.Marker value={50} /><Slider.Marker value={100} /><Slider.Range /><Slider.Thumb /></Slider.Track></Slider.Root>);
    const markers = document.querySelectorAll(".brick-slider__marker");
    expect(markers[0]).toHaveAttribute("data-selected");
    expect(markers[1]).toHaveAttribute("data-selected");
    expect(markers[2]).not.toHaveAttribute("data-selected");
  });

  it("inherits Field state and participates in form submission and reset", () => {
    const onChange = vi.fn();
    render(<form onChange={onChange}><Field.Root invalid disabled><Field.Label>Brightness</Field.Label><Example name="brightness" /></Field.Root><button type="reset">Reset</button></form>);
    const root = document.querySelector(".brick-slider")!;
    const thumb = screen.getByRole("slider", { name: "Volume" });
    expect(root).toHaveAttribute("data-invalid");
    expect(root).toHaveAttribute("data-disabled");
    expect(thumb).toHaveAttribute("aria-invalid", "true");
    expect(document.querySelector('input[name="brightness"]')).toHaveValue("40");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
  });

  it("forwards consumer props and refs on every public part", () => {
    const rootRef = createRef<HTMLDivElement>(); const trackRef = createRef<HTMLDivElement>(); const rangeRef = createRef<HTMLSpanElement>(); const thumbRef = createRef<HTMLSpanElement>(); const markerRef = createRef<HTMLSpanElement>(); const labelRef = createRef<HTMLSpanElement>();
    render(<Slider.Root ref={rootRef} aria-label="Level" className="consumer" defaultValue={[5]}><Slider.Track ref={trackRef}><Slider.Range ref={rangeRef} /><Slider.Marker ref={markerRef} value={5} /><Slider.Thumb ref={thumbRef}><Slider.ValueLabel ref={labelRef} data-slot="custom-label" /></Slider.Thumb></Slider.Track></Slider.Root>);
    expect(rootRef.current).toHaveClass("brick-slider", "consumer"); expect(trackRef.current).toHaveClass("brick-slider__track"); expect(rangeRef.current).toHaveClass("brick-slider__range"); expect(thumbRef.current).toHaveClass("brick-slider__thumb"); expect(markerRef.current).toHaveAttribute("aria-hidden", "true"); expect(labelRef.current).toHaveAttribute("data-slot", "custom-label");
  });
});
