import { Stat } from "@flowstack-ui/brick";

export function StatGroup() {
  return (
    <Stat.Group size="lg" aria-label="Account metrics">
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.ValueText>$12,450</Stat.ValueText>
      </Stat.Root>
      <Stat.Root>
        <Stat.Label>Customers</Stat.Label>
        <Stat.ValueText>192</Stat.ValueText>
      </Stat.Root>
      <Stat.Root size="sm">
        <Stat.Label>Refunds</Stat.Label>
        <Stat.ValueText>$120</Stat.ValueText>
      </Stat.Root>
    </Stat.Group>
  );
}
