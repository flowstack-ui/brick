import { FormatByte, Text, VStack } from "@flowstack-ui/brick";

export function FormatByteSystem() {
  return (
    <VStack gap="3">
      <Text>
        Decimal: <FormatByte value={1024} />
      </Text>
      <Text>
        Binary: <FormatByte value={1024} unitSystem="binary" />
      </Text>
    </VStack>
  );
}
