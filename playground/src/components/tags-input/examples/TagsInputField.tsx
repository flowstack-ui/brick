import { Frame, Field, TagsInput } from "@flowstack-ui/brick";
export function TagsInputField() {
  return (
    <Frame maxInlineSize="28rem">
      <Field.Root required>
        <Field.Label>Skills</Field.Label>
        <TagsInput.Root name="skills">
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add a skill…" />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput.Root>
        <Field.Description>
          Add the skills used in this project.
        </Field.Description>
        <Field.Error>Add at least one skill.</Field.Error>
      </Field.Root>
    </Frame>
  );
}
