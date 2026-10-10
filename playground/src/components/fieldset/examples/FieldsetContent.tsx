import { Field, Fieldset, Frame, Input, Textarea } from "@flowstack-ui/brick";
export function FieldsetContent() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <Fieldset.Root size={{ initial: "sm", md: "lg" }}>
        <Fieldset.Legend>Delivery instructions</Fieldset.Legend>
        <Fieldset.Content gap={{ initial: 3, md: 6 }}>
          <Field.Root>
            <Field.Label>Access code</Field.Label>
            <Input />
          </Field.Root>
          <Field.Root>
            <Field.Label>Notes</Field.Label>
            <Textarea.Root />
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </Frame>
  );
}
