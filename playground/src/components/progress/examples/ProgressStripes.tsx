import { Frame, Progress } from "@flowstack-ui/brick";

export function ProgressStripes() {
  return (
    <Frame maxInlineSize="20rem">
      <Progress.Root value={60} striped>
        <Progress.Label>Uploading archive</Progress.Label>
        <Progress.Value />
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </Frame>
  );
}
