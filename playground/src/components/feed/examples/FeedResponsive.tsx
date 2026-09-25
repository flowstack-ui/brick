import { Feed, Text } from "@flowstack-ui/brick";
export function FeedResponsive() {
  return (
    <Feed.Root
      aria-label="Responsive activity"
      setSize={2}
      density={{ initial: "compact", md: "comfortable" }}
      variant={{ initial: "plain", md: "outline", lg: "divided" }}
      dividerStrength={{ md: "default", lg: "subtle" }}
    >
      <Feed.Item index={0} aria-label="Design review">
        <Text>Design review requested</Text>
      </Feed.Item>
      <Feed.Item index={1} aria-label="New comment">
        <Text>Alex added a comment</Text>
      </Feed.Item>
    </Feed.Root>
  );
}
