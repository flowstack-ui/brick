import { Field, Frame, Input } from "@flowstack-ui/brick";
export function FieldBasic() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input type="email" placeholder="you@example.com" />
      </Field.Root>
    </Frame>
  );
}
