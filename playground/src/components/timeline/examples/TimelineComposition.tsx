import {
  Avatar,
  Button,
  Card,
  HStack,
  Input,
  Link,
  Timeline,
} from "@flowstack-ui/brick";
export function TimelineComposition() {
  return (
    <Timeline.Root size="xl" variant="plain">
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator>
            <Avatar
              src="https://i.pravatar.cc/80?img=47"
              alt=""
              fallback="AL"
            />
          </Timeline.Indicator>
          <Timeline.Separator />
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>
            <Link href="#composition">Alex Lee</Link> shared a proposal
          </Timeline.Title>
          <Timeline.Description>
            <time dateTime="2026-09-19T10:00:00Z">
              September 19 at 10:00 AM UTC
            </time>
          </Timeline.Description>
          <Card.Root size="sm" variant="outline">
            <Card.Content>
              <Card.Title>Website refresh</Card.Title>
              <Card.Description>
                Review the updated direction and leave your feedback.
              </Card.Description>
            </Card.Content>
            <Card.Footer>
              <Button asChild size="sm" variant="outline">
                <a href="#composition">View proposal</a>
              </Button>
            </Card.Footer>
          </Card.Root>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Indicator>
            <Avatar
              src="https://i.pravatar.cc/80?img=12"
              alt=""
              fallback="RC"
            />
          </Timeline.Indicator>
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Riley Chen joined the discussion</Timeline.Title>
          <Timeline.Description>
            Share your thoughts with the team.
          </Timeline.Description>
          <HStack gap={2}>
            <Input aria-label="Comment" placeholder="Write a comment…" />
          </HStack>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  );
}
