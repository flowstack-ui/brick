import { useState } from "react";
import { Frame, TagsInput } from "@flowstack-ui/brick";
export function TagsInputControlled() {
  const [value, setValue] = useState(["Design"]);
  const [draft, setDraft] = useState("");
  return (
    <Frame maxInlineSize="28rem">
      <TagsInput.Root
        defaultValue={["React", "TypeScript"]}
        value={value}
        onValueChange={({ value }) => setValue(value)}
        inputValue={draft}
        onInputValueChange={({ inputValue }) => setDraft(inputValue)}
      >
        <TagsInput.Label>Topics</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add a topic…" />
          <TagsInput.ClearTrigger />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput.Root>
    </Frame>
  );
}
