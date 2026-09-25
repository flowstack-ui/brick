import { ProgressCircle } from "@flowstack-ui/brick";

export function ProgressCircleValue() {
  return (
    <ProgressCircle.Root value={60} size="xl">
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Indicator />
      </ProgressCircle.Circle>
      <ProgressCircle.Value />
      <ProgressCircle.Label>Export</ProgressCircle.Label>
    </ProgressCircle.Root>
  );
}
