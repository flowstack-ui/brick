import { Avatar, MultiSelect, For, Frame, HStack } from "@flowstack-ui/brick";

const people = [
  { value: "alex", label: "Alex Morgan", initials: "AM" },
  { value: "sam", label: "Sam Rivera", initials: "SR" },
  { value: "jules", label: "Jules Kim", initials: "JK" },
];

export function MultiSelectPeople() {
  return (
    <Frame maxInlineSize="20rem">
      <MultiSelect.Root items={people}>
        <MultiSelect.Trigger aria-label="Assign people">
          <MultiSelect.Value
            placeholder="Select people"
            renderValue={(values) => `${values.length} people selected`}
          />
          <MultiSelect.Icon />
        </MultiSelect.Trigger>
        <MultiSelect.Content>
          <For each={people}>
            {(person) => (
              <MultiSelect.Item
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
                  <MultiSelect.ItemText>{person.label}</MultiSelect.ItemText>
                </HStack>
                <MultiSelect.ItemIndicator />
              </MultiSelect.Item>
            )}
          </For>
        </MultiSelect.Content>
      </MultiSelect.Root>
    </Frame>
  );
}
