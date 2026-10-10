import { Center, For, Surface, Text, VStack } from "@flowstack-ui/brick";

export function SurfaceRadius() {
  return (
    <VStack gap="4">
      <For
        each={
          [
            "none",
            "2xs",
            "xs",
            "sm",
            "md",
            "lg",
            "xl",
            "2xl",
            "3xl",
            "4xl",
            "full",
            "control",
            "surface",
          ] as const
        }
      >
        {(radius) => (
          <Surface key={radius} radius={radius} level="subtle" inset="md">
            <Center>
              <Text>{radius}</Text>
            </Center>
          </Surface>
        )}
      </For>
    </VStack>
  );
}
