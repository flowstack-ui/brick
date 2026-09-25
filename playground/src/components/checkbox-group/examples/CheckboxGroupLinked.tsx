import {
  Checkbox,
  CheckboxGroup,
  Link,
  useCheckboxGroupItem,
} from "@flowstack-ui/brick";
function Consent() {
  const control = useCheckboxGroupItem({ value: "terms" });
  return (
    <Checkbox.Root required={false}>
      <Checkbox.Control {...control} />
      <Checkbox.Label>
        I accept the <Link href="#linked-label">terms</Link>
      </Checkbox.Label>
      <Checkbox.Description>
        The link can be opened without selecting the option.
      </Checkbox.Description>
    </Checkbox.Root>
  );
}
export function CheckboxGroupLinked() {
  return (
    <CheckboxGroup.Root aria-label="Agreements" name="agreements">
      <Consent />
    </CheckboxGroup.Root>
  );
}
