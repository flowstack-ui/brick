import { Field, Frame, Input } from "@flowstack-ui/brick";
export function InputBasic() {
  return (
    <Frame maxInlineSize="24rem">
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
      </Field.Root>
    </Frame>
  );
}
