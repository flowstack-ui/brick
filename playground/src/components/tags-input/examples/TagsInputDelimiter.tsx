import { Frame, TagsInput } from "@flowstack-ui/brick";
export function TagsInputDelimiter() {
  return (
    <Frame maxInlineSize="28rem">
      <TagsInput.Root
        defaultValue={["React", "TypeScript"]}
        delimiter={/[,;]/}
        addOnPaste
      >
        <TagsInput.Label>Comma or semicolon</TagsInput.Label>
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
