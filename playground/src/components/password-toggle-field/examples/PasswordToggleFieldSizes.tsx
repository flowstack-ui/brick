import { Field, Grid, PasswordToggleField } from "@flowstack-ui/brick";

const sizes = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;

export function PasswordToggleFieldSizes() {
  return (
    <Grid.Root columns={{ initial: 1, md: 2 }} gap={6}>
      {sizes.map((size) => (
        <Field.Root key={size}>
          <Field.Label>{size}</Field.Label>
          <PasswordToggleField.Root size={size}>
            <PasswordToggleField.Input autoComplete="current-password" />
            <PasswordToggleField.Toggle />
          </PasswordToggleField.Root>
        </Field.Root>
      ))}
    </Grid.Root>
  );
}
