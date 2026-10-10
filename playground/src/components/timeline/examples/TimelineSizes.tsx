import { For, Grid, Text, Timeline, VStack } from "@flowstack-ui/brick";
export function TimelineSizes() {
  return (
    <Grid.Root columns={{ initial: 1, md: 2 }} gap={8}>
      <For each={["sm", "md", "lg", "xl"] as const}>
        {(size) => (
          <VStack key={size} gap={4}>
            <Text>{size}</Text>
            <Timeline.Root size={size}>
              <Timeline.Item>
                <Timeline.Connector>
                  <Timeline.Indicator>1</Timeline.Indicator>
                  <Timeline.Separator />
                </Timeline.Connector>
                <Timeline.Content>
                  <Timeline.Title>Order placed</Timeline.Title>
                  <Timeline.Description>
                    Payment confirmed.
                  </Timeline.Description>
                </Timeline.Content>
              </Timeline.Item>
              <Timeline.Item>
                <Timeline.Connector>
                  <Timeline.Indicator>2</Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                  <Timeline.Title>Ready to ship</Timeline.Title>
                  <Timeline.Description>
                    Collected by the carrier.
                  </Timeline.Description>
                </Timeline.Content>
              </Timeline.Item>
            </Timeline.Root>
          </VStack>
        )}
      </For>
    </Grid.Root>
  );
}
