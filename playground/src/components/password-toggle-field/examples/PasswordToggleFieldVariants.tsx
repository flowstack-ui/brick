import { Field, Grid, PasswordToggleField } from "@flowstack-ui/brick";

const variants = [
  "outline",
  "surface",
  "soft",
  "subtle",
  "ghost",
  "plain",
  "underline",
] as const;

export function PasswordToggleFieldVariants() {
  return (
    <Grid.Root columns={{ initial: 1, md: 2 }} gap={6}>
      {variants.map((variant) => (
        <Field.Root key={variant}>
          <Field.Label>{variant}</Field.Label>
          <PasswordToggleField.Root variant={variant}>
            <PasswordToggleField.Input autoComplete="current-password" />
            <PasswordToggleField.Toggle />
          </PasswordToggleField.Root>
        </Field.Root>
      ))}
    </Grid.Root>
  );
}
