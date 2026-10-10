import { Avatar, HStack, NotificationBadge } from "@flowstack-ui/brick";

export function NotificationBadgeVisibility() {
  return (
    <HStack gap={8} wrap="wrap">
      <NotificationBadge count={125}>
        <Avatar alt="Ada, 125 unread messages" fallback="AL" />
      </NotificationBadge>
      <NotificationBadge count={0} showZero>
        <Avatar alt="Grace, no unread messages" fallback="GH" />
      </NotificationBadge>
      <NotificationBadge count={4} invisible>
        <Avatar alt="Linus" fallback="LT" />
      </NotificationBadge>
    </HStack>
  );
}
