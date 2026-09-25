import { useState } from "react";
import { SegmentGroup, VStack, Text } from "@flowstack-ui/brick";
export function SegmentGroupControlled() {
  const [value, setValue] = useState("List");
  return (
    <VStack align="start" gap="4">
      <SegmentGroup.Root
        aria-label="Controlled view"
        value={value}
        onValueChange={setValue}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={["List", "Grid", "Board"]} />
      </SegmentGroup.Root>
      <Text>Selected: {value}</Text>
    </VStack>
  );
}
