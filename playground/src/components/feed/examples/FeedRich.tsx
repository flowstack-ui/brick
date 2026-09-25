import { useId, useState } from "react";
import { Feed, Button, HStack, Text, VStack } from "@flowstack-ui/brick";
export function FeedRich() {
  const id = useId();
  const [liked, setLiked] = useState(false);
  return (
    <Feed.Root aria-label="Team updates" setSize={1} variant="outline">
      <Feed.Item index={0} aria-labelledby={id}>
        <VStack gap={3}>
          <HStack gap={3} wrap>
            <Text as="h3" id={id} variant="title-sm">
              Morgan shared a proposal
            </Text>
            <Text variant="caption" tone="secondary">
              <time dateTime="2026-09-19">September 19</time>
            </Text>
          </HStack>
          <Text variant="body-sm">
            A simpler account setup with fewer required fields.
          </Text>
          <HStack gap={2}>
            <Button
              size="sm"
              variant="outline"
              aria-pressed={liked}
              onClick={() => setLiked(!liked)}
            >
              {liked ? "Liked" : "Like"}
            </Button>
          </HStack>
        </VStack>
      </Feed.Item>
    </Feed.Root>
  );
}
