import { Button, For, HStack, Popover, Text } from "@flowstack-ui/brick";
export function PopoverPlacement() {
  return (
    <HStack gap="3" wrap="wrap">
      <For each={["top", "right", "bottom", "left"] as const}>
        {(value) => (
          <Popover.Root key={value}>
            <Popover.Trigger asChild>
              <Button variant="outline">{value}</Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content side={value}>
                <Popover.Header>
                  <Popover.Title>{value}</Popover.Title>
                </Popover.Header>
                <Popover.Body>
                  <Text>
                    Change compact settings without leaving this page.
                  </Text>
                </Popover.Body>
                <Popover.Arrow />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )}
      </For>
    </HStack>
  );
}
