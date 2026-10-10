import { Checkbox } from "@flowstack-ui/brick";
export function CheckboxCustomIndicator() {
  return (
    <Checkbox
      defaultChecked
      indicator={<Checkbox.Indicator indeterminate="−">✓</Checkbox.Indicator>}
    >
      Custom indicator
    </Checkbox>
  );
}
