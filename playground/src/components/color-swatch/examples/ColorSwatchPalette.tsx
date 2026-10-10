import { ColorSwatch, HStack, VStack, Text, For } from "@flowstack-ui/brick";
export function ColorSwatchPalette() {
  return (
    <HStack gap="3" wrap>
      <For each={["#faf5ff", "#e9d5ff", "#c084fc", "#9333ea", "#6b21a8"]}>
        {(value) => (
          <VStack key={value} gap="2">
            <ColorSwatch.Root value={value} size="2xl" />
            <Text variant="body-sm">{value}</Text>
          </VStack>
        )}
      </For>
    </HStack>
  );
}
