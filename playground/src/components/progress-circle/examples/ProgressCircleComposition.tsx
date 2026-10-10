import { ProgressCircle } from "@flowstack-ui/brick";

export function ProgressCircleComposition() {
  return (
    <ProgressCircle.Root value={60} size="xl">
      <ProgressCircle.Circle asChild>
        <svg>
          <ProgressCircle.Track asChild>
            <circle />
          </ProgressCircle.Track>
          <ProgressCircle.Indicator asChild>
            <circle />
          </ProgressCircle.Indicator>
        </svg>
      </ProgressCircle.Circle>
      <ProgressCircle.Value asChild>
        {({ formattedValue }) => <span>{formattedValue}</span>}
      </ProgressCircle.Value>
      <ProgressCircle.Label asChild>
        <span>Export</span>
      </ProgressCircle.Label>
    </ProgressCircle.Root>
  );
}
