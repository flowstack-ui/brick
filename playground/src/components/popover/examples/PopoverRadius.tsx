import {
  Button,
  Center,
  For,
  HStack,
  Popover,
  Text,
} from "@flowstack-ui/brick";
export function PopoverRadius() {
  return (
    <HStack gap="3" wrap="wrap">
      <For each={["none", "sm", "overlay", "full"] as const}>
        {(value) => (
          <Popover.Root key={value}>
            <Popover.Trigger asChild>
              <Button variant="outline">{value}</Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content radius={value} aria-label={value} inset="lg">
                <Popover.Body>
                  <Center>
                    <Text>{value}</Text>
                  </Center>
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
