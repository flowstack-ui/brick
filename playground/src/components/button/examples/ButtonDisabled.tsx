import { Button, HStack } from "@flowstack-ui/brick";
export function ButtonDisabled() {
  return (
    <HStack gap="3" wrap="wrap">
      <Button disabled>Save</Button>
      <Button href="/account" disabled>
        Account
      </Button>
      <Button loading disabled>
        Saving
      </Button>
    </HStack>
  );
}
