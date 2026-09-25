import { Timeline } from "@flowstack-ui/brick";
export function TimelineContinuation() {
  return (
    <Timeline.Root showLastSeparator>
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator>1</Timeline.Indicator>
          <Timeline.Separator />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Order received</Timeline.Title>
          <Timeline.Description>More updates will follow.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  );
}
