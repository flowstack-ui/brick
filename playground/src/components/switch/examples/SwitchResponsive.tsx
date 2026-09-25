import { Switch } from "@flowstack-ui/brick";

export function SwitchResponsive() {
  return (
    <Switch.Field
      size={{ initial: "sm", md: "lg" }}
      variant={{ initial: "solid", md: "raised" }}
      defaultChecked
    >
      <Switch.Control />
      <Switch.Label>Responsive preview controls</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Field>
  );
}
