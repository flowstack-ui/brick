import { For, Frame, Skeleton, Text, VStack } from "@flowstack-ui/brick";
export function SkeletonAnimation() {
  return (
    <Frame maxInlineSize={400}>
      <VStack gap="6">
        <For each={["pulse", "wave", "none"] as const}>
          {(animation) => (
            <VStack key={animation} gap="2">
              <Text>{animation}</Text>
              <Skeleton animation={animation} height={40} />
            </VStack>
          )}
        </For>
      </VStack>
    </Frame>
  );
}
