import {
  BottomNavigation,
  For,
  Icon,
  NotificationBadge,
} from "@flowstack-ui/brick";
import { Home, Search, Mail } from "lucide-react";
const destinations = [
  { value: "home", label: "Home", Artwork: Home },
  { value: "search", label: "Search", Artwork: Search },
  { value: "inbox", label: "Inbox", Artwork: Mail },
];
export function BottomNavigationBadge() {
  return (
    <BottomNavigation.Root defaultValue="home" aria-label="Inbox destinations">
      <For each={destinations}>
        {({ value, label, Artwork }) => (
          <BottomNavigation.Item key={value} value={value} href={`#${value}`}>
            <BottomNavigation.Icon>
              <NotificationBadge count={value === "inbox" ? 4 : 0}>
                <Icon>
                  <Artwork />
                </Icon>
              </NotificationBadge>
            </BottomNavigation.Icon>
            <BottomNavigation.Label>{label}</BottomNavigation.Label>
          </BottomNavigation.Item>
        )}
      </For>
    </BottomNavigation.Root>
  );
}
