import { Field, Frame, Input, VStack } from "@flowstack-ui/brick";
export function FieldStates() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <VStack gap={5}>
        <Field.Root required>
          <Field.Label>Full name</Field.Label>
          <Input />
        </Field.Root>
        <Field.Root>
          <Field.Label optionalIndicator="(optional)">Company</Field.Label>
          <Input />
        </Field.Root>
        <Field.Root disabled>
          <Field.Label>Organization</Field.Label>
          <Input defaultValue="Acme" />
        </Field.Root>
        <Field.Root readOnly>
          <Field.Label>Account ID</Field.Label>
          <Input defaultValue="AC-2048" />
        </Field.Root>
      </VStack>
    </Frame>
  );
}
