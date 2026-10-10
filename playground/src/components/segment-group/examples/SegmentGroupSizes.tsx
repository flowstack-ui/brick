import { For, VStack, Text, SegmentGroup } from "@flowstack-ui/brick";
export function SegmentGroupSizes() {
  return (
    <VStack align="start" gap="6">
      <For each={["2xs", "xs", "sm", "md", "lg"] as const}>
        {(size) => (
          <VStack key={size} align="start" gap="2">
            <Text>{size}</Text>
            <SegmentGroup.Root
              aria-label="Sized view"
              defaultValue="List"
              size={size}
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Items items={["List", "Grid", "Board"]} />
            </SegmentGroup.Root>
          </VStack>
        )}
      </For>
    </VStack>
  );
}
