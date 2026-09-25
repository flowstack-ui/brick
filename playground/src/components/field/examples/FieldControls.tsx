import {
  Field,
  Frame,
  NativeSelect,
  Textarea,
  VStack,
} from "@flowstack-ui/brick";
export function FieldControls() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <VStack gap={5}>
        <Field.Root>
          <Field.Label>Summary</Field.Label>
          <Textarea.Root />
        </Field.Root>
        <Field.Root>
          <Field.Label>Country</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field>
              <option>Canada</option>
              <option>United States</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
      </VStack>
    </Frame>
  );
}
