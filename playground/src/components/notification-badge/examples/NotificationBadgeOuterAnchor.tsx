import { Icon, IconButton, NotificationBadge } from "@flowstack-ui/brick";
import { Mail } from "lucide-react";

export function NotificationBadgeOuterAnchor() {
  return (
    <NotificationBadge count={3}>
      <IconButton variant="outline" aria-label="Inbox, 3 unread messages">
        <Icon>
          <Mail />
        </Icon>
      </IconButton>
    </NotificationBadge>
  );
}
