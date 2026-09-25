import { For, Frame, Skeleton, Text, VStack } from "@flowstack-ui/brick";
export function SkeletonShapes() {
  return (
    <Frame maxInlineSize={400}>
      <VStack gap="4">
        <For each={["text", "circular", "rectangular", "rounded"] as const}>
          {(variant) => (
            <VStack key={variant} gap="2">
              <Text>{variant}</Text>
              <Skeleton variant={variant} />
            </VStack>
          )}
        </For>
        <VStack gap="2">
          <Text>Custom radius</Text>
          <Skeleton height={48} radius="xl" />
        </VStack>
      </VStack>
    </Frame>
  );
}
