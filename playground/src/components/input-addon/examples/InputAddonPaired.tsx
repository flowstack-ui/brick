import { Field, Frame, Group, Input, InputAddon } from "@flowstack-ui/brick";

export function InputAddonPaired() {
  return (
    <Frame maxInlineSize="28rem">
      <Field.Root>
        <Field.Label>Website name</Field.Label>
        <Group attached>
          <InputAddon>https://</InputAddon>
          <Input placeholder="example" />
          <InputAddon>.com</InputAddon>
        </Group>
        <Field.Description>
          Your address uses HTTPS and the .com domain.
        </Field.Description>
      </Field.Root>
    </Frame>
  );
}
