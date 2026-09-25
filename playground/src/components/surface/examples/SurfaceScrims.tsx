import { For, Surface, Text, VStack } from "@flowstack-ui/brick";

export function SurfaceScrims() {
  return (
    <VStack gap="4">
      <For each={["soft", "medium", "strong"] as const}>
        {(strength) => (
          <Surface key={strength} tone="accent" inset="lg">
            <Surface.Scrim strength={strength} />
            <Surface.Content>
              <Surface inset="sm">
                <Text>{strength}</Text>
              </Surface>
            </Surface.Content>
          </Surface>
        )}
      </For>
      <For
        each={
          [
            "uniform",
            "inline-start",
            "inline-end",
            "block-start",
            "block-end",
          ] as const
        }
      >
        {(direction) => (
          <Surface key={direction} tone="accent" inset="lg">
            <Surface.Scrim direction={direction} />
            <Surface.Content>
              <Surface inset="sm">
                <Text>{direction}</Text>
              </Surface>
            </Surface.Content>
          </Surface>
        )}
      </For>
    </VStack>
  );
}
