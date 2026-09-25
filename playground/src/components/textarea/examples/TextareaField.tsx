import { Field, Frame, Textarea } from "@flowstack-ui/brick";

export function TextareaField() {
  return (
    <Frame maxInlineSize="32rem">
      <Field.Root required>
        <Field.Label>Comment</Field.Label>
        <Textarea.Root name="comment" maxLength={500} />
        <Field.Description>Use up to 500 characters.</Field.Description>
      </Field.Root>
    </Frame>
  );
}
