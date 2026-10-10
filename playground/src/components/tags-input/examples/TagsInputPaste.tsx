import { useState } from "react";
import { Frame, VStack, TagsInput, Text } from "@flowstack-ui/brick";
export function TagsInputPaste() {
  const [error, setError] = useState("");
  return (
    <Frame maxInlineSize="28rem">
      <VStack gap="2">
        <TagsInput.Root
          defaultValue={["React", "TypeScript"]}
          addOnPaste
          max={5}
          onValueInvalid={() =>
            setError(
              "The whole paste was rejected. Check duplicates and the five-topic limit.",
            )
          }
          onValueChange={() => setError("")}
        >
          <TagsInput.Label>Paste comma-separated topics</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add a topic…" />
            <TagsInput.ClearTrigger />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput.Root>
        <Text role="status" tone="secondary">
          {error}
        </Text>
      </VStack>
    </Frame>
  );
}
