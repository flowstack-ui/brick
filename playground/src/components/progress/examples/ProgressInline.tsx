import { Frame, Progress } from "@flowstack-ui/brick";

export function ProgressInline() {
  return (
    <Frame maxInlineSize="24rem">
      <Progress.Root value={60} layout="inline">
        <Progress.Label>Upload</Progress.Label>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
        <Progress.Value />
      </Progress.Root>
    </Frame>
  );
}
