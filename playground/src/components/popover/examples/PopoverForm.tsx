import { Button, Field, Input, Popover, VStack } from "@flowstack-ui/brick";
export function PopoverForm() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Edit dimensions
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content inset="md">
          <Popover.Header>
            <Popover.Title>Dimensions</Popover.Title>
          </Popover.Header>
          <Popover.Body>
            <VStack gap="4">
              <Field.Root>
                <Field.Label>Width</Field.Label>
                <Input defaultValue="40px" />
              </Field.Root>
              <Field.Root>
                <Field.Label>Height</Field.Label>
                <Input defaultValue="32px" />
              </Field.Root>
              <Field.Root>
                <Field.Label>Comments</Field.Label>
                <Input />
              </Field.Root>
            </VStack>
          </Popover.Body>
          <Popover.Footer>
            <Popover.Close asChild>
              <Button>Apply</Button>
            </Popover.Close>
          </Popover.Footer>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
