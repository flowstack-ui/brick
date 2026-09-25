import { Select, Frame } from "@flowstack-ui/brick";
export function SelectGroups() {
  return (
    <Frame maxInlineSize="20rem">
      <Select.Root>
        <Select.Trigger aria-label="Technology">
          <Select.Value placeholder="Select technology" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Frontend</Select.Label>
            <Select.Item value="react" label="React">
              <Select.ItemText>React</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="vue" label="Vue">
              <Select.ItemText>Vue</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Backend</Select.Label>
            <Select.Item value="node" label="Node.js">
              <Select.ItemText>Node.js</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Frame>
  );
}
