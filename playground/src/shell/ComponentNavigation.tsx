import { Text, VStack } from "@flowstack-ui/brick";
import type { PlaygroundEntry } from "../app/component-registry.js";

export function ComponentNavigation({
  currentRoute,
  entries,
  onNavigate,
}: {
  currentRoute: string;
  entries: readonly PlaygroundEntry[];
  onNavigate?: () => void;
}) {
  const categories = Array.from(
    new Set(entries.map((entry) => entry.category)),
  );

  return (
    <VStack
      as="nav"
      aria-label="Component navigation"
      className="evidence-navigation"
      gap="5"
    >
      {categories.map((category) => (
        <VStack
          as="section"
          className="evidence-navigation__group"
          gap="2"
          key={category}
        >
          <Text as="h2" variant="title-sm">{category}</Text>
          <VStack as="ul" gap="0">
            {entries
              .filter((entry) => entry.category === category)
              .map((entry) => (
                <li key={entry.id}>
                  <a
                    aria-current={
                      currentRoute === entry.route ? "page" : undefined
                    }
                    href={entry.route}
                    onClick={onNavigate}
                  >
                    <span>{entry.title}</span>
                  </a>
                </li>
              ))}
          </VStack>
        </VStack>
      ))}
    </VStack>
  );
}
