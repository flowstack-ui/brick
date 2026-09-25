import { BottomNavigation, For, Icon } from "@flowstack-ui/brick";
import { Home, Search, Mail } from "lucide-react";
const destinations = [
  { value: "home", label: "Home", Artwork: Home },
  { value: "search", label: "Search", Artwork: Search },
  { value: "inbox", label: "Inbox", Artwork: Mail },
];
export function BottomNavigationEffects() {
  return (
    <BottomNavigation.Root
      defaultValue="home"
      aria-label="Elevated destinations"
      variant="surface"
      layout="floating"
      elevation="medium"
      blurred
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
