import type { CSSProperties } from "react";
import { Feed, Text } from "@flowstack-ui/brick";
export function FeedDefaults() {
  return (
    <div
      style={
        {
          "--brick-feed-item-padding-inline": "var(--brick-space-2)",
          "--brick-feed-divider-color": "var(--brick-color-border-default)",
        } as CSSProperties
      }
    >
      <Feed.PropsProvider value={{ density: "compact", variant: "divided" }}>
        <Feed.Root aria-label="Compact activity" setSize={2}>
          <Feed.Item index={0} aria-label="Design review">
            <Text>Design review requested</Text>
          </Feed.Item>
          <Feed.Item index={1} aria-label="New comment">
            <Text>Alex added a comment</Text>
          </Feed.Item>
        </Feed.Root>
      </Feed.PropsProvider>
    </div>
  );
}
