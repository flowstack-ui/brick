import { Checkbox, VStack } from "@flowstack-ui/brick";
export function CheckboxPlacement() {
  return (
    <VStack gap="4" align="start">
      <Checkbox labelPlacement="start">Label before control</Checkbox>
      <Checkbox.Root labelPlacement="start">
        <Checkbox.Control />
        <Checkbox.Label>Linked notifications</Checkbox.Label>
        <Checkbox.Description>
          Descriptions stay beneath the label.
        </Checkbox.Description>
      </Checkbox.Root>
    </VStack>
  );
}
