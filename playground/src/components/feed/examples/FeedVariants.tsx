import { Feed, Text, VStack } from "@flowstack-ui/brick";
export function FeedVariants() {
  return (
    <VStack gap={6}>
      {["plain", "divided", "outline"].map((variant) => (
        <VStack gap={2} key={variant}>
          <Text variant="body-sm">{variant}</Text>
          <Feed.Root
            aria-label={variant + " activity"}
            variant={variant as "plain" | "divided" | "outline"}
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
