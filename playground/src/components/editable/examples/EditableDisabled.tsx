import { Editable, VStack } from "@flowstack-ui/brick";
export function EditableDisabled() {
  return (
    <VStack gap="4">
      <Editable.Root disabled defaultValue="Disabled">
        <Editable.Preview />
        <Editable.Input aria-label="Disabled title" />
      </Editable.Root>
      <Editable.Root readOnly defaultValue="Read only">
        <Editable.Preview />
        <Editable.Input aria-label="Read-only title" />
      </Editable.Root>
    </VStack>
  );
}
