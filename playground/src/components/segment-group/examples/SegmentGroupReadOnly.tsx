import { SegmentGroup } from "@flowstack-ui/brick";
export function SegmentGroupReadOnly() {
  return (
    <SegmentGroup.Root
      aria-label="Read-only view"
      defaultValue="List"
      readOnly
      name="readonly-view"
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={["List", "Grid", "Board"]} />
    </SegmentGroup.Root>
  );
}
