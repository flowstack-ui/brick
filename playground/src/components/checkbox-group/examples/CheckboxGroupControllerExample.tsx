import {
  CheckboxGroup,
  Button,
  VStack,
  useCheckboxGroup,
} from "@flowstack-ui/brick";
export function CheckboxGroupControllerExample() {
  const group = useCheckboxGroup({ defaultValue: ["email"] });
  return (
    <VStack gap="4" align="start">
      <CheckboxGroup.RootProvider value={group} aria-label="Updates">
        <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
        <CheckboxGroup.Item value="push">Push</CheckboxGroup.Item>
      </CheckboxGroup.RootProvider>
      <Button variant="outline" onClick={() => group.setValue([])}>
        Clear selection
      </Button>
    </VStack>
  );
}
