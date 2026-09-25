import { BottomNavigation, For, Icon, VStack } from "@flowstack-ui/brick";
import { Home, Search, Mail } from "lucide-react";
const destinations = [
  { value: "home", label: "Home", Artwork: Home },
  { value: "search", label: "Search", Artwork: Search },
  { value: "inbox", label: "Inbox", Artwork: Mail },
];
export function BottomNavigationSelection() {
  return (
    <VStack gap={6}>
      <For each={["soft", "outline", "plain"] as const}>
        {(selectionVariant) => (
          <BottomNavigation.Root
            defaultValue="home"
            key={selectionVariant}
            aria-label={selectionVariant}
            selection="item"
            selectionVariant={selectionVariant}
            selectionRadius="control"
          >
            <For each={destinations}>
              {({ value, label, Artwork }) => (
                <BottomNavigation.Item
                  key={value}
                  value={value}
                  href={`#${value}`}
                >
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
        )}
      </For>
    </VStack>
  );
}
