import { Field, Frame, Input, VStack } from "@flowstack-ui/brick";
export function InputStates() {
  return (
    <Frame maxInlineSize="24rem">
      <VStack gap="5">
        <Field.Root required invalid>
          <Field.Label>Email</Field.Label>
          <Input type="email" />
          <Field.Error>Enter your email address.</Field.Error>
        </Field.Root>
        <Field.Root>
          <Field.Label>Account</Field.Label>
          <Input readOnly value="Read-only account" />
          <Field.Description>
            Contact support to change your account.
          </Field.Description>
        </Field.Root>
        <Field.Root disabled>
          <Field.Label>Invitation</Field.Label>
          <Input placeholder="Disabled" />
        </Field.Root>
      </VStack>
    </Frame>
  );
}
