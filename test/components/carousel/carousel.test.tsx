import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { Carousel } from "../../../src/carousel.js";

const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
beforeAll(() => { HTMLElement.prototype.scrollIntoView = vi.fn(); });
afterAll(() => { HTMLElement.prototype.scrollIntoView = originalScrollIntoView; });

function Standard(props: Partial<React.ComponentProps<typeof Carousel.Root>> = {}) {
  return <Carousel.Root aria-label="Featured work" defaultValue="one" {...props}>
    <Carousel.Viewport><Carousel.Track>
      <Carousel.Slide value="one" label="First story">First</Carousel.Slide>
      <Carousel.Slide value="two" label="Second story">Second</Carousel.Slide>
      <Carousel.Slide value="three" label="Third story">Third</Carousel.Slide>
    </Carousel.Track></Carousel.Viewport>
    <Carousel.Navigation><Carousel.Previous /><Carousel.Next /></Carousel.Navigation>
    <Carousel.Controls><Carousel.RotationControl /><Carousel.Picker><Carousel.PickerItem value="one" /><Carousel.PickerItem value="two" /><Carousel.PickerItem value="three" /></Carousel.Picker></Carousel.Controls>
  </Carousel.Root>;
}

describe("Carousel", () => {
  it("renders finished defaults and all public parts", () => {
    render(<Standard />);
    const root = screen.getByRole("group", { name: "Featured work" });
    expect(root).toHaveClass("brick-carousel");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-control-placement", "overlay");
    expect(root).toHaveAttribute("data-control-shape", "circle");
    expect(root).toHaveAttribute("data-control-variant", "soft");
    expect(root).toHaveAttribute("data-radius", "surface");
    expect(root).not.toHaveAttribute("data-fill");
    expect(root.querySelector(".brick-carousel__viewport")).toBeTruthy();
    expect(root.querySelectorAll(".brick-carousel__slide")).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Previous slide" }).querySelector("svg")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Start slide rotation" }).querySelector("svg")).toBeTruthy();
    expect(screen.getByRole("button", { name: "First story" })).toHaveAttribute("data-state", "active");
    expect(root.querySelector(".brick-carousel__navigation")).toHaveAttribute("data-visibility", "always");
    expect(root.querySelector(".brick-carousel__picker")).toHaveAttribute("data-variant", "surface");
  });

  it("preserves behavior, recipes, hooks, and refs", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const ref = createRef<HTMLDivElement>();
    render(<Standard className="custom" controlPlacement="outside" fill onValueChange={onValueChange} radius="none" ref={ref} size="lg" />);
    expect(ref.current).toHaveClass("brick-carousel", "custom");
    expect(ref.current).toHaveAttribute("data-size", "lg");
    expect(ref.current).toHaveAttribute("data-control-placement", "outside");
    expect(ref.current).toHaveAttribute("data-fill", "");
    expect(ref.current).toHaveAttribute("data-radius", "none");
    await user.click(screen.getByRole("button", { name: "Next slide" }));
    expect(onValueChange).toHaveBeenLastCalledWith("two", "next");
    expect(screen.getByRole("button", { name: "Second story" })).toHaveAttribute("data-state", "active");
  });

  it("supports a control-free manual composition", () => {
    render(<Carousel.Root aria-label="Gallery" defaultValue="one"><Carousel.Viewport><Carousel.Track><Carousel.Slide value="one">Only slide</Carousel.Slide></Carousel.Track></Carousel.Viewport></Carousel.Root>);
    expect(screen.getByRole("group", { name: "Gallery" })).toBeVisible();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("exposes independent compact control, picker, and navigation recipes", () => {
    render(
      <Carousel.Root aria-label="Campaigns" defaultValue="one" controlShape="rounded" controlVariant="outline">
        <Carousel.Viewport><Carousel.Track><Carousel.Slide value="one">Only slide</Carousel.Slide></Carousel.Track></Carousel.Viewport>
        <Carousel.Navigation visibility="interaction"><Carousel.Previous variant="ghost" /><Carousel.Next shape="circle" /></Carousel.Navigation>
        <Carousel.Controls><Carousel.RotationControl size="xs" variant="ghost" /><Carousel.Picker variant="bare"><Carousel.PickerItem value="one" /></Carousel.Picker></Carousel.Controls>
      </Carousel.Root>,
    );
    const root = screen.getByRole("group", { name: "Campaigns" });
    expect(root).toHaveAttribute("data-control-shape", "rounded");
    expect(root).toHaveAttribute("data-control-variant", "outline");
    expect(root.querySelector(".brick-carousel__navigation")).toHaveAttribute("data-visibility", "interaction");
    expect(screen.getByRole("button", { name: "Previous slide" })).toHaveAttribute("data-variant", "ghost");
    expect(screen.getByRole("button", { name: "Next slide" })).toHaveAttribute("data-shape", "circle");
    expect(screen.getByRole("button", { name: "Start slide rotation" })).toHaveAttribute("data-size", "xs");
    expect(root.querySelector(".brick-carousel__picker")).toHaveAttribute("data-variant", "bare");
  });
});
