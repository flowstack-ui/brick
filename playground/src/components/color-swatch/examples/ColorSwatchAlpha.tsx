import { ColorSwatch, HStack, VStack, Text, For } from "@flowstack-ui/brick";
export function ColorSwatchAlpha() {
  return (
    <HStack gap="4">
      <For each={[1, 0.75, 0.5, 0.25, 0]}>
        {(alpha) => (
          <VStack key={alpha} gap="2">
            <ColorSwatch.Root size="2xl" value={`rgb(147 51 234 / ${alpha})`} />
            <Text variant="body-sm">{alpha * 100}%</Text>
          </VStack>
        )}
      </For>
    </HStack>
  );
}
