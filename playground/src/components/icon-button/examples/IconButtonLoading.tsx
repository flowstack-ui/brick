import { IconButton, HStack, Spinner } from "@flowstack-ui/brick";
import { Search } from "lucide-react";
export function IconButtonLoading() {
  return (
    <HStack gap="3">
      <IconButton aria-label="Working" loading>
        <Search />
      </IconButton>
      <IconButton aria-label="Unavailable working" loading disabled>
        <Search />
      </IconButton>
      <IconButton
        aria-label="Custom working"
        loading
        spinner={<Spinner size="inherit" />}
      >
        <Search />
      </IconButton>
    </HStack>
  );
}
