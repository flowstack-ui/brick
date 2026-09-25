import { For, Heading, List, Paragraph, VStack } from "@flowstack-ui/brick";

const members = [
  { id: "maya", name: "Maya", role: "Product design" },
  { id: "leo", name: "Leo", role: "Engineering" },
  { id: "aria", name: "Aria", role: "Customer support" },
] as const;

export function ForObjects() {
  return (
    <List.Root>
      <For each={members}>
        {(member) => (
          <List.Item key={member.id}>
            <VStack gap="1">
              <Heading level={3} variant="title-xs">
                {member.name}
              </Heading>
              <Paragraph tone="secondary">{member.role}</Paragraph>
            </VStack>
          </List.Item>
        )}
      </For>
    </List.Root>
  );
}
