import { For, FormatNumber, HStack, Text } from "@flowstack-ui/brick";

export function FormatNumberCompact() {
  return (
    <HStack gap="6" wrap>
      <For each={[1200, 2500000, 4300000000]}>
        {(value) => (
          <Text key={value}>
            <FormatNumber
              value={value}
              formatOptions={{ notation: "compact" }}
            />
          </Text>
        )}
      </For>
    </HStack>
  );
}
