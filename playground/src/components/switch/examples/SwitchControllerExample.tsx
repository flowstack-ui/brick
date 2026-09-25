import { Button, Switch, VStack, useSwitch } from "@flowstack-ui/brick";

export function SwitchControllerExample() {
  const preference = useSwitch({ defaultChecked: true });
  return (
    <VStack align="start" gap="3">
      <Switch.RootProvider
        value={preference}
        inputValue="enabled"
        name="announcements"
      >
        <Switch.Control />
        <Switch.Label>Product announcements</Switch.Label>
        <Switch.HiddenInput />
      </Switch.RootProvider>
      <Button variant="outline" onClick={() => preference.setChecked(false)}>
        Turn off
      </Button>
    </VStack>
  );
}
