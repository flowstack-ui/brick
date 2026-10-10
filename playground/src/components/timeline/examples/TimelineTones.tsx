import { Check, TriangleAlert } from "lucide-react";
import { Icon, Timeline } from "@flowstack-ui/brick";
export function TimelineTones() {
  return (
    <Timeline.Root>
      <Timeline.Item tone="success">
        <Timeline.Connector>
          <Timeline.Indicator>
            <Icon>
              <Check />
            </Icon>
          </Timeline.Indicator>
          <Timeline.Separator />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Payment received</Timeline.Title>
          <Timeline.Description>Your order is confirmed.</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item tone="warning">
        <Timeline.Connector>
          <Timeline.Indicator>
            <Icon>
              <TriangleAlert />
            </Icon>
          </Timeline.Indicator>
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Delivery delayed</Timeline.Title>
          <Timeline.Description>
            The carrier will update your arrival estimate.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  );
}
