import { ProgressCircle } from "@flowstack-ui/brick";
import type { CSSProperties } from "react";

export function ProgressCircleCustomStroke() {
  return (
    <ProgressCircle.Root
      value={60}
      size="xl"
      style={
        {
          "--brick-progress-circle-stroke": 6,
          "--brick-progress-circle-track": "var(--brick-color-success-soft)",
          "--brick-progress-circle-indicator":
            "var(--brick-color-success-solid)",
        } as CSSProperties
      }
    >
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Indicator />
      </ProgressCircle.Circle>
      <ProgressCircle.Value />
      <ProgressCircle.Label>Preparing</ProgressCircle.Label>
    </ProgressCircle.Root>
  );
}
