import { Circle, For, HStack, Surface, Text } from "@flowstack-ui/brick";
export function CenterCircle() {
  return (
    <HStack gap="4">
      <For each={[32, 40, 48]}>
        {(size) => (
          <Surface key={size} level="subtle" tone="accent" asChild>
            <Circle size={size}>
              <Text>{size}</Text>
            </Circle>
          </Surface>
        )}
      </For>
    </HStack>
  );
}
