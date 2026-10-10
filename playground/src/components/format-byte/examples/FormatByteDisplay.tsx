import { For, FormatByte, Text, VStack } from "@flowstack-ui/brick";

export function FormatByteDisplay() {
  return (
    <VStack gap="3">
      <For each={["long", "short", "narrow"] as const}>
        {(unitDisplay) => (
          <Text key={unitDisplay}>
            {unitDisplay}: <FormatByte value={1450} unitDisplay={unitDisplay} />
          </Text>
        )}
      </For>
    </VStack>
  );
}
