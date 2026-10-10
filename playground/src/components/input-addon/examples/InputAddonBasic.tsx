import { Field, Frame, Group, Input, InputAddon } from "@flowstack-ui/brick";

export function InputAddonBasic() {
  return (
    <Frame maxInlineSize="28rem">
      <Field.Root>
        <Field.Label>Website address</Field.Label>
        <Group attached>
          <InputAddon>https://</InputAddon>
          <Input placeholder="example.com" />
        </Group>
        <Field.Description>The address uses HTTPS.</Field.Description>
      </Field.Root>
    </Frame>
  );
}
