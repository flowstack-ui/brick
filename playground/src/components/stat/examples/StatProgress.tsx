import {
  Stat,
  Frame,
  FormatNumber,
  Progress,
  VStack,
} from "@flowstack-ui/brick";

export function StatProgress() {
  return (
    <Frame inlineSize="100%" maxInlineSize="20rem">
      <Stat.Root>
        <Stat.Label>This week</Stat.Label>
        <Stat.ValueText>
          <FormatNumber
            value={1340}
            formatOptions={{
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }}
          />
        </Stat.ValueText>
        <Stat.HelpText>
          <VStack gap="3">
            <Progress.Root value={75} aria-label="Weekly revenue target">
              <Progress.Track>
                <Progress.Indicator />
              </Progress.Track>
            </Progress.Root>
            <span>12% more than last week</span>
          </VStack>
        </Stat.HelpText>
      </Stat.Root>
    </Frame>
  );
}
