import { Avatar, HStack, NotificationBadge } from "@flowstack-ui/brick";

export function NotificationBadgeBorder() {
  return (
    <HStack gap={8}>
      <NotificationBadge count={3}>
        <Avatar alt="Ada, 3 unread messages" fallback="AL" />
      </NotificationBadge>
      <NotificationBadge count={3} bordered={false}>
        <Avatar alt="Grace, 3 unread messages" fallback="GH" />
      </NotificationBadge>
    </HStack>
  );
}
