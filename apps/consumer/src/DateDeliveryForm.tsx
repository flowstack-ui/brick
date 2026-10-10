import { useState } from "react";
import { DatePicker } from "@flowstack-ui/brick/date-picker";
import { parseDate } from "@flowstack-ui/brick/date-value";
import { Form } from "@flowstack-ui/brick/form";
import { Button } from "@flowstack-ui/brick/button";
import { VStack, HStack } from "@flowstack-ui/brick/stack";
import { Heading, Text } from "@flowstack-ui/brick/text";

export function DateDeliveryForm() {
  const [result, setResult] = useState("");
  return <VStack as="section" gap="4" aria-labelledby="delivery-heading">
    <Heading id="delivery-heading" level={2} variant="title-md">Schedule delivery</Heading>
    <Form onSubmit={event => { event.preventDefault(); setResult(String(new FormData(event.currentTarget).get("delivery") ?? "")); }}>
      <VStack gap="3"><DatePicker.Root referenceDate={parseDate("2026-09-05")} name="delivery" required>
        <DatePicker.Label>Delivery date</DatePicker.Label>
        <DatePicker.Control><DatePicker.Input /><DatePicker.ClearTrigger /><DatePicker.Trigger /></DatePicker.Control>
        <DatePicker.Portal><DatePicker.Content aria-label="Delivery calendar"><DatePicker.Calendar /></DatePicker.Content></DatePicker.Portal>
      </DatePicker.Root><HStack gap="3"><Button type="submit">Save delivery</Button><Button type="reset" variant="outline">Reset delivery</Button></HStack></VStack>
    </Form>
    <Text role="status">{result ? `Saved: ${result}` : "No delivery saved"}</Text>
  </VStack>;
}
