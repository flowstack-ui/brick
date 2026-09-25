import { BottomNavigation, For, Icon } from "@flowstack-ui/brick";
import { Home, Search, Mail } from "lucide-react";
const destinations = [
  { value: "home", label: "Home", Artwork: Home },
  { value: "search", label: "Search", Artwork: Search },
  { value: "inbox", label: "Inbox", Artwork: Mail },
];
export function BottomNavigationResponsive() {
  return (
    <BottomNavigation.Root
      defaultValue="home"
      aria-label="Responsive destinations"
      size={{ initial: "sm", md: "md" }}
      arrangement={{ initial: "equal", md: "centered" }}
    >
      <For each={destinations}>
        {({ value, label, Artwork }) => (
          <BottomNavigation.Item key={value} value={value} href={`#${value}`}>
            <BottomNavigation.Icon>
              <Icon>
                <Artwork />
              </Icon>
            </BottomNavigation.Icon>
            <BottomNavigation.Label>{label}</BottomNavigation.Label>
          </BottomNavigation.Item>
        )}
      </For>
    </BottomNavigation.Root>
  );
}
