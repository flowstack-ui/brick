import { useState } from "react";
import { QrCode, Field, Input, Frame, VStack } from "@flowstack-ui/brick";
export function QrCodeInput() {
  const [value, setValue] = useState("https://example.com");
  return (
    <VStack align="start" gap={4}>
      <Frame inlineSize="100%" maxInlineSize="24rem">
        <Field.Root>
          <Field.Label>Destination</Field.Label>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Field.Root>
      </Frame>
      <QrCode.Root value={value}>
        <QrCode.Frame titleText="Current destination" />
      </QrCode.Root>
    </VStack>
  );
}
