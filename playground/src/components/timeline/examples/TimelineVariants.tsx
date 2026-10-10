import { For, Grid, Text, Timeline, VStack } from "@flowstack-ui/brick";
export function TimelineVariants() {
  return (
    <Grid.Root columns={{ initial: 1, md: 2 }} gap={8}>
      <For each={["solid", "subtle", "outline", "plain", "soft"] as const}>
        {(variant) => (
          <VStack key={variant} gap={4}>
            <Text>{variant}</Text>
            <Timeline.Root variant={variant} tone="accent">
              <Timeline.Item>
                <Timeline.Connector>
                  <Timeline.Indicator>1</Timeline.Indicator>
                  <Timeline.Separator />
                </Timeline.Connector>
                <Timeline.Content>
                  <Timeline.Title>Review requested</Timeline.Title>
                  <Timeline.Description>
                    The proposal is ready for feedback.
                  </Timeline.Description>
                </Timeline.Content>
              </Timeline.Item>
              <Timeline.Item>
                <Timeline.Connector>
                  <Timeline.Indicator>2</Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                  <Timeline.Title>Review complete</Timeline.Title>
                  <Timeline.Description>
                    Approved with no changes.
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
