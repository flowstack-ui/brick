import { useState } from "react";
import { QrCode, Spinner, Button, Frame, VStack } from "@flowstack-ui/brick";
export function QrCodeLoading() {
  const [loading, setLoading] = useState(true);
  return (
    <VStack gap={4} align="start">
      <Frame
        inlineSize="120px"
        blockSize="120px"
        style={{ display: "grid", placeItems: "center" }}
      >
        {loading ? (
          <Spinner aria-label="Preparing share link" />
        ) : (
          <QrCode.Root value="https://example.com">
            <QrCode.Frame titleText="Ready to share" />
          </QrCode.Root>
        )}
      </Frame>
      <Button size="sm" variant="outline" onClick={() => setLoading(!loading)}>
        {loading ? "Show code" : "Prepare again"}
      </Button>
    </VStack>
  );
}
