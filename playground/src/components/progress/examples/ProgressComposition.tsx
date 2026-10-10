import { Frame, Progress } from "@flowstack-ui/brick";

export function ProgressComposition() {
  return (
    <Frame maxInlineSize="20rem">
      <Progress.Root value={60} asChild>
        <section>
          <Progress.Label asChild>
            <span>Build artifacts</span>
          </Progress.Label>
          <Progress.Value asChild>
            {({ formattedValue }) => <span>{formattedValue}</span>}
          </Progress.Value>
          <Progress.Track asChild>
            <div>
              <Progress.Indicator />
            </div>
          </Progress.Track>
        </section>
      </Progress.Root>
    </Frame>
  );
}
