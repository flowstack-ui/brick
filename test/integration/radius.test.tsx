import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Button, type ButtonProps } from "../../src/button.js";
import { IconButton } from "../../src/icon-button.js";
import { Toggle } from "../../src/toggle.js";
import { ToggleGroup } from "../../src/toggle-group.js";
import { CloseButton } from "../../src/close-button.js";
import { radiusStyle } from "../../src/components/_radius/Radius.js";
import { Input } from "../../src/input.js";
import { Textarea } from "../../src/textarea.js";
import { Card } from "../../src/card.js";
import { Surface } from "../../src/surface.js";
import { Badge } from "../../src/badge.js";
import { Chip } from "../../src/chip.js";
import { Tabs } from "../../src/tabs.js";
import { Avatar } from "../../src/avatar.js";
import { AvatarGroup } from "../../src/avatar-group.js";
import { DropdownMenu } from "../../src/dropdown-menu.js";

afterEach(cleanup);
it("distinguishes core choices from semantic roles without arbitrary CSS", () => {
  expect(radiusStyle("sm", "--brick-button-radius")).toEqual({"--brick-button-radius":"var(--brick-radius-core-sm)"});
  expect(radiusStyle("control", "--brick-button-radius")).toEqual({"--brick-button-radius":"var(--brick-radius-control)"});
  expect(radiusStyle("2rem" as never, "--brick-button-radius")).toBeUndefined();
  const style={color:"red"};
  expect(radiusStyle(undefined,"--brick-button-radius",style)).toBe(style);
});
it("consumes radius on action owners without leaking a native attribute", () => {
  render(<><Button radius="sm">Save</Button><IconButton radius="none" aria-label="Search">S</IconButton><Toggle radius="full">Bold</Toggle><CloseButton radius="subtle"/></>);
  for(const label of ["Save","Search","Bold","Close"]) expect(screen.getByRole("button",{name:label})).not.toHaveAttribute("radius");
  expect(screen.getByRole("button",{name:"Save"}).style.getPropertyValue("--brick-button-radius")).toBe("var(--brick-radius-core-sm)");
  expect(screen.getByRole("button",{name:"Search"}).style.getPropertyValue("--brick-button-radius")).toBe("0px");
});
it("places group radius on the group while leaving pressed behavior intact", () => {
  render(<ToggleGroup.Root aria-label="Format" radius="md" attached><ToggleGroup.Item value="bold">Bold</ToggleGroup.Item></ToggleGroup.Root>);
  expect(screen.getByRole("group").style.getPropertyValue("--brick-toggle-group-radius")).toBe("var(--brick-radius-core-md)");
  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed","false");
});

it("places radius on the visual boundary rather than a native form field", () => {
  const {container}=render(<><Input aria-label="Name" radius="xs"/><Textarea.Root aria-label="Notes" radius="surface"/></>);
  expect(container.querySelector<HTMLElement>(".brick-input")?.style.getPropertyValue("--brick-input-radius")).toBe("var(--brick-radius-core-xs)");
  expect(container.querySelector<HTMLElement>(".brick-textarea")?.style.getPropertyValue("--brick-textarea-radius")).toBe("var(--brick-radius-surface)");
  expect(container.querySelector("[radius]")).toBeNull();
});

it("consumes surface, badge, chip and tab radius independently", () => {
  const {container}=render(<Surface radius="overlay"><Card.Root radius="sm"><Badge radius="none">Status</Badge><Chip.Root radius="control">Chip</Chip.Root><Tabs.Root defaultValue="one"><Tabs.List radius="xs"><Tabs.Trigger value="one">One</Tabs.Trigger></Tabs.List><Tabs.Content value="one">Content</Tabs.Content></Tabs.Root></Card.Root></Surface>);
  for (const [selector,property,value] of [
    [".brick-surface","--brick-surface-radius","var(--brick-radius-overlay)"],
    [".brick-card","--brick-card-radius","var(--brick-radius-core-sm)"],
    [".brick-badge","--brick-badge-radius","0px"],
    [".brick-chip","--brick-chip-radius","var(--brick-radius-control)"],
    [".brick-tabs-list","--brick-tabs-radius","var(--brick-radius-core-xs)"],
  ]) expect(container.querySelector<HTMLElement>(selector!)?.style.getPropertyValue(property!)).toBe(value);
  expect(container.querySelector("[radius]")).toBeNull();
});

it("keeps explicit instance style precedence and untyped radius-over-shape precedence", () => {
  render(<Button {...{shape:"pill",radius:"sm"} as unknown as ButtonProps} style={{"--brick-button-radius":"2px"} as React.CSSProperties}>Save</Button>);
  const button=screen.getByRole("button",{name:"Save"});
  expect(button).toHaveAttribute("data-shape","rounded");
  expect(button.style.getPropertyValue("--brick-button-radius")).toBe("2px");
});

it("keeps nested avatar groups and generated overflow corners independent", () => {
  const {container,rerender}=render(<AvatarGroup radius="sm" max={2} overflowLabel={count=>`${count} more`}>
    <Avatar alt="Ada" fallback="A" radius="full"/>
    <Avatar alt="Lin" fallback="L"/>
    <Avatar alt="Max" fallback="M"/>
  </AvatarGroup>);
  const avatars=container.querySelectorAll<HTMLElement>(".brick-avatar");
  expect(avatars).toHaveLength(2);
  expect(avatars[0]!.style.getPropertyValue("--brick-avatar-radius")).toBe("var(--brick-radius-full)");
  expect(avatars[1]!.style.getPropertyValue("--brick-avatar-radius")).toBe("var(--brick-radius-core-sm)");
  expect(container.querySelector("[radius]")).toBeNull();
  rerender(<AvatarGroup radius="sm"><AvatarGroup as="span" radius="lg"><Avatar alt="Nested" fallback="N"/></AvatarGroup></AvatarGroup>);
  expect(container.querySelector<HTMLElement>(".brick-avatar")?.style.getPropertyValue("--brick-avatar-radius")).toBe("var(--brick-radius-core-lg)");
});

it("consumes an independently authored menu content radius", async () => {
  render(<DropdownMenu.Root defaultOpen><DropdownMenu.Trigger>Actions</DropdownMenu.Trigger><DropdownMenu.Content radius="xs"><DropdownMenu.Item value="save">Save</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Root>);
  const menu=await screen.findByRole("menu");
  expect(menu.style.getPropertyValue("--brick-dropdown-menu-content-radius")).toBe("var(--brick-radius-core-xs)");
  expect(menu).not.toHaveAttribute("radius");
});
