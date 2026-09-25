import { VStack, Text, SegmentGroup } from "@flowstack-ui/brick";
export function SegmentGroupDisabled() {
  return (
    <VStack align="start" gap="5">
      <Text>Disabled group</Text>
      <SegmentGroup.Root
        aria-label="Disabled view"
        defaultValue="List"
        disabled
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={["List", "Grid", "Board"]} />
      </SegmentGroup.Root>
      <Text>Unavailable item</Text>
      <SegmentGroup.Root aria-label="Partly available view" defaultValue="List">
        <SegmentGroup.Indicator />
        <SegmentGroup.Items
          items={[
            { value: "List", label: "List" },
            { value: "Grid", label: "Grid", disabled: true },
            { value: "Board", label: "Board" },
          ]}
        />
      </SegmentGroup.Root>
    </VStack>
  );
}
