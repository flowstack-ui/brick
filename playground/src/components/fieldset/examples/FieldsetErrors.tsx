import { Field, Fieldset, Frame, Input } from "@flowstack-ui/brick";
export function FieldsetErrors() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <Fieldset.Root invalid>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input defaultValue="Alex Morgan" />
          </Field.Root>
          <Field.Root invalid>
            <Field.Label>Email</Field.Label>
            <Input defaultValue="alex@" />
            <Field.Error>Enter a complete email address.</Field.Error>
          </Field.Root>
        </Fieldset.Content>
        <Fieldset.Error>Review your contact details.</Fieldset.Error>
      </Fieldset.Root>
    </Frame>
  );
}
