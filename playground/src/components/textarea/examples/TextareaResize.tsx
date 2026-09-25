import { Field, Frame, Grid, Textarea } from "@flowstack-ui/brick";

export function TextareaResize() {
  return (
    <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
      <Frame maxInlineSize="24rem">
        <Field.Root>
          <Field.Label>Vertical resize</Field.Label>
          <Textarea.Root resize="vertical" style={{ maxBlockSize: "16rem" }}>
            <Textarea.Count aria-live="off" />
          </Textarea.Root>
          <Field.Description>
            Drag to resize, up to 16rem tall.
          </Field.Description>
        </Field.Root>
      </Frame>
      <Frame maxInlineSize="24rem">
        <Field.Root>
          <Field.Label>Both axes</Field.Label>
          <Textarea.Root
            fullWidth={false}
            resize="both"
            defaultValue="The visual boundary and Count resize together."
          >
            <Textarea.Count aria-live="off" />
          </Textarea.Root>
        </Field.Root>
      </Frame>
    </Grid.Root>
  );
}
