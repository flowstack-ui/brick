import { Frame, TagsInput } from "@flowstack-ui/brick";
export function TagsInputSanitize() {
  return (
    <Frame maxInlineSize="28rem">
      <TagsInput.Root
        defaultValue={["react", "typescript"]}
        sanitizeValue={(value) => value.trim().toLowerCase()}
      >
        <TagsInput.Label>Lowercase topics</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add a topic…" />
          <TagsInput.ClearTrigger />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput.Root>
    </Frame>
  );
}
