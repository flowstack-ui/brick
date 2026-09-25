import { ColorSwatch, HStack, VStack, Text, For } from "@flowstack-ui/brick";
export function ColorSwatchSizes() {
  return (
    <HStack gap="5" wrap>
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>
        {(size) => (
          <VStack key={size} gap="2">
            <ColorSwatch.Root size={size} value="#9333ea" />
            <Text variant="body-sm">{size}</Text>
          </VStack>
        )}
      </For>
    </HStack>
  );
}
