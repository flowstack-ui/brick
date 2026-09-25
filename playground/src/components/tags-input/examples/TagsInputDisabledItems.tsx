import { Frame, TagsInput } from "@flowstack-ui/brick";
export function TagsInputDisabledItems() {
  return (
    <Frame maxInlineSize="28rem">
      <TagsInput.Root defaultValue={["React", "TypeScript"]}>
        <TagsInput.Label>Project topics</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items disabled={(value) => value === "React"} />
          <TagsInput.Input placeholder="Add a topic…" />
          <TagsInput.ClearTrigger />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput.Root>
    </Frame>
  );
}
