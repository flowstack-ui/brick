import { FormatNumber, Text } from "@flowstack-ui/brick";

export function FormatNumberPercent() {
  return (
    <Text>
      <FormatNumber
        value={0.145}
        formatOptions={{ style: "percent", maximumFractionDigits: 1 }}
      />
    </Text>
  );
}
