import { useState } from "react";
import {
  Button,
  Card,
  CheckboxCard,
  CheckboxGroup,
  Fieldset,
  Form,
  HStack,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function BackupOptions() {
  const [saved, setSaved] = useState("No options saved.");
  return (
    <Card.Root>
      <Card.Content>
        <Form
          aria-label="Backup options"
          onSubmit={(event) => {
            event.preventDefault();
            setSaved(
              `Saved: ${new FormData(event.currentTarget).getAll("backup-options").join(", ")}`,
            );
          }}
        >
          <VStack gap="4">
            <Fieldset.Root>
              <Fieldset.Legend>Backup options</Fieldset.Legend>
              <CheckboxGroup.Root
                name="backup-options"
                required
                maxSelectedValues={2}
                defaultValue={["daily"]}
              >
                <VStack gap="3">
                  {[
                    ["daily", "Daily snapshots"],
                    ["retention", "Extended retention"],
                    ["priority", "Priority restore"],
                  ].map(([value, label]) => (
                    <CheckboxCard.Root key={value} value={value}>
                      <CheckboxCard.HiddenInput />
                      <CheckboxCard.Control>
                        <CheckboxCard.Label>{label}</CheckboxCard.Label>
                        <CheckboxCard.Indicator />
                      </CheckboxCard.Control>
                    </CheckboxCard.Root>
                  ))}
                </VStack>
              </CheckboxGroup.Root>
            </Fieldset.Root>
            <HStack gap="3">
              <Button type="submit">Save backup options</Button>
              <Button type="reset" variant="outline" tone="neutral">
                Reset backup options
              </Button>
            </HStack>
            <Text role="status">{saved}</Text>
          </VStack>
        </Form>
      </Card.Content>
    </Card.Root>
  );
}
