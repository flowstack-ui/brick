import { Frame, Progress } from "@flowstack-ui/brick";

export function ProgressBuffer() {
  return (
    <Frame maxInlineSize="20rem">
      <Progress.Root value={40} bufferValue={75}>
        <Progress.Label>Processing video</Progress.Label>
        <Progress.Value />
        <Progress.Track>
          <Progress.Buffer />
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </Frame>
  );
}
