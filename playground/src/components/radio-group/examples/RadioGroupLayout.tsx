import { RadioGroup } from "@flowstack-ui/brick";

export function RadioGroupLayout() {
  return (
    <RadioGroup.Root
      aria-label="Notification channel"
      orientation="horizontal"
      gap="6"
      defaultValue="email"
    >
      <RadioGroup.Item value="email">Email</RadioGroup.Item>
      <RadioGroup.Item value="sms">Text message</RadioGroup.Item>
      <RadioGroup.Item value="push">Push notification</RadioGroup.Item>
    </RadioGroup.Root>
  );
}
