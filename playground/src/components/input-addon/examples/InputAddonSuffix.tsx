import { Field, Frame, Group, Input, InputAddon } from "@flowstack-ui/brick";

export function InputAddonSuffix() {
  return (
    <Frame maxInlineSize="28rem">
      <Field.Root>
        <Field.Label>Package weight</Field.Label>
        <Group attached>
          <Input inputMode="decimal" placeholder="0" />
          <InputAddon>kg</InputAddon>
        </Group>
        <Field.Description>Enter the weight in kilograms.</Field.Description>
      </Field.Root>
    </Frame>
  );
}
