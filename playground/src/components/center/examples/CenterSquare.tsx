import { For, HStack, Square, Surface, Text } from "@flowstack-ui/brick";
export function CenterSquare() {
  return (
    <HStack gap="4">
      <For each={[32, 40, 48]}>
        {(size) => (
          <Surface
            key={size}
            level="subtle"
            tone="accent"
            radius="none"
            asChild
          >
            <Square size={size}>
              <Text>{size}</Text>
            </Square>
          </Surface>
        )}
      </For>
    </HStack>
  );
}
