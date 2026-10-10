import { For, Surface, Text, VStack } from "@flowstack-ui/brick";

export function SurfaceLevels() {
  return (
    <VStack gap="4">
      <For
        each={["transparent", "canvas", "base", "subtle", "raised"] as const}
      >
        {(level) => (
          <Surface key={level} level={level} inset="md" bordered>
            <Text>{level}</Text>
          </Surface>
        )}
      </For>
    </VStack>
  );
}
