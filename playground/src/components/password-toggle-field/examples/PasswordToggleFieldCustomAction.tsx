import {
  Field,
  Grid,
  IconButton,
  PasswordToggleField,
} from "@flowstack-ui/brick";

const visible = <span aria-hidden="true">◉</span>;
const hidden = <span aria-hidden="true">◎</span>;

export function PasswordToggleFieldCustomAction() {
  return (
    <Grid.Root columns={{ initial: 1, md: 2 }} gap={6}>
      <Field.Root>
        <Field.Label>Custom artwork</Field.Label>
        <PasswordToggleField.Root>
          <PasswordToggleField.Input autoComplete="current-password" />
          <PasswordToggleField.Toggle>
            <PasswordToggleField.Icon hidden={hidden} visible={visible} />
          </PasswordToggleField.Toggle>
        </PasswordToggleField.Root>
      </Field.Root>
      <Field.Root>
        <Field.Label>Custom action recipe</Field.Label>
        <PasswordToggleField.Root>
          <PasswordToggleField.Input autoComplete="current-password" />
          <PasswordToggleField.Toggle asChild>
            <IconButton size="md" tone="accent" variant="soft">
              <PasswordToggleField.Icon />
            </IconButton>
          </PasswordToggleField.Toggle>
        </PasswordToggleField.Root>
      </Field.Root>
    </Grid.Root>
  );
}
