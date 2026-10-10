import { FormatNumber, Text } from "@flowstack-ui/brick";

export function FormatNumberUnit() {
  return (
    <Text>
      <FormatNumber
        value={120}
        formatOptions={{
          style: "unit",
          unit: "kilometer-per-hour",
          unitDisplay: "long",
        }}
      />
    </Text>
  );
}
