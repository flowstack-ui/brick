import {
  CheckboxGroup,
  Form,
  Fieldset,
  Button,
  HStack,
  VStack,
} from "@flowstack-ui/brick";
export function CheckboxGroupForm() {
  return (
    <Form preventDefaultOnSubmit>
      <Fieldset.Root required>
        <Fieldset.Legend>Contact channels</Fieldset.Legend>
        <VStack gap="4">
          <CheckboxGroup.Root name="channels">
            <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
            <CheckboxGroup.Item value="sms">SMS</CheckboxGroup.Item>
          </CheckboxGroup.Root>
          <Fieldset.Error>Choose at least one channel.</Fieldset.Error>
          <HStack gap="3">
            <Button type="submit">Save preferences</Button>
            <Button type="reset" variant="outline">
              Reset
            </Button>
          </HStack>
        </VStack>
      </Fieldset.Root>
    </Form>
  );
}
