import { MultiSelect, Frame } from "@flowstack-ui/brick";
export function MultiSelectGroups() {
  return (
    <Frame maxInlineSize="20rem">
      <MultiSelect.Root>
        <MultiSelect.Trigger aria-label="Technology">
          <MultiSelect.Value placeholder="Select technology" />
          <MultiSelect.Icon />
        </MultiSelect.Trigger>
        <MultiSelect.Content>
          <MultiSelect.Group>
            <MultiSelect.Label>Frontend</MultiSelect.Label>
            <MultiSelect.Item value="react" label="React">
              <MultiSelect.ItemText>React</MultiSelect.ItemText>
              <MultiSelect.ItemIndicator />
            </MultiSelect.Item>
            <MultiSelect.Item value="vue" label="Vue">
              <MultiSelect.ItemText>Vue</MultiSelect.ItemText>
              <MultiSelect.ItemIndicator />
            </MultiSelect.Item>
          </MultiSelect.Group>
          <MultiSelect.Separator />
          <MultiSelect.Group>
            <MultiSelect.Label>Backend</MultiSelect.Label>
            <MultiSelect.Item value="node" label="Node.js">
              <MultiSelect.ItemText>Node.js</MultiSelect.ItemText>
              <MultiSelect.ItemIndicator />
            </MultiSelect.Item>
          </MultiSelect.Group>
        </MultiSelect.Content>
      </MultiSelect.Root>
    </Frame>
  );
}
