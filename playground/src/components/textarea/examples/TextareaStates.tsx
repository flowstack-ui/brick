import { Field, Grid, Textarea } from "@flowstack-ui/brick";

export function TextareaStates() {
  return (
    <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
      <Field.Root disabled>
        <Field.Label>Archived notes</Field.Label>
        <Textarea.Root defaultValue="Editing is unavailable." />
      </Field.Root>
      <Field.Root readOnly>
        <Field.Label>Published notes</Field.Label>
        <Textarea.Root defaultValue="This value remains selectable and submitted." />
      </Field.Root>
    </Grid.Root>
  );
}
