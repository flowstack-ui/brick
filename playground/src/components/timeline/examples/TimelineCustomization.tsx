import type { CSSProperties } from "react";
import { Timeline, VStack } from "@flowstack-ui/brick";
export function TimelineCustomization() {
  return (
    <VStack
      style={
        {
          "--brick-timeline-gap": "1.5rem",
          "--brick-timeline-fill": "var(--brick-color-accent-soft)",
          "--brick-timeline-ink": "var(--brick-color-accent-on-soft)",
          "--brick-timeline-border": "var(--brick-color-accent-border)",
        } as CSSProperties
      }
    >
      <Timeline.Root>
        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Indicator>1</Timeline.Indicator>
            <Timeline.Separator />
          </Timeline.Connector>
          <Timeline.Content>
            <Timeline.Title>Design review</Timeline.Title>
            <Timeline.Description>
              A paired category palette inherited from this scope.
            </Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Connector>
            <Timeline.Indicator>2</Timeline.Indicator>
          </Timeline.Connector>
          <Timeline.Content>
            <Timeline.Title>Engineering review</Timeline.Title>
            <Timeline.Description>
              Keep text readable in either appearance.
            </Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline.Root>
    </VStack>
  );
}
