import { Field, Frame, Input } from "@flowstack-ui/brick";
export function FieldHelper() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <Field.Root>
        <Field.Label>Username</Field.Label>
        <Input placeholder="your-name" />
        <Field.Description>This is your public profile name.</Field.Description>
      </Field.Root>
    </Frame>
  );
}
