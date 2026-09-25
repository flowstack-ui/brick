import { Timeline } from "@flowstack-ui/brick";
export function TimelineUnstyled() {
  return (
    <Timeline.Root unstyled aria-label="Plain project history">
      <Timeline.Item>
        <Timeline.Content>
          <Timeline.Title asChild>
            <h3>Project approved</h3>
          </Timeline.Title>
          <Timeline.Description>
            Native list structure without Timeline recipes.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  );
}
