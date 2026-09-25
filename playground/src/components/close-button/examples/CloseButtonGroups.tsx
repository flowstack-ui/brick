import { Button, ButtonGroup, CloseButton } from "@flowstack-ui/brick";

export function CloseButtonGroups() {
  return (
    <ButtonGroup variant="outline" tone="neutral" size="md" attached>
      <Button>Save</Button>
      <CloseButton aria-label="Additional action"></CloseButton>
    </ButtonGroup>
  );
}
