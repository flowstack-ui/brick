import { Link, Switch, Text, VStack } from "@flowstack-ui/brick";

export function SwitchLabelPlacement() {
  return (
    <VStack align="stretch" gap="4" style={{ maxInlineSize: "24rem" }}>
      <Switch.Field labelPlacement="end">
        <Switch.Control aria-describedby="reports-description" />
        <Switch.Label>
          Send a detailed weekly account and publishing report
        </Switch.Label>
        <Switch.HiddenInput />
      </Switch.Field>
      <Text id="reports-description" tone="secondary">
        Delivery changes immediately.{" "}
        <Link href="#delivery-help">Learn about delivery</Link>.
      </Text>
      <Switch.Field labelPlacement="start" defaultChecked>
        <Switch.Control />
        <Switch.Label>Show online status</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Field>
    </VStack>
  );
}
