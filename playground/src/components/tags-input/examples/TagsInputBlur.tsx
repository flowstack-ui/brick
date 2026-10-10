import { Frame, VStack, TagsInput } from "@flowstack-ui/brick";
export function TagsInputBlur() {
  return (
    <Frame maxInlineSize="28rem">
      <VStack gap="5">
        <TagsInput.Root
          defaultValue={["React", "TypeScript"]}
          blurBehavior="add"
        >
          <TagsInput.Label>Add on blur</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add a topic…" />
            <TagsInput.ClearTrigger />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput.Root>
        <TagsInput.Root
          defaultValue={["React", "TypeScript"]}
          blurBehavior="clear"
        >
          <TagsInput.Label>Clear draft on blur</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add a topic…" />
            <TagsInput.ClearTrigger />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput.Root>
      </VStack>
    </Frame>
  );
}
