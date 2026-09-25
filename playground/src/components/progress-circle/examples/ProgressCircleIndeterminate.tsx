import { ProgressCircle } from "@flowstack-ui/brick";

export function ProgressCircleIndeterminate() {
  return (
    <ProgressCircle.Root value={null}>
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Indicator />
      </ProgressCircle.Circle>
      <ProgressCircle.Label>Connecting</ProgressCircle.Label>
    </ProgressCircle.Root>
  );
}
