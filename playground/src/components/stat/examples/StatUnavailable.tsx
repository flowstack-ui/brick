import { Stat, Skeleton } from "@flowstack-ui/brick";

export function StatUnavailable() {
  return (
    <Stat.Group>
      <Stat.Root aria-busy="true">
        <Stat.Label>Revenue</Stat.Label>
        <Stat.ValueText>
          <Skeleton width="8rem" height="2rem" />
        </Stat.ValueText>
        <Stat.HelpText>Loading revenue</Stat.HelpText>
      </Stat.Root>
      <Stat.Root>
        <Stat.Label>Forecast</Stat.Label>
        <Stat.ValueText>Unavailable</Stat.ValueText>
        <Stat.HelpText>Not enough historical data</Stat.HelpText>
      </Stat.Root>
    </Stat.Group>
  );
}
