import { createRef } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  Avatar,
  type AvatarShape,
  type AvatarSize,
  type AvatarStatus,
} from "../../src/avatar.js";

class MockImage {
  complete = false;
  naturalWidth = 0;
  private listeners = new Map<string, Set<() => void>>();

  addEventListener(type: string, listener: () => void) {
    const listeners = this.listeners.get(type) ?? new Set();
    listeners.add(listener);
    this.listeners.set(type, listeners);
  }

  removeEventListener(type: string, listener: () => void) {
    this.listeners.get(type)?.delete(listener);
  }

  set src(value: string) {
    queueMicrotask(() => {
      const failed = value.includes("broken");
      this.complete = true;
      this.naturalWidth = failed ? 0 : 100;
      for (const listener of this.listeners.get(failed ? "error" : "load") ?? []) {
        listener();
      }
    });
  }
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Avatar", () => {
  it("renders explicit informative fallback with closed visual defaults", () => {
    render(<Avatar alt="Ada Lovelace" fallback="AL" />);

    const fallback = screen.getByRole("img", { name: "Ada Lovelace" });
    const root = fallback.parentElement;
    expect(root).toHaveClass("brick-avatar");
    expect(root).toHaveAttribute("data-slot", "avatar");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-shape", "circle");
    expect(root).not.toHaveAttribute("data-status");
    expect(root).not.toHaveAttribute("role");
    expect(root).not.toHaveAttribute("tabindex");
    expect(root).not.toHaveAttribute("size");
    expect(root).not.toHaveAttribute("shape");
    expect(root).not.toHaveAttribute("status");
    expect(fallback).toHaveClass("brick-avatar__fallback");
    expect(fallback).toHaveAttribute("data-slot", "avatar-fallback");
    expect(fallback).toHaveTextContent("AL");
  });

  it("hides decorative fallback semantics when alt is deliberately empty", () => {
    const { container } = render(<Avatar alt="" fallback="AL" />);
    const fallback = container.querySelector("[data-slot='avatar-fallback']");
    expect(fallback).toHaveAttribute("aria-hidden", "true");
    expect(fallback).not.toHaveAttribute("role");
    expect(fallback).not.toHaveAttribute("aria-label");
  });

  it("routes one source through Atom and preserves loaded image semantics", async () => {
    vi.stubGlobal("Image", MockImage);
    const statuses: string[] = [];
    render(
      <Avatar
        alt="Ada Lovelace"
        fallback="AL"
        onLoadingStatusChange={(status) => statuses.push(status)}
        src="/ada.png"
      />,
    );

    const image = await waitFor(() => {
      const loadedImage = document.querySelector<HTMLImageElement>(
        "img[data-slot='avatar-image']",
      );
      expect(loadedImage).not.toBeNull();
      return loadedImage as HTMLImageElement;
    });
    expect(image.tagName).toBe("IMG");
    expect(image).toHaveAttribute("src", "/ada.png");
    expect(image).toHaveClass("brick-avatar__image");
    expect(image).toHaveAttribute("data-slot", "avatar-image");
    expect(screen.queryByText("AL")).toBeNull();
    expect(statuses).toContain("loading");
    expect(statuses).toContain("loaded");
  });

  it("restores the full accessible fallback when an image fails", async () => {
    vi.stubGlobal("Image", MockImage);
    render(<Avatar alt="Ada Lovelace" fallback="AL" src="/broken.png" />);

    await waitFor(() => {
      expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveTextContent("AL");
    });
    expect(document.querySelector("img")).toBeNull();
  });

  it("exposes every size, shape, and optional status as closed metadata", () => {
    const sizes: AvatarSize[] = ["xs", "sm", "md", "lg", "xl"];
    const shapes: AvatarShape[] = ["circle", "rounded"];
    const statuses: AvatarStatus[] = ["online", "away", "busy", "offline"];
    const { rerender } = render(<Avatar alt="Ada" fallback="A" />);
    const root = screen.getByRole("img", { name: "Ada" }).parentElement;

    for (const size of sizes) {
      rerender(<Avatar alt="Ada" fallback="A" size={size} />);
      expect(root).toHaveAttribute("data-size", size);
    }
    for (const shape of shapes) {
      rerender(<Avatar alt="Ada" fallback="A" shape={shape} />);
      expect(root).toHaveAttribute("data-shape", shape);
    }
    for (const status of statuses) {
      rerender(<Avatar alt="Ada" fallback="A" status={status} />);
      expect(root).toHaveAttribute("data-status", status);
    }
  });

  it("preserves native props, events, root class/style/slot, and span ref", () => {
    const ref = createRef<HTMLSpanElement>();
    const onClick = vi.fn();
    render(
      <Avatar
        alt="Ada"
        aria-describedby="avatar-help"
        className="consumer-avatar"
        data-slot="collaborator-avatar"
        fallback={<strong>A</strong>}
        onClick={onClick}
        ref={ref}
        style={{ marginInlineStart: 4 }}
        title="Collaborator"
      />,
    );

    const root = screen.getByRole("img", { name: "Ada" }).parentElement;
    fireEvent.click(root!);
    expect(onClick).toHaveBeenCalledOnce();
    expect(root).toBe(ref.current);
    expect(root).toHaveClass("brick-avatar", "consumer-avatar");
    expect(root).toHaveAttribute("data-slot", "collaborator-avatar");
    expect(root).toHaveAttribute("aria-describedby", "avatar-help");
    expect(root).toHaveAttribute("title", "Collaborator");
    expect(root).toHaveStyle({ marginInlineStart: "4px" });
    expect(root?.querySelector("strong")).toHaveTextContent("A");
  });
});
