import { Avatar, Select, For, Frame, HStack } from "@flowstack-ui/brick";

const people = [
  { value: "alex", label: "Alex Morgan", initials: "AM" },
  { value: "sam", label: "Sam Rivera", initials: "SR" },
  { value: "jules", label: "Jules Kim", initials: "JK" },
];

export function SelectPeople() {
  return (
    <Frame maxInlineSize="20rem">
      <Select.Root items={people}>
        <Select.Trigger aria-label="Assign people">
          <Select.Value placeholder="Select people" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <For each={people}>
            {(person) => (
              <Select.Item
                key={person.value}
                value={person.value}
                label={person.label}
              >
                <HStack gap="3">
                  <Avatar
                    alt=""
                    fallback={person.initials}
                    size="xs"
                    aria-hidden="true"
                  />
                  <Select.ItemText>{person.label}</Select.ItemText>
                </HStack>
                <Select.ItemIndicator />
              </Select.Item>
            )}
          </For>
        </Select.Content>
      </Select.Root>
    </Frame>
  );
}
