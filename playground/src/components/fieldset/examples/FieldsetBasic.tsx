import { Field, Fieldset, Frame, Input } from "@flowstack-ui/brick";
export function FieldsetBasic() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <Fieldset.Root size="lg">
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.Description>How can we reach you?</Fieldset.Description>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input autoComplete="name" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input type="email" autoComplete="email" />
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </Frame>
  );
}
