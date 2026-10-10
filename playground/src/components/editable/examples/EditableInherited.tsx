import { Editable, Text } from "@flowstack-ui/brick";
export function EditableInherited() {
  return (
    <Text as="div" variant="title-md" weight="medium" tone="secondary">
      <Editable.Root textStyle="inherit" defaultValue="Inherited typography">
        <Editable.Preview />
        <Editable.Input aria-label="Inherited title" />
      </Editable.Root>
    </Text>
  );
}
