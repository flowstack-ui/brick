import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Dialog,
  DialogContent,
  DialogRoot,
  type DialogRootProps,
} from "../../src/dialog.js";
import { Button } from "../../src/button.js";

function OpenDialog({
  onOpenChange,
}: {
  onOpenChange?: NonNullable<DialogRootProps["onOpenChange"]>;
}) {
  return (
    <Dialog.Root defaultOpen onOpenChange={onOpenChange}>
      <Dialog.Trigger>Open profile</Dialog.Trigger>
      <Dialog.Portal disabled>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Description>Update your public details.</Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>Profile form</Dialog.Body>
          <Dialog.Branch>Owned portal branch</Dialog.Branch>
          <Dialog.Footer>
            <Dialog.Close>Cancel</Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

describe("Dialog", () => {
  it("renders the approved anatomy, default size, and generated relationships", () => {
    render(<OpenDialog />);

    const dialog = screen.getByRole("dialog", { name: "Edit profile" });
    expect(dialog).toHaveClass("brick-dialog-content");
    expect(dialog).toHaveAttribute("data-slot", "dialog-content");
    expect(dialog).toHaveAttribute("data-size", "md");
    expect(dialog).toHaveAccessibleDescription("Update your public details.");
    expect(screen.getByRole("heading", { level: 2, name: "Edit profile" })).toHaveClass(
      "brick-dialog-title",
    );
    expect(screen.getByText("Profile form")).toHaveClass("brick-dialog-body");
    expect(screen.getByText("Owned portal branch")).toHaveClass("brick-dialog-branch");
    expect(screen.getByRole("button", { name: "Cancel" }).parentElement).toHaveClass(
      "brick-dialog-footer",
    );
    expect(document.querySelector(".brick-dialog-overlay")).toHaveAttribute(
      "data-slot",
      "dialog-overlay",
    );
  });

  it("forwards native props, refs, classes, styles, slots, and every size", () => {
    const ref = createRef<HTMLDivElement>();
    const onClick = vi.fn();
    const { rerender } = render(
      <Dialog.Root defaultOpen>
        <Dialog.Portal disabled>
          <Dialog.Content
            aria-label="Settings"
            className="consumer-dialog"
            data-purpose="settings"
            data-slot="settings-dialog"
            onClick={onClick}
            ref={ref}
            size="sm"
            style={{ marginTop: 2 }}
          >
            Settings content
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );

    expect(ref.current).toHaveClass("brick-dialog-content", "consumer-dialog");
    expect(ref.current).toHaveAttribute("data-purpose", "settings");
    expect(ref.current).toHaveAttribute("data-slot", "settings-dialog");
    expect(ref.current).toHaveAttribute("data-size", "sm");
    expect(ref.current).toHaveStyle({ marginTop: "2px" });
    fireEvent.click(ref.current!);
    expect(onClick).toHaveBeenCalledOnce();

    rerender(
      <Dialog.Root defaultOpen>
        <Dialog.Portal disabled>
          <Dialog.Content aria-label="Settings" size="lg">Settings content</Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );
    expect(screen.getByRole("dialog", { name: "Settings" })).toHaveAttribute("data-size", "lg");
  });

  it("preserves Atom close reasons and asChild composition", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Dialog.Root onOpenChange={onOpenChange}>
        <Dialog.Trigger asChild>
          <button className="trigger-child">Open composed</button>
        </Dialog.Trigger>
        <Dialog.Portal disabled>
          <Dialog.Overlay />
          <Dialog.Content aria-label="Composed dialog">
            <Dialog.Close asChild>
              <button className="close-child">Close composed</button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );

    const trigger = screen.getByRole("button", { name: "Open composed" });
    expect(trigger).toHaveClass("brick-dialog-trigger", "trigger-child");
    await user.click(trigger);
    const close = screen.getByRole("button", { name: "Close composed" });
    expect(close).toHaveClass("brick-dialog-close", "close-child");
    await user.click(close);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, "closeClick");
  });

  it("preserves disabled Root behavior through native and composed triggers", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <>
        <Dialog.Root disabled onOpenChange={onOpenChange}>
          <Dialog.Trigger>Unavailable native dialog</Dialog.Trigger>
          <Dialog.Portal disabled>
            <Dialog.Content aria-label="Unavailable native content">Content</Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <Dialog.Root disabled onOpenChange={onOpenChange}>
          <Dialog.Trigger asChild>
            <Button>Unavailable composed dialog</Button>
          </Dialog.Trigger>
          <Dialog.Portal disabled>
            <Dialog.Content aria-label="Unavailable composed content">Content</Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </>,
    );

    const nativeTrigger = screen.getByRole("button", { name: "Unavailable native dialog" });
    expect(nativeTrigger).toBeDisabled();
    expect(nativeTrigger).toHaveAttribute("aria-disabled", "true");
    expect(nativeTrigger).toHaveAttribute("data-disabled", "");

    const composedTrigger = screen.getByRole("button", {
      name: "Unavailable composed dialog",
    });
    expect(composedTrigger).toBeDisabled();
    expect(composedTrigger).toHaveAttribute("data-disabled", "");
    expect(composedTrigger).toHaveAttribute("tabindex", "-1");
    await user.click(nativeTrigger);
    await user.click(composedTrigger);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("preserves render composition for Trigger, Close, and Branch", async () => {
    const user = userEvent.setup();
    const triggerRef = createRef<HTMLElement>();
    const closeRef = createRef<HTMLElement>();
    const branchRef = createRef<HTMLElement>();
    render(
      <Dialog.Root>
        <Dialog.Trigger ref={triggerRef} render={<a href="#render-dialog" />}>
          Open rendered
        </Dialog.Trigger>
        <Dialog.Portal disabled>
          <Dialog.Content aria-label="Rendered composition">
            <Dialog.Branch
              ref={branchRef}
              render={<aside data-purpose="owned-branch" />}
            >
              Rendered branch
            </Dialog.Branch>
            <Dialog.Close ref={closeRef} render={<a href="#render-close" />}>
              Close rendered
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );

    const trigger = screen.getByRole("button", { name: "Open rendered" });
    expect(triggerRef.current).toBe(trigger);
    expect(trigger).toHaveClass("brick-dialog-trigger");
    expect(trigger).toHaveAttribute("href", "#render-dialog");
    await user.click(trigger);

    const branch = screen.getByText("Rendered branch");
    expect(branch.tagName).toBe("ASIDE");
    expect(branch).toHaveClass("brick-dialog-branch");
    expect(branch).toHaveAttribute("data-purpose", "owned-branch");
    expect(branchRef.current).toBe(branch);

    const close = screen.getByRole("link", { name: "Close rendered" });
    expect(closeRef.current).toBe(close);
    expect(close).toHaveClass("brick-dialog-close");
    await user.click(close);
    expect(screen.queryByRole("dialog", { name: "Rendered composition" })).toBeNull();
  });

  it("forwards a custom Portal container and Title heading level", () => {
    const container = document.createElement("div");
    container.dataset.testid = "dialog-portal-container";
    document.body.append(container);

    const { unmount } = render(
      <Dialog.Root defaultOpen>
        <Dialog.Portal container={container}>
          <Dialog.Content>
            <Dialog.Title as="h1">Container dialog</Dialog.Title>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );

    const dialog = screen.getByRole("dialog", { name: "Container dialog" });
    expect(container).toContainElement(dialog);
    expect(screen.getByRole("heading", { level: 1, name: "Container dialog" })).toHaveClass(
      "brick-dialog-title",
    );

    unmount();
    container.remove();
  });

  it("exports namespace parts as the canonical direct components", () => {
    expect(Dialog.Root).toBe(DialogRoot);
    expect(Dialog.Content).toBe(DialogContent);
  });
});
