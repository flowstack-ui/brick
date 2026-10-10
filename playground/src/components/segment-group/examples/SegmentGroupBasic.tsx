import { SegmentGroup } from "@flowstack-ui/brick";
export function SegmentGroupBasic() {
  return (
    <SegmentGroup.Root aria-label="Project view" defaultValue="List">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={["List", "Grid", "Board"]} />
    </SegmentGroup.Root>
  );
}
