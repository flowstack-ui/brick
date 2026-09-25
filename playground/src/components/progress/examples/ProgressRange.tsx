import { Frame, Progress } from "@flowstack-ui/brick";

export function ProgressRange() {
  return (
    <Frame maxInlineSize="20rem">
      <Progress.Root
        value={3}
        max={5}
        valueFormat="value"
        getValueLabel={(value, _min, max) => `${value} of ${max} files`}
      >
        <Progress.Label>Files uploaded</Progress.Label>
        <Progress.Value>
          {({ formattedValue, max }) => `${formattedValue} / ${max}`}
        </Progress.Value>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </Frame>
  );
}
