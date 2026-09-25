import {
  Field,
  Grid,
  Textarea,
  type TextareaVariant,
} from "@flowstack-ui/brick";

const variants: TextareaVariant[] = [
  "outline",
  "surface",
  "soft",
  "subtle",
  "ghost",
  "plain",
  "underline",
];
export function TextareaVariants() {
  return (
    <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
      {variants.map((variant) => (
        <Field.Root key={variant}>
          <Field.Label>{variant}</Field.Label>
          <Textarea.Root
            defaultValue="Describe the intended result."
            rows={3}
            variant={variant}
          />
        </Field.Root>
      ))}
    </Grid.Root>
  );
}
