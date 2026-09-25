import { NativeSelect, Frame } from "@flowstack-ui/brick";
export function NativeSelectGroups() {
  return (
    <Frame maxInlineSize="20rem">
      <NativeSelect.Root>
        <NativeSelect.Field aria-label="Technology">
          <optgroup label="Frontend">
            <option value="react">React</option>
            <option value="vue">Vue</option>
          </optgroup>
          <optgroup label="Backend">
            <option value="node">Node.js</option>
          </optgroup>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Frame>
  );
}
