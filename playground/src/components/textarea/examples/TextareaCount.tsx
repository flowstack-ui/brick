import { Field, Frame, Textarea } from "@flowstack-ui/brick";

export function TextareaCount() {
  return (
    <Frame maxInlineSize="32rem">
      <Field.Root>
        <Field.Label>Release note</Field.Label>
        <Textarea.Root
          maxLength={160}
          defaultValue="Summarize the consumer-visible change."
        >
          <Textarea.Count />
        </Textarea.Root>
        <Field.Description>
          maxLength blocks additional native input; Count reports the current
          length.
        </Field.Description>
      </Field.Root>
    </Frame>
  );
}
