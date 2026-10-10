import { Button, ButtonGroup, IconButton } from "@flowstack-ui/brick";
import { Search } from "lucide-react";
export function IconButtonGroups() {
  return (
    <ButtonGroup variant="outline" tone="neutral" size="md" attached>
      <Button>Save</Button>
      <IconButton aria-label="Additional action">
        <Search />
      </IconButton>
    </ButtonGroup>
  );
}
