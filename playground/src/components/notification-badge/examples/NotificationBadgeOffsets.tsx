import { Icon, IconButton, NotificationBadge } from "@flowstack-ui/brick";
import { Mail } from "lucide-react";

export function NotificationBadgeOffsets() {
  return (
    <NotificationBadge
      count={4}
      size={{ initial: "sm", md: "md" }}
      placement={{ initial: "bottom-start", md: "top-end" }}
      offset={{ initial: 0, md: 1 }}
      offsetInline={0}
    >
      <IconButton variant="outline" aria-label="Inbox, 4 unread messages">
        <Icon>
          <Mail />
        </Icon>
      </IconButton>
    </NotificationBadge>
  );
}
