import { For, HStack, Square, Surface, Text } from "@flowstack-ui/brick";

export function SurfaceElevation() {
  return (
    <Surface level="canvas" inset="lg">
      <HStack gap="12" wrap justify="center">
        <For each={["none", "low", "medium", "high"] as const}>
          {(elevation) => (
            <Surface
              key={elevation}
              elevation={elevation}
              level="raised"
              asChild
            >
              <Square size="8rem">
                <Text>{elevation}</Text>
              </Square>
            </Surface>
          )}
        </For>
      </HStack>
    </Surface>
  );
}
