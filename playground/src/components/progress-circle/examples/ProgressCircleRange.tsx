import { ProgressCircle } from "@flowstack-ui/brick";

export function ProgressCircleRange() {
  return (
    <ProgressCircle.Root
      value={3}
      max={5}
      valueFormat="value"
      size="xl"
      getValueLabel={(value, _min, max) => `${value} of ${max} files`}
    >
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Indicator />
      </ProgressCircle.Circle>
      <ProgressCircle.Value>
        {({ formattedValue, max }) => `${formattedValue}/${max}`}
      </ProgressCircle.Value>
      <ProgressCircle.Label>Files uploaded</ProgressCircle.Label>
    </ProgressCircle.Root>
  );
}
