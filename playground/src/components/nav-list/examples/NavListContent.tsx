import { Badge, Frame, NavList } from "@flowstack-ui/brick";
import { Mail, ArrowUpRight } from "lucide-react";
export function NavListContent() {
  return (
    <Frame maxInlineSize="22rem">
      <NavList.Root aria-label="Inbox">
        <NavList.List>
          <NavList.Item>
            <NavList.Link
              href="#content"
              active
              startIcon={<Mail />}
              description="Messages from your team"
              trailingContent={<Badge>12 unread</Badge>}
            >
              Inbox
            </NavList.Link>
          </NavList.Item>
          <NavList.Item>
            <NavList.Link
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<ArrowUpRight />}
            >
              Help center
            </NavList.Link>
          </NavList.Item>
        </NavList.List>
      </NavList.Root>
    </Frame>
  );
}
