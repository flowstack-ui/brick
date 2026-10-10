import { Button, ButtonGroup, VStack } from "@flowstack-ui/brick";
export function ButtonAttached() {
  return (
    <VStack gap="6">
      <ButtonGroup attached variant="outline" size="sm">
        <Button>Save</Button>
        <Button>Cancel</Button>
      </ButtonGroup>
      <ButtonGroup
        attached
        orientation="vertical"
        align="stretch"
        variant="surface"
        size="sm"
      >
        <Button>Move up</Button>
        <Button>Move down</Button>
      </ButtonGroup>
    </VStack>
  );
}
