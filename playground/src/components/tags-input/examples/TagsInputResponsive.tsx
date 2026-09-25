import { Frame, TagsInput } from "@flowstack-ui/brick";
export function TagsInputResponsive() {
  return (
    <Frame maxInlineSize="28rem">
      <TagsInput.Root
        defaultValue={["React", "TypeScript"]}
        size={{ initial: "sm", md: "lg" }}
        variant={{ initial: "underline", md: "outline" }}
      >
        <TagsInput.Label>Responsive topics</TagsInput.Label>
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
