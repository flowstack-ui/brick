import { ProgressCircle } from "@flowstack-ui/brick";

export function ProgressCircleBasic() {
  return (
    <ProgressCircle.Root value={60}>
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Indicator />
      </ProgressCircle.Circle>
      <ProgressCircle.Label>Export</ProgressCircle.Label>
    </ProgressCircle.Root>
  );
}
