import { Field, Frame, Input } from "@flowstack-ui/brick";
export function FieldError() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <Field.Root invalid>
        <Field.Label>Email</Field.Label>
        <Input defaultValue="alex@" />
        <Field.Error>
          <Field.ErrorIcon />
          Enter a complete email address.
        </Field.Error>
      </Field.Root>
    </Frame>
  );
}
