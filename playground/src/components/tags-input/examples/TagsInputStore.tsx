import {
  Frame,
  VStack,
  TagsInput,
  HStack,
  Button,
  useTagsInput,
} from "@flowstack-ui/brick";
export function TagsInputStore() {
  const api = useTagsInput({ defaultValue: ["Research"] });
  return (
    <Frame maxInlineSize="28rem">
      <VStack gap="4">
        <TagsInput.RootProvider value={api}>
          <TagsInput.Label>Project topics</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input />
            <TagsInput.ClearTrigger />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput.RootProvider>
        <HStack gap="2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => api.addValue("Design")}
          >
            Add design
          </Button>
          <Button variant="ghost" size="sm" onClick={() => api.clearValue()}>
            Clear topics
          </Button>
        </HStack>
      </VStack>
    </Frame>
  );
}
