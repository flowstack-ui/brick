import { useState } from "react";
import {
  BottomNavigation,
  Button,
  For,
  Icon,
  Text,
  VStack,
} from "@flowstack-ui/brick";
import { Home, Search, Mail } from "lucide-react";
const destinations = [
  { value: "home", label: "Home", Artwork: Home },
  { value: "search", label: "Search", Artwork: Search },
  { value: "inbox", label: "Inbox", Artwork: Mail },
];
export function BottomNavigationPosition() {
  const [open, setOpen] = useState(false);
  return (
    <VStack gap={4}>
      <Button variant="outline" onClick={() => setOpen(!open)}>
        {open ? "Hide fixed navigation" : "Show fixed navigation"}
      </Button>
      <Text tone="secondary">
        Fixed positioning attaches to the viewport. The application must reserve
        space for the bar.
      </Text>
      {open && (
        <>
          <BottomNavigation.Root
            defaultValue="home"
            aria-label="Fixed preview destinations"
            position="fixed"
            layout="floating"
            variant="surface"
            elevation="medium"
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
        </>
      )}
    </VStack>
  );
}
