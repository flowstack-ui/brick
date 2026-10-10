import { useState } from "react";
import { BottomNavigation, For, Icon, VStack, Text } from "@flowstack-ui/brick";
import { Home, Search, Mail } from "lucide-react";
const destinations = [
  { value: "home", label: "Home", Artwork: Home },
  { value: "search", label: "Search", Artwork: Search },
  { value: "inbox", label: "Inbox", Artwork: Mail },
];
export function BottomNavigationControlled() {
  const [value, setValue] = useState("home");
  return (
    <VStack gap={4}>
      <BottomNavigation.Root
        aria-label="Workspace views"
        value={value}
        onChange={setValue}
      >
        <For each={destinations}>
          {({ value, label, Artwork }) => (
            <BottomNavigation.Item key={value} value={value}>
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
      <Text>Current view: {value}</Text>
    </VStack>
  );
}
