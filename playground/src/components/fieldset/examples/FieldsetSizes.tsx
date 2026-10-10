import { Field, Fieldset, Frame, Input, VStack } from "@flowstack-ui/brick";
export function FieldsetSizes() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <VStack gap={8}>
        {(["sm", "md", "lg"] as const).map((size) => (
          <Fieldset.Root key={size} size={size}>
            <Fieldset.Legend>{size} contact details</Fieldset.Legend>
            <Fieldset.Description>How can we reach you?</Fieldset.Description>
            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Name</Field.Label>
                <Input />
              </Field.Root>
              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input />
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>
        ))}
      </VStack>
    </Frame>
  );
}
