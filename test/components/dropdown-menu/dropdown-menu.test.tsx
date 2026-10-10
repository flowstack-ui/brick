import { createRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DropdownMenu } from "../../../src/dropdown-menu.js";
import { Link } from "../../../src/link.js";

Element.prototype.scrollIntoView = vi.fn();

function Example({
  defaultOpen = true,
  size = "md",
}: {
  defaultOpen?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <DropdownMenu.Root defaultOpen={defaultOpen} size={size}>
      <DropdownMenu.Trigger>Project actions</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content ariaLabel="Project actions">
          <DropdownMenu.Label>Project</DropdownMenu.Label>
          <DropdownMenu.Item value="rename">
            <DropdownMenu.Leading>R</DropdownMenu.Leading>
            <DropdownMenu.ItemLabel>Rename project</DropdownMenu.ItemLabel>
            <DropdownMenu.Description>
              Change the visible project name.
            </DropdownMenu.Description>
            <DropdownMenu.Shortcut>⌘R</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
          <DropdownMenu.CheckboxItem checked value="updates">
            <DropdownMenu.ItemIndicator />
            <DropdownMenu.ItemLabel>Email updates</DropdownMenu.ItemLabel>
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.Item disabled value="archive">
            <DropdownMenu.ItemLabel>Archive project</DropdownMenu.ItemLabel>
          </DropdownMenu.Item>
          <DropdownMenu.Item tone="danger" value="delete">
            <DropdownMenu.ItemLabel>Delete project</DropdownMenu.ItemLabel>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

describe("DropdownMenu", () => {
  it("renders the adopted defaults and independent anatomy", async () => {
    render(<Example />);
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });
    expect(screen.getByRole("button", { name: "Project actions" })).toHaveClass(
      "brick-dropdown-menu__trigger",
    );
    expect(screen.getByRole("menu", { name: "Project actions" })).toHaveClass(
      "brick-dropdown-menu__content",
    );
    expect(screen.getByRole("menu")).toHaveAttribute("data-size", "md");
    expect(
      screen.getByRole("menuitem", { name: /Delete project/ }),
    ).toHaveAttribute("data-tone", "danger");
    expect(
      document.querySelector(".brick-dropdown-menu__item-indicator"),
    ).toHaveAttribute("data-state", "checked");
    expect(
      document.querySelector(".brick-dropdown-menu__description"),
    ).toBeInTheDocument();
  });

  it("propagates density without leaking it to a host", async () => {
    const { rerender } = render(<Example size="sm" />);
    await screen.findByRole("menu");
    expect(screen.getByRole("menu")).toHaveAttribute("data-size", "sm");
    rerender(<Example size="lg" />);
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });
    expect(screen.getByRole("menu")).toHaveAttribute("data-size", "lg");
    expect(
      screen.getByRole("button", { name: "Project actions" }),
    ).not.toHaveAttribute("size");
  });

  it("preserves Atom activation, disabled behavior, composition, and refs", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const ref = createRef<HTMLElement>();
    render(
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button>More</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item
            onSelect={onSelect}
            ref={ref}
            value="rename"
            asChild
          >
            <div data-owner="consumer">
              <DropdownMenu.ItemLabel>Rename</DropdownMenu.ItemLabel>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>,
    );
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });
    await user.click(screen.getByRole("button", { name: "More" }));
    const item = screen.getByRole("menuitem", { name: "Rename" });
    expect(item).toBe(ref.current);
    expect(item).toHaveClass("brick-dropdown-menu__item");
    expect(item).toHaveAttribute("data-owner", "consumer");
    await user.click(item);
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it("preserves destination semantics and row anatomy when composed with Link", async () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Navigate</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item asChild value="projects">
            <Link href="/projects" tone="inherit" variant="plain">
              <DropdownMenu.Leading>P</DropdownMenu.Leading>
              <DropdownMenu.ItemLabel>Projects</DropdownMenu.ItemLabel>
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>,
    );
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });

    const destination = screen.getByRole("menuitem", { name: /Projects/ });
    expect(destination).toHaveAttribute("href", "/projects");
    expect(destination).toHaveClass("brick-link", "brick-dropdown-menu__item");
    expect(destination.querySelector(".brick-link__content")).toContainElement(
      destination.querySelector(".brick-dropdown-menu__item-label"),
    );
  });
});

describe("DropdownMenu visual recipes", () => {
  it("inherits popup recipes while explicit row tone and inline inset win", async () => {
    render(
      <DropdownMenu.Root defaultOpen size="lg" variant="solid" tone="accent">
        <DropdownMenu.Trigger>Recipe trigger</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            size="sm"
            variant="plain"
            inset="none"
            itemInset="none"
            leadingSpace="reserve"
            ariaLabel="Recipe popup"
          >
            <DropdownMenu.Item value="inherited">Inherited</DropdownMenu.Item>
            <DropdownMenu.Item
              value="neutral"
              tone="neutral"
              itemInset="default"
              layout="stack"
            >
              Neutral
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>,
    );
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });
    const popup = screen.getByRole("menu", { name: "Recipe popup" });
    expect(popup).toHaveAttribute("data-size", "sm");
    expect(popup).toHaveAttribute("data-variant", "plain");
    expect(popup).toHaveAttribute("data-inset", "none");
    const inherited = screen.getByRole("menuitem", { name: "Inherited" });
    expect(inherited).toHaveAttribute("data-tone", "accent");
    expect(inherited).toHaveAttribute("data-item-inset", "none");
    expect(inherited).toHaveAttribute("data-leading-space", "reserve");
    expect(inherited).not.toHaveAttribute("itemInset");
    expect(inherited).not.toHaveAttribute("layout");
    const reset = screen.getByRole("menuitem", { name: "Neutral" });
    expect(reset).toHaveAttribute("data-tone", "neutral");
    expect(reset).toHaveAttribute("data-item-inset", "default");
    expect(reset).toHaveAttribute("data-layout", "stack");
  });
  it("replaces and suppresses submenu artwork without duplicating the default", async () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Recipe trigger</DropdownMenu.Trigger>
        <DropdownMenu.Content ariaLabel="Artwork popup">
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger value="default">
              Default arrow
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item value="one">One</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger
              value="custom"
              indicator={<span>Custom arrow</span>}
              asChild
            >
              <button>Custom trigger</button>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item value="two">Two</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger value="none" indicator={null}>
              No arrow
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item value="three">Three</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu.Root>,
    );
    await waitFor(() => {
      for (const popup of document.querySelectorAll(
        "[data-atom-menu-positioner]",
      )) {
        if (popup.querySelector("[data-state='open']"))
          expect((popup as HTMLElement).style.visibility).not.toBe("hidden");
      }
    });
    expect(
      screen
        .getByRole("menuitem", { name: "Default arrow" })
        .querySelectorAll(".brick-action-menu__chevron"),
    ).toHaveLength(1);
    expect(
      screen
        .getByRole("menuitem", { name: "Custom trigger" })
        .querySelectorAll(".brick-action-menu__chevron"),
    ).toHaveLength(0);
    expect(
      screen.getByRole("menuitem", { name: "Custom trigger" }),
    ).toHaveTextContent("Custom arrow");
    expect(
      screen
        .getByRole("menuitem", { name: "No arrow" })
        .querySelector(".brick-action-menu__submenu-indicator"),
    ).toBeNull();
  });
});
