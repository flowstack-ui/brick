import { FormatNumber, Text, VStack, formatNumber } from "@flowstack-ui/brick";

export function FormatNumberPrecision() {
  return (
    <VStack gap="3">
      <Text>
        Fraction:{" "}
        <FormatNumber
          value={1.2345}
          formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
        />
      </Text>
      <Text>
        Significant:{" "}
        <FormatNumber
          value={1.2345}
          formatOptions={{ maximumSignificantDigits: 3 }}
        />
      </Text>
      <Text>
        Signed:{" "}
        <FormatNumber
          value={0.125}
          formatOptions={{ style: "percent", signDisplay: "always" }}
        />
      </Text>
      <Text>
        Helper: {formatNumber(1200, "en-US", { notation: "compact" })}
      </Text>
    </VStack>
  );
}
