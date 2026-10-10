import type { CSSProperties } from "react";
import { SegmentGroup } from "@flowstack-ui/brick";
export function SegmentGroupCustom() {
  return (
    <SegmentGroup.Root
      aria-label="Custom indicator"
      defaultValue="List"
      style={
        {
          "--brick-segment-group-indicator-background":
            "var(--brick-color-accent-soft)",
          "--brick-segment-group-selected-foreground":
            "var(--brick-color-accent-on-soft)",
          "--brick-segment-group-indicator-shadow": "none",
        } as CSSProperties
      }
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={["List", "Grid", "Board"]} />
    </SegmentGroup.Root>
  );
}
