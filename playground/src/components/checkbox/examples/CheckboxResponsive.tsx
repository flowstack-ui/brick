import { Checkbox } from "@flowstack-ui/brick";
export function CheckboxResponsive() {
  return (
    <Checkbox size={{ initial: "sm", md: "lg" }} radius="full" defaultChecked>
      Responsive rounded selection
    </Checkbox>
  );
}
