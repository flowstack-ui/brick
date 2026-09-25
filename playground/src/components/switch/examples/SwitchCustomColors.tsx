import { Switch } from "@flowstack-ui/brick";
import type { CSSProperties } from "react";

const ocean = {
  "--brick-switch-checked-background": "#087f8c",
  "--brick-switch-checked-hover-background": "#076d78",
  "--brick-switch-checked-pressed-background": "#055a63",
} as CSSProperties;

export function SwitchCustomColors() {
  return (
    <Switch.Field defaultChecked style={ocean}>
      <Switch.Control />
      <Switch.Label>Ocean status color</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Field>
  );
}
