import { Checkbox, VStack } from "@flowstack-ui/brick";
export function CheckboxDensity() {
  return (
    <VStack gap="3" align="start">
      <Checkbox defaultChecked>Comfortable target</Checkbox>
      <Checkbox density="compact" defaultChecked>
        Compact target
      </Checkbox>
    </VStack>
  );
}
