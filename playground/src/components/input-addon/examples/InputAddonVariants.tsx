import {
  Field,
  Frame,
  Group,
  Input,
  InputAddon,
  VStack,
} from "@flowstack-ui/brick";

export function InputAddonVariants() {
  return (
    <Frame maxInlineSize="28rem">
      <VStack gap="6">
        {(
          [
            "outline",
            "surface",
            "soft",
            "subtle",
            "ghost",
            "plain",
            "underline",
          ] as const
        ).map((variant) => (
          <Field.Root key={variant}>
            <Field.Label>{variant}</Field.Label>
            <Group attached>
              <InputAddon variant={variant}>https://</InputAddon>
              <Input variant={variant} placeholder="example.com" />
            </Group>
          </Field.Root>
        ))}
      </VStack>
    </Frame>
  );
}
