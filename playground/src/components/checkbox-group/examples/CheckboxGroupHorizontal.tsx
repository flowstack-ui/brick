import { CheckboxGroup } from "@flowstack-ui/brick";
export function CheckboxGroupHorizontal() {
  return (
    <CheckboxGroup.Root aria-label="Days" orientation="horizontal" gap="6">
      <CheckboxGroup.Item value="monday">Monday</CheckboxGroup.Item>
      <CheckboxGroup.Item value="tuesday">Tuesday</CheckboxGroup.Item>
      <CheckboxGroup.Item value="wednesday">Wednesday</CheckboxGroup.Item>
    </CheckboxGroup.Root>
  );
}
