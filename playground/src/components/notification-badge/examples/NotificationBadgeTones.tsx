import {
  Avatar,
  For,
  HStack,
  NotificationBadge,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function NotificationBadgeTones() {
  return (
    <HStack gap={8} wrap="wrap">
      <For
        each={
          [
            "neutral",
            "contrast",
            "accent",
            "info",
            "success",
            "warning",
            "danger",
          ] as const
        }
      >
        {(tone) => (
          <VStack key={tone} gap={3} align="center">
            <NotificationBadge count={3} tone={tone}>
              <Avatar alt="Ada, 3 unread messages" fallback="AL" />
            </NotificationBadge>
            <Text variant="body-sm">{tone}</Text>
          </VStack>
        )}
      </For>
    </HStack>
  );
}
