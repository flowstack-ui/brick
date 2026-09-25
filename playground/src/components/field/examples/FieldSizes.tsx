import { Field, Frame, Input, VStack } from "@flowstack-ui/brick";
export function FieldSizes() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <VStack gap={6}>
        {(["xs", "sm", "md"] as const).map((size) => (
          <Field.Root key={size} size={size}>
            <Field.Label>{size} label</Field.Label>
            <Input placeholder="Enter a value" />
          </Field.Root>
        ))}
      </VStack>
    </Frame>
  );
}
