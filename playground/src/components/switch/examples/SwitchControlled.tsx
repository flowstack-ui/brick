import { Switch, Text, VStack } from "@flowstack-ui/brick";
import { useState } from "react";

export function SwitchControlled() {
  const [checked, setChecked] = useState(false);
  return (
    <VStack align="start" gap="2">
      <Switch.Field
        name="presence"
        checked={checked}
        onCheckedChange={setChecked}
      >
        <Switch.Control />
        <Switch.Label>Publish presence</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Field>
      <Text tone="secondary">
        Presence is {checked ? "visible" : "hidden"}.
      </Text>
    </VStack>
  );
}
