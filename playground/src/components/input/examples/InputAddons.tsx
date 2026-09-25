import {
  Button,
  Frame,
  Group,
  Input,
  InputAddon,
  Stack,
  VStack,
} from "@flowstack-ui/brick";
export function InputAddons() {
  return (
    <Frame maxInlineSize="28rem">
      <VStack gap="4">
        <Group attached>
          <InputAddon>https://</InputAddon>
          <Input aria-label="Website address" />
          <InputAddon>.com</InputAddon>
        </Group>
        <Group attached>
          <Input aria-label="Search query" type="search" />
          <Stack.Item shrink={0} asChild>
            <Button>Search</Button>
          </Stack.Item>
        </Group>
      </VStack>
    </Frame>
  );
}
