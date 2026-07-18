import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogRoot,
  type AlertDialogRootProps,
} from "../../src/alert-dialog.js";
import { Button } from "../../src/button.js";

function OpenAlertDialog({
  onOpenChange,
}: {
  onOpenChange?: NonNullable<AlertDialogRootProps["onOpenChange"]>;
}) {
  return (
    <AlertDialog.Root defaultOpen onOpenChange={onOpenChange}>
      <AlertDialog.Trigger>Delete project</AlertDialog.Trigger>
      <AlertDialog.Portal disabled>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Delete project?</AlertDialog.Title>
            <AlertDialog.Description>
              This permanently removes the project.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Body>Project: Mobile checkout refresh</AlertDialog.Body>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Keep project</AlertDialog.Cancel>
            <AlertDialog.Action>Delete project</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

describe("AlertDialog", () => {
  it("renders the approved anatomy, alert semantics, default size, and relationships", () => {
    render(<OpenAlertDialog />);

    const dialog = screen.getByRole("alertdialog", { name: "Delete project?" });
    expect(dialog).toHaveClass("brick-alert-dialog-content");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("data-slot", "alert-dialog-content");
    expect(dialog).toHaveAttribute("data-size", "md");
    expect(dialog).toHaveAccessibleDescription("This permanently removes the project.");
    expect(screen.getByRole("heading", { level: 2, name: "Delete project?" })).toHaveClass(
      "brick-alert-dialog-title",
    );
    expect(screen.getByText("Project: Mobile checkout refresh")).toHaveClass(
      "brick-alert-dialog-body",
    );
    expect(screen.getByRole("button", { name: "Keep project" }).parentElement).toHaveClass(
      "brick-alert-dialog-footer",
    );
    expect(document.querySelector(".brick-alert-dialog-overlay")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("forwards native props, refs, classes, styles, slots, events, and both sizes", () => {
    const ref = createRef<HTMLDivElement>();
    const onClick = vi.fn();
    const { rerender } = render(
      <AlertDialog.Root defaultOpen>
        <AlertDialog.Portal disabled>
          <AlertDialog.Content
            aria-label="Remove workspace"
            aria-describedby="remove-description"
            className="consumer-alert"
            data-purpose="removal"
            data-slot="removal-alert"
            onClick={onClick}
            ref={ref}
            size="sm"
            style={{ marginTop: 2 }}
          >
            <AlertDialog.Description id="remove-description">
              Removal is permanent.
            </AlertDialog.Description>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>,
    );

    expect(ref.current).toHaveClass("brick-alert-dialog-content", "consumer-alert");
    expect(ref.current).toHaveAttribute("data-purpose", "removal");
    expect(ref.current).toHaveAttribute("data-slot", "removal-alert");
    expect(ref.current).toHaveAttribute("data-size", "sm");
    expect(ref.current).toHaveStyle({ marginTop: "2px" });
    fireEvent.click(ref.current!);
    expect(onClick).toHaveBeenCalledOnce();

    rerender(
      <AlertDialog.Root defaultOpen>
        <AlertDialog.Portal disabled>
          <AlertDialog.Content aria-label="Remove workspace" aria-describedby="remove-again">
            <AlertDialog.Description id="remove-again">Removal is permanent.</AlertDialog.Description>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>,
    );
    expect(screen.getByRole("alertdialog", { name: "Remove workspace" })).toHaveAttribute(
      "data-size",
      "md",
    );
  });

  it("preserves disabled Root behavior through native and composed triggers", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <>
        <AlertDialog.Root disabled onOpenChange={onOpenChange}>
          <AlertDialog.Trigger>Unavailable native decision</AlertDialog.Trigger>
        </AlertDialog.Root>
        <AlertDialog.Root disabled onOpenChange={onOpenChange}>
          <AlertDialog.Trigger asChild>
            <Button>Unavailable composed decision</Button>
          </AlertDialog.Trigger>
        </AlertDialog.Root>
      </>,
    );

    const nativeTrigger = screen.getByRole("button", {
      name: "Unavailable native decision",
    });
    expect(nativeTrigger).toBeDisabled();
    expect(nativeTrigger).toHaveAttribute("aria-disabled", "true");
    expect(nativeTrigger).toHaveAttribute("data-disabled", "");

    const composedTrigger = screen.getByRole("button", {
      name: "Unavailable composed decision",
    });
    expect(composedTrigger).toBeDisabled();
    expect(composedTrigger).toHaveAttribute("data-disabled", "");
    expect(composedTrigger).toHaveAttribute("tabindex", "-1");

    await user.click(nativeTrigger);
    await user.click(composedTrigger);
    expect(screen.queryByRole("alertdialog")).toBeNull();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("preserves safe Cancel autofocus, asChild composition, and decision reasons", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <AlertDialog.Root onOpenChange={onOpenChange}>
        <AlertDialog.Trigger asChild>
          <Button variant="outline">Open decision</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal disabled>
          <AlertDialog.Content>
            <AlertDialog.Title>Discard changes?</AlertDialog.Title>
            <AlertDialog.Description>Unsaved work will be lost.</AlertDialog.Description>
            <AlertDialog.Cancel asChild>
              <Button tone="neutral" variant="outline">Keep editing</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button tone="danger">Discard changes</Button>
            </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>,
    );

    await user.click(screen.getByRole("button", { name: "Open decision" }));
    const cancel = screen.getByRole("button", { name: "Keep editing" });
    expect(cancel).toHaveFocus();
    expect(cancel).toHaveClass("brick-alert-dialog-cancel", "brick-button");
    await user.click(cancel);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, "cancelClick");

    await user.click(screen.getByRole("button", { name: "Open decision" }));
    await user.click(screen.getByRole("button", { name: "Discard changes" }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false, "actionClick");
  });

  it("preserves render composition, refs, native props, and prevented Action closure", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const triggerRef = createRef<HTMLElement>();
    const cancelRef = createRef<HTMLElement>();
    const actionRef = createRef<HTMLElement>();
    render(
      <AlertDialog.Root onOpenChange={onOpenChange}>
        <AlertDialog.Trigger ref={triggerRef} render={<a href="#open-alert" />}>
          Open rendered decision
        </AlertDialog.Trigger>
        <AlertDialog.Portal disabled>
          <AlertDialog.Content>
            <AlertDialog.Title>Rendered decision?</AlertDialog.Title>
            <AlertDialog.Description>Choose one response.</AlertDialog.Description>
            <AlertDialog.Cancel ref={cancelRef} render={<a href="#cancel-alert" />}>
              Cancel rendered
            </AlertDialog.Cancel>
            <AlertDialog.Action
              onClick={(event) => event.preventDefault()}
              ref={actionRef}
              render={<a href="#action-alert" />}
            >
              Action rendered
            </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>,
    );

    const trigger = screen.getByRole("button", { name: "Open rendered decision" });
    expect(triggerRef.current).toBe(trigger);
    expect(trigger).toHaveAttribute("href", "#open-alert");
    await user.click(trigger);

    const cancel = screen.getByRole("link", { name: "Cancel rendered" });
    const action = screen.getByRole("link", { name: "Action rendered" });
    expect(cancelRef.current).toBe(cancel);
    expect(actionRef.current).toBe(action);
    expect(cancel).toHaveClass("brick-alert-dialog-cancel");
    expect(action).toHaveClass("brick-alert-dialog-action");
    const callsAfterOpen = onOpenChange.mock.calls.length;
    await user.click(action);
    expect(screen.getByRole("alertdialog", { name: "Rendered decision?" })).toBeVisible();
    expect(onOpenChange).toHaveBeenCalledTimes(callsAfterOpen);
  });

  it("forwards a custom Portal container and representative Title heading level", () => {
    const container = document.createElement("div");
    document.body.append(container);

    const { unmount } = render(
      <AlertDialog.Root defaultOpen>
        <AlertDialog.Portal container={container}>
          <AlertDialog.Content>
            <AlertDialog.Title as="h1">Container decision</AlertDialog.Title>
            <AlertDialog.Description>Choose safely.</AlertDialog.Description>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>,
    );

    const dialog = screen.getByRole("alertdialog", { name: "Container decision" });
    expect(container).toContainElement(dialog);
    expect(screen.getByRole("heading", { level: 1, name: "Container decision" })).toHaveClass(
      "brick-alert-dialog-title",
    );

    unmount();
    container.remove();
  });

  it("exports namespace parts as the canonical direct components", () => {
    expect(AlertDialog.Root).toBe(AlertDialogRoot);
    expect(AlertDialog.Content).toBe(AlertDialogContent);
  });
});
