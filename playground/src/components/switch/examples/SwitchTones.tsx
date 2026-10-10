import { Grid, Switch } from "@flowstack-ui/brick";

export function SwitchTones() {
  const tones = [
    "neutral",
    "accent",
    "contrast",
    "info",
    "success",
    "warning",
    "danger",
  ] as const;
  return (
    <Grid.Root columns={{ initial: 1, md: 3 }} gap="3">
      {tones.map((tone) => (
        <Switch.Field key={tone} tone={tone} defaultChecked>
          <Switch.Control />
          <Switch.Label>{tone} notifications</Switch.Label>
          <Switch.HiddenInput />
        </Switch.Field>
      ))}
    </Grid.Root>
  );
}
