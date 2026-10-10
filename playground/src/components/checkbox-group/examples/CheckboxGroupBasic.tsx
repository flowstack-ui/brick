import { CheckboxGroup } from "@flowstack-ui/brick";
export function CheckboxGroupBasic() {
  return (
    <CheckboxGroup.Root aria-label="Frameworks" defaultValue={["react"]}>
      <CheckboxGroup.Item value="react">React</CheckboxGroup.Item>
      <CheckboxGroup.Item value="vue">Vue</CheckboxGroup.Item>
      <CheckboxGroup.Item value="solid">Solid</CheckboxGroup.Item>
    </CheckboxGroup.Root>
  );
}
