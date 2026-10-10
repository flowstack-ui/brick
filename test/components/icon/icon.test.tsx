import { composeHost } from "@flowstack-ui/atom/compose-host";
import { renderToString } from "react-dom/server";
import { Fragment, StrictMode, createRef, forwardRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Icon,
  createIcon,
  IconPropsProvider,
  type IconEmphasis,
  type IconSize,
  type IconTone,
} from "../../../src/icon.js";

function SearchGraphic({ className }: { className?: string }) {
  return (
    <svg className={className} data-source="external" viewBox="0 0 20 20">
      <circle cx="9" cy="9" r="5" />
    </svg>
  );
}

describe("Icon", () => {
  it("renders one decorative md inherited wrapper by default", () => {
    const ref = createRef<HTMLElement | SVGSVGElement>();
    render(
      <Icon data-testid="icon" ref={ref}>
        <SearchGraphic />
      </Icon>,
    );
    const icon = screen.getByTestId("icon");
    expect(icon).toBe(ref.current);
    expect(icon.tagName).toBe("SPAN");
    expect(icon).toHaveClass("brick-icon");
    expect(icon).toHaveAttribute("data-slot", "icon");
    expect(icon).toHaveAttribute("data-size", "md");
    expect(icon).toHaveAttribute("data-tone", "inherit");
    expect(icon).toHaveAttribute("data-emphasis", "text");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).not.toHaveAttribute("role");
    expect(icon).not.toHaveAttribute("data-directional");
    expect(icon.firstElementChild).toHaveAttribute("data-source", "external");
  });

  it("exposes informative label and label-reference modes without visual drift", () => {
    const { rerender } = render(
      <Icon data-testid="icon" label="Search">
        <SearchGraphic />
      </Icon>,
    );
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("role", "img");
    expect(icon).toHaveAttribute("aria-label", "Search");
    expect(icon).not.toHaveAttribute("aria-hidden");

    rerender(
      <>
        <span id="warning-label">Warning</span>
        <Icon aria-labelledby="warning-label" data-testid="icon">
          <SearchGraphic />
        </Icon>
      </>,
    );
    expect(screen.getByTestId("icon")).toHaveAttribute("role", "img");
    expect(screen.getByTestId("icon")).toHaveAttribute(
      "aria-labelledby",
      "warning-label",
    );
    expect(screen.getByTestId("icon")).not.toHaveAttribute("aria-label");
  });

  it("exposes every closed size and tone with explicit direction only", () => {
    const sizes: IconSize[] = [
      "inherit",
      "2xs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
    ];
    const tones: IconTone[] = [
      "inherit",
      "primary",
      "secondary",
      "muted",
      "accent",
      "info",
      "success",
      "warning",
      "danger",
    ];
    const emphases: IconEmphasis[] = ["text", "solid"];
    const { rerender } = render(
      <Icon data-testid="icon">
        <SearchGraphic />
      </Icon>,
    );
    for (const size of sizes) {
      rerender(
        <Icon data-testid="icon" size={size}>
          <SearchGraphic />
        </Icon>,
      );
      expect(screen.getByTestId("icon")).toHaveAttribute("data-size", size);
    }
    for (const tone of tones) {
      rerender(
        <Icon data-testid="icon" tone={tone}>
          <SearchGraphic />
        </Icon>,
      );
      expect(screen.getByTestId("icon")).toHaveAttribute("data-tone", tone);
    }
    for (const emphasis of emphases) {
      rerender(
        <Icon data-testid="icon" emphasis={emphasis} tone="accent">
          <SearchGraphic />
        </Icon>,
      );
      expect(screen.getByTestId("icon")).toHaveAttribute(
        "data-emphasis",
        emphasis,
      );
    }
    rerender(
      <Icon data-testid="icon" directional>
        <SearchGraphic />
      </Icon>,
    );
    expect(screen.getByTestId("icon")).toHaveAttribute("data-directional", "");
  });

  it("merges onto one SVG child while preserving authored source props", () => {
    const ref = createRef<HTMLElement | SVGSVGElement>();
    const { container } = render(
      <Icon
        aria-labelledby="graphic-label"
        asChild
        className="consumer-icon"
        data-evidence="composed"
        ref={ref}
        size="lg"
        slot="project-icon"
        style={{ opacity: 0.8 }}
        tone="success"
      >
        <svg className="source-icon" data-source="external" viewBox="0 0 20 20">
          <circle cx="9" cy="9" r="5" />
        </svg>
      </Icon>,
    );
    const icon = document.querySelector("svg")!;
    expect(icon).toBe(ref.current);
    expect(icon).toHaveClass("source-icon", "brick-icon", "consumer-icon");
    expect(icon).toHaveAttribute("data-source", "external");
    expect(icon).toHaveAttribute("data-evidence", "composed");
    expect(icon).toHaveAttribute("data-slot", "project-icon");
    expect(icon).toHaveAttribute("data-size", "lg");
    expect(icon).toHaveAttribute("data-tone", "success");
    expect(icon).toHaveAttribute("role", "img");
    expect(icon).toHaveAttribute("aria-labelledby", "graphic-label");
    expect(icon).toHaveStyle({ opacity: "0.8" });
    expect(icon.parentElement).toBe(container);
  });
});


describe("Icon composition regressions", () => {
  it("preserves owner-first events even when prevented", () => {
    const calls: string[] = [];
    const { container } = render(<Icon asChild onClick={e => { calls.push("owner"); e.preventDefault(); }}><svg onClick={() => calls.push("child")} /></Icon>);
    fireEvent.click(container.firstChild!);
    expect(calls).toEqual(["owner", "child"]);
  });
  it("preserves callback cleanup through StrictMode and replacement", () => {
    const active = new Set<string>();
    const ref = (id: string) => (node: Element | null) => {
      if (!node) return;
      expect(active.has(id)).toBe(false); active.add(id);
      return () => { expect(active.delete(id)).toBe(true); };
    };
    const child = ref("child"), owner = ref("owner");
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const view = (key: string) => <StrictMode><Icon asChild ref={owner}><svg key={key} ref={child} /></Icon></StrictMode>;
    const { rerender, unmount } = render(view("a"));
    expect([...active].sort()).toEqual(["child", "owner"]);
    rerender(view("b")); expect(active.size).toBe(2);
    unmount(); expect(active.size).toBe(0);
    expect(warn).not.toHaveBeenCalled(); warn.mockRestore();
  });
  it("makes owner naming authoritative and SVG nonfocusable", () => {
    const { container, rerender } = render(<Icon asChild label="Status"><svg aria-hidden="true" aria-label="wrong" /></Icon>);
    const svg = container.firstElementChild!;
    expect(svg).not.toHaveAttribute("aria-hidden"); expect(svg).toHaveAccessibleName("Status");
    expect(svg).toHaveAttribute("focusable", "false");
    rerender(<Icon asChild><svg role="img" aria-label="wrong" /></Icon>);
    expect(svg).not.toHaveAttribute("role"); expect(svg).not.toHaveAttribute("aria-label");
  });
});


describe("Icon parity APIs", () => {
  const Graphic = createIcon({ displayName: "Graphic", d: "M2 2h20v20H2z", defaultProps: { size: "xs", tone: "muted", strokeWidth: 2 } });
  it("qualifies Atom public composition independently", () => {
    const order: string[] = []; const cleaned = vi.fn(); const ref = createRef<SVGSVGElement>();
    const child = <svg ref={() => cleaned} onClick={() => order.push("child")} />;
    const element = composeHost(child, { ref, onClick: (e: { preventDefault(): void }) => { order.push("owner"); e.preventDefault(); } });
    const { container, unmount } = render(element);
    expect(ref.current).toBe(container.firstChild); fireEvent.click(ref.current!);
    expect(order).toEqual(["owner", "child"]); unmount();
    expect(cleaned).toHaveBeenCalledTimes(1); expect(ref.current).toBeNull();
  });
  it("renders one factory SVG with native attributes and an SVG ref", () => {
    const ref = createRef<SVGSVGElement>();
    const { container } = render(<Graphic ref={ref} label="Record" viewBox="0 0 32 32" strokeWidth={3} fill="red" />);
    expect(container.children).toHaveLength(1); expect(container.querySelectorAll("svg")).toHaveLength(1);
    expect(ref.current).toBe(container.firstChild); expect(ref.current).toHaveAccessibleName("Record");
    expect(ref.current).toHaveAttribute("viewBox", "0 0 32 32"); expect(ref.current).toHaveAttribute("stroke-width", "3");
    expect(ref.current).toHaveAttribute("fill", "red"); expect(ref.current).not.toHaveAttribute("size");
    expect(Graphic.displayName).toBe("Graphic");
  });
  it("uses currentColor for d and preserves authored multicolor paths and fragments", () => {
    const Color = createIcon({ path: <><path fill="#123456" d="M0 0h2v2z" /><g stroke="blue"><path d="M4 4h4" /></g></> });
    const { container } = render(<><Graphic /><Color tone="danger" /></>);
    expect(container.firstChild).toHaveAttribute("fill", "currentColor");
    expect(container.querySelector('[fill="#123456"]')).not.toBeNull(); expect(container.querySelector('g')).toHaveAttribute("stroke", "blue");
  });
  it("validates mutually exclusive factory geometry at runtime", () => {
    for (const options of [{}, {d:""}, {d:"M0 0",path:<path />}, {path:[]}, {path:"bad"}]) {
      expect(() => createIcon(options as never)).toThrow(/exactly one/);
    }
    expect(() => createIcon({path:[<path key="a" />,<path key="b" />]})).not.toThrow();
    expect(() => createIcon({path:<svg />})).toThrow(/nested SVG/);
    expect(() => createIcon({path:<><g><svg /></g></>})).toThrow(/nested SVG/);
  });
  it("resolves instance > nearest provider > factory > library without wrappers", () => {
    const { container } = render(<IconPropsProvider value={{size:"xl",tone:"success",emphasis:"solid"}}>
      <Graphic />
      <IconPropsProvider value={{tone:"warning",size:undefined}}><Graphic /><Graphic tone="inherit" size="inherit" /></IconPropsProvider>
      <Graphic size={{md:"sm"}} />
    </IconPropsProvider>);
    const nodes = container.children; expect(nodes).toHaveLength(4);
    expect(nodes[0]).toHaveAttribute("data-size","xl"); expect(nodes[0]).toHaveAttribute("data-tone","success");
    expect(nodes[1]).toHaveAttribute("data-tone","warning"); expect(nodes[1]).toHaveAttribute("data-size","xl");
    expect(nodes[2]).toHaveAttribute("data-tone","inherit"); expect(nodes[2]).toHaveAttribute("data-size","inherit");
    expect(nodes[3]).toHaveAttribute("data-size","md"); expect(nodes[3]).toHaveAttribute("data-size-md","sm");
    expect(nodes[3]).not.toHaveAttribute("size"); expect(nodes[3]).toHaveAttribute("data-emphasis","solid");
  });
  it("replaces responsive defaults as a whole", () => {
    const { container } = render(<IconPropsProvider value={{size:{initial:"xs",sm:"lg",xl:"2xl"}}}><Graphic size={{md:"inherit"}} /></IconPropsProvider>);
    expect(container.firstChild).toHaveAttribute("data-size","md"); expect(container.firstChild).not.toHaveAttribute("data-size-sm"); expect(container.firstChild).not.toHaveAttribute("data-size-xl");
  });
  it("server renders direct imports and provider factory defaults", () => {
    const html = renderToString(<IconPropsProvider value={{tone:"info"}}><Graphic /><Icon size={{lg:"xl"}}><svg /></Icon></IconPropsProvider>);
    expect(html).toContain('data-size="xs"'); expect(html).toContain('data-size-lg="xl"'); expect(html).toContain('data-tone="info"'); expect(html).not.toContain("[object Object]");
  });
  it("rejects fragments and non-SVG hosts", () => {
    const warn = vi.spyOn(console,"error").mockImplementation(()=>{});
    for (const child of [<Fragment><svg /></Fragment>,<button />,<span />]) expect(()=>render(<Icon asChild>{child}</Icon>)).toThrow(/one noninteractive SVG/);
    warn.mockRestore();
  });
  it("diagnoses empty names and neutralizes direct SVG tab stops", () => {
    const warn = vi.spyOn(console,"warn").mockImplementation(()=>{});
    const {container} = render(<Icon asChild label=" "><svg tabIndex={0} focusable="true" /></Icon>);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("nonempty")); expect(warn).toHaveBeenCalledWith(expect.stringContaining("nonfocusable"));
    expect(container.firstChild).toHaveAttribute("tabindex","-1"); expect(container.firstChild).toHaveAttribute("focusable","false"); warn.mockRestore();
  });
});


it("composes custom SVG components that forward all props and their ref", () => {
  const Graphic = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props,ref)=><svg {...props} ref={ref} viewBox="0 0 16 16"><title>Asset title</title><path d="M0 0h16v16z" /></svg>);
  const ref=createRef<HTMLElement|SVGSVGElement>();
  render(<Icon asChild ref={ref} label="Contextual name"><Graphic /></Icon>);
  expect(screen.getByRole("img",{name:"Contextual name"})).toBe(ref.current);
  expect(ref.current).toHaveAttribute("focusable","false");
});
