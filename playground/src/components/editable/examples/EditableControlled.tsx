import { useState } from "react";
import { Editable } from "@flowstack-ui/brick";
export function EditableControlled() {
  const [value, setValue] = useState("Project roadmap");
  return (
    <Editable.Root
      value={value}
      onValueChange={(details) => setValue(details.value)}
    >
      <Editable.Preview />
      <Editable.Input aria-label="Roadmap title" />
    </Editable.Root>
  );
}
