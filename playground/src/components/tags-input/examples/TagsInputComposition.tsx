import { Frame, TagsInput, VisuallyHidden } from "@flowstack-ui/brick";
export function TagsInputComposition() {
  return (
    <Frame maxInlineSize="28rem">
      <TagsInput.Root defaultValue={["Design"]} editable>
        <TagsInput.Label>Topics</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Context>
            {(api) =>
              api.value.map((value, index) => (
                <TagsInput.Item key={index} index={index} value={value}>
                  <TagsInput.ItemPreview>
                    <TagsInput.ItemText asChild>
                      <span>{value}</span>
                    </TagsInput.ItemText>
                    <TagsInput.ItemDeleteTrigger />
                  </TagsInput.ItemPreview>
                  <TagsInput.ItemInput />
                  <TagsInput.ItemContext>
                    {(state) => (
                      <VisuallyHidden.Root>
                        {state.highlighted ? "Selected topic" : ""}
                      </VisuallyHidden.Root>
                    )}
                  </TagsInput.ItemContext>
                </TagsInput.Item>
              ))
            }
          </TagsInput.Context>
          <TagsInput.Input />
          <TagsInput.ClearTrigger />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput.Root>
    </Frame>
  );
}
