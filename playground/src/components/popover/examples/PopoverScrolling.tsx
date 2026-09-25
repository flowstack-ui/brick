import { Button, For, Popover, Text, VStack } from "@flowstack-ui/brick";
export function PopoverScrolling() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline">Long content</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content inset="md">
          <Popover.Header>
            <Popover.Title>Project activity</Popover.Title>
          </Popover.Header>
          <Popover.Body>
            <VStack gap="4">
              <For each={Array.from({ length: 20 }, (_, index) => index + 1)}>
                {(number) => (
                  <Text key={number}>
                    Activity {number}: the team updated the project.
                  </Text>
                )}
              </For>
            </VStack>
          </Popover.Body>
          <Popover.Footer>
            <Popover.Close asChild>
              <Button>Done</Button>
            </Popover.Close>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
