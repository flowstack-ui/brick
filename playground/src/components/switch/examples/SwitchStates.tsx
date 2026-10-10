import { Grid, Switch } from "@flowstack-ui/brick";

export function SwitchStates() {
  const states = [
    { label: "Disabled off", disabled: true },
    { label: "Disabled on", disabled: true, defaultChecked: true },
    { label: "Read-only off", readOnly: true },
    { label: "Read-only on", readOnly: true, defaultChecked: true },
    { label: "Required setting", required: true },
    { label: "Invalid setting", invalid: true },
  ] as const;
  return (
    <Grid.Root columns={{ initial: 1, md: 2 }} gap="3">
      {states.map(({ label, ...state }) => (
        <Switch.Field key={label} {...state}>
          <Switch.Control />
          <Switch.Label>{label}</Switch.Label>
          <Switch.HiddenInput />
        </Switch.Field>
      ))}
    </Grid.Root>
  );
}
