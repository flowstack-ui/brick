import {
  Avatar,
  Button,
  Card,
  Frame,
  HStack,
  Text,
  VStack,
  Stack,
} from "@flowstack-ui/brick";
import { Check, X } from "lucide-react";
export function CardAvatar() {
  return (
    <Frame maxInlineSize={360}>
      <Card.Root>
        <Card.Content gap={5}>
          <HStack gap={3}>
            <Avatar
              src="https://images.unsplash.com/photo-1511806754518-53bada35f930?w=96&h=96&fit=crop&crop=faces"
              fallback="AL"
              alt="Ada Lee"
            />
            <VStack gap={0}>
              <Text weight="semibold">Ada Lee</Text>
              <Text tone="secondary">@adalee</Text>
            </VStack>
          </HStack>
          <Card.Description>
            Ada has requested to join your design team.
          </Card.Description>
        </Card.Content>
        <Card.Footer>
          <Stack.Item flex={1} asChild>
            <Button variant="subtle" tone="danger" startIcon={<X />}>
              Decline
            </Button>
          </Stack.Item>
          <Stack.Item flex={1} asChild>
            <Button variant="subtle" tone="info" startIcon={<Check />}>
              Approve
            </Button>
          </Stack.Item>
        </Card.Footer>
      </Card.Root>
    </Frame>
  );
}
