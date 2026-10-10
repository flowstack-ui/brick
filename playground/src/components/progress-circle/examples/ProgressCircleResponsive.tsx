import { ProgressCircle } from "@flowstack-ui/brick";

export function ProgressCircleResponsive() {
  return (
    <ProgressCircle.Root value={60} size={{ initial: "sm", md: "xl" }}>
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Indicator />
      </ProgressCircle.Circle>
      <ProgressCircle.Label>Export</ProgressCircle.Label>
    </ProgressCircle.Root>
  );
}
