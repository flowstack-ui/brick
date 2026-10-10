import { ColorSwatch, HStack, VStack, Text, For } from "@flowstack-ui/brick";
export function ColorSwatchRadius() {
  return (
    <HStack gap="5" wrap>
      <For each={["none", "sm", "control", "full"] as const}>
        {(radius) => (
          <VStack key={radius} gap="2">
            <ColorSwatch.Root radius={radius} size="2xl" value="#9333ea" />
            <Text variant="body-sm">{radius}</Text>
          </VStack>
        )}
      </For>
    </HStack>
  );
}
