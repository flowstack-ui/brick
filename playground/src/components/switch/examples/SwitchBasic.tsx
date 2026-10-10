import { Switch } from "@flowstack-ui/brick";

export function SwitchBasic() {
  return (
    <Switch.Field name="reports" value="weekly">
      <Switch.Control />
      <Switch.Label>Weekly activity reports</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Field>
  );
}
