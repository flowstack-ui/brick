import { useState } from "react";
import { Frame, VStack, TagsInput, Text } from "@flowstack-ui/brick";
export function TagsInputMaximum() {
  const [error, setError] = useState("");
  return (
    <Frame maxInlineSize="28rem">
      <VStack gap="2">
        <TagsInput.Root
          defaultValue={["React", "TypeScript"]}
          max={3}
          onValueInvalid={() => setError("Choose up to three topics.")}
          onValueChange={() => setError("")}
        >
          <TagsInput.Label>Up to three topics</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add a topic…" />
            <TagsInput.ClearTrigger />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput.Root>
        <Text role="status" tone="secondary">
          {error || "Press Enter to add a topic."}
        </Text>
      </VStack>
    </Frame>
  );
}
