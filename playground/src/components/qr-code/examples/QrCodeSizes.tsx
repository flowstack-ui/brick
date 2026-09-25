import { QrCode, HStack, VStack, Text } from "@flowstack-ui/brick";
export function QrCodeSizes() {
  return (
    <HStack gap={6} align="end" wrap>
      {(["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <VStack key={size} gap={2}>
          <QrCode.Root value="https://example.com" size={size}>
            <QrCode.Frame titleText={size + " QR code"} />
          </QrCode.Root>
          <Text>{size}</Text>
        </VStack>
      ))}
    </HStack>
  );
}
