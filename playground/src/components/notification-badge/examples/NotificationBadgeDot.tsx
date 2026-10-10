import { Avatar, NotificationBadge } from "@flowstack-ui/brick";

export function NotificationBadgeDot() {
  return (
    <NotificationBadge
      dot
      tone="success"
      size="sm"
      overlap="circular"
      placement="bottom-end"
    >
      <Avatar alt="Ada, online" fallback="AL" />
    </NotificationBadge>
  );
}
