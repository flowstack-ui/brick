import {
  VStack,
  Stack,
  Text,
  Paragraph,
  Frame,
  For,
  ScrollArea,
} from "@flowstack-ui/brick";

export function StackScrolling() {
  return (
    <Frame blockSize="16rem" asChild>
      <VStack gap={3}>
        <Text>Activity</Text>
        <Stack.Item asChild flex={1}>
          <Frame minBlockSize={0} asChild>
            <ScrollArea.Root>
              <ScrollArea.Viewport
                tabIndex={0}
                role="region"
                aria-label="Activity entries"
              >
                <VStack gap={3}>
                  <For
                    each={Array.from({ length: 12 }, (_, index) => index + 1)}
                  >
                    {(n) => <Paragraph key={n}>Activity entry {n}</Paragraph>}
                  </For>
                </VStack>
              </ScrollArea.Viewport>
            </ScrollArea.Root>
          </Frame>
        </Stack.Item>
      </VStack>
    </Frame>
  );
}
