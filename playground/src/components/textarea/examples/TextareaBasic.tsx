import { Field, Frame, Textarea } from "@flowstack-ui/brick";

export function TextareaBasic() {
  return (
    <Frame maxInlineSize="32rem">
      <Field.Root>
        <Field.Label>Project summary</Field.Label>
        <Textarea.Root
          name="summary"
          placeholder="Describe the intended result"
        />
      </Field.Root>
    </Frame>
  );
}
