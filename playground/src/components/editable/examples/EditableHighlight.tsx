import { Editable, VStack } from "@flowstack-ui/brick";
export function EditableHighlight() {
  return (
    <VStack gap="4">
      <Editable.Root defaultValue="Hover feedback">
        <Editable.Preview />
        <Editable.Input aria-label="Hover feedback" />
      </Editable.Root>
      <Editable.Root defaultValue="No hover background">
        <Editable.Preview highlight="none" />
        <Editable.Input aria-label="No hover background" />
      </Editable.Root>
    </VStack>
  );
}
