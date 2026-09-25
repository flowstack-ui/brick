import { Feed, Text, VStack } from "@flowstack-ui/brick";
export function FeedDividers() {
  return (
    <VStack gap={6}>
      {["subtle", "default"].map((dividerStrength) => (
        <VStack gap={2} key={dividerStrength}>
          <Text variant="body-sm">{dividerStrength}</Text>
          <Feed.Root
            aria-label={dividerStrength + " activity"}
            dividerStrength={dividerStrength as "subtle" | "default"}
            setSize={2}
          >
            <Feed.Item index={0} aria-label="Design review">
              <Text>Design review requested</Text>
            </Feed.Item>
            <Feed.Item index={1} aria-label="New comment">
              <Text>Alex added a comment</Text>
            </Feed.Item>
          </Feed.Root>
        </VStack>
      ))}
    </VStack>
  );
}
