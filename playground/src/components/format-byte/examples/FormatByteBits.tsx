import { FormatByte, Text } from "@flowstack-ui/brick";

export function FormatByteBits() {
  return (
    <Text>
      <FormatByte value={1450} unit="bit" />
    </Text>
  );
}
