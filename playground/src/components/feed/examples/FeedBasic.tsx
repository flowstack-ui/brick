import { useId } from "react";
import { Feed, Text, VStack } from "@flowstack-ui/brick";
export function FeedBasic() {
  const id = useId();
  const updates = [
    {
      title: "Design review requested",
      body: "Morgan shared the updated account settings.",
    },
    {
      title: "New comment",
      body: "Alex added feedback to the onboarding flow.",
    },
  ];
  return (
    <Feed.Root aria-label="Project activity" setSize={updates.length}>
      {updates.map((update, index) => (
        <Feed.Item
          key={update.title}
          index={index}
          aria-labelledby={id + index}
        >
          <VStack gap={2}>
            <Text as="h3" id={id + index} variant="title-sm">
              {update.title}
            </Text>
            <Text tone="secondary" variant="body-sm">
              {update.body}
            </Text>
          </VStack>
        </Feed.Item>
      ))}
    </Feed.Root>
  );
}
