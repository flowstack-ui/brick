import { For, Surface, Text, VStack } from "@flowstack-ui/brick";

export function SurfaceTones() {
  return (
    <VStack gap="4">
      <For each={["base", "subtle", "transparent"] as const}>
        {(level) => (
          <Surface key={level} tone="accent" level={level} inset="md" bordered>
            <Text>{level}</Text>
          </Surface>
        )}
      </For>
    </VStack>
  );
}
