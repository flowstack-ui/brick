import { For, VStack, Text, SegmentGroup } from "@flowstack-ui/brick";
export function SegmentGroupTones() {
  return (
    <VStack align="start" gap="6">
      <For each={["neutral", "accent", "contrast"] as const}>
        {(tone) => (
          <VStack key={tone} align="start" gap="2">
            <Text>{tone}</Text>
            <SegmentGroup.Root
              aria-label="Toned view"
              defaultValue="List"
              tone={tone}
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
