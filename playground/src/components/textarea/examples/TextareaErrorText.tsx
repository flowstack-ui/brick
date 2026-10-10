import { Field, Frame, Textarea } from "@flowstack-ui/brick";

export function TextareaErrorText() {
  return (
    <Frame maxInlineSize="32rem">
      <Field.Root invalid>
        <Field.Label>Review notes</Field.Label>
        <Textarea.Root defaultValue="Too short" />
        <Field.Error>Use at least twenty characters.</Field.Error>
      </Field.Root>
    </Frame>
  );
}
