import { useState, type CSSProperties } from "react";
import { QrCode, Text, VStack } from "@flowstack-ui/brick";
const artwork =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="black"><rect x="5" y="4" width="30" height="56" rx="5"/><rect x="39" y="4" width="20" height="26" rx="4"/><rect x="39" y="34" width="20" height="26" rx="4"/></g></svg>',
  );
export function QrCodeOverlayExport() {
  const [error, setError] = useState("");
  return (
    <QrCode.Root
      value="https://example.com"
      size="2xl"
      encoding={{ ecc: "H" }}
      style={{ "--brick-qr-code-overlay-size": "32px" } as CSSProperties}
    >
      <VStack align="start" gap={4}>
        <QrCode.Frame titleText="Portable logo export" />
        <QrCode.Overlay exportSrc={artwork}>
          {/* The HTML wrapper needs explicit portable export artwork. */}
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 64 64"
              aria-hidden="true"
              focusable="false"
              style={{ display: "block" }}
            >
              <g fill="black">
                <rect x="5" y="4" width="30" height="56" rx="5" />
                <rect x="39" y="4" width="20" height="26" rx="4" />
                <rect x="39" y="34" width="20" height="26" rx="4" />
              </g>
            </svg>
          </span>
        </QrCode.Overlay>
        <QrCode.DownloadTrigger
          size="sm"
          variant="outline"
          fileName="branded.png"
          mimeType="image/png"
          exportSize={512}
          onDownloadError={({ error }) => setError(String(error))}
        >
          Download with logo
        </QrCode.DownloadTrigger>
        {error && <Text role="status">{error}</Text>}
      </VStack>
    </QrCode.Root>
  );
}
