import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../../../src/field.js";
import { Slider } from "../../../src/slider.js";

function Example(props: React.ComponentProps<typeof Slider.Root> = {}) {
  return <Slider.Root aria-label="Volume" defaultValue={[40]} {...props}><Slider.Track><Slider.Range /><Slider.Marker value={25}>25</Slider.Marker><Slider.Thumb><Slider.ValueLabel /></Slider.Thumb></Slider.Track></Slider.Root>;
}

describe("Slider", () => {
  it("renders the complete default anatomy and recipes", () => {
    render(<Example />);
    const root = document.querySelector(".brick-slider")!;
    const thumb = screen.getByRole("slider", { name: "Volume" });
    expect(root).toHaveClass("brick-slider");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "solid");
    expect(root).toHaveAttribute("data-frame", "none");
    expect(thumb).toHaveAttribute("aria-valuenow", "40");
    expect(root.querySelector(".brick-slider__range")).toBeInTheDocument();
    expect(root.querySelector(".brick-slider__marker")).toHaveStyle({ "--brick-slider-marker-percent": "25" });
    expect(root.querySelector(".brick-slider__value-label")).toHaveTextContent("40");
  });

  it("can own an outline frame for compact property rows", () => {
    render(<Example frame="outline" size="sm" />);
    const root = document.querySelector(".brick-slider")!;
    expect(root).toHaveAttribute("data-frame", "outline");
    expect(root).toHaveAttribute("data-size", "sm");
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
