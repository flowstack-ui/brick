import { RadioGroup } from "@flowstack-ui/brick";

export function RadioGroupBasic() {
  return (
    <RadioGroup.Root aria-label="Notifications" defaultValue="email">
      <RadioGroup.Item value="email">Email</RadioGroup.Item>
      <RadioGroup.Item value="sms">Text message</RadioGroup.Item>
    </RadioGroup.Root>
  );
}
