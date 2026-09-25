import {
  Button,
  DropdownMenu,
  For,
  HStack,
  Paragraph,
  VStack,
} from "@flowstack-ui/brick";
export function DropdownMenuMultiple() {
  return (
    <DropdownMenu.Root>
      <VStack gap="4">
        <HStack gap="4">
          <For each={["Draft", "Published"]}>
            {(value) => (
              <DropdownMenu.Trigger key={value} value={value} asChild>
                <Button variant="outline" tone="neutral">
                  {value}
                </Button>
              </DropdownMenu.Trigger>
            )}
          </For>
        </HStack>
        <DropdownMenu.Context>
          {({ triggerValue }) => (
            <Paragraph tone="secondary">
              Last target: {triggerValue ?? "none"}
            </Paragraph>
          )}
        </DropdownMenu.Context>
      </VStack>
      <DropdownMenu.Content>
        <DropdownMenu.Item value="open">Open record</DropdownMenu.Item>
        <DropdownMenu.Item value="archive">Archive record</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
