import { Timeline } from "@flowstack-ui/brick";
export function TimelineResponsive() {
  return (
    <Timeline.Root
      size={{ initial: "sm", md: "xl" }}
      variant={{ initial: "outline", md: "solid" }}
    >
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator>1</Timeline.Indicator>
          <Timeline.Separator />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Project created</Timeline.Title>
          <Timeline.Description>
            Resize the viewport to change marker size and surface.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator>2</Timeline.Indicator>
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Team invited</Timeline.Title>
          <Timeline.Description>
            Everyone is ready to begin.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  );
}
