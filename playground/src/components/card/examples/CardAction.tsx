import { Card, Frame, IconButton } from "@flowstack-ui/brick";
import { Ellipsis } from "lucide-react";
export function CardAction() {
  return (
    <Frame maxInlineSize={400}>
      <Card.Root>
        <Card.Header>
          <Card.Title>Design workspace</Card.Title>
          <Card.Description>Three active collaborators</Card.Description>
          <Card.Action>
            <IconButton aria-label="Workspace options" variant="ghost">
              <Ellipsis />
            </IconButton>
          </Card.Action>
        </Card.Header>
        <Card.Content>
          Everything your team needs for the next launch.
        </Card.Content>
      </Card.Root>
    </Frame>
  );
}
