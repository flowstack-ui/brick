import { HStack, Switch } from "@flowstack-ui/brick";

export function SwitchRtlComposition() {
  return (
    <HStack gap="6" wrap="wrap">
      <div dir="rtl">
        <Switch.Field defaultChecked>
          <Switch.Control />
          <Switch.Label>التقارير الأسبوعية</Switch.Label>
          <Switch.HiddenInput />
        </Switch.Field>
      </div>
      <Switch.Field defaultChecked>
        <Switch.Control asChild>
          <button data-composed-switch>
            <Switch.Thumb />
          </button>
        </Switch.Control>
        <Switch.Label>Custom button host</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Field>
    </HStack>
  );
}
