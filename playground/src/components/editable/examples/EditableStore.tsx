import { Button, Editable, VStack, useEditable } from "@flowstack-ui/brick";
export function EditableStore() {
  const editable = useEditable({
    defaultValue: "Project notes",
    activationMode: "none",
  });
  return (
    <VStack gap="4">
      <Editable.RootProvider value={editable}>
        <Editable.Preview />
        <Editable.Input aria-label="Shared title" />
      </Editable.RootProvider>
      <Button
        size="sm"
        variant="outline"
        tone="neutral"
        onClick={() => editable.edit()}
      >
        Edit programmatically
      </Button>
    </VStack>
  );
}
