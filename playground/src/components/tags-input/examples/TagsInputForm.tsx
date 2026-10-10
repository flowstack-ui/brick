import { useState } from "react";
import {
  Frame,
  VStack,
  TagsInput,
  HStack,
  Button,
  Text,
} from "@flowstack-ui/brick";
export function TagsInputForm() {
  const [submitted, setSubmitted] = useState("Not submitted");
  return (
    <Frame maxInlineSize="28rem">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(String(new FormData(event.currentTarget).get("topics")));
        }}
      >
        <VStack gap="4">
          <TagsInput.Root
            defaultValue={["React", "TypeScript"]}
            name="topics"
            required
          >
            <TagsInput.Label>Project topics</TagsInput.Label>
            <TagsInput.Control>
              <TagsInput.Items />
              <TagsInput.Input placeholder="Add a topic…" />
              <TagsInput.ClearTrigger />
            </TagsInput.Control>
            <TagsInput.HiddenInput />
          </TagsInput.Root>
          <HStack gap="2">
            <Button type="submit">Save topics</Button>
            <Button type="reset" variant="outline">
              Reset
            </Button>
          </HStack>
          <Text role="status">{submitted}</Text>
        </VStack>
      </form>
    </Frame>
  );
}
