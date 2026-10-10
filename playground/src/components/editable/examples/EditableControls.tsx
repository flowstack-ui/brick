import { Editable, IconButton } from "@flowstack-ui/brick";
import { Check, Pencil, X } from "lucide-react";
export function EditableControls() {
  return (
    <Editable.Root defaultValue="Project notes" activationMode="none">
      <Editable.Area>
        <Editable.Preview />
        <Editable.Input aria-label="Project title" />
      </Editable.Area>
      <Editable.Control>
        <Editable.EditTrigger unstyled asChild>
          <IconButton
            aria-label="Edit title"
            size="xs"
            variant="ghost"
            tone="neutral"
          >
            <Pencil />
          </IconButton>
        </Editable.EditTrigger>
        <Editable.SubmitTrigger unstyled asChild>
          <IconButton
            aria-label="Save title"
            size="xs"
            variant="ghost"
            tone="neutral"
          >
            <Check />
          </IconButton>
        </Editable.SubmitTrigger>
        <Editable.CancelTrigger unstyled asChild>
          <IconButton
            aria-label="Cancel editing"
            size="xs"
            variant="ghost"
            tone="neutral"
          >
            <X />
          </IconButton>
        </Editable.CancelTrigger>
      </Editable.Control>
    </Editable.Root>
  );
}
