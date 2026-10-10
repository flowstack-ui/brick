import { For, Timeline } from "@flowstack-ui/brick";
export function TimelineDates() {
  const events = [
    {
      date: "2026-09-17",
      label: "Sep 17",
      title: "Order placed",
      description: "Payment confirmed.",
    },
    {
      date: "2026-09-18",
      label: "Sep 18",
      title: "Ready to ship",
      description: "Your parcel is with the carrier.",
    },
    {
      date: "2026-09-19",
      label: "Sep 19",
      title: "Delivered",
      description: "Your parcel arrived safely.",
    },
  ];
  return (
    <Timeline.Root layout="compact" variant="outline">
      <For each={events}>
        {(event, index) => (
          <Timeline.Item key={event.date}>
            <Timeline.Content side="before">
              <Timeline.Title asChild>
                <time dateTime={event.date}>{event.label}</time>
              </Timeline.Title>
            </Timeline.Content>
            <Timeline.Connector>
              <Timeline.Indicator>{index + 1}</Timeline.Indicator>
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
