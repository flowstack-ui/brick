import { Button, ButtonGroup, IconButton } from "@flowstack-ui/brick";
import { Plus } from "lucide-react";
export function ButtonGroups() {
  return (
    <ButtonGroup size="sm" variant="outline" tone="neutral">
      <Button>Save</Button>
      <Button variant="solid" tone="accent">
        Publish
      </Button>
      <IconButton aria-label="Add">
        <Plus />
      </IconButton>
    </ButtonGroup>
  );
}
