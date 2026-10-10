import { useState } from "react";
import { SegmentGroup } from "@flowstack-ui/brick/segment-group";
import { VStack } from "@flowstack-ui/brick/stack";
import { Heading, Text } from "@flowstack-ui/brick/text";

export function SegmentView() {
  const [view, setView] = useState("List");
  return (
    <VStack align="start" gap="3">
      <Heading level={2} variant="title-sm">Workspace view</Heading>
      <SegmentGroup.Root aria-label="Workspace presentation" name="presentation" tone="accent" value={view} onValueChange={setView}>
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={["List", "Grid", "Board"]} />
      </SegmentGroup.Root>
      <Text>Current presentation: {view}</Text>
    </VStack>
  );
}
