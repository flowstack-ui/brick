import { Frame, Progress } from "@flowstack-ui/brick";

export function ProgressBasic() {
  return (
    <Frame maxInlineSize="20rem">
      <Progress.Root value={60}>
        <Progress.Label>Upload files</Progress.Label>
        <Progress.Value />
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </Frame>
  );
}
