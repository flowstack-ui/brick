import { For, FormatNumber, HStack, Text } from "@flowstack-ui/brick";

export function FormatNumberCurrency() {
  return (
    <HStack gap="6" wrap>
      <For each={["USD", "EUR", "JPY"]}>
        {(currency) => (
          <Text key={currency}>
            <FormatNumber
              value={1234.5}
              formatOptions={{ style: "currency", currency }}
            />
          </Text>
        )}
      </For>
    </HStack>
  );
}
