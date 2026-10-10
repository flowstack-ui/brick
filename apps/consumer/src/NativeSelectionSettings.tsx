import { useState } from "react";
import { Button } from "@flowstack-ui/brick/button";
import { Card } from "@flowstack-ui/brick/card";
import { Field } from "@flowstack-ui/brick/field";
import { Form } from "@flowstack-ui/brick/form";
import { NativeSelect } from "@flowstack-ui/brick/native-select";
import { HStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";

export function NativeSelectionSettings() {
  const [saved, setSaved] = useState("No changes saved.");
  return <Card.Root><Card.Content><Form aria-label="Notification settings" onSubmit={event => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    setSaved(`Delivery frequency: ${data.get("frequency")}.`);
  }}><Text as="h2" variant="title-lg">Notification settings</Text>
    <Field.Root><Field.Label>Delivery frequency</Field.Label>
      <NativeSelect.Root><NativeSelect.Field name="frequency" defaultValue="weekly">
        <option value="daily">Daily digest</option><option value="weekly">Weekly digest</option><option value="never">Do not send digests</option>
      </NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root>
      <Field.Description>Choose when to receive project activity.</Field.Description>
    </Field.Root><HStack gap="3"><Button type="submit">Save frequency</Button><Button type="reset" variant="outline" tone="neutral">Reset frequency</Button></HStack>
    <Text role="status">{saved}</Text>
  </Form></Card.Content></Card.Root>;
}
