import { HStack, Switch } from "@flowstack-ui/brick";
import { CheckIcon, MoonIcon, SunIcon, XIcon } from "lucide-react";

export function SwitchIndicators() {
  return (
    <HStack gap="6" wrap="wrap">
      <Switch.Field defaultChecked>
        <Switch.Control>
          <Switch.Indicator fallback={<SunIcon />}>
            <MoonIcon />
          </Switch.Indicator>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>Dark theme</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Field>
      <Switch.Field defaultChecked>
        <Switch.Control>
          <Switch.Thumb>
            <Switch.ThumbIndicator fallback={<XIcon />}>
              <CheckIcon />
            </Switch.ThumbIndicator>
          </Switch.Thumb>
        </Switch.Control>
        <Switch.Label>Sync complete</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Field>
    </HStack>
  );
}
