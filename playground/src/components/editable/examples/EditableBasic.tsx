import { Editable } from "@flowstack-ui/brick";
export function EditableBasic() {
  return (
    <Editable.Root defaultValue="Click to edit">
      <Editable.Preview />
      <Editable.Input aria-label="Document title" />
    </Editable.Root>
  );
}
