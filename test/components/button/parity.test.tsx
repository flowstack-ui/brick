import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { Button, ButtonGroup } from "../../../src/button.js";
import { IconButton } from "../../../src/icon-button.js";

it("shares visual defaults, preserves individual overrides and scopes nested groups", () => {
  render(<ButtonGroup size="sm" variant="surface" tone="neutral" radius="full">
    <Button>Inherited</Button><IconButton aria-label="Add">+</IconButton>
    <Button variant="plain" size="xl" shape="sharp">Override</Button>
    <ButtonGroup><Button>Nested</Button></ButtonGroup>
  </ButtonGroup>);
  expect(screen.getByText("Inherited").closest("button")).toHaveAttribute("data-variant","surface");
  expect(screen.getByRole("button",{name:"Add"})).toHaveAttribute("data-size","sm");
  const override = screen.getByRole("button",{name:"Override"});
  expect(override).toHaveAttribute("data-variant","plain");
  expect(override).toHaveAttribute("data-size","xl");
  expect(override.style.getPropertyValue("--brick-button-radius")).toBe("");
  expect(screen.getByRole("button",{name:"Nested"})).toHaveAttribute("data-variant","solid");
});

it("forwards Group host/ref and layout without leaking recipe props", () => {
  const ref = createRef<HTMLElement>();
  render(<ButtonGroup ref={ref} asChild attached orientation="vertical" variant="subtle"><section aria-label="Actions"><Button>Save</Button></section></ButtonGroup>);
  expect(ref.current).toBe(screen.getByRole("region",{name:"Actions"}));
  expect(ref.current).toHaveAttribute("data-attached");
  expect(ref.current).toHaveAttribute("data-orientation","vertical");
  expect(ref.current).not.toHaveAttribute("variant");
});

it("renders loading text and one decorative custom spinner without leaking props", async () => {
  const click = vi.fn();
  render(<Button loading loadingText="Saving" spinner={<span>indicator</span>} spinnerPlacement="end" onClick={click}>Save</Button>);
  const button = screen.getByRole("button",{name:"Saving"});
  expect(button).toHaveAttribute("aria-busy","true");
  expect(button).not.toBeDisabled();
  expect(button).not.toHaveAttribute("loadingText");
  expect(button.querySelector(".brick-button__loading-content")?.lastElementChild).toHaveClass("brick-button__spinner");
  await userEvent.click(button);
  expect(click).not.toHaveBeenCalled();
});

it("retains the original name for centered custom loading and the default path", () => {
  const {rerender} = render(<Button loading spinner={<span>indicator</span>}>Save</Button>);
  expect(screen.getByRole("button",{name:"Save"})).toHaveAttribute("data-custom-loading");
  rerender(<Button loading>Save</Button>);
  expect(screen.getByRole("button",{name:"Save"})).not.toHaveAttribute("data-custom-loading");
});

it("keeps false and zero loading text intentional", () => {
  const {rerender}=render(<Button loading loadingText={0}>Save</Button>);
  expect(screen.getByRole("button",{name:"0"})).toHaveAttribute("data-custom-loading");
  rerender(<Button loading loadingText={false}>Save</Button>);
  expect(screen.getByRole("button",{name:"Save"})).not.toHaveAttribute("data-custom-loading");
});

it("new variants preserve Atom host composition", () => {
  render(<ButtonGroup variant="plain"><Button asChild><a href="/docs">Docs</a></Button></ButtonGroup>);
  expect(screen.getByRole("link",{name:"Docs"})).toHaveAttribute("data-variant","plain");
});
