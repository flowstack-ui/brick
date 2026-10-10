import { Field, Frame, PasswordToggleField } from "@flowstack-ui/brick";

export function PasswordToggleFieldDefaultVisible() {
  return (
    <Frame maxInlineSize="24rem">
      <Field.Root>
        <Field.Label>Temporary access phrase</Field.Label>
        <PasswordToggleField.Root defaultVisible>
          <PasswordToggleField.Input autoComplete="new-password" />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
        <Field.Description>
          Reveal by default only when the surrounding privacy context allows it.
        </Field.Description>
      </Field.Root>
    </Frame>
  );
}
