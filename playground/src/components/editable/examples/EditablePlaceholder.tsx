import { Editable } from "@flowstack-ui/brick";
export function EditablePlaceholder() {
  return (
    <Editable.Root
      defaultValue=""
      placeholder={{ preview: "Untitled", edit: "Enter a title" }}
      maxLength={40}
    >
      <Editable.Preview />
      <Editable.Input aria-label="New title" />
    </Editable.Root>
  );
}
