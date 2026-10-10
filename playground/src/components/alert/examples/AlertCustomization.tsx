import { Percent } from "lucide-react";
import { Alert, Icon } from "@flowstack-ui/brick";
export function AlertCustomization() {
  return (
    <Alert.Root status="success" accentStart align="center">
      <Alert.Indicator>
        <Icon size="inherit">
          <Percent />
        </Icon>
      </Alert.Indicator>
      <Alert.Content tone="primary">
        <Alert.Title>Save on your annual plan</Alert.Title>
        <Alert.Description>
          Switch to annual billing for a lower monthly price.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}
