import { useState } from "react";
import { Frame, VStack, TagsInput, Text } from "@flowstack-ui/brick";
export function TagsInputValidate() {
  const [error, setError] = useState("");
  return (
    <Frame maxInlineSize="28rem">
      <VStack gap="2">
        <TagsInput.Root
          defaultValue={["React", "TypeScript"]}
          validate={({ inputValue }) => inputValue.length >= 3}
          onValueInvalid={() =>
            setError("Use at least three characters, without duplicates.")
          }
          onValueChange={() => setError("")}
        >
          <TagsInput.Label>Topics</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add a topic…" />
            <TagsInput.ClearTrigger />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput.Root>
        <Text role="status" tone="secondary">
          {error || "At least three characters per topic."}
        </Text>
      </VStack>
    </Frame>
  );
}
