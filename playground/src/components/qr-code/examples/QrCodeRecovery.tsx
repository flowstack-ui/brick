import { useState } from "react";
import { QrCode, Button, Text, VStack } from "@flowstack-ui/brick";
export function QrCodeRecovery() {
  const [invalid, setInvalid] = useState(true);
  return (
    <VStack align="start" gap={4}>
      <QrCode.Root value={invalid ? "x".repeat(8000) : "https://example.com"}>
        <QrCode.Frame titleText="Recoverable QR code" />
        <QrCode.Context>
          {(api) => (
            <Text role="status">
              {api.error
                ? "Too much content. Shorten the value."
                : "Ready to scan"}
            </Text>
          )}
        </QrCode.Context>
      </QrCode.Root>
      <Button size="sm" variant="outline" onClick={() => setInvalid(!invalid)}>
        {invalid ? "Shorten value" : "Exceed capacity"}
      </Button>
    </VStack>
  );
}
