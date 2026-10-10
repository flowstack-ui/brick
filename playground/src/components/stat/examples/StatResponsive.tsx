import { Stat } from "@flowstack-ui/brick";

export function StatResponsive() {
  return (
    <Stat.Group size={{ initial: "sm", md: "lg" }}>
      <Stat.Root>
        <Stat.Label>Total visitors</Stat.Label>
        <Stat.ValueText>192.1k</Stat.ValueText>
      </Stat.Root>
      <Stat.Root size={{ lg: "sm" }}>
        <Stat.Label>Returning visitors</Stat.Label>
        <Stat.ValueText>42.8k</Stat.ValueText>
        <Stat.HelpText>md until lg, then sm</Stat.HelpText>
      </Stat.Root>
    </Stat.Group>
  );
}
