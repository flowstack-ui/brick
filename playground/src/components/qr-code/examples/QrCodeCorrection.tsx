import { useState } from "react";
import {
  QrCode,
  HStack,
  Button,
  VStack,
  type QrCodeEncoding,
} from "@flowstack-ui/brick";
export function QrCodeCorrection() {
  const [ecc, setEcc] = useState<NonNullable<QrCodeEncoding["ecc"]>>("L");
  return (
    <VStack align="start" gap={4}>
      <QrCode.Root value="https://example.com" encoding={{ ecc }}>
        <QrCode.Frame titleText="Correction level example" />
      </QrCode.Root>
      <HStack gap={2} wrap>
        {(["L", "M", "Q", "H"] as const).map((level) => (
          <Button
            key={level}
            size="sm"
            tone="neutral"
            variant={level === ecc ? "solid" : "outline"}
            aria-pressed={level === ecc}
            onClick={() => setEcc(level)}
          >
            {level}
          </Button>
        ))}
      </HStack>
    </VStack>
  );
}
