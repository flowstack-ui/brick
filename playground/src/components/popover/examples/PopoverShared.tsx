import { Button, For, HStack, Popover } from "@flowstack-ui/brick";
export function PopoverShared() {
  return (
    <Popover.Root>
      <HStack gap="3">
        <For each={["Profile", "Settings", "Help"]}>
          {(value) => (
            <Popover.Trigger key={value} value={value} asChild>
              <Button variant="outline">{value}</Button>
            </Popover.Trigger>
          )}
        </For>
      </HStack>
      <Popover.Portal>
        <Popover.Content inset="md">
          <Popover.Body>
            <Popover.State>
              {(state) => <Popover.Title>{state.triggerValue}</Popover.Title>}
            </Popover.State>
          </Popover.Body>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
