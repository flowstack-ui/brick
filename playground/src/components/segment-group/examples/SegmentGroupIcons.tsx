import { SegmentGroup, HStack, VStack, Icon } from "@flowstack-ui/brick";
import { List, Grid2X2 } from "lucide-react";
export function SegmentGroupIcons() {
  return (
    <VStack align="start" gap="5">
      <SegmentGroup.Root aria-label="Icon and text view" defaultValue="list">
        <SegmentGroup.Indicator />
        <SegmentGroup.Item value="list">
          <Icon tone="inherit">
            <List />
          </Icon>
          List
        </SegmentGroup.Item>
        <SegmentGroup.Item value="grid">
          <Icon tone="inherit">
            <Grid2X2 />
          </Icon>
          Grid
        </SegmentGroup.Item>
      </SegmentGroup.Root>
      <HStack gap="3">
        <SegmentGroup.Root aria-label="Icon-only view" defaultValue="list">
          <SegmentGroup.Indicator />
          <SegmentGroup.Item iconOnly aria-label="List view" value="list">
            <List aria-hidden="true" />
          </SegmentGroup.Item>
          <SegmentGroup.Item iconOnly aria-label="Grid view" value="grid">
            <Grid2X2 aria-hidden="true" />
          </SegmentGroup.Item>
        </SegmentGroup.Root>
      </HStack>
    </VStack>
  );
}
