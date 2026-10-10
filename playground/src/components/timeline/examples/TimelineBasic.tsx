import { For, Icon, Timeline } from "@flowstack-ui/brick";
import { Check, Package, Truck } from "lucide-react";

export function TimelineBasic() {
  const events = [
    {
      title: "Order placed",
      description: "We received your order and payment.",
      Icon: Package,
    },
    {
      title: "On the way",
      description: "Your parcel is with the carrier.",
      Icon: Truck,
    },
    {
      title: "Delivered",
      description: "Your parcel arrived safely.",
      Icon: Check,
    },
  ];
  return (
    <Timeline.Root>
      <For each={events}>
        {(event) => (
          <Timeline.Item key={event.title}>
            <Timeline.Connector>
              <Timeline.Indicator>
                <Icon>
                  <event.Icon />
                </Icon>
              </Timeline.Indicator>
              <Timeline.Separator />
            </Timeline.Connector>
            <Timeline.Content>
              <Timeline.Title>{event.title}</Timeline.Title>
              <Timeline.Description>{event.description}</Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>
        )}
      </For>
    </Timeline.Root>
  );
}
