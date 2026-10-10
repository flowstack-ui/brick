import { createRef } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Toast, Toaster, toast, createToaster } from "../../../src/toast.js";

afterEach(() => {
  toast.remove();
  vi.useRealTimers();
});

describe("Toast", () => {
  it("preserves compound Root callbacks for manager-driven timeout and removal", async () => {
    vi.useFakeTimers();
    const scoped = createToaster();
    const auto = vi.fn(), dismissed = vi.fn();
    render(<Toaster toaster={scoped} portalDisabled renderToast={state => <Toast.Root {...state} onAutoClose={auto} onDismiss={dismissed}><Toast.Title /></Toast.Root>} />);
    await act(async () => { scoped("Timed", { duration: 1000 }); });
    await act(async () => vi.advanceTimersByTime(1000));
    expect(auto).toHaveBeenCalledTimes(1);
    expect(dismissed).not.toHaveBeenCalled();
    await act(async () => vi.advanceTimersByTime(210));
    expect(dismissed).toHaveBeenCalledTimes(1);
  });

  it("uses the portal owner document for hotkeys and restores its focus", async () => {
    vi.useFakeTimers();
    const iframe = document.createElement("iframe");
    document.body.append(iframe);
    const doc = iframe.contentDocument!;
    const before = doc.createElement("button");
    before.textContent = "Before";
    doc.body.append(before);
    const scoped = createToaster();
    const view = render(<Toaster toaster={scoped} container={doc.body} />);
    before.focus();
    await act(async () => { scoped("Foreign document", { duration: Infinity }); });
    const region = doc.querySelector<HTMLElement>("[role=region]")!;
    fireEvent.keyDown(doc, { code: "F8", key: "F8" });
    expect(doc.activeElement).toBe(region);
    fireEvent.keyDown(region, { key: "Escape" });
    await act(async () => { vi.advanceTimersByTime(210); });
    expect(doc.activeElement).toBe(before);
    view.unmount();
    iframe.remove();
  });

  it("isolates managers and forwards lifecycle, recipes and logical spacing", async () => {
    vi.useFakeTimers();
    const first = createToaster();
    const second = createToaster();
    const events: string[] = [];
    render(<><Toaster toaster={first} label="First" portalDisabled variant="solid" tone="accent" radius="sm" offset={6} gap={{ initial: 2, md: 4 }} /><Toaster toaster={second} label="Second" portalDisabled /></>);
    let id = "";
    await act(async () => { id = first("Scoped", { duration: Infinity, onStatusChange: ({ status }) => events.push(status) }); });
    expect(screen.getByRole("region", { name: "First (F8)" }).querySelector(".brick-toast")).toHaveAttribute("data-tone", "accent");
    expect(screen.queryByRole("region", { name: "Second (F8)" })).not.toBeInTheDocument();
    expect(first.isVisible(id)).toBe(true);
    expect(second.getCount()).toBe(0);
    await act(async () => first.dismiss(id));
    expect(document.querySelector(".brick-toast")).toHaveAttribute("data-state", "exiting");
    await act(async () => vi.advanceTimersByTime(210));
    expect(events).toEqual(["queued", "visible", "dismissing", "unmounted"]);
    expect(first.getCount()).toBe(0);
  });

  it("inherits icon type from compound Root", () => {
    const { container } = render(<Toast.Root type="success" duration={Infinity}><Toast.Icon /><Toast.Title>Saved</Toast.Title></Toast.Root>);
    expect(container.querySelector(".brick-toast__icon path")).toHaveAttribute("d", "m5 12 4 4 10-10");
  });
  it("renders the imperative default anatomy and exactly one announcement path", async () => {
    const ref = createRef<HTMLDivElement>();
    render(<Toaster ref={ref} portalDisabled data-testid="viewport" />);
    await act(async () => {
      toast.success("Workspace published", {
        description: "The release is now available.",
        duration: Infinity,
        action: { label: "View", onClick: () => undefined },
      });
    });

    const viewport = screen.getByRole("region", { name: "Notifications (F8)" });
    expect(ref.current).toBe(viewport);
    expect(viewport).toHaveClass("brick-toast-viewport");
    expect(viewport).toHaveAttribute("data-position", "bottom-end");
    expect(viewport).toHaveAttribute("data-width", "responsive");
    expect(viewport).toHaveAttribute("data-stacking", "separated");
    const item = viewport.querySelector(".brick-toast");
    expect(item).toHaveAttribute("data-type", "success");
    expect(item?.querySelector("[data-slot='toast-icon']")).toHaveAttribute("aria-hidden", "true");
    expect(item?.querySelector("[data-slot='toast-title']")).toHaveTextContent("Workspace published");
    expect(item?.querySelector("[data-slot='toast-description']")).toHaveTextContent("The release is now available.");
    expect(screen.getByRole("button", { name: "View" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Dismiss notification" })).toBeVisible();
    expect(item).not.toHaveAttribute("role");
    expect(document.querySelectorAll("[data-slot='toast-announcer-polite']")).toHaveLength(1);
    expect(document.querySelectorAll("[data-slot='toast-announcer-assertive']")).toHaveLength(1);
  });

  it("supports every type, a custom icon, explicit close policy, and viewport options", async () => {
    render(<Toaster portalDisabled maxVisible={6} position="top-start" width="full" stacking="overlap" swipeDirection="right" />);
    await act(async () => {
      toast({ id: "default", title: "Default", duration: Infinity });
      toast.success("Success", { id: "success", duration: Infinity });
      toast.error("Error", { id: "error", duration: Infinity });
      toast.warning("Warning", { id: "warning", duration: Infinity });
      toast.info("Info", { id: "info", duration: Infinity });
      toast.loading("Loading", { id: "loading" });
    });
    const viewport = screen.getByRole("region");
    expect(viewport).toHaveAttribute("data-position", "top-start");
    expect(viewport).toHaveAttribute("data-width", "full");
    expect(viewport).toHaveAttribute("data-stacking", "overlap");
    expect(viewport.querySelectorAll(".brick-toast")).toHaveLength(6);
    expect(viewport.querySelector("[data-type='loading'] .brick-toast__spinner")).toBeInTheDocument();
    expect(viewport.querySelector("[data-type='loading']")).toHaveAttribute("data-swipe-direction", "right");

    act(() => toast.remove());
    await act(async () => {
      toast({ id: "custom", title: "Custom", icon: <span data-testid="custom-icon">C</span>, closeButton: false, duration: Infinity });
    });
    expect(screen.getByTestId("custom-icon")).toBeVisible();
    expect(screen.queryByRole("button", { name: "Dismiss notification" })).not.toBeInTheDocument();
  });

  it("omits the icon slot for default content and forwards viewport direction", async () => {
    render(<Toaster dir="rtl" portalDisabled position="bottom-start" />);
    await act(async () => {
      toast("Title only", { duration: Infinity });
    });

    const viewport = screen.getByRole("region");
    const item = viewport.querySelector(".brick-toast");
    expect(viewport).toHaveAttribute("dir", "rtl");
    expect(item?.querySelector("[data-slot='toast-icon']")).not.toBeInTheDocument();
    expect(item?.firstElementChild).toHaveAttribute("data-slot", "toast-content");
  });

  it("runs one action and dismisses, updates stable IDs, and restores focus after F8 Escape", async () => {
    vi.useFakeTimers();
    const action = vi.fn();
    render(<><button>Before</button><Toaster portalDisabled /></>);
    screen.getByRole("button", { name: "Before" }).focus();
    let id = "";
    await act(async () => {
      id = toast.info("Original", { action: { label: "Undo", onClick: action }, duration: Infinity });
    });
    await act(async () => { toast.update(id, { title: "Updated" }); });
    expect(screen.getByRole("region").querySelector("[data-slot='toast-title']")).toHaveTextContent("Updated");
    fireEvent.keyDown(document, { code: "F8", key: "F8" });
    expect(screen.getByRole("region")).toHaveFocus();
    fireEvent.keyDown(screen.getByRole("region"), { key: "Escape" });
    await act(async () => { vi.advanceTimersByTime(250); });
    expect(screen.getByRole("button", { name: "Before" })).toHaveFocus();

    await act(async () => {
      toast.info("Action", { action: { label: "Undo", onClick: action }, duration: Infinity });
    });
    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(action).toHaveBeenCalledTimes(1);
    await act(async () => { vi.advanceTimersByTime(250); });
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("exposes styled compound parts with native forwarding and refs", () => {
    const rootRef = createRef<HTMLDivElement>();
    render(
      <Toast.Root ref={rootRef} forceMount type="warning" closeButton>
        <Toast.Icon type="warning" />
        <Toast.Content className="custom-content">
          <Toast.Title>Watch out</Toast.Title>
          <Toast.Description>Something changed.</Toast.Description>
          <Toast.Actions><Toast.Action>Review</Toast.Action></Toast.Actions>
        </Toast.Content>
        <Toast.Close aria-label="Close custom" />
      </Toast.Root>,
    );
    expect(rootRef.current).toHaveClass("brick-toast");
    expect(rootRef.current).toHaveAttribute("data-type", "warning");
    expect(screen.getByText("Watch out")).toHaveClass("brick-toast__title");
    expect(screen.getByText("Something changed.")).toHaveClass("brick-toast__description");
    expect(screen.getByText("Review")).toHaveClass("brick-toast__action");
    expect(screen.getByRole("button", { name: "Close custom" })).toHaveClass("brick-toast__close");
  });
});
