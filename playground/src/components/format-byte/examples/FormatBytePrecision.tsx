import { FormatByte, Text, VStack, formatByte } from "@flowstack-ui/brick";

export function FormatBytePrecision() {
  return (
    <VStack gap="3">
      <Text>
        <FormatByte value={1234567} precision={4} />
      </Text>
      <Text>
        <FormatByte
          value={0.0000123}
          precision={3}
          formatOptions={{ maximumSignificantDigits: 3 }}
        />
      </Text>
      <Text>Helper: {formatByte(1450, "en-US")}</Text>
    </VStack>
  );
}
