import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  Image,
  ImageContent,
  ImageFallback,
  ImageRoot,
  type ImageFit,
  type ImageFrame,
  type ImagePosition,
  type ImageRadius,
} from "../../../src/image.js";

const pending: MockImage[] = [];
class MockImage {
  complete = false;
  naturalWidth = 0;
  private listeners = new Map<string, Set<() => void>>();
  addEventListener(type: string, listener: () => void) {
    const set = this.listeners.get(type) ?? new Set(); set.add(listener); this.listeners.set(type, set);
  }
  removeEventListener(type: string, listener: () => void) { this.listeners.get(type)?.delete(listener); }
  set src(value: string) { this.value = value; pending.push(this); }
  value = "";
  finish(type: "load" | "error") {
    this.complete = true; this.naturalWidth = type === "load" ? 800 : 0;
    for (const listener of this.listeners.get(type) ?? []) listener();
  }
}

afterEach(() => { pending.length = 0; vi.unstubAllGlobals(); });

describe("Image", () => {
  it("exposes direct RSC-safe parts without changing the compound family", () => {
    expect(Image.Root).toBe(ImageRoot);
    expect(Image.Content).toBe(ImageContent);
    expect(Image.Fallback).toBe(ImageFallback);
  });

  it("renders closed defaults and authored fallback while loading", () => {
    vi.stubGlobal("Image", MockImage);
    const ref = createRef<HTMLDivElement>();
    const { getByTestId, getByText } = render(
      <Image.Root data-testid="root" ref={ref} src="/workspace.jpg">
        <Image.Content alt="Designers reviewing a workspace" />
        <Image.Fallback>Image unavailable</Image.Fallback>
      </Image.Root>,
    );
    const root = getByTestId("root");
    expect(root).toBe(ref.current);
    expect(root).toHaveClass("brick-image");
    expect(root).toHaveAttribute("data-slot", "image");
    expect(root).toHaveAttribute("data-state", "loading");
    expect(root).toHaveAttribute("data-fit", "cover");
    expect(root).toHaveAttribute("data-position", "center");
    expect(root).toHaveAttribute("data-radius", "none");
    expect(root).toHaveAttribute("data-frame", "none");
    expect(root).not.toHaveAttribute("data-fill");
    expect(root).not.toHaveAttribute("data-ratio");
    expect(getByText("Image unavailable")).toHaveClass("brick-image__fallback");
    expect(root.querySelector("img")).toBeNull();
  });

  it("exposes explicit parent-filling geometry without leaking the prop", () => {
    const { getByTestId } = render(
      <Image.Root data-testid="root" fill>
        <Image.Fallback>Empty</Image.Fallback>
      </Image.Root>,
    );
    const root = getByTestId("root");
    expect(root).toHaveAttribute("data-fill", "");
    expect(root).not.toHaveAttribute("fill");
  });

  it("forwards native image attributes after load and preserves authored alt", async () => {
    vi.stubGlobal("Image", MockImage);
    const contentRef = createRef<HTMLImageElement>();
    const changes: string[] = [];
    const { container } = render(
      <Image.Root src="/workspace.jpg" onLoadingStatusChange={(status) => changes.push(status)}>
        <Image.Content alt="Designers reviewing a workspace" decoding="async" fetchPriority="high" height={675} loading="eager" ref={contentRef} sizes="(max-width: 40rem) 100vw, 50vw" srcSet="/workspace-small.jpg 600w, /workspace.jpg 1200w" width={1200} />
        <Image.Fallback>Image unavailable</Image.Fallback>
      </Image.Root>,
    );
    pending[0].finish("load");
    await waitFor(() => expect(container.querySelector("img")).not.toBeNull());
    const image = container.querySelector("img")!;
    expect(image).toBe(contentRef.current);
    expect(image).toHaveClass("brick-image__content");
    expect(image).toHaveAttribute("alt", "Designers reviewing a workspace");
    expect(image).toHaveAttribute("width", "1200");
    expect(image).toHaveAttribute("height", "675");
    expect(image).toHaveAttribute("srcset");
    expect(image).toHaveAttribute("sizes");
    expect(changes).toEqual(["loading", "loaded"]);
    expect(container.querySelector("[data-slot='image-fallback']")).toBeNull();
  });

  it("exposes every closed visual recipe without leaking recipe props", () => {
    const fits: ImageFit[] = ["cover", "contain", "fill", "none", "scale-down"];
    const positions: ImagePosition[] = ["center", "top", "bottom", "start", "end"];
    const radii: ImageRadius[] = ["none", "sm", "md", "lg", "full"];
    const frames: ImageFrame[] = ["none", "subtle"];
    const { getByTestId, rerender } = render(<Image.Root data-testid="root"><Image.Fallback>Empty</Image.Fallback></Image.Root>);
    for (const fit of fits) { rerender(<Image.Root data-testid="root" fit={fit}><Image.Fallback>Empty</Image.Fallback></Image.Root>); expect(getByTestId("root")).toHaveAttribute("data-fit", fit); }
    for (const position of positions) { rerender(<Image.Root data-testid="root" position={position}><Image.Fallback>Empty</Image.Fallback></Image.Root>); expect(getByTestId("root")).toHaveAttribute("data-position", position); }
    for (const radius of radii) { rerender(<Image.Root data-testid="root" radius={radius}><Image.Fallback>Empty</Image.Fallback></Image.Root>); expect(getByTestId("root")).toHaveAttribute("data-radius", radius); }
    for (const frame of frames) { rerender(<Image.Root data-testid="root" frame={frame}><Image.Fallback>Empty</Image.Fallback></Image.Root>); expect(getByTestId("root")).toHaveAttribute("data-frame", frame); }
    expect(getByTestId("root")).not.toHaveAttribute("fit");
    expect(getByTestId("root")).not.toHaveAttribute("position");
    expect(getByTestId("root")).not.toHaveAttribute("radius");
    expect(getByTestId("root")).not.toHaveAttribute("frame");
  });

  it("adapts ratio through Atom on the same root and preserves slots and composition", () => {
    const { getByTestId } = render(
      <Image.Root asChild data-slot="project-image" data-testid="root" ratio={4 / 3}>
        <figure>
          <Image.Fallback asChild data-slot="project-fallback"><figcaption>Unavailable</figcaption></Image.Fallback>
        </figure>
      </Image.Root>,
    );
    const root = getByTestId("root");
    expect(root.tagName).toBe("FIGURE");
    expect(root).toHaveClass("brick-image");
    expect(root).toHaveAttribute("data-slot", "project-image");
    expect(root).toHaveAttribute("data-ratio", "");
    expect(root).toHaveStyle({ aspectRatio: "1.3333333333333333" });
    expect(root.querySelector("figcaption")).toHaveClass("brick-image__fallback");
    expect(root.querySelector("figcaption")).toHaveAttribute("data-slot", "project-fallback");
  });
});
