import {
  For,
  Frame,
  HStack,
  ScrollArea,
  Stack,
  Surface,
  Text,
} from "@flowstack-ui/brick";

export function ScrollAreaHorizontal() {
  return (
    <Frame blockSize="10rem" asChild>
      <ScrollArea.Root
        orientation="horizontal"
        scrollbar="custom"
        scrollbarVisibility="always"
      >
        <ScrollArea.Viewport focusable aria-label="Project collection">
          <ScrollArea.Content>
            <HStack gap="4">
              <For
                each={[
                  "Research",
                  "Design",
                  "Development",
                  "Review",
                  "Delivery",
                ]}
              >
                {(name) => (
                  <Stack.Item key={name} shrink={0} asChild>
                    <Frame inlineSize="12rem" blockSize="8rem" asChild>
                      <Surface level="subtle" inset="md">
                        <Text>{name}</Text>
                      </Surface>
                    </Frame>
                  </Stack.Item>
                )}
              </For>
            </HStack>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="horizontal" />
      </ScrollArea.Root>
    </Frame>
  );
}
