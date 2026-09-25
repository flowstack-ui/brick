import { Button, Field, Form, Frame, HStack, Input } from "@flowstack-ui/brick";
export function FormSpacing() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <Form gap={{ initial: 4, md: 8 }} preventDefaultOnSubmit>
        <Field.Root>
          <Field.Label>First name</Field.Label>
          <Input name="firstName" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Last name</Field.Label>
          <Input name="lastName" />
        </Field.Root>
        <HStack>
          <Button type="submit">Save</Button>
        </HStack>
      </Form>
    </Frame>
  );
}
