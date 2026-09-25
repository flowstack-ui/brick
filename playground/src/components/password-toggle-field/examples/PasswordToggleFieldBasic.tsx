import { Field, Frame, PasswordToggleField } from "@flowstack-ui/brick";

export function PasswordToggleFieldBasic() {
  return (
    <Frame maxInlineSize="24rem">
      <Field.Root>
        <Field.Label>Password</Field.Label>
        <PasswordToggleField.Root>
          <PasswordToggleField.Input
            autoComplete="current-password"
            name="password"
          />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
      </Field.Root>
    </Frame>
  );
}
