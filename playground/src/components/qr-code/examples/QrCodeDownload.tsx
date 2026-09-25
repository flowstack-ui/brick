import { useState } from "react";
import { QrCode, ButtonGroup, VStack, Text } from "@flowstack-ui/brick";
export function QrCodeDownload() {
  const [error, setError] = useState("");
  return (
    <QrCode.Root value="https://example.com/share">
      <VStack align="start" gap={4}>
        <QrCode.Frame titleText="Download shared document" />
        <ButtonGroup size="sm" tone="neutral" variant="outline">
          <QrCode.DownloadTrigger
            fileName="document.png"
            mimeType="image/png"
            exportSize={512}
            onDownloadError={({ error }) => setError(String(error))}
          >
            Download PNG
          </QrCode.DownloadTrigger>
          <QrCode.DownloadTrigger
            iconOnly
            aria-label="Download SVG"
            fileName="document.svg"
            mimeType="image/svg+xml"
            onDownloadError={({ error }) => setError(String(error))}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
            </svg>
          </QrCode.DownloadTrigger>
        </ButtonGroup>
        {error && (
          <Text role="status" tone="danger">
            {error}
          </Text>
        )}
      </VStack>
    </QrCode.Root>
  );
}
