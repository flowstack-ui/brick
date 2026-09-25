import { Field, Frame, Input } from "@flowstack-ui/brick";
export function FieldIds() {
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <Field.Root
        ids={{ control: "billing-reference", description: "billing-help" }}
      >
        <Field.Label>Billing reference</Field.Label>
        <Input id="billing-reference" />
        <Field.Description>Shown on your invoices.</Field.Description>
      </Field.Root>
    </Frame>
  );
}
