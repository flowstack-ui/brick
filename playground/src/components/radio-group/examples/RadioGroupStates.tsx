import { RadioGroup, HStack } from "@flowstack-ui/brick";

export function RadioGroupStates() {
  return (
    <HStack gap="8" wrap="wrap">
      <RadioGroup.Root aria-label="Disabled" disabled defaultValue="email">
        <RadioGroup.Label>Disabled</RadioGroup.Label>
        <RadioGroup.Item value="email">Email</RadioGroup.Item>
        <RadioGroup.Item value="sms">Text message</RadioGroup.Item>
      </RadioGroup.Root>
      <RadioGroup.Root aria-label="Read-only" readOnly defaultValue="email">
        <RadioGroup.Label>Read-only</RadioGroup.Label>
        <RadioGroup.Item value="email">Email</RadioGroup.Item>
        <RadioGroup.Item value="sms">Text message</RadioGroup.Item>
      </RadioGroup.Root>
      <RadioGroup.Root aria-label="Unavailable option" defaultValue="email">
        <RadioGroup.Label>Disabled option</RadioGroup.Label>
        <RadioGroup.Item value="email">Email</RadioGroup.Item>
        <RadioGroup.Item value="sms" disabled>
          Text message unavailable
        </RadioGroup.Item>
      </RadioGroup.Root>
    </HStack>
  );
}
