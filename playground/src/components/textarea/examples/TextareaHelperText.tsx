import { Field, Frame, Textarea } from "@flowstack-ui/brick";

export function TextareaHelperText() {
  return (
    <Frame maxInlineSize="32rem">
      <Field.Root>
        <Field.Label>Team notes</Field.Label>
        <Textarea.Root />
        <Field.Description>
          Share context that will help the team.
        </Field.Description>
      </Field.Root>
    </Frame>
  );
}
