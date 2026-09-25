import { SegmentGroup } from "@flowstack-ui/brick";
export function SegmentGroupVertical() {
  return (
    <SegmentGroup.Root
      aria-label="Vertical view"
      defaultValue="List"
      orientation="vertical"
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={["List", "Grid", "Board"]} />
    </SegmentGroup.Root>
  );
}
