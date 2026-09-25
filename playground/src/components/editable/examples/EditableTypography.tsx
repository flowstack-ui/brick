import { Editable, VStack } from "@flowstack-ui/brick";
export function EditableTypography() {
  return (
    <VStack gap="6">
      <Editable.Root
        defaultValue="An editable title"
        textStyle={{ initial: "title-sm", lg: "title-lg" }}
        weight="semibold"
      >
        <Editable.Preview />
        <Editable.Input aria-label="Editable title" />
      </Editable.Root>
      <Editable.Root
        defaultValue="Supporting text"
        textStyle="body-lg"
        tone="secondary"
        weight="regular"
      >
        <Editable.Preview />
        <Editable.Input aria-label="Supporting text" />
      </Editable.Root>
    </VStack>
  );
}
