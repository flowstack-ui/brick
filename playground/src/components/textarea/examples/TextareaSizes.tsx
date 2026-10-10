import { Field, Grid, Textarea, type TextareaSize } from "@flowstack-ui/brick";

const sizes: TextareaSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
export function TextareaSizes() {
  return (
    <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
      {sizes.map((size) => (
        <Field.Root key={size}>
          <Field.Label>{size}</Field.Label>
          <Textarea.Root
            defaultValue="Describe the intended result."
            rows={3}
            size={size}
          />
        </Field.Root>
      ))}
    </Grid.Root>
  );
}
