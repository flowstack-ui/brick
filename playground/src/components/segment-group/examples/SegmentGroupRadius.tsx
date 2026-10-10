import { For, VStack, Text, SegmentGroup } from "@flowstack-ui/brick";
export function SegmentGroupRadius() {
  return (
    <VStack align="start" gap="6">
      <For each={["none", "sm", "control", "full"] as const}>
        {(radius) => (
          <VStack key={radius} align="start" gap="2">
            <Text>{radius}</Text>
            <SegmentGroup.Root
              aria-label="Rounded view"
              defaultValue="List"
              radius={radius}
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
