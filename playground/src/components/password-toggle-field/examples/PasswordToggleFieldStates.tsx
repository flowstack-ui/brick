import { Field, Grid, PasswordToggleField } from "@flowstack-ui/brick";

function Control() {
  return (
    <>
      <PasswordToggleField.Input autoComplete="current-password" />
      <PasswordToggleField.Toggle />
    </>
  );
}

export function PasswordToggleFieldStates() {
  return (
    <Grid.Root align="start" columns={{ initial: 1, md: 2 }} gap={6}>
      <Field.Root disabled>
        <Field.Label>Disabled password</Field.Label>
        <PasswordToggleField.Root>
          <Control />
        </PasswordToggleField.Root>
      </Field.Root>
      <Field.Root readOnly>
        <Field.Label>Read-only password</Field.Label>
        <PasswordToggleField.Root>
          <Control />
        </PasswordToggleField.Root>
        <Field.Description>Reveal remains available.</Field.Description>
      </Field.Root>
      <Field.Root invalid required>
        <Field.Label>Required password</Field.Label>
        <PasswordToggleField.Root>
          <Control />
        </PasswordToggleField.Root>
        <Field.Error>Enter a password.</Field.Error>
      </Field.Root>
    </Grid.Root>
  );
}
