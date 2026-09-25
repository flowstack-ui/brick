import { Card, Frame, SegmentGroup } from "@flowstack-ui/brick";
export function SegmentGroupCard() {
  return (
    <Frame maxInlineSize="24rem">
      <Card.Root>
        <Card.Header>
          <Card.Title>Workspace view</Card.Title>
          <Card.Description>
            Choose how to organize your projects.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <SegmentGroup.Root aria-label="Card view" defaultValue="List">
            <SegmentGroup.Indicator />
            <SegmentGroup.Items items={["List", "Grid", "Board"]} />
          </SegmentGroup.Root>
        </Card.Content>
      </Card.Root>
    </Frame>
  );
}
