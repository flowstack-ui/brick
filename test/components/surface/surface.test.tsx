import { createRef, type CSSProperties } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Surface,
  SurfaceContent,
  SurfaceMedia,
  SurfaceRoot,
  SurfaceScrim,
  type SurfaceElement,
  type SurfaceElevation,
  type SurfaceInset,
  type SurfaceLevel,
  type SurfaceRadius,
  type SurfaceTone,
} from "../../../src/surface.js";

describe("Surface", () => {
  it("maps independent surface parameters without fading content or leaking native props", () => {
    render(<Surface data-testid="effects" treatment="translucent" backgroundOpacity={0.82} backdropBlur="18px" backdropSaturate={1.1} bordered borderColor="white" borderOpacity={0.5}>Readable text</Surface>);
    const element = screen.getByTestId("effects");
    expect(element).toHaveAttribute("data-surface-effects", "translucent");
    expect(element.style.getPropertyValue("--brick-surface-effect-opacity")).toBe("82%");
    expect(element.style.getPropertyValue("--brick-surface-effect-blur")).toBe("18px");
    expect(element.style.opacity).toBe("");
    for (const prop of ["treatment", "backgroundOpacity", "backdropBlur", "backdropSaturate", "borderColor", "borderOpacity"]) expect(element).not.toHaveAttribute(prop);
  });
  it("keeps zero values and disables identity filters", () => {
    render(<Surface data-testid="zero" treatment="translucent" backgroundOpacity={0} backdropBlur=".0rem" backdropSaturate={1} borderOpacity={0} />);
    const element = screen.getByTestId("zero");
    expect(element).toHaveAttribute("data-surface-filter", "none");
    expect(element.style.getPropertyValue("--brick-surface-effect-opacity")).toBe("0%");
    expect(element.style.getPropertyValue("--brick-surface-effect-border-opacity")).toBe("0%");
  });
  it("ignores invalid numeric values consistently and allows final instance style input", () => {
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Surface data-testid="invalid" backgroundOpacity={NaN} borderOpacity={2} backdropSaturate={-1} />);
    expect(screen.getByTestId("invalid")).not.toHaveAttribute("data-surface-effects");
    expect(warning).toHaveBeenCalledTimes(3);
    warning.mockRestore();
    render(<Surface data-testid="override" backgroundOpacity={0.4} style={{ "--brick-surface-effect-opacity": "70%" } as CSSProperties} />);
    expect(screen.getByTestId("override").style.getPropertyValue("--brick-surface-effect-opacity")).toBe("70%");
  });

  it("preserves callback-ref cleanup through its composed host", () => {
    const calls: string[] = [];
    const ref = createRef<HTMLElement>();
    const view = render(<Surface asChild ref={ref}><section ref={() => {
      calls.push("mount");
      return () => { calls.push("cleanup"); };
    }}>Content</section></Surface>);
    expect(ref.current?.tagName).toBe("SECTION");
    view.unmount();
    expect(ref.current).toBeNull();
    expect(calls).toEqual(["mount", "cleanup"]);
  });
  it("renders the adopted one-root defaults", () => {
    const ref = createRef<HTMLElement>();
    render(<Surface data-testid="surface" ref={ref}>Content</Surface>);
    const surface = screen.getByTestId("surface");

    expect(surface).toBe(ref.current);
    expect(surface.tagName).toBe("DIV");
    expect(surface).toHaveClass("brick-surface");
    expect(surface).toHaveAttribute("data-slot", "surface");
    expect(surface).toHaveAttribute("data-level", "base");
    expect(surface).toHaveAttribute("data-tone", "neutral");
    expect(surface).toHaveAttribute("data-elevation", "none");
    expect(surface).toHaveAttribute("data-radius", "surface");
    expect(surface).toHaveAttribute("data-inset", "none");
    expect(surface).not.toHaveAttribute("data-bordered");
    expect(surface).not.toHaveAttribute("role");
    expect(surface).toHaveTextContent("Content");
    expect(surface.children).toHaveLength(0);
  });

  it("keeps ordinary Surface unchanged and layers only authored compound parts", () => {
    const mediaRef = createRef<HTMLDivElement>();
    const scrimRef = createRef<HTMLDivElement>();
    const contentRef = createRef<HTMLDivElement>();
    const { container } = render(
      <Surface.Root data-testid="layered-surface" radius="none">
        <Surface.Media data-media="art" ref={mediaRef}>
          <img alt="" src="/decorative.jpg" />
        </Surface.Media>
        <Surface.Scrim
          data-scrim="contrast"
          direction="inline-start"
          ref={scrimRef}
          strength="strong"
        />
        <Surface.Content data-content="foreground" ref={contentRef}>
          Foreground
        </Surface.Content>
      </Surface.Root>,
    );

    const surface = screen.getByTestId("layered-surface");
    expect(Surface.Root).toBe(SurfaceRoot);
    expect(Surface.Media).toBe(SurfaceMedia);
    expect(Surface.Scrim).toBe(SurfaceScrim);
    expect(Surface.Content).toBe(SurfaceContent);
    expect(surface.children).toHaveLength(3);
    expect(mediaRef.current).toHaveClass("brick-surface__media");
    expect(mediaRef.current).toHaveAttribute("aria-hidden", "true");
    expect(mediaRef.current).toHaveAttribute("data-slot", "surface-media");
    expect(mediaRef.current).toHaveAttribute("data-media", "art");
    expect(scrimRef.current).toHaveClass("brick-surface__scrim");
    expect(scrimRef.current).toHaveAttribute("aria-hidden", "true");
    expect(scrimRef.current).toHaveAttribute("data-direction", "inline-start");
    expect(scrimRef.current).toHaveAttribute("data-strength", "strong");
    expect(scrimRef.current).toHaveAttribute("data-scrim", "contrast");
    expect(contentRef.current).toHaveClass("brick-surface__content");
    expect(contentRef.current).toHaveAttribute("data-slot", "surface-content");
    expect(contentRef.current).toHaveAttribute("data-content", "foreground");
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("exposes every closed visual recipe independently", () => {
    const levels: SurfaceLevel[] = ["transparent", "canvas", "base", "subtle", "raised"];
    const elevations: SurfaceElevation[] = ["none", "low", "medium", "high"];
    const radii: SurfaceRadius[] = ["none", "subtle", "surface"];
    const insets: SurfaceInset[] = ["none", "sm", "md", "lg", "xl", "2xl"];
    const tones: SurfaceTone[] = ["neutral", "accent"];
    const { rerender } = render(<Surface data-testid="surface" />);

    for (const level of levels) {
      rerender(<Surface data-testid="surface" level={level} />);
      expect(screen.getByTestId("surface")).toHaveAttribute("data-level", level);
      expect(screen.getByTestId("surface")).not.toHaveAttribute("data-bordered");
    }
    for (const elevation of elevations) {
      rerender(<Surface data-testid="surface" elevation={elevation} />);
      expect(screen.getByTestId("surface")).toHaveAttribute(
        "data-elevation",
        elevation,
      );
    }
    for (const radius of radii) {
      rerender(<Surface data-testid="surface" radius={radius} />);
      expect(screen.getByTestId("surface")).toHaveAttribute(
        "data-radius",
        radius,
      );
    }
    for (const inset of insets) {
      rerender(<Surface data-testid="surface" inset={inset} />);
      expect(screen.getByTestId("surface")).toHaveAttribute("data-inset", inset);
    }
    for (const tone of tones) {
      rerender(<Surface data-testid="surface" tone={tone} />);
      expect(screen.getByTestId("surface")).toHaveAttribute("data-tone", tone);
    }

    rerender(<Surface bordered data-testid="surface" />);
    expect(screen.getByTestId("surface")).toHaveAttribute("data-bordered", "");
  });

  it("serializes responsive inset with the shared mobile-first grammar", () => {
    render(
      <Surface
        data-testid="surface"
        inset={{ initial: "sm", md: "lg", xl: "2xl" }}
      />,
    );
    const surface = screen.getByTestId("surface");

    expect(surface).toHaveAttribute("data-inset", "sm");
    expect(surface).toHaveAttribute("data-inset-md", "lg");
    expect(surface).toHaveAttribute("data-inset-xl", "2xl");
    expect(surface).not.toHaveAttribute("data-inset-sm");
    expect(surface).not.toHaveAttribute("data-inset-lg");
  });

  it("supports every adopted semantic host", () => {
    const hosts: SurfaceElement[] = [
      "div", "section", "article", "aside", "nav", "main", "header", "footer",
      "form", "li",
    ];
    const { rerender } = render(<Surface data-testid="surface" />);
    for (const as of hosts) {
      rerender(<Surface as={as} data-testid="surface" />);
      expect(screen.getByTestId("surface").tagName).toBe(as.toUpperCase());
    }
  });

  it("composes Surface paint onto one existing host without a wrapper", () => {
    const childRef = createRef<HTMLElement>();
    const surfaceRef = createRef<HTMLElement>();
    const calls: string[] = [];
    const { container } = render(
      <Surface
        asChild
        bordered
        className="surface-owner"
        onClick={() => calls.push("surface")}
        ref={surfaceRef}
        style={{ "--brick-surface-radius": "0px" } as CSSProperties}
      >
        <section
          className="section-owner"
          data-testid="composed-surface"
          onClick={() => calls.push("child")}
          ref={childRef}
          style={{ minInlineSize: 0 }}
        >
          Content
        </section>
      </Surface>,
    );
    const surface = screen.getByTestId("composed-surface");
    fireEvent.click(surface);

    expect(surface.tagName).toBe("SECTION");
    expect(container.children).toHaveLength(1);
    expect(container.firstElementChild).toBe(surface);
    expect(surface).toBe(childRef.current);
    expect(surface).toBe(surfaceRef.current);
    expect(surface).toHaveClass("section-owner", "brick-surface", "surface-owner");
    expect(surface).toHaveAttribute("data-bordered", "");
    expect(surface.style.minInlineSize).toBe("0");
    expect(surface.style.getPropertyValue("--brick-surface-radius")).toBe("0px");
    expect(calls).toEqual(["surface", "child"]);
  });

  it("rejects a Fragment as an asChild host", () => {
    expect(() => render(
      <Surface asChild>
        <><span>One</span><span>Two</span></>
      </Surface>,
    )).toThrow(/Fragment/);
  });

  it("forwards native props, events, class, style, slot, children, and ref", () => {
    const ref = createRef<HTMLElement>();
    let clicks = 0;
    render(
      <Surface
        aria-label="Release readiness"
        as="section"
        bordered
        className="consumer-surface"
        data-evidence="native"
        dir="rtl"
        elevation="low"
        inset="lg"
        level="raised"
        onClick={() => clicks++}
        radius="subtle"
        ref={ref}
        slot="release-region"
        style={{
          "--brick-surface-background": "Canvas",
        } as CSSProperties}
      >
        <span>Ready</span>
      </Surface>,
    );
    const surface = screen.getByLabelText("Release readiness");
    fireEvent.click(surface);

    expect(clicks).toBe(1);
    expect(surface).toBe(ref.current);
    expect(surface).toHaveClass("brick-surface", "consumer-surface");
    expect(surface).toHaveAttribute("data-slot", "release-region");
    expect(surface).toHaveAttribute("data-evidence", "native");
    expect(surface).toHaveAttribute("dir", "rtl");
    expect(surface.style.getPropertyValue("--brick-surface-background")).toBe(
      "Canvas",
    );
    expect(surface.firstElementChild?.tagName).toBe("SPAN");
    expect(surface).not.toHaveAttribute("bordered");
    expect(surface).not.toHaveAttribute("elevation");
    expect(surface).not.toHaveAttribute("inset");
    expect(surface).not.toHaveAttribute("level");
    expect(surface).not.toHaveAttribute("radius");
  });
});
