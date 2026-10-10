import { QrCode } from "@flowstack-ui/brick";
import type { CSSProperties } from "react";
export function QrCodeLogo() {
  return (
    <QrCode.Root
      value="https://example.com"
      size="2xl"
      encoding={{ ecc: "H" }}
      style={
        {
          "--brick-qr-code-overlay-size": "32px",
          "--brick-qr-code-overlay-padding": "4px",
        } as CSSProperties
      }
    >
      <QrCode.Frame titleText="Branded shared document" />
      <QrCode.Overlay>
        <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
          <g fill="black">
            <rect x="5" y="4" width="30" height="56" rx="5" />
            <rect x="39" y="4" width="20" height="26" rx="4" />
            <rect x="39" y="34" width="20" height="26" rx="4" />
          </g>
        </svg>
      </QrCode.Overlay>
    </QrCode.Root>
  );
}
