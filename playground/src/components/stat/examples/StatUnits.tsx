import { Stat } from "@flowstack-ui/brick";

export function StatUnits() {
  return (
    <Stat.Root>
      <Stat.Label>Time to complete</Stat.Label>
      <Stat.ValueText>
        3<Stat.ValueUnit>hr</Stat.ValueUnit>20
        <Stat.ValueUnit>min</Stat.ValueUnit>
      </Stat.ValueText>
    </Stat.Root>
  );
}
