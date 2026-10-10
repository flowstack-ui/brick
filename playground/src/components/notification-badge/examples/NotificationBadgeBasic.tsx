import { Icon, IconButton, NotificationBadge } from "@flowstack-ui/brick";
import { Mail } from "lucide-react";

export function NotificationBadgeBasic() {
  return (
    <IconButton aria-label="Inbox, 3 unread messages">
      <NotificationBadge count={3} size="sm">
        <Icon>
          <Mail />
        </Icon>
      </NotificationBadge>
    </IconButton>
  );
}
