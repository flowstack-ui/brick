import { Frame, Progress } from "@flowstack-ui/brick";

export function ProgressResponsive() {
  return (
    <Frame maxInlineSize="20rem">
      <Progress.Root
        value={60}
        size={{ initial: "sm", md: "lg" }}
        variant={{ initial: "outline", md: "subtle" }}
      >
        <Progress.Label>Upload files</Progress.Label>
        <Progress.Value />
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </Frame>
  );
}
