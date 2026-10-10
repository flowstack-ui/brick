import { Icon, HStack, Text } from "@flowstack-ui/brick";
import { Search } from "lucide-react";
export function IconLibrary() {
  return (
    <HStack gap={2}>
      <Icon>
        <Search aria-hidden="true" focusable="false" />
      </Icon>
      <Text>Search your workspace</Text>
    </HStack>
  );
}
