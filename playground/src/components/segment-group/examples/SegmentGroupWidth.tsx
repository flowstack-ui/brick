import { Frame, SegmentGroup } from "@flowstack-ui/brick";
export function SegmentGroupWidth() {
  return (
    <Frame maxInlineSize="24rem">
      <SegmentGroup.Root
        aria-label="Full-width view"
        defaultValue="List"
        fullWidth
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={["List", "Grid", "Board"]} />
      </SegmentGroup.Root>
    </Frame>
  );
}
