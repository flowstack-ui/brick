import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { QrCode, encodeQrCode } from "../../../src/qr-code.js";
import { ButtonGroup } from "../../../src/components/button/ButtonGroup.js";

it("uses finished Button loading, focus and group defaults", () => {
  render(<QrCode.Root><ButtonGroup size="xs" variant="outline" tone="neutral">
    <QrCode.DownloadTrigger loading loadingText="Saving" focusRing="inside" fileName="a.svg" mimeType="image/svg+xml">Save</QrCode.DownloadTrigger>
  </ButtonGroup></QrCode.Root>);
  const button = screen.getByRole("button");
  expect(button).toHaveTextContent("Saving");
  expect(button).toHaveAttribute("data-size", "xs");
  expect(button).toHaveAttribute("data-tone", "neutral");
  expect(button).toHaveAttribute("data-variant", "outline");
  expect(button).toHaveAttribute("data-focus-ring", "inside");
  expect(button).not.toHaveAttribute("loadingtext");
  expect(button).toHaveAttribute("data-slot", "qr-code-download-trigger");
});

it("supports defaults, sparse responsive sizes and scoped unstyled", () => {
  const view = render(<QrCode.PropsProvider value={{size:{lg:"xl"},unstyled:true}}>
    <QrCode.Root id="first"><QrCode.Frame aria-label="Default" /><QrCode.Overlay unstyled={false}>Logo</QrCode.Overlay>
      <QrCode.DownloadTrigger iconOnly aria-label="Download QR" fileName="a.png" mimeType="image/png"><svg/></QrCode.DownloadTrigger>
    </QrCode.Root>
    <QrCode.Root id="second" size="sm" unstyled={false}><QrCode.Frame aria-label="Override"/></QrCode.Root>
  </QrCode.PropsProvider>);
  const first=view.container.querySelector("#first")!;
  expect(first).toHaveAttribute("data-size","md");
  expect(first).toHaveAttribute("data-size-lg","xl");
  expect(first).not.toHaveClass("brick-qr-code");
  expect(screen.getByRole("img",{name:"Default"})).not.toHaveClass("brick-qr-code-frame");
  expect(first.querySelector(".brick-qr-code-overlay")).not.toBeNull();
  expect(screen.getByRole("button",{name:"Download QR"})).toHaveClass("brick-icon-button");
  expect(view.container.querySelector("#second")).toHaveAttribute("data-size","sm");
});

it("projects compatible hosts without losing names, IDs or geometry", () => {
  render(<QrCode.Root asChild id="composed" ids={{frame:"named-frame"}} value="hello"><section>
    <QrCode.Frame asChild titleText="Projected"><svg><QrCode.Pattern asChild><path fill="purple"/></QrCode.Pattern></svg></QrCode.Frame>
  </section></QrCode.Root>);
  const svg=screen.getByRole("img",{name:"Projected"});
  expect(svg.parentElement?.tagName).toBe("SECTION");
  expect(svg).toHaveAttribute("id","named-frame");
  expect(svg.querySelector("path")).toHaveAttribute("d",encodeQrCode("hello").path);
  expect(svg.querySelector("path")).toHaveAttribute("fill","purple");
});

it("preserves cleanup returned by Frame and Overlay refs", () => {
  let attached = 0, cleaned = 0;
  const ref = () => { attached++; return () => { cleaned++; }; };
  const view = render(<QrCode.Root><QrCode.Frame ref={ref} aria-label="QR" /><QrCode.Overlay ref={ref}>Logo</QrCode.Overlay></QrCode.Root>);
  view.unmount();
  expect(cleaned).toBeGreaterThan(0);
  expect(cleaned).toBe(attached);
});

it("composes a named graphic with the default recipe and independent Button sizing", () => {
  const ref = createRef<SVGSVGElement>();
  render(<QrCode.Root value="hello"><QrCode.Frame ref={ref} titleText="Share hello" />
    <QrCode.DownloadTrigger size="sm" exportSize={512} fileName="hello.svg" mimeType="image/svg+xml">Save</QrCode.DownloadTrigger>
  </QrCode.Root>);
  const frame = screen.getByRole("img", { name: "Share hello" });
  expect(frame).toBe(ref.current);
  expect(frame).toHaveClass("brick-qr-code-frame");
  expect(frame.parentElement).toHaveAttribute("data-size", "md");
  expect(frame.querySelector("path")).toHaveAttribute("d", encodeQrCode("hello").path);
  expect(screen.getByRole("button")).toHaveAttribute("data-size", "sm");
  expect(screen.getByRole("button")).not.toHaveAttribute("exportSize");
});

it("removes stale graphics and prevents downloads after an encoding error", () => {
  const view = render(<QrCode.Root value="hello"><QrCode.Frame aria-label="Share" /></QrCode.Root>);
  view.rerender(<QrCode.Root value={"x".repeat(8000)}><QrCode.Frame aria-label="Share" />
    <QrCode.DownloadTrigger fileName="hello.svg" mimeType="image/svg+xml">Save</QrCode.DownloadTrigger></QrCode.Root>);
  expect(screen.getByRole("img").querySelector("path")).toBeNull();
  expect(screen.getByRole("button")).toBeDisabled();
});

it("keeps loading and disabled-loading on a single action host", () => {
  render(<QrCode.Root><QrCode.DownloadTrigger loading disabled fileName="a.svg" mimeType="image/svg+xml">Save</QrCode.DownloadTrigger></QrCode.Root>);
  expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  expect(screen.getByRole("button")).toHaveClass("brick-button");
});
