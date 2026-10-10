import { Frame, VStack, TagsInput } from "@flowstack-ui/brick";
export function TagsInputVariants() {
  return (
    <Frame maxInlineSize="28rem">
      <VStack gap="5">
        {(
          [
            "outline",
            "surface",
            "soft",
            "subtle",
            "ghost",
            "plain",
            "underline",
          ] as const
        ).map((variant) => (
          <TagsInput.Root
            defaultValue={["React", "TypeScript"]}
            key={variant}
            variant={variant}
          >
            <TagsInput.Label>{variant}</TagsInput.Label>
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
