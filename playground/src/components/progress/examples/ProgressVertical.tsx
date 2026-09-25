import { Progress } from "@flowstack-ui/brick";

export function ProgressVertical() {
  return (
    <Progress.Root value={60} orientation="vertical">
      <Progress.Label>Uploading</Progress.Label>
      <Progress.Value />
      <Progress.Track>
        <Progress.Indicator />
      </Progress.Track>
    </Progress.Root>
  );
}
