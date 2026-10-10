import { Field, Frame, Group, Input, InputAddon } from "@flowstack-ui/brick";

export function InputAddonResponsive() {
  const size = { initial: "sm", md: "lg" } as const;
  return (
    <Frame maxInlineSize="28rem">
      <Field.Root>
        <Field.Label>Workspace address</Field.Label>
        <Group attached>
          <InputAddon size={size}>https://</InputAddon>
          <Input size={size} placeholder="workspace.example" />
        </Group>
        <Field.Description>
          Small on narrow screens; large from the medium breakpoint.
        </Field.Description>
      </Field.Root>
    </Frame>
  );
}
