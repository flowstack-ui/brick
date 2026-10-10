import { Editable } from "@flowstack-ui/brick";
export function EditableTextarea() {
  return (
    <Editable.Root
      defaultValue="A short description.\nAdd another line when you edit."
      autoResize
    >
      <Editable.Area>
        <Editable.Preview />
        <Editable.Textarea aria-label="Description" rows={2} />
      </Editable.Area>
    </Editable.Root>
  );
}
