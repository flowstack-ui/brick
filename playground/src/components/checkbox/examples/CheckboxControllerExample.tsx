import { Checkbox, Button, VStack, useCheckbox } from "@flowstack-ui/brick";
export function CheckboxControllerExample() {
  const checkbox = useCheckbox({ defaultChecked: "indeterminate" });
  return (
    <VStack gap="4" align="start">
      <Checkbox.RootProvider value={checkbox}>
        Receive project updates
      </Checkbox.RootProvider>
      <Button variant="outline" onClick={() => checkbox.setChecked(false)}>
        Clear preference
      </Button>
    </VStack>
  );
}
