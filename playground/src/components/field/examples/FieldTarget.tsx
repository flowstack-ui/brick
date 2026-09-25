import { Field, Frame, HStack, Input, NativeSelect } from "@flowstack-ui/brick";
export function FieldTarget() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <Field.Root target="amount">
        <Field.Label>Price</Field.Label>
        <HStack gap={2} align="start">
          <Field.Item value="currency">
            <NativeSelect.Root>
              <NativeSelect.Field aria-label="Currency">
                <option>USD</option>
                <option>CAD</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Item>
          <Field.Item value="amount">
            <Input inputMode="decimal" placeholder="0.00" />
          </Field.Item>
        </HStack>
        <Field.Description>Price before tax.</Field.Description>
      </Field.Root>
    </Frame>
  );
}
