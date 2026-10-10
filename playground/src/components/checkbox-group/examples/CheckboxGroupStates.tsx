import { CheckboxGroup } from "@flowstack-ui/brick";
export function CheckboxGroupStates() {
  return (
    <CheckboxGroup.Root
      aria-label="Permissions"
      defaultValue={["view", "billing"]}
    >
      <CheckboxGroup.Item value="view" readOnly>
        View access (read-only)
      </CheckboxGroup.Item>
      <CheckboxGroup.Item value="billing" disabled>
        Billing access (disabled)
      </CheckboxGroup.Item>
      <CheckboxGroup.Item value="edit">
        <CheckboxGroup.ItemLabel>Edit access</CheckboxGroup.ItemLabel>
        <CheckboxGroup.ItemDescription>
          Request permission to edit projects.
        </CheckboxGroup.ItemDescription>
      </CheckboxGroup.Item>
    </CheckboxGroup.Root>
  );
}
