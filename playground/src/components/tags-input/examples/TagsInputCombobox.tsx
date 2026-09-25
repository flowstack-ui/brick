import {
  Combobox,
  Frame,
  TagsInput,
  useTagsInputCombobox,
  useTagsInputContext,
} from "@flowstack-ui/brick";
function Suggestions() {
  const api = useTagsInputContext();
  const bindings = useTagsInputCombobox();
  const options = ["React", "TypeScript", "Design", "Research"]
    .filter((value) => !api.value.includes(value))
    .map((value) => ({ value, label: value }));
  return (
    <Combobox.Root {...bindings} options={options}>
      <TagsInput.Label>Skills</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Search or create a skill…" />
        <Combobox.Trigger />
      </TagsInput.Control>
      <Combobox.Portal>
        <Combobox.Content>
          <Combobox.Listbox>
            {options.map((option) => (
              <Combobox.Item key={option.value} {...option}>
                {option.label}
              </Combobox.Item>
            ))}
            <Combobox.Empty>
              No suggestions. Press Enter to create.
            </Combobox.Empty>
          </Combobox.Listbox>
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox.Root>
  );
}
export function TagsInputCombobox() {
  return (
    <Frame maxInlineSize="28rem">
      <TagsInput.Root defaultValue={["React"]}>
        <Suggestions />
        <TagsInput.HiddenInput />
      </TagsInput.Root>
    </Frame>
  );
}
