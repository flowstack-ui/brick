import {
  Avatar,
  For,
  HStack,
  NotificationBadge,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function NotificationBadgeSizes() {
  return (
    <HStack gap={8} wrap="wrap">
      <For each={["xs", "sm", "md", "lg", "xl"] as const}>
        {(size) => (
          <VStack key={size} gap={3} align="center">
            <NotificationBadge count={8} size={size}>
              <Avatar alt="Ada, 8 unread messages" fallback="AL" />
            </NotificationBadge>
            <Text variant="body-sm">{size}</Text>
          </VStack>
        )}
      </For>
    </HStack>
  );
}
