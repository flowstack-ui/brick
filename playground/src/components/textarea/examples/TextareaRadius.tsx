import { Field, Grid, Textarea } from "@flowstack-ui/brick";

export function TextareaRadius() {
  return (
    <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
      <Field.Root>
        <Field.Label>Radius none</Field.Label>
        <Textarea.Root radius="none" placeholder="Add project notes" />
      </Field.Root>
      <Field.Root>
        <Field.Label>Radius lg</Field.Label>
        <Textarea.Root radius="lg" placeholder="Add project notes" />
      </Field.Root>
    </Grid.Root>
  );
}
