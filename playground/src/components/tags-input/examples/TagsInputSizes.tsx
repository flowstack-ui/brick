import { Frame, VStack, TagsInput } from "@flowstack-ui/brick";
export function TagsInputSizes() {
  return (
    <Frame maxInlineSize="28rem">
      <VStack gap="5">
        {(["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
          <TagsInput.Root
            defaultValue={["React", "TypeScript"]}
            key={size}
            size={size}
          >
            <TagsInput.Label>{size}</TagsInput.Label>
            <TagsInput.Control>
              <TagsInput.Items />
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
