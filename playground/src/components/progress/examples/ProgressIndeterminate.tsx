import { Frame, Progress } from "@flowstack-ui/brick";

export function ProgressIndeterminate() {
  return (
    <Frame maxInlineSize="20rem">
      <Progress.Root value={null}>
        <Progress.Label>Connecting</Progress.Label>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </Frame>
  );
}
