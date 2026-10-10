import { Surface, Text, VStack } from "@flowstack-ui/brick";

export function SurfaceBorders() {
  return (
    <VStack gap="4">
      <Surface level="transparent" inset="md">
        <Text>No border</Text>
      </Surface>
      <Surface level="transparent" inset="md" bordered>
        <Text>Bordered</Text>
      </Surface>
    </VStack>
  );
}
