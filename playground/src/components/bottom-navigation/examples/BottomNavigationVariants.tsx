import { BottomNavigation, For, Icon, VStack, Text } from "@flowstack-ui/brick";
import { Home, Search, Mail } from "lucide-react";
const destinations = [
  { value: "home", label: "Home", Artwork: Home },
  { value: "search", label: "Search", Artwork: Search },
  { value: "inbox", label: "Inbox", Artwork: Mail },
];
export function BottomNavigationVariants() {
  return (
    <VStack gap={6}>
      <For each={["surface", "outline", "soft", "solid", "ghost"] as const}>
        {(variant) => (
          <VStack gap={2} key={variant}>
            <Text tone="secondary">{variant}</Text>
            <BottomNavigation.Root
              defaultValue="home"
              variant={variant}
              aria-label={variant}
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
          </VStack>
        )}
      </For>
    </VStack>
  );
}
