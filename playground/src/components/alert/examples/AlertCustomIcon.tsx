import { Rocket } from "lucide-react";
import { Alert, Icon } from "@flowstack-ui/brick";
export function AlertCustomIcon() {
  return (
    <Alert.Root>
      <Alert.Indicator>
        <Icon size="inherit">
          <Rocket />
        </Icon>
      </Alert.Indicator>
      <Alert.Title>Your new workspace is ready to launch.</Alert.Title>
    </Alert.Root>
  );
}
