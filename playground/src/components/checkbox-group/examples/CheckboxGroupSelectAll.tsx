import { CheckboxGroup } from "@flowstack-ui/brick";
export function CheckboxGroupSelectAll() {
  return (
    <CheckboxGroup.Root
      aria-label="Notification channels"
      allValues={["email", "push", "sms"]}
      defaultValue={["email"]}
    >
      <CheckboxGroup.Parent>All channels</CheckboxGroup.Parent>
      <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
      <CheckboxGroup.Item value="push">Push notifications</CheckboxGroup.Item>
      <CheckboxGroup.Item value="sms">SMS</CheckboxGroup.Item>
    </CheckboxGroup.Root>
  );
}
