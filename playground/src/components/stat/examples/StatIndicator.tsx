import { Stat } from "@flowstack-ui/brick";

export function StatIndicator() {
  return (
    <Stat.Root>
      <Stat.Label>Unique visitors</Stat.Label>
      <Stat.ValueText>192.1k</Stat.ValueText>
      <Stat.HelpText>
        <Stat.UpIndicator />
        1.9% more than last month
      </Stat.HelpText>
    </Stat.Root>
  );
}
