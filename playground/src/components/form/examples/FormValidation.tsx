import { Button, Field, Form, Frame, HStack, Input } from "@flowstack-ui/brick";
export function FormValidation() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <Form preventDefaultOnSubmit>
        <Field.Root required>
          <Field.Label>Email</Field.Label>
          <Input name="email" type="email" />
          <Field.Error>Enter a valid email address.</Field.Error>
        </Field.Root>
        <HStack gap={3}>
          <Button type="submit">Continue</Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </HStack>
      </Form>
    </Frame>
  );
}
