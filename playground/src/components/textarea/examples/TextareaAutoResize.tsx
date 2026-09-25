import { Field, Frame, Grid, Textarea } from "@flowstack-ui/brick";

export function TextareaAutoResize() {
  return (
    <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
      <Frame maxInlineSize="24rem">
        <Field.Root>
          <Field.Label>Growing notes</Field.Label>
          <Textarea.Root
            autoResize
            minRows={2}
            placeholder="Add lines to grow"
          />
        </Field.Root>
      </Frame>
      <Frame maxInlineSize="24rem">
        <Field.Root>
          <Field.Label>Bounded notes</Field.Label>
          <Textarea.Root
            autoResize
            minRows={2}
            maxRows={5}
            defaultValue={"One\nTwo\nThree\nFour\nFive\nSix"}
          />
        </Field.Root>
      </Frame>
    </Grid.Root>
  );
}
