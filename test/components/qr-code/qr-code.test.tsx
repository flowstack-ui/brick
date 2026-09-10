import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { QrCode, encodeQrCode } from "../../../src/qr-code.js";

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
