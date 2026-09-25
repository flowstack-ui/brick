import { Frame, VStack, TagsInput } from "@flowstack-ui/brick";
export function TagsInputColors() {
  return (
    <Frame maxInlineSize="28rem">
      <VStack gap="5">
        {(["neutral", "accent", "contrast"] as const).map((tone) => (
          <TagsInput.Root defaultValue={["React", "TypeScript"]} key={tone}>
            <TagsInput.Label>{tone}</TagsInput.Label>
            <TagsInput.Control>
              <TagsInput.Items tone={tone} />
              <TagsInput.Input placeholder="Add a topic…" />
              <TagsInput.ClearTrigger />
            </TagsInput.Control>
            <TagsInput.HiddenInput />
          </TagsInput.Root>
        ))}
      </VStack>
    </Frame>
  );
}
