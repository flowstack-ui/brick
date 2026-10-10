import { Frame, TagsInput } from "@flowstack-ui/brick";
export function TagsInputBasic() {
  return (
    <Frame maxInlineSize="28rem">
      <TagsInput.Root defaultValue={["React", "TypeScript"]}>
        <TagsInput.Label>Topics</TagsInput.Label>
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
