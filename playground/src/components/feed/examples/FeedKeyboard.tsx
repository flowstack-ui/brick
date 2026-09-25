import {
  Feed,
  Button,
  Frame,
  ScrollArea,
  Text,
  VStack,
} from "@flowstack-ui/brick";
export function FeedKeyboard() {
  return (
    <VStack gap={4}>
      <Button variant="outline">Before activity</Button>
      <Frame blockSize="16rem">
        <ScrollArea.Root style={{ height: "100%" }}>
          <ScrollArea.Viewport style={{ height: "100%" }}>
            <Feed.Root aria-label="Keyboard activity" setSize={8}>
              {Array.from({ length: 8 }, (_, index) => (
                <Feed.Item
                  key={index}
                  index={index}
                  aria-label={"Update " + (index + 1)}
                >
                  <VStack gap={2}>
                    <Text variant="title-sm">Update {index + 1}</Text>
                    <Text variant="body-sm">Project notes and discussion.</Text>
                  </VStack>
                </Feed.Item>
              ))}
            </Feed.Root>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Frame>
      <Button variant="outline">After activity</Button>
    </VStack>
  );
}
