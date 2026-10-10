import { Timeline, VStack } from "@flowstack-ui/brick";
export function TimelineDefaults() {
  return (
    <Timeline.PropsProvider
      value={{ size: "lg", variant: "subtle", tone: "accent" }}
    >
      <VStack gap={6}>
        <Timeline.Root>
          <Timeline.Item>
            <Timeline.Connector>
              <Timeline.Indicator>1</Timeline.Indicator>
            </Timeline.Connector>
            <Timeline.Content>
              <Timeline.Title>Shared presentation</Timeline.Title>
              <Timeline.Description>
                This timeline inherits the provider recipe.
              </Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline.Root>
        <Timeline.Root variant="outline">
          <Timeline.Item>
            <Timeline.Connector>
              <Timeline.Indicator>2</Timeline.Indicator>
            </Timeline.Connector>
            <Timeline.Content>
              <Timeline.Title>Local override</Timeline.Title>
              <Timeline.Description>
                Explicit props override provider defaults.
              </Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline.Root>
      </VStack>
    </Timeline.PropsProvider>
  );
}
