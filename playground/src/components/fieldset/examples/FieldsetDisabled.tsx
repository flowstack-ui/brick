import {
  Field,
  Fieldset,
  Frame,
  Input,
  NativeSelect,
  Textarea,
} from "@flowstack-ui/brick";
export function FieldsetDisabled() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <Fieldset.Root disabled size="lg">
        <Fieldset.Legend>Shipping details</Fieldset.Legend>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Street address</Field.Label>
            <Input defaultValue="20 Main Street" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Country</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field defaultValue="uk">
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Delivery notes</Field.Label>
            <Textarea.Root />
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </Frame>
  );
}
