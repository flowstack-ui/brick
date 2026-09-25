import { Frame, VStack, TagsInput } from "@flowstack-ui/brick";
export function TagsInputStates() {
  return (
    <Frame maxInlineSize="28rem">
      <VStack gap="5">
        <TagsInput.Root defaultValue={["React", "TypeScript"]} disabled>
          <TagsInput.Label>Disabled</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add a topic…" />
            <TagsInput.ClearTrigger />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput.Root>
        <TagsInput.Root defaultValue={["React", "TypeScript"]} readOnly>
          <TagsInput.Label>Read-only</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add a topic…" />
            <TagsInput.ClearTrigger />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput.Root>
        <TagsInput.Root defaultValue={["React", "TypeScript"]} invalid>
          <TagsInput.Label>Invalid</TagsInput.Label>
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
