import { For, Timeline } from "@flowstack-ui/brick";
export function TimelineAlternating() {
  return (
    <Timeline.Root variant="subtle">
      <For
        each={["Proposal submitted", "Feedback received", "Project approved"]}
      >
        {(title, index) => (
          <Timeline.Item key={title}>
            <Timeline.Connector>
              <Timeline.Indicator>{index + 1}</Timeline.Indicator>
              <Timeline.Separator />
            </Timeline.Connector>
            <Timeline.Content side={index % 2 === 0 ? "before" : "after"}>
              <Timeline.Title>{title}</Timeline.Title>
              <Timeline.Description>
                September {17 + index}, 2026
              </Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>
        )}
      </For>
    </Timeline.Root>
  );
}
