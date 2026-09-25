import { CheckboxGroup, Paragraph, VStack } from "@flowstack-ui/brick";
export function CheckboxGroupLimit() {
  return (
    <VStack gap="3">
      <Paragraph id="channel-limit" tone="secondary">
        Choose up to two channels.
      </Paragraph>
      <CheckboxGroup.Root
        aria-label="Preferred channels"
        aria-describedby="channel-limit"
        maxSelectedValues={2}
      >
        <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
        <CheckboxGroup.Item value="push">Push notifications</CheckboxGroup.Item>
        <CheckboxGroup.Item value="sms">SMS</CheckboxGroup.Item>
      </CheckboxGroup.Root>
    </VStack>
  );
}
