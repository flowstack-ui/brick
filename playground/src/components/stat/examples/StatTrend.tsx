import { Stat, Badge, HStack } from "@flowstack-ui/brick";

export function StatTrend() {
  return (
    <Stat.Root>
      <Stat.Label>Revenue</Stat.Label>
      <Stat.ValueText>$8,456.40</Stat.ValueText>
      <Stat.HelpText>
        <HStack gap="2" wrap>
          <Badge tone="success" size="sm">
            <Stat.UpIndicator />
            12%
          </Badge>
          <span>more than last month</span>
        </HStack>
      </Stat.HelpText>
    </Stat.Root>
  );
}
