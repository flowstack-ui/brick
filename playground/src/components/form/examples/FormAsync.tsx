import { Button, Field, Form, Frame, HStack, Input } from "@flowstack-ui/brick";
export function FormAsync() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <Form
        preventDefaultOnSubmit
        onSubmit={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
      >
        <Field.Root>
          <Field.Label>Display name</Field.Label>
          <Input name="name" />
        </Field.Root>
        <HStack gap={3}>
          <Button type="submit">Save profile</Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </HStack>
      </Form>
    </Frame>
  );
}
