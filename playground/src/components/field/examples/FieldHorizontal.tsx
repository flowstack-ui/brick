import { Field, Frame, Input, VStack } from "@flowstack-ui/brick";
export function FieldHorizontal() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <VStack gap={5}>
        <Field.Root
          orientation={{ initial: "vertical", md: "horizontal" }}
          labelWidth="6rem"
        >
          <Field.Label>Name</Field.Label>
          <Input placeholder="Alex Morgan" />
        </Field.Root>
        <Field.Root
          orientation={{ initial: "vertical", md: "horizontal" }}
          labelWidth="6rem"
        >
          <Field.Label>Email</Field.Label>
          <Input type="email" />
        </Field.Root>
      </VStack>
    </Frame>
  );
}
