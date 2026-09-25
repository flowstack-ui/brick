import { Stat } from "@flowstack-ui/brick";

export function StatMeaning() {
  return (
    <Stat.Group>
      <Stat.Root>
        <Stat.Label>Cost per request</Stat.Label>
        <Stat.ValueText>$0.02</Stat.ValueText>
        <Stat.HelpText>
          <Stat.DownIndicator tone="success" />
          8% lower than last month
        </Stat.HelpText>
      </Stat.Root>
      <Stat.Root>
        <Stat.Label>Requests</Stat.Label>
        <Stat.ValueText>12,450</Stat.ValueText>
        <Stat.HelpText>
          <Stat.UpIndicator tone="neutral" />
          2% more requests
        </Stat.HelpText>
      </Stat.Root>
    </Stat.Group>
  );
}
